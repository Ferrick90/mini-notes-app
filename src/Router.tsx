import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
