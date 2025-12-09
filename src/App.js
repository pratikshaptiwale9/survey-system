import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CreateSurvey from "./components/CreateSurvey";
import ViewSurvey from "./components/ViewSurvey";
import ViewParticipants from "./components/ViewParticipants";
import ManageSurveyor from "./components/ManageSurveyor";
import Analysis from "./components/Analysis";
import Settings from "./components/Settings";

function App() {
  return (
    <Router>
      <Routes>
        {/* 👇 Default route - Login page first */}
        <Route path="/" element={<Login />} />

        {/* 👇 After login */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-survey" element={<CreateSurvey />} />
        <Route path="/view-survey" element={<ViewSurvey />} />
        <Route path="/view-participants" element={<ViewParticipants />} />
        <Route path="/manage-surveyor" element={<ManageSurveyor />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
