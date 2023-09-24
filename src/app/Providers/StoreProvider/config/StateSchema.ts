import { UserGroupSchema } from "/src/widgets/DrawerMenu";
import { ScheduleSchema } from "/src/entities/ScheduleTable";
import { IFavoriteChoice } from "/src/entities/ScheduleTable";
import { VPKSchema } from "/src/features/SelectVPK";

export default interface StateSchema {
  userGroup: UserGroupSchema;
  schedule: ScheduleSchema;
  favoriteSearch: IFavoriteChoice[];
  selectVPK: VPKSchema;
}
