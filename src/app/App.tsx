import { Suspense } from "react";

import { Header } from "/src/widgets/Header";
import { ScheduleTable } from "/src/entities/ScheduleTable";
import { SearchSchedule } from "/src/features/SearchSchedule";
import Loader from "/src/shared/ui/Loader/Loader";
import MainColumns from "/src/shared/ui/MainColumns/MainColumns";
import { Calendar } from "/src/entities/Calendar";
import { ShowVPK } from "/src/widgets/ShowVPK";

const isUserOnline = navigator.onLine;

function App() {
  const renderColumnsByViewPort = () => {
    if (window.screen.width > 768)
      return (
        <MainColumns>
          <Calendar />
          <SearchSchedule />
        </MainColumns>
      );
    return <SearchSchedule />;
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="App">
        <Header />
        {renderColumnsByViewPort()}
        {/*window.screen.width > 768 ? <ScheduleTable /> : <ScheduleCardsList /> */}
        <ScheduleTable />
        <ShowVPK />
      </div>
    </Suspense>
  );
}

export default App;
