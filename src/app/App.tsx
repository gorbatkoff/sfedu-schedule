import { Header } from "/src/widgets/Header/ui/Header";
import { SearchSchedule } from "/src/features/SearchSchedule/ui/SearchSchedule";
import { ScheduleTable } from "/src/widgets/Table/ui/ScheduleTable";
import { ScheduleCardsList } from "/src/widgets/ScheduleCardsList/ui/ScheduleCardsList";

function App() {
  return (
    <div className="App">
      <Header />
      <SearchSchedule />

      {window.screen.width > 600 ? <ScheduleTable /> : <ScheduleCardsList />}
    </div>
  );
}

export default App;
