import { useEffect } from "react";
import { useSelector } from "react-redux";

import { FavoriteChoice } from "/src/shared/ui/FavoriteChoice/FavoriteChoice";
import { getFavoriteSearch } from "/src/entities/ScheduleTable/model/selectors/getFavoriteSearch";
import { useLazyFetchGroupQuery } from "/src/features/SearchSchedule/api";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { tableActions } from "/src/entities/ScheduleTable/model/slice/tableSlice";
import StateSchema from "/src/app/Providers/StoreProvider/config/StateSchema";

export const FavoriteChoices = () => {
  const favoriteChoices = useSelector(getFavoriteSearch);

  const [fetchGroup, { data, isLoading, status }] = useLazyFetchGroupQuery();

  const dispatch = useAppDispatch();

  if (data) {
    window.history.pushState(null, "group", `/?group=${data.table.group}`);
  }

  const vpkData = useSelector((state: StateSchema) => state.selectVPK.VPKData);
  const vpkInfo = useSelector((state: StateSchema) => state.selectVPK.VPK);

  const mergeVPKAndSchedule = () => {
    const header = data.table.table.slice(0, 2);
    const slicedSchedule = data.table.table.slice(2);

    if (vpkData?.table?.group) {
      const slicedVPK = vpkData.table.table.slice(2);

      //@ts-ignore
      const mergedSchedule = slicedSchedule.map((row, rowIndex) => {
        //@ts-ignore
        return row.map((item, itemIndex) => {
          if (item.includes("Дисциплины ВПК")) {
            item = slicedVPK[rowIndex][itemIndex];
            return item;
          }
          return item;
        });
      });
      dispatch(tableActions.mergeScheduleAndVPK(header.concat(mergedSchedule)));
    }
  };

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(tableActions.setSchedule(data));
      mergeVPKAndSchedule();
    }
  }, [status]);

  return (
    <div>
      {favoriteChoices.map((choice, index) => {
        return (
          <FavoriteChoice
            title={choice.name}
            key={index}
            onClick={() => fetchGroup(choice.group)}
          />
        );
      })}
    </div>
  );
};
