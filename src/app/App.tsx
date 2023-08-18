import { useCallback, useEffect, useState } from "react";

import { Header } from "/src/widgets/Header";
import { ScheduleTable } from "/src/widgets/Table";
import { IScheduleTable } from "/src/entities/ScheduleTable";
import { SearchSchedule } from "/src/features/SearchSchedule";
import { ScheduleCardsList } from "/src/widgets/ScheduleCardsList";

function App() {
  const [finishedTable, setFinishedTable] = useState<IScheduleTable>({
    table: {
      group: "",
      link: "",
      name: "",
      table: [],
      type: "",
      week: 0,
    },
    weeks: [],
  });

  const updateData = useCallback((data: IScheduleTable) => {
    setFinishedTable(data);
  }, []);

  const renderTableByViewPort = () => {
    if (window.screen.width > 600)
      return <ScheduleTable schedule={finishedTable} updateData={updateData} />;
    return <ScheduleCardsList schedule={finishedTable} />;
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
