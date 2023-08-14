import React, { memo, useState } from "react";

import styles from "./SearchSchedule.module.scss";

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
import { IChoices } from "/src/features/SearchSchedule/model/types/choice";
import { IScheduleTable } from "/src/entities/ScheduleTable/model/types/ScheduleTable";

interface SearchScheduleProps {
  className?: string;
}

export const SearchSchedule = memo(({ className }: SearchScheduleProps) => {
  const { colorMode } = useColorMode();
  const [input, setInput] = useState("");
  const [dataFromAPI, setDataFromAPI] = useState<IChoices | IScheduleTable>({
    choices: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") fetchUserQuery();
  };

  async function fetchUserQuery() {
    try {
      const request = await $api.get("/", {
        params: {
          query: input,
        },
      });

      console.log(request.data);
      setDataFromAPI(request.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={styles.form}>
        <FormControl className={styles.formControl}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
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
        <Button colorScheme="blue">Поиск</Button>
      </div>
      {dataFromAPI.choices.map((choice) => {
        return <h1 style={{ color: "white" }}>{choice.name}</h1>;
      })}
    </>
  );
});
