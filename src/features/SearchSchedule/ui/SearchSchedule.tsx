import React, { memo, useCallback, useEffect, useState } from "react";

import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { $api } from "/src/shared/api/api";
import { IScheduleTable } from "/src/entities/ScheduleTable";

import { IChoice, IChoices } from "/src/features/SearchSchedule";
import { defaultValue } from "/src/shared/const";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";

import styles from "./SearchSchedule.module.scss";
import { FavoriteChoice } from "/src/shared/ui/FavoriteChoice/FavoriteChoice";
import { useDebounce } from "/src/shared/hooks/useDebounce";

interface SearchScheduleProps {
  className?: string;
  updateData: (data: IScheduleTable) => void;
}

export const SearchSchedule = memo(
  ({ className, updateData }: SearchScheduleProps) => {
    const { week } = useCurrentWeek();
    const { colorMode } = useColorMode();
    const [input, setInput] = useState("");

    const [dataFromAPI, setDataFromAPI] = useState<IChoices | IScheduleTable>({
      choices: [],
    });

    const favoriteChoices = JSON.parse(
      localStorage.getItem("USER_FAVORITE_SEARCH") || "[]",
    );

    const debounceInput = useDebounce(() => {
      fetchUserQuery();
    }, 1000);

    useEffect(() => {
      debounceInput();
    }, [input]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && input.trim() !== "") fetchUserQuery();
    };

    async function fetchUserQuery() {
      if (input.trim() === "") return;

      try {
        const request = await $api.get("/", {
          params: {
            query: input.trim(),
          },
        });

        setDataFromAPI(request.data);

        if ("table" in request.data && "weeks" in request.data) {
          const {
            table: { group },
          } = request.data as IScheduleTable;

          fetchDataByChoice(group);

          window.history.pushState(null, "group", `/?group=${group}`);

          return;
        }

        if (!("choices" in request.data)) {
          updateData(request.data);
        } else {
          updateData(defaultValue);
        }
      } catch (error) {
        console.log(error);
      }
    }

    const sortFunction = useCallback((a: IChoice, b: IChoice) => {
      const aNumber = +a.name.split("-")[1];
      const bNumber = +b.name.split("-")[1];

      if (aNumber < bNumber) {
        return -1;
      }
      if (aNumber > bNumber) {
        return 1;
      }
      return 0;
    }, []);

    async function fetchDataByChoice(group: string) {
      try {
        const request = await $api.get("/", {
          params: {
            group,
            week,
          },
        });

        //@ts-ignore
        setDataFromAPI([]);
        updateData(request.data);

        window.history.pushState(null, "group", `/?group=${group}`);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      const group = new URLSearchParams(window.location.search).get("group");

      if (group) {
        fetchDataByChoice(group);
      }
    }, []);

    return (
      <div>
        <div className={styles.form}>
          <FormControl className={styles.formControl}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                sx={{ borderRadius: "5px 0 0 5px" }}
                type="text"
                value={input}
                className={styles.input}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                placeholder="Введите группу или фамилию преподавателя"
                autoFocus={true}
                borderColor="gray.200"
                color={colorMode === "light" ? "black" : "white"}
              />
            </InputGroup>
          </FormControl>
          <Button
            colorScheme="blue"
            onClick={fetchUserQuery}
            sx={{ borderRadius: "0 5px 5px 0" }}
          >
            Поиск
          </Button>
        </div>

        <div>
          {favoriteChoices.map((choice: IChoice, index: number) => {
            return (
              <FavoriteChoice
                title={choice.name}
                key={index}
                onClick={() => fetchDataByChoice(choice.group)}
              />
            );
          })}
        </div>

        <div className={styles.choices}>
          {"choices" in dataFromAPI &&
            dataFromAPI.choices.sort(sortFunction).map((choice, index) => {
              return (
                <Button
                  className={styles.choice}
                  key={index}
                  onClick={() => fetchDataByChoice(choice.group)}
                >
                  {choice.name}
                </Button>
              );
            })}
          {"result" in dataFromAPI && (
            <h1 className={styles.choice}>Не найдено</h1>
          )}
        </div>
      </div>
    );
  },
);
