import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pagina's
import Dashboard from "./pages/DashboardB.jsx";
import Postbrievenbus from "./pages/Postbrievenbus.jsx";
import Verzending from "./pages/Verzending.jsx";
import VerzendingDetail from "./pages/VerzendingDetail.jsx";
import Rapportages from "./pages/Rapportages.jsx";
import Instellingen from "./pages/Instellingen.jsx";

export default function App() {
  // Tijdelijke “fake user” voor nu
  const fakeUser = {
    email: "demo@morends.com",
    name: "Demo gebruiker",
  };

  const handleLogout = () => {
    // Later koppelen we dit aan Supabase auth.signOut()
    console.log("Logout (demo) geklikt");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Hoofd-dashboard */}
        <Route
          path="/"
          element={<Dashboard user={fakeUser} onLogout={handleLogout} />}
        />

        {/* Postbrievenbus overzicht */}
        <Route path="/postbrievenbus" element={<Postbrievenbus />} />

        {/* Verzendingen overzicht + details */}
        <Route path="/verzending" element={<Verzending />} />
        <Route path="/verzending/:id" element={<VerzendingDetail />} />

        {/* Rapportages */}
        <Route path="/rapportages" element={<Rapportages />} />

        {/* Instellingen */}
        <Route path="/instellingen" element={<Instellingen />} />
      </Routes>
    </BrowserRouter>
  );
}













