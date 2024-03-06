import "./App.css";
import Login from "./pages/Login";
import { Register } from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
