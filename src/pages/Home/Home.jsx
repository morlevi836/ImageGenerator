import { Route, Routes } from "react-router-dom";
import "./Home.css";
import SearchPage from "../SearchPage/SearchPage";
import HomePage from "./../HomePage/HomePage";
import FavoritePage from "./../FavoritePage/FavoritePage";
import LoginPage from "./../LoginPage/LoginPage";
import NotFound from "./../NotFound/NotFound";
import RegisterPage from "./../RegisterPage/RegisterPage";
import Dashboard from "./../Dashboard/Dashboard";

function Home() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
export default Home;
