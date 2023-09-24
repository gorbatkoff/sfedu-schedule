import { FC, memo, useEffect } from "react";

import { Button } from "@chakra-ui/react";

import { IChoice, IChoices } from "/src/features/SearchSchedule";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { useLazyFetchGroupQuery } from "/src/features/SearchSchedule/api";
import { IScheduleTable } from "/src/entities/ScheduleTable/model/types/Table";
import { tableActions } from "/src/entities/ScheduleTable/model/slice/tableSlice";

import styles from "../SearchSchedule.module.scss";

interface INoData {
  result: "no_entries";
}

interface IQueryChoicesProps {
  data: IChoices | IScheduleTable | INoData;
}

export const QueryChoices: FC<IQueryChoicesProps> = memo(({ data }) => {
  const [fetchChoice, { data: response, isLoading, status }] =
    useLazyFetchGroupQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "fulfilled") {
      window.history.pushState(
        null,
        "group",
        `/?group=${response?.table?.group}`,
      );
      dispatch(tableActions.setSchedule(response));
    }
  }, [status]);

  if (!data) return null;

  if ("result" in data && data.result === "no_entries")
    return <h1 className={styles.choice}>Не найдено</h1>;

  if (!("choices" in data))
    return (
      <Button
        className={styles.choice}
        onClick={() => fetchChoice(data.table.group)}
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
              fetchChoice(choice.group, true);
            }}
          >
            {choice.name}
          </Button>
        );
      })}
    </div>
  );
});
