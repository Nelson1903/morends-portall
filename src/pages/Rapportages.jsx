import React from 'react';
import { Link } from 'react-router-dom';

function Rapportages() {
  const kaarten = [
    {
      titel: 'Actieve postbox-klanten',
      waarde: '34',
      subtitel: 'Morends Postbrievenbus',
    },
    {
      titel: 'Zendingen deze maand',
      waarde: '128',
      subtitel: 'Suriname & ABC-eilanden',
    },
    {
      titel: 'Openstaande facturen',
      waarde: '€ 3.450,-',
      subtitel: 'Nog te incasseren',
    },
  ];

  const laatsteRapporten = [
    {
      naam: 'Maandrapport Suriname',
      datum: '01-11-2025',
      status: 'Gegenereerd',
    },
    {
      naam: 'ABC-eilanden omzetrapport',
      datum: '28-10-2025',
      status: 'Gedeeld',
    },
    {
      naam: 'Openstaande Postbox-facturen',
      datum: '25-10-2025',
      status: 'Concept',
    },
  ];

  return (
    <div
      style={{
        padding: '2rem',
        background: '#f3f4f6',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ marginBottom: '1rem' }}>Rapportages</h1>

      <p style={{ marginBottom: '1.5rem', color: '#4b5563' }}>
        Korte dashboards en overzichten voor Morends (dummy data).
      </p>

      {/* Bovenste rij met 3 kaarten */}
      <div
        style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          marginBottom: '2rem',
        }}
      >
        {kaarten.map((card) => (
          <div
            key={card.titel}
            style={{
              background: 'white',
              borderRadius: '0.75rem',
              padding: '1.25rem 1.5rem',
              boxShadow: '0 10px 40px rgba(15, 23, 42, 0.06)',
            }}
          >
            <p
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#6b7280',
                marginBottom: '0.4rem',
              }}
            >
              {card.titel}
            </p>
            <p
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '0.25rem',
              }}
            >
              {card.waarde}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              {card.subtitel}
            </p>
          </div>
        ))}
      </div>

      {/* Tabel met laatste rapporten */}
      <div
        style={{
          background: 'white',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          boxShadow: '0 10px 40px rgba(15, 23, 42, 0.08)',
        }}
      >
        <h2
          style={{
            fontSize: '1rem',
            marginBottom: '1rem',
          }}
        >
          Laatst gemaakte rapporten
        </h2>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>
                Rapport
              </th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>
                Datum
              </th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {laatsteRapporten.map((row) => (
              <tr key={row.naam}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                  {row.naam}
                </td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                  {row.datum}
                </td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.15rem 0.6rem',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: '#e0ecff',
                      color: '#1d4ed8',
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

export default Rapportages;

