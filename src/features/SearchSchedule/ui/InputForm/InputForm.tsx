import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  memo,
  useEffect,
  useState,
} from "react";

import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";

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

    useEffect(() => {
      input.trim() !== "" && debounceInput();
    }, [input]);

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

    const handleClearInput = () => {
      setInput("");
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
              colorScheme="green"
              borderColor="gray.200"
              color={colorMode === "light" ? "black" : "white"}
            />
            {input && (
              <InputRightElement>
                <CloseIcon
                  onClick={handleClearInput}
                  color="gray.500"
                  style={{ cursor: "pointer" }}
                />
              </InputRightElement>
            )}
          </InputGroup>
        </FormControl>
      </div>
    );
  }
);
