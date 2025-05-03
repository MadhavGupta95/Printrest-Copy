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
import CreatePost from "./components/posts/CreatePost";
import ViewImage from "./components/posts/ViewImage";
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
        <Route path="/reset-password/:token" element={<ResetPassword />}></Route>
        <Route path="/createPost" element={<CreatePost />}></Route>
        <Route path="/viewImage/:_id" element={<ViewImage />}></Route>
      </Routes>
    </>
  );
}

export default App;
