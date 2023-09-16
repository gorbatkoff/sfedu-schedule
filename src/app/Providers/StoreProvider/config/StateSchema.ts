import { UserGroupSchema } from "/src/widgets/DrawerMenu/model/types/UserGroup";
import { ScheduleSchema } from "/src/entities/ScheduleTable/model/types/Table";
import { IFavoriteChoice } from "/src/entities/ScheduleTable/ui/ScheduleTable";
import { VPKSchema } from "/src/features/SelectVPK/model/types/VPKSchema";

export default interface StateSchema {
  userGroup: UserGroupSchema;
  schedule: ScheduleSchema;
  favoriteSearch: IFavoriteChoice[];
  selectVPK: VPKSchema;
}
