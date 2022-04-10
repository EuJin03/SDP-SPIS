import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Meta from "./components/Meta";
import { NotificationsProvider } from "@mantine/notifications";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Assignment from "./pages/Assignment";
import Resource from "./pages/Resource";
import Course from "./pages/Course";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ResourceCreate from "./pages/ResourceCreate";
import AssignmentCreate from "./pages/AssignmentCreate";
import AssignmentDetails from "./pages/AssignmentDetails";

import "./App.css";

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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/forgot-password" />
            <Route path="/reset-password/:token" /> */}
            <Route path="/assignments" element={<Assignment />} />
            <Route
              path="/assignments/:courseId/create"
              element={<AssignmentCreate />}
            />
            <Route path="/assignments/grade" element={<AssignmentDetails />} />
            <Route path="/resources" element={<Resource />} />
            <Route
              path="/resources/:courseId/create"
              element={<ResourceCreate />}
            />
            <Route path="/courses" element={<Course />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </div>
    </NotificationsProvider>
  );
};

export default App;
