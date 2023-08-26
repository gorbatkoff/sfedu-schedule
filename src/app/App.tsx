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

function App() {
  const [finishedTable, setFinishedTable] =
    useState<IScheduleTable>(defaultValue);

  const updateData = useCallback((data: IScheduleTable) => {
    setFinishedTable(data);
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
      </div>
    </Suspense>
  );
}

export default App;
