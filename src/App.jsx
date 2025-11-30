// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Postbrievenbus from "./pages/Postbrievenbus";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/postbrievenbus" element={<Postbrievenbus />} />
      </Routes>
    </BrowserRouter>
  );
}






