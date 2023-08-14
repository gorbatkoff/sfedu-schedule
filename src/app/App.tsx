import { Header } from "/src/widgets/Header/ui/Header";
import { SearchSchedule } from "/src/features/SearchSchedule/ui/SearchSchedule";
import { ScheduleTable } from "/src/widgets/Table/ui/ScheduleTable";

function App() {
  return (
    <div className="App">
      <Header />
      <SearchSchedule />
      <ScheduleTable />
    </div>
  );
}

export default App;
