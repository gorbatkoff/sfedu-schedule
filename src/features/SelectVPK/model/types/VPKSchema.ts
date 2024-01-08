import { IChoice } from "/src/features/SearchSchedule";
import { IVPK } from "/src/features/SelectVPK";

import { IScheduleTable } from "/src/entities/ScheduleTable";

export interface VPKSchema {
  choices: IChoice[];
  VPK: IVPK;
  VPKData: IScheduleTable;
}
