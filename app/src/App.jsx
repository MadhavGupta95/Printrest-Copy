import { Route, Routes } from "react-router";
import "./index.css";
import React from "react";
import Home from "./components/Home";
import { Toaster, toast } from "react-hot-toast";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </>
  );
}

export default App;
