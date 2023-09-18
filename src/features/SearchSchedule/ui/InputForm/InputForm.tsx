import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  memo,
  useEffect,
  useState,
} from "react";

import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useDebounce } from "/src/shared/hooks/useDebounce";

import styles from "../SearchSchedule.module.scss";

interface IInputFormProps {
  fetchByQuery: (query: string, cachedRequest: boolean) => void;
  isLoading: boolean;
}

export const InputForm: FC<IInputFormProps> = memo(
  ({ fetchByQuery, isLoading }) => {
    const [input, setInput] = useState("");
    const { colorMode } = useColorMode();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && input.trim() !== "") {
        setInput((prev) => prev.trim());
      }
    };

    const debounceInput = useDebounce(() => {
      fetchByQuery(input, true);
    }, 500);

    useEffect(() => {
      input !== "" && debounceInput();
    }, [input]);

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
        <Button
          colorScheme="blue"
          onClick={() => fetchByQuery(input, true)}
          className={styles.searchButton}
          isLoading={isLoading}
        >
          Поиск
        </Button>
      </div>
    );
  }
);
