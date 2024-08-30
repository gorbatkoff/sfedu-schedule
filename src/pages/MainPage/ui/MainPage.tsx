import { useCallback, useEffect } from "react";

import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { StateSchema } from "/src/app/providers";

import { RenderTable } from "/src/processes/RenderTable";

import { ShowVPK } from "/src/widgets/ShowVPK";

import {
  SearchSchedule,
  useFetchGroupByWeekQuery,
} from "/src/features/SearchSchedule";

import { Calendar } from "/src/entities/Calendar";
import { IScheduleTable, tableActions } from "/src/entities/ScheduleTable";
import { UpcomingLessons } from "/src/entities/UpcomingLessons";

import {
  SAVED_SCHEDULE,
  USER_GROUP,
} from "/src/shared/const/localStorage/localStorageKeys";
import { TOAST_NO_INTERNET } from "/src/shared/const/toast/toast";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";
import MainColumns from "/src/shared/ui/MainColumns/MainColumns";

const isUserOnline = navigator.onLine;

const savedUserSchedule = JSON.parse(
  localStorage.getItem(SAVED_SCHEDULE) ?? "{}"
) as IScheduleTable;

const renderColumnsByViewPort = () => {
  if (window.screen.width > 768)
    return (
      <MainColumns>
        <Calendar />
        <SearchSchedule />
        <UpcomingLessons />
      </MainColumns>
    );
  return <SearchSchedule />;
};

const userGroup = JSON.parse(localStorage.getItem(USER_GROUP) ?? "{}");

const MainPage = () => {
  const toast = useToast();
  const { week } = useCurrentWeek();
  const dispatch = useAppDispatch();
  const [queryParameters] = useSearchParams();

  const requestGroup = queryParameters.get("group") || userGroup?.groupId || "";

  const { data, isLoading } = useFetchGroupByWeekQuery({
    group: requestGroup,
    week: week,
  });

  const vpkData = useSelector((state: StateSchema) => state.selectVPK.VPKData);

  useEffect(() => {
    if (data?.table?.group) {
      dispatch(tableActions.setSchedule(data));
      mergeVPKAndSchedule();
    }
  }, [data]);

  const mergeVPKAndSchedule = useCallback(() => {
    const header = data.table.table.slice(0, 2);
    const slicedSchedule = data.table.table.slice(2);

    if (vpkData?.table?.group) {
      const slicedVPK = vpkData.table.table.slice(2);

      const mergedSchedule = slicedSchedule.map(
        (row: any, rowIndex: number) => {
          return row.map((item: any, itemIndex: number) => {
            if (item.includes("Дисциплины ВПК")) {
              item = slicedVPK[rowIndex][itemIndex];
              return item;
            }
            return item;
          });
        }
      );
      dispatch(tableActions.mergeScheduleAndVPK(header.concat(mergedSchedule)));
    }
  }, [
    data?.table?.table,
    dispatch,
    vpkData?.table?.group,
    vpkData?.table?.table,
  ]);

  useEffect(() => {
    if (!isUserOnline) {
      toast(TOAST_NO_INTERNET);
      if (savedUserSchedule?.table?.group) {
        dispatch(tableActions.setSchedule(savedUserSchedule));
      }
    }
  }, []);

  return (
    <>
      {renderColumnsByViewPort()}
      <RenderTable isLoading={isLoading && requestGroup} />
      <ShowVPK />
    </>
  );
};

export default MainPage;
