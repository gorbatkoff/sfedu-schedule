import { memo, useEffect } from "react";
import { useSelector } from "react-redux";

import { StateSchema } from "/src/app/Providers";

import { tableActions } from "/src/entities/ScheduleTable";
import { getFavoriteSearch } from "/src/entities/ScheduleTable";
import { FavoriteChoice } from "/src/shared/ui/FavoriteChoice/FavoriteChoice";

import { GROUP_FETCH_SUCCESS } from "/src/shared/const/toast/toast";

import { useLazyFetchGroupQuery } from "/src/features/SearchSchedule/api";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";

import { useToast } from "@chakra-ui/react";

export const FavoriteChoices = memo(() => {
  const favoriteChoices = useSelector(getFavoriteSearch);
  const [fetchGroup, { data, status }] = useLazyFetchGroupQuery();
  const toast = useToast();
  const dispatch = useAppDispatch();

  if (data) {
    window.history.pushState(null, "group", `/?group=${data.table.group}`);
  }

  const vpkData = useSelector((state: StateSchema) => state.selectVPK.VPKData);

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
      toast(GROUP_FETCH_SUCCESS(data?.table?.name));
    }
  }, [status]);

  return (
    <div style={{ marginTop: "1em" }}>
      {favoriteChoices.map((choice, index) => {
        return (
          <FavoriteChoice
            title={choice.name}
            key={choice.group}
            onClick={() => {
              fetchGroup(choice.group);
            }}
          />
        );
      })}
    </div>
  );
});
