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

interface SearchScheduleProps {
  className?: string;
}

export const SearchSchedule = memo(({ className }: SearchScheduleProps) => {
  const { colorMode } = useColorMode();

  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") alert(1);
  };

  return (
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
  );
});
