// src/pages/Dashboard.jsx
import { useNavigate } from 'react-router-dom';

const tiles = [
  {
    id: 1,
    title: 'Postbrievenbus',
    description: 'Overzicht van alle postbox-klanten en inkomende post.',
    path: '/postbrievenbus',
  },
  {
    id: 2,
    title: 'Verzendingen',
    description: 'Zendingen naar Suriname, ABC-eilanden en overige bestemmingen.',
    path: '/verzendingen',
  },
  {
    id: 3,
    title: 'Financiën',
    description: 'Facturen, betalingen en overzicht van openstaande posten.',
    path: '/financien',
  },
  {
    id: 4,
    title: 'Rapportages',
    description: 'Korte dashboards en overzichten voor Morends.',
    path: '/rapportages',
  },
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="app-root" style={{ minHeight: '100vh', padding: '2rem', background: '#f3f4f6' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Morends Portal</h1>

      <div
        className="tile-grid"
        style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}
      >
        {tiles.map((tile) => (
          <div
            key={tile.id}
            onClick={() => navigate(tile.path)}
            style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
              border: '1px solid #e5e7eb',
              cursor: 'pointer',
            }}
          >
            <h2 style={{ marginBottom: '0.5rem' }}>{tile.title}</h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563' }}>{tile.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

