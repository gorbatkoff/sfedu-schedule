import { Suspense, useEffect, useState } from "react";

import { Header } from "/src/widgets/Header";
import { ScheduleTable } from "/src/entities/Table";
import { SearchSchedule } from "/src/features/SearchSchedule";
import { ScheduleCardsList } from "/src/widgets/ScheduleCardsList";
import { defaultValue } from "/src/shared/const";
import Loader from "/src/shared/ui/Loader/Loader";
import MainColumns from "/src/shared/ui/MainColumns/MainColumns";
import { Calendar } from "/src/widgets/Calendar";
import { UpcomingLessons } from "/src/widgets/UpcomingLessons";
import { SelectVPK } from "/src/features/SelectVPK";
import { SAVED_SCHEDULE, USER_GROUP } from "/src/shared/const/localStorageKeys";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useAppDispatch } from "/src/shared/hooks/useAppDispatch";
import { tableActions } from "/src/entities/Table/model/slice/tableSlice";
import { useSelector } from "react-redux";
import StateSchema from "/src/app/Providers/StoreProvider/config/StateSchema";
import { IScheduleTable } from "/src/entities/Table/model/types/Table";

const isUserOnline = navigator.onLine;

console.log(isUserOnline);

function App() {
  const [finishedTable, setFinishedTable] =
    useState<IScheduleTable>(defaultValue);
  const { week } = useCurrentWeek();
  const toast = useToast();
  const [showVPKGroups, setShowVPKGroups] = useState(false);
  /*  const updateData = (data: IScheduleTable) => {
    setFinishedTable(data);
  };

  useEffect(() => {
    const userGroup = JSON.parse(localStorage.getItem(USER_GROUP) || "{}");

    if (
      finishedTable.table?.name === userGroup.name &&
      finishedTable.table?.week === week
    ) {
      localStorage.setItem(SAVED_SCHEDULE, JSON.stringify(finishedTable));
    }
  }, [updateData]);*/

  /*  useEffect(() => {
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
*/
  const renderTableByViewPort = () => {
    if (window.screen.width > 768) return <ScheduleTable />;
    return <ScheduleCardsList />;
  };

  const renderColumnsByViewPort = () => {
    if (window.screen.width > 768)
      return (
        <MainColumns>
          <SearchSchedule />
          <Calendar />
          <UpcomingLessons />
        </MainColumns>
      );
    return <SearchSchedule />;
  };

  const dispatch = useAppDispatch();
  const schedule = useSelector((state: StateSchema) => state.schedule);

  return (
    <Suspense fallback={<Loader />}>
      <div className="App">
        <Header />

        {renderColumnsByViewPort()}
        {renderTableByViewPort()}

        {/*
        {!showVPKGroups && (
          <Box
            sx={{ display: "flex", justifyContent: "center", margin: "1em" }}
          >
            <Button sx={{ m: 2 }} onClick={() => setShowVPKGroups(true)}>
              Выбрать ВПК
            </Button>
          </Box>
        )}
        <Suspense fallback={<Loader />}>
          {showVPKGroups && (
            <SelectVPK schedule={finishedTable} updateData={updateData} />
          )}
        </Suspense>*/}
      </div>
    </Suspense>
  );
}

export default App;
