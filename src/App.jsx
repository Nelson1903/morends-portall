// src/App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Postbrievenbus from './pages/Postbrievenbus.jsx';
import Verzendingen from './pages/Verzendingen.jsx';
import Financien from './pages/Financien.jsx';
import Rapportages from './pages/Rapportages.jsx';


function App() {
  return (
    <div>
      {/* bovenbalk */}
      <header
        style={{
          background: '#003366',
          color: 'white',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontWeight: 'bold' }}>Morends Portal</div>
        <nav style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Dashboard
          </Link>
          <Link to="/postbrievenbus" style={{ color: 'white', textDecoration: 'none' }}>
            Postbrievenbus
          </Link>
          <Link to="/verzendingen" style={{ color: 'white', textDecoration: 'none' }}>
            Verzendingen
          </Link>
          <Link to="/financien" style={{ color: 'white', textDecoration: 'none' }}>
            Financiën
          </Link>
          <Link to="/rapportages" style={{ color: 'white', textDecoration: 'none' }}>
            Rapportages
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/postbrievenbus" element={<Postbrievenbus />} />
        <Route path="/verzendingen" element={<Verzendingen />} />
        <Route path="/financien" element={<Financien />} />
        <Route path="/rapportages" element={<Rapportages />} />
      </Routes>
    </div>
  );
}

export default App;


