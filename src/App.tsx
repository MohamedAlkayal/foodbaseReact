import "./App.css";
import Home from "./pages/home";
import Login from "./pages/Login";
import Group from "./pages/Group";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import GuestRoutes from "./guards/GuestRoutes";
import PrivateRoutes from "./guards/PrivateRoutes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route element={<PrivateRoutes />}>
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/group"} element={<Group />} />
        </Route>
        <Route element={<GuestRoutes />}>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
