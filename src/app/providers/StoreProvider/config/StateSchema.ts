import { UserGroupSchema } from "/src/widgets/DrawerMenu";

import { VPKSchema } from "/src/features/SelectVPK";

import { ScheduleSchema } from "/src/entities/ScheduleTable";
import { IFavoriteChoice } from "/src/entities/ScheduleTable";

export interface StateSchema {
  userGroup: UserGroupSchema;
  schedule: ScheduleSchema;
  favoriteSearch: IFavoriteChoice[];
  selectVPK: VPKSchema;
}
