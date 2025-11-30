import React from 'react';
import { Link } from 'react-router-dom';

const facturenData = [
  {
    nummer: 'FAC-2025-001',
    klant: 'Jansen Holding B.V.',
    bedrag: '€ 1.250,-',
    datum: '27-11-2025',
    status: 'Betaald',
  },
  {
    nummer: 'FAC-2025-014',
    klant: 'Souvenir Shop Paramaribo',
    bedrag: '€ 430,-',
    datum: '26-11-2025',
    status: 'Openstaand',
  },
  {
    nummer: 'FAC-2025-020',
    klant: 'Boutique Aruba',
    bedrag: '€ 980,-',
    datum: '25-11-2025',
    status: 'Verlopen',
  },
];

function Financien() {
  return (
    <div
      style={{
        padding: '2rem',
        background: '#f3f4f6',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ marginBottom: '1rem' }}>Financiën & Facturen</h1>

      <p style={{ marginBottom: '1.5rem', color: '#4b5563' }}>
        Facturen, betaalstatus en openstaande posten (dummy data).
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
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>Factuur</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>Klant</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>Bedrag</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>Datum</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {facturenData.map((row) => (
              <tr key={row.nummer}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>{row.nummer}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>{row.klant}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>{row.bedrag}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>{row.datum}</td>

                <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.15rem 0.6rem',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor:
                        row.status === 'Betaald'
                          ? '#dcfce7'
                          : row.status === 'Openstaand'
                          ? '#fef3c7'
                          : '#fee2e2',
                      color:
                        row.status === 'Betaald'
                          ? '#166534'
                          : row.status === 'Openstaand'
                          ? '#92400e'
                          : '#991b1b',
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

export default Financien;

