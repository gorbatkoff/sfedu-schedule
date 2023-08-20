import { Suspense, useCallback, useState } from "react";

import { Header } from "/src/widgets/Header";
import { ScheduleTable } from "/src/widgets/Table";
import { IScheduleTable } from "/src/entities/ScheduleTable";
import { SearchSchedule } from "/src/features/SearchSchedule";
import { ScheduleCardsList } from "/src/widgets/ScheduleCardsList";
import { defaultValue } from "/src/shared/const";
import { DrawerMenu } from "/src/widgets/DrawerMenu";
import Loader from "/src/shared/ui/Loader/Loader";

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

  return (
    <Suspense fallback={<Loader />}>
      <div className="App">
        <Header />
        <SearchSchedule updateData={updateData} />
        {renderTableByViewPort()}
      </div>
    </Suspense>
  );
}

export default App;
