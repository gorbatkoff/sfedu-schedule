import { useCallback, useState } from "react";

import { Header } from "/src/widgets/Header";
import { ScheduleTable } from "/src/widgets/Table";
import { IScheduleTable } from "/src/entities/ScheduleTable";
import { SearchSchedule } from "/src/features/SearchSchedule";
import { ScheduleCardsList } from "/src/widgets/ScheduleCardsList";
import { defaultValue } from "/src/shared/const";
import useCurrentWeek from "/src/shared/hooks/useCurrentWeek";

function App() {
  const [finishedTable, setFinishedTable] =
    useState<IScheduleTable>(defaultValue);

  const updateData = useCallback((data: IScheduleTable) => {
    setFinishedTable(data);
  }, []);

  const renderTableByViewPort = () => {
    if (window.screen.width > 600)
      return <ScheduleTable schedule={finishedTable} updateData={updateData} />;
    return <ScheduleCardsList schedule={finishedTable} updateData={updateData}/>;
  };

  return (
    <div className="App">
      <Header />
      <SearchSchedule updateData={updateData} />
      {renderTableByViewPort()}
    </div>
  );
}

export default App;
