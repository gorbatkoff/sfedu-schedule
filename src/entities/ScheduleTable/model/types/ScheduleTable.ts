type TableElement = string[];

export interface IScheduleTable {
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
