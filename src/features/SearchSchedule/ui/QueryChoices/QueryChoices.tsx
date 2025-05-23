import { FC, memo, useEffect } from "react";

import { Button, useToast } from "@chakra-ui/react";

import { IChoice, IChoices } from "/src/features/SearchSchedule";
import { useLazyFetchGroupQuery } from "/src/features/SearchSchedule/api";

import { IScheduleTable, tableActions } from "/src/entities/ScheduleTable";

import { GROUP_FETCH_SUCCESS } from "/src/shared/const/toast/toast";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";

import styles from "../SearchSchedule.module.scss";

interface INoData {
  result: "no_entries";
}

interface IQueryChoicesProps {
  data: IChoices | IScheduleTable | INoData;
  fetchByQuery: (query: string, cachedRequest: boolean) => void;
}

export const QueryChoices: FC<IQueryChoicesProps> = memo(({ data }) => {
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

  if (!data) return null;

  if ("result" in data && data.result === "no_entries")
    return <h1 className={styles.choice}>Не найдено</h1>;

  if (!("choices" in data))
    return (
      <Button
        className={styles.choice}
        onClick={() => fetchChoice({ group: data.table.group })}
      >
        {"table" in data ? data.table.name : null}
      </Button>
    );

  return (
    <div className={styles.choices}>
      {data.choices.map((choice: IChoice) => {
        return (
          <Button
            className={styles.choice}
            key={choice.id}
            onClick={() => {
              fetchChoice(
                {
                  group: choice.group,
                },
                true
              );
            }}
          >
            {choice.name}
          </Button>
        );
      })}
    </div>
  );
});
