import { IChoices } from "/src/features/SearchSchedule";

type TableElement = string[];

export interface IScheduleTable extends INoData {
  table: {
    type: string;
    name: string;
    week: number;
    group: string;
    table: TableElement[];
    link: string;
  };
  weeks: number[];
}

export interface INoData {
  result: "no_entries" | null;
}

export interface ScheduleSchema {
  choices: IChoices | null;
  schedule: IScheduleTable;
}
