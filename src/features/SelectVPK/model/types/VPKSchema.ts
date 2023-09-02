import { IChoice } from "/src/features/SearchSchedule";
import { IVPK } from "/src/features/SelectVPK/model/types/VPK";
import { IScheduleTable } from "/src/entities/Table/model/types/Table";

export interface VPKSchema {
  choices: IChoice[];
  VPK: IVPK;
  VPKData: IScheduleTable;
}
