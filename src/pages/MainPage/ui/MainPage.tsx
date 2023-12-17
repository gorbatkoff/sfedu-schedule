import { RenderTable } from "/src/processes/RenderTable";
import { ShowVPK } from "/src/widgets/ShowVPK";
import MainColumns from "/src/shared/ui/MainColumns/MainColumns";
import { Calendar } from "/src/entities/Calendar";
import {
  SearchSchedule,
  useFetchGroupByWeekQuery,
} from "/src/features/SearchSchedule";
import { UpcomingLessons } from "/src/entities/UpcomingLessons";
import { useToast } from "@chakra-ui/react";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { useSearchParams } from "react-router-dom";
import {
  SAVED_SCHEDULE,
  USER_GROUP,
} from "/src/shared/const/localStorage/localStorageKeys";
import { useEffect } from "react";
import { IScheduleTable, tableActions } from "/src/entities/ScheduleTable";
import { TOAST_NO_INTERNET } from "/src/shared/const/toast/toast";
import { useSelector } from "react-redux";
import { StateSchema } from "/src/app/Providers";

const isUserOnline = navigator.onLine;

const savedUserSchedule = JSON.parse(
  localStorage.getItem(SAVED_SCHEDULE) || "{}",
) as IScheduleTable;

const MainPage = () => {
  const toast = useToast();
  const { week } = useCurrentWeek();
  const dispatch = useAppDispatch();
  const [queryParameters] = useSearchParams();
  const userGroup = JSON.parse(localStorage.getItem(USER_GROUP) || "{}");
  const { data } = useFetchGroupByWeekQuery({
    group: queryParameters.get("group") || userGroup?.groupId || "",
    week: week,
  });
  const vpkData = useSelector((state: StateSchema) => state.selectVPK.VPKData);

  useEffect(() => {
    if (data?.table?.group) {
      dispatch(tableActions.setSchedule(data));
      mergeVPKAndSchedule();
    }
  }, [data]);

  const mergeVPKAndSchedule = () => {
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
        },
      );
      dispatch(tableActions.mergeScheduleAndVPK(header.concat(mergedSchedule)));
    }
  };

  useEffect(() => {
    if (!isUserOnline) {
      toast(TOAST_NO_INTERNET);
      if (savedUserSchedule?.table?.group) {
        dispatch(tableActions.setSchedule(savedUserSchedule));
      }
    }
  }, []);

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

  return (
    <>
      {renderColumnsByViewPort()}
      <RenderTable />
      <ShowVPK />
    </>
  );
};

export default MainPage;
