import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "/src/widgets/Header";
import { MainPage } from "/src/pages/MainPage";
import { LeaveFeedbackPage } from "/src/pages/LeaveFeedback";
import Loader from "/src/shared/ui/Loader/Loader";
import { ThankYouPage } from "/src/pages/ThankYouPage";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="App">
        <Header />
        <Routes>
          <Route element={<MainPage />} path="*" />
          <Route element={<ThankYouPage />} path="thanks-page" />
          <Route element={<LeaveFeedbackPage />} path="/leave-feedback" />
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
