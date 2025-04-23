import { Route, Routes } from "react-router";
import "./index.css";
import React from "react";
import Home from "./components/Home";
import { Toaster, toast } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
