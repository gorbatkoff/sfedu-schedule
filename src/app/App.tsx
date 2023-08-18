import { Header } from "/src/widgets/Header/ui/Header";
import { SearchSchedule } from "/src/features/SearchSchedule/ui/SearchSchedule";
import { ScheduleTable } from "/src/widgets/Table/ui/ScheduleTable";
import { ScheduleCardsList } from "/src/widgets/ScheduleCardsList/ui/ScheduleCardsList";
import { useState } from "react";
import { IScheduleTable } from "/src/entities/ScheduleTable/model/types/ScheduleTable";

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

  const updateData = (data: IScheduleTable) => {
    setFinishedTable(data);
  };

  return (
    <div className="App">
      <Header />
      <SearchSchedule updateData={updateData} />
      {window.screen.width > 600 ? (
        <ScheduleTable schedule={finishedTable} />
      ) : (
          <ScheduleCardsList schedule={finishedTable}/>
      )}
    </div>
  );
}

export default App;
