import { CounterSchema } from "/src/features/Counter/model/types/counter";
import { UserGroupSchema } from "/src/widgets/DrawerMenu/model/types/UserGroup";
import { ScheduleScheme } from "/src/entities/Table/model/types/Table";
import { IFavoriteChoice } from "/src/entities/Table/ui/ScheduleTable";

export default interface StateSchema {
  counter: CounterSchema;
  userGroup: UserGroupSchema;
  schedule: ScheduleScheme;
  favoriteSearch: IFavoriteChoice[];
}
