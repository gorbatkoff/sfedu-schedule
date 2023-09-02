import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { useDebounce } from "/src/shared/hooks/useDebounce";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import {
  fetchScheduleByGroup,
  fetchScheduleByQuery,
} from "/src/entities/Table/model/slice/tableSlice";
import { getSchedule } from "/src/entities/Table/model/selectors/getSchedule";

import { FavoriteChoice } from "/src/shared/ui/FavoriteChoice/FavoriteChoice";
import { getFavoriteSearch } from "/src/entities/Table/model/selectors/getFavoriteSearch";

import styles from "./SearchSchedule.module.scss";

interface SearchScheduleProps {
  className?: string;
}

export const SearchSchedule = memo(({ className }: SearchScheduleProps) => {
  const [input, setInput] = useState("");
  const { colorMode } = useColorMode();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const stateData = useSelector(getSchedule);
  const favoriteChoices = useSelector(getFavoriteSearch);

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

  // Fetching data by url params
  useEffect(() => {
    const group = new URLSearchParams(window.location.search).get("group");

    if (group) {
      dispatch(fetchScheduleByGroup(group));
    }
  }, []);

  const handleFetchScheduleByClick = async (group: string) => {
    await dispatch(fetchScheduleByGroup(group));
    toast({
      title: "Успешно!",
      description: "Расписание подгружено",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

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
              onClick={() => handleFetchScheduleByClick(choice.group)}
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
