// src/pages/Postbrievenbus.jsx

function Postbrievenbus() {
  return (
    <div style={{ padding: '2rem', background: '#f3f4f6', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '1rem' }}>Postbrievenbus</h1>
      <p style={{ marginBottom: '1.5rem', color: '#4b5563' }}>
        Overzicht van postbox-klanten en inkomende post (dummy data, later koppelen we dit aan echte data).
      </p>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          background: 'white',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
        }}
      >
        <thead style={{ background: '#e5e7eb' }}>
          <tr>
            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Postbox nr.</th>
            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Klantnaam</th>
            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Laatste zending</th>
            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '0.75rem', borderTop: '1px solid #e5e7eb' }}>PB-001</td>
            <td style={{ padding: '0.75rem', borderTop: '1px solid #e5e7eb' }}>J. Fernandes</td>
            <td style={{ padding: '0.75rem', borderTop: '1px solid #e5e7eb' }}>23-11-2025</td>
            <td style={{ padding: '0.75rem', borderTop: '1px solid #e5e7eb' }}>Gereed voor ophalen</td>
          </tr>
          <tr>
            <td style={{ padding: '0.75rem', borderTop: '1px solid #e5e7eb' }}>PB-002</td>
            <td style={{ padding: '0.75rem', borderTop: '1px solid #e5e7eb' }}>M. Leeflang</td>
            <td style={{ padding: '0.75rem', borderTop: '1px solid #e5e7eb' }}>21-11-2025</td>
            <td style={{ padding: '0.75rem', borderTop: '1px solid #e5e7eb' }}>Onderweg naar Suriname</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Postbrievenbus;

