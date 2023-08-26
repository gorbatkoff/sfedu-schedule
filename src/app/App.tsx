import { Suspense, useCallback, useEffect, useState } from "react";

import { Header } from "/src/widgets/Header";
import { ScheduleTable } from "/src/widgets/Table";
import { IScheduleTable } from "/src/entities/ScheduleTable";
import { SearchSchedule } from "/src/features/SearchSchedule";
import { ScheduleCardsList } from "/src/widgets/ScheduleCardsList";
import { defaultValue } from "/src/shared/const";
import Loader from "/src/shared/ui/Loader/Loader";
import MainColumns from "/src/shared/MainColumns/MainColumns";
import { Calendar } from "/src/widgets/Calendar";
import { UpcomingLessons } from "/src/widgets/UpcomingLessons";
import { SelectVPK } from "/src/features/SelectVPK";
import { SAVED_SCHEDULE, USER_GROUP } from "/src/shared/const/localStorageKeys";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";
import { useToast } from "@chakra-ui/react";

const isUserOnline = navigator.onLine;

console.log(isUserOnline);

function App() {
  const [finishedTable, setFinishedTable] =
    useState<IScheduleTable>(defaultValue);
  const { week } = useCurrentWeek();
  const toast = useToast();
  const updateData = (data: IScheduleTable) => {
    setFinishedTable(data);
  };

  useEffect(() => {
    const userGroup = JSON.parse(localStorage.getItem(USER_GROUP) || "{}");

    if (
      finishedTable.table.name === userGroup.userGroup &&
      finishedTable.table.week === week
    ) {
      localStorage.setItem(SAVED_SCHEDULE, JSON.stringify(finishedTable));
    }
  }, [updateData]);

  useEffect(() => {
    const savedSchedule = JSON.parse(
      localStorage.getItem(SAVED_SCHEDULE) || "{}",
    );

    if (Object.keys(savedSchedule).length === 0) return;

    if (savedSchedule) {
      setFinishedTable(savedSchedule);
    }

    if (!isUserOnline) {
      toast({
        title: "Нет интернета!",
        description: "Показано сохраненное расписание вашей группы :)",
        status: "warning",
        duration: 6000,
        isClosable: true,
      });
    }
  }, []);

  const renderTableByViewPort = () => {
    if (window.screen.width > 600)
      return <ScheduleTable schedule={finishedTable} updateData={updateData} />;
    return (
      <ScheduleCardsList schedule={finishedTable} updateData={updateData} />
    );
  };

  const renderColumnsByViewPort = () => {
    if (window.screen.width > 600)
      return (
        <MainColumns>
          <Calendar />
          <SearchSchedule updateData={updateData} />
          <UpcomingLessons updateData={updateData} />
        </MainColumns>
      );
    return <SearchSchedule updateData={updateData} />;
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="App">
        <Header updateData={updateData} />

        {renderColumnsByViewPort()}
        {renderTableByViewPort()}
        <SelectVPK schedule={finishedTable} updateData={updateData} />
      </div>
    </Suspense>
  );
}

export default App;
