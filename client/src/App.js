import "./App.css";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Home from "./Home";
import ChangePass from "./ChangePass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/ChangePass" element={<ChangePass />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
