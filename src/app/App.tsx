import { Suspense } from "react";

import { Route, Routes } from "react-router-dom";

import { LeaveFeedbackPage } from "/src/pages/LeaveFeedback";
import { MainPage } from "/src/pages/MainPage";
import ReleaseNotesPage from "/src/pages/ReleaseNotesPage/ui/ReleaseNotesPage";
import { ThankYouPage } from "/src/pages/ThankYouPage";

import { RenderFooter } from "/src/processes/RenderFooter";

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
          <Route element={<ReleaseNotesPage />} path="/release" />
        </Routes>
        <RenderFooter />
      </div>
    </Suspense>
  );
};

export default App;
