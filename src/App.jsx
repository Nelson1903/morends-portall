// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

// Pagina's
import Dashboard from "./pages/Dashboard.jsx";
import Postbrievenbus from "./pages/Postbrievenbus.jsx";
import Verzendingen from "./pages/Verzendingen.jsx";
import Financien from "./pages/Financien.jsx";
import Rapportages from "./pages/Rapportages.jsx";
import DashboardB from "./pages/DashboardB.jsx"; // extra versie van het dashboard

function App() {
  return (
    <Router>
      <Routes>
        {/* Hoofd-dashboard (tegels) */}
        <Route path="/" element={<Dashboard />} />

        {/* Tweede dashboard-versie (B) */}
        <Route path="/dashboardb" element={<DashboardB />} />

        {/* Overige pagina's */}
        <Route path="/postbrievenbus" element={<Postbrievenbus />} />
        <Route path="/verzendingen" element={<Verzendingen />} />
        <Route path="/financien" element={<Financien />} />
        <Route path="/rapportages" element={<Rapportages />} />
      </Routes>
    </Router>
  );
}

export default App;




