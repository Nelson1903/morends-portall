import React from 'react';
import { Link } from 'react-router-dom';

const zendingenData = [
  {
    tracking: 'SR-2025-001',
    klant: 'Souvenir Shop Paramaribo',
    bestemming: 'Suriname',
    status: 'In behandeling',
  },
  {
    tracking: 'ABC-2025-014',
    klant: 'Boutique Aruba',
    bestemming: 'Aruba',
    status: 'Verzonden',
  },
  {
    tracking: 'CUR-2025-008',
    klant: 'Curaçao Cargo Services',
    bestemming: 'Curaçao',
    status: 'Aangekomen',
  },
];

function Verzendingen() {
  return (
    <div
      style={{
        padding: '2rem',
        background: '#f3f4f6',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ marginBottom: '1rem' }}>Verzendingen</h1>

      <p style={{ marginBottom: '1.5rem', color: '#4b5563' }}>
        Zendingen naar Suriname, ABC-eilanden en overige bestemmingen (dummy data).
      </p>

      <div
        style={{
          background: 'white',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          boxShadow: '0 10px 40px rgba(15, 23, 42, 0.08)',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Tracking</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Klant</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Bestemming</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {zendingenData.map((row) => (
              <tr key={row.tracking}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>{row.tracking}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>{row.klant}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>{row.bestemming}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.15rem 0.6rem',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor:
                        row.status === 'Verzonden'
                          ? '#dbeafe'
                          : row.status === 'Aangekomen'
                          ? '#dcfce7'
                          : '#fef3c7',
                      color:
                        row.status === 'Verzonden'
                          ? '#1e40af'
                          : row.status === 'Aangekomen'
                          ? '#166534'
                          : '#92400e',
                    }}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginTop: '1.5rem',
          color: '#2563eb',
          textDecoration: 'none',
          fontWeight: 500,
        }}
      >
        ← Terug naar dashboard
      </Link>
    </div>
  );
}

export default Verzendingen;



