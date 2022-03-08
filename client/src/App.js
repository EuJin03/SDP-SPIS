import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Meta from "./components/Meta";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Meta />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
