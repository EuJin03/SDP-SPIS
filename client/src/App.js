import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Meta from "./components/Meta";
import { NotificationsProvider } from "@mantine/notifications";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Assignment from "./pages/Assignment";

import "./App.css";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <NotificationsProvider>
      <div className="App">
        <Router>
          <Meta />
          <SideBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user-profile" element={<Profile />} />
            <Route path="/assignments" element={<Assignment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </div>
    </NotificationsProvider>
  );
};

export default App;
