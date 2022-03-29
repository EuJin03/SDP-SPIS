import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Meta from "./components/Meta";
import NavBar from "./components/NavBar";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Meta />
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
