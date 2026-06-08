import React from "react";
import Home from "./components/Home.tsx";
import Navbar from "./components/Navbar.tsx";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout.tsx";
import Signup from "./components/Signup.tsx";
import Login from "./components/Login.tsx";
import VerifyEmail from "./components/VerifyEmail.tsx";
import Todo from "./components/Todo.tsx";
import PubLayout from "./components/PubLayout.tsx";
import { ToastContainer, toast } from "react-toastify";
import "./api2.ts";
import NotFound from "./components/NotFound.tsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PubLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/todos" element={<Todo />} />
          <Route path="/todos/status/:status" element={<Todo />} />
          <Route path="/todos/priority/:priority" element={<Todo />} />
        </Route>
      </Routes>


      <ToastContainer />
    </>
  );
};

export default App;
