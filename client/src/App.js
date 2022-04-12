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
import StaffManagement from "./pages/StaffManagement";
import Messages from "./pages/Messages";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";

import "./App.css";
import Features from "./pages/Features";
import About from "./pages/About";
import FAQ from "./pages/FAQ";

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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:user/:token"
              element={<ResetPassword />}
            />
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
            <Route path="/staff-management" element={<StaffManagement />} />
            <Route path="/messages" element={<Messages />} />

            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </div>
    </NotificationsProvider>
  );
};

export default App;
