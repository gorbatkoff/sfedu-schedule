import { Suspense } from "react";

import { Route, Routes } from "react-router-dom";

import { LeaveFeedbackPage } from "/src/pages/LeaveFeedback";
import { MainPage } from "/src/pages/MainPage";
import { ThankYouPage } from "/src/pages/ThankYouPage";

import { Header } from "/src/widgets/Header";

import Loader from "/src/shared/ui/Loader/Loader";

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
