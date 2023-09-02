import { memo, useEffect, useState } from "react";

import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { IChoices } from "/src/features/SearchSchedule";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";

import { useDebounce } from "/src/shared/hooks/useDebounce";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import {
  fetchScheduleByGroup,
  fetchScheduleByQuery,
} from "/src/entities/Table/model/slice/tableSlice";
import { useSelector } from "react-redux";
import { getSchedule } from "/src/entities/Table/model/selectors/getSchedule";
import { IScheduleTable } from "/src/entities/Table/model/types/Table";

import styles from "./SearchSchedule.module.scss";
import { FavoriteChoice } from "/src/shared/ui/FavoriteChoice/FavoriteChoice";
import StateSchema from "/src/app/Providers/StoreProvider/config/StateSchema";

interface SearchScheduleProps {
  className?: string;
}

export const SearchSchedule = memo(({ className }: SearchScheduleProps) => {
  const { week } = useCurrentWeek();
  const { colorMode } = useColorMode();
  const [input, setInput] = useState("");
  const [dataFromAPI, setDataFromAPI] = useState<IChoices | IScheduleTable>({
    choices: [],
  });

  const dispatch = useAppDispatch();
  const stateData = useSelector(getSchedule);

  const favoriteChoices = useSelector(
    (state: StateSchema) => state.favoriteSearch,
  );

  console.log("favoriteChoices", favoriteChoices);

  const debounceInput = useDebounce(() => {
    dispatch(fetchScheduleByQuery(input));
  }, 500);

  useEffect(() => {
    debounceInput();
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      dispatch(fetchScheduleByQuery(input.trim()));
      setInput((prev) => prev.trim());
    }
  };

  // fetching data by url params
  useEffect(() => {
    const group = new URLSearchParams(window.location.search).get("group");

    if (group) {
      dispatch(fetchScheduleByGroup(group));
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
          onClick={() => dispatch(fetchScheduleByQuery(input))}
          sx={{ borderRadius: "0 5px 5px 0" }}
        >
          Поиск
        </Button>
      </div>

      <div>
        {favoriteChoices.map((choice, index: number) => {
          return (
            <FavoriteChoice
              title={choice.name}
              key={index}
              onClick={() => dispatch(fetchScheduleByGroup(choice.group))}
            />
          );
        })}
      </div>

      <div className={styles.choices}>
        {stateData.choices !== null &&
          stateData.choices.choices.map((choice, index) => {
            return (
              <Button
                className={styles.choice}
                key={index}
                onClick={() => dispatch(fetchScheduleByGroup(choice.group))}
              >
                {choice.name}
              </Button>
            );
          })}
        {stateData.choices?.choices?.length === 0 && (
          <h1 className={styles.choice}>Не найдено</h1>
        )}
      </div>
    </div>
  );
});
