import { FC, useEffect } from "react";

import { Button } from "@chakra-ui/react";
import { IChoices } from "/src/features/SearchSchedule";
import { IScheduleTable } from "/src/entities/ScheduleTable/model/types/Table";

import styles from "../SearchSchedule.module.scss";
import { useLazyFetchGroupQuery } from "/src/features/SearchSchedule/api";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { tableActions } from "/src/entities/ScheduleTable/model/slice/tableSlice";

interface INoData {
  result: "no_entries";
}

interface IQueryChoicesProps {
  data: IChoices | IScheduleTable | INoData;
}

export const QueryChoices: FC<IQueryChoicesProps> = ({ data }) => {
  const [fetchChoice, { data: response, isLoading, status }] =
    useLazyFetchGroupQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "fulfilled") {
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
        onClick={() => fetchChoice(data.table.group, true)}
      >
        {"table" in data ? data.table.name : null}
      </Button>
    );

  return (
    <div className={styles.choices}>
      {data.choices.map((choice, index) => {
        return (
          <Button
            className={styles.choice}
            key={index}
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
};
