import { memo, useEffect, useState } from "react";

import { useToast } from "@chakra-ui/react";
import { BaseItemProps } from "@snack-uikit/list";
import { Search } from "@snack-uikit/search";

import {
  useLazyFetchChoicesQuery,
  useLazyFetchGroupQuery,
} from "/src/features/SearchSchedule";

import { tableActions } from "/src/entities/ScheduleTable";

import { GROUP_FETCH_SUCCESS } from "/src/shared/const";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { useDebounce } from "/src/shared/hooks/useDebounce";

import styles from "../SearchSchedule.module.scss";

export const InputForm = memo(() => {
  const [input, setInput] = useState("");
  const [fetchByQuery, { data, isLoading }] = useLazyFetchChoicesQuery();

  const [fetchChoice, { data: response, status }] = useLazyFetchGroupQuery();
  const toast = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "fulfilled") {
      window.history.pushState(
        null,
        "group",
        `/?group=${response?.table?.group}`
      );
      dispatch(tableActions.setSchedule(response));
      toast(GROUP_FETCH_SUCCESS(response?.table?.name));
    }
  }, [status]);

  useEffect(() => {
    input.trim() !== "" && debounceInput();
  }, [input]);

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const debounceInput = useDebounce(() => {
    fetchByQuery(input, true);
  }, 500);

  function transformDataToBaseItems(data: {
    choices: Array<{
      name: string;
      id: string;
      group: string;
    }>;
  }): BaseItemProps[] {
    if (!data?.choices) {
      return [];
    }

    return data.choices.map((choice) => ({
      content: choice.name,
      id: choice.name,
      disabled: false,
      hidden: false,
      onClick: () => fetchChoice({ group: choice.group }),
    }));
  }

  return (
    <Search
      outline={true}
      autocomplete={true}
      size={"m"}
      options={data ? transformDataToBaseItems(data) : []}
      value={input}
      className={styles.input}
      loading={isLoading}
      onChange={handleInputChange}
    />
  );
});
