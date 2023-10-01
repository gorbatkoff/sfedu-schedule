import { Suspense, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

import { Header } from "/src/widgets/Header";
import { ShowVPK } from "/src/widgets/ShowVPK";
import {
  SearchSchedule,
  useFetchGroupByWeekQuery,
} from "/src/features/SearchSchedule";
import { Calendar } from "/src/entities/Calendar";
import { IScheduleTable, tableActions } from "/src/entities/ScheduleTable";
import { UpcomingLessons } from "/src/entities/UpcomingLessons";
import Loader from "/src/shared/ui/Loader/Loader";
import MainColumns from "/src/shared/ui/MainColumns/MainColumns";
import { TOAST_NO_INTERNET } from "/src/shared/const/toast/toast";
import {
  SAVED_SCHEDULE,
  USER_GROUP,
} from "/src/shared/const/localStorage/localStorageKeys";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { RenderTable } from "/src/processes/RenderTable";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";

const isUserOnline = navigator.onLine;

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

const savedUserSchedule = JSON.parse(
  localStorage.getItem(SAVED_SCHEDULE) || "{}",
) as IScheduleTable;

const App = () => {
  const toast = useToast();
  const { week } = useCurrentWeek();
  const dispatch = useAppDispatch();
  const [queryParameters] = useSearchParams();
  const userGroup = JSON.parse(localStorage.getItem(USER_GROUP) || "{}");
  const { data } = useFetchGroupByWeekQuery({
    group: queryParameters.get("group") || userGroup?.groupId || "",
    week: week,
  });

  useEffect(() => {
    if (data?.table?.group) {
      dispatch(tableActions.setSchedule(data));
    }
  }, [data]);

  useEffect(() => {
    if (!isUserOnline) {
      toast(TOAST_NO_INTERNET);
      if (savedUserSchedule?.table?.group) {
        dispatch(tableActions.setSchedule(savedUserSchedule));
      }
    }
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <div className="App">
        <Header />
        {renderColumnsByViewPort()}
        <RenderTable />
        <ShowVPK />
      </div>
    </Suspense>
  );
};

export default App;
