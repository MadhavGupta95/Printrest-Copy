import { Route, Routes } from "react-router";
import "./index.css";
import React, { useEffect } from "react";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/auth";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="*"
          element={<p style={{ color: "crimson" }}>404 NOT FOUND</p>}
        ></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
      </Routes>
    </>
  );
}

export default App;
