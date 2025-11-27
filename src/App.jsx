import './App.css';

const tiles = [
  {
    id: 1,
    title: 'Postbrievenbus',
    description: 'Overzicht van alle postbox-klanten en inkomende post.',
    status: 'Actief',
  },
  {
    id: 2,
    title: 'Zendingen & Export',
    description: 'Boekingen, labels en status van zendingen naar Suriname en ABC.',
    status: 'Actief',
  },
  {
    id: 3,
    title: 'Magazijn & Voorraad',
    description: 'Binnengekomen pallets, dozen en locatie in het magazijn.',
    status: 'In voorbereiding',
  },
  {
    id: 4,
    title: 'Financiën & Facturen',
    description: 'Facturen, betaalstatus en rapportages per klant / eiland.',
    status: 'In voorbereiding',
  },
  {
    id: 5,
    title: 'Klantenservice',
    description: 'Klantencontact, vragen, klachten en terugbelverzoeken.',
    status: 'Actief',
  },
  {
    id: 6,
    title: 'Team & Taken',
    description: 'Dagelijkse taken, overdrachten en planningen per medewerker.',
    status: 'Actief',
  },
]

function App() {
  return (
    <div className="portal">
      <header className="portal-header">
        <div className="portal-logo">
          <span>M</span>
        </div>
        <div className="portal-header-text">
          <h1>Morends Portal</h1>
          <p>Intern dashboard voor Morends B.V. – Rotterdam</p>
        </div>
        <div className="portal-user">
          <span className="portal-user-name">Ingelogd: Nelson</span>
          <button className="portal-button-secondary">Uitloggen</button>
        </div>
      </header>

      <main className="portal-main">
        <section className="portal-summary">
          <div className="summary-block">
            <p className="summary-label">Vandaag</p>
            <p className="summary-value">12 nieuwe zendingen</p>
          </div>
          <div className="summary-block">
            <p className="summary-label">Postbox</p>
            <p className="summary-value">34 actieve klanten</p>
          </div>
          <div className="summary-block">
            <p className="summary-label">Open taken</p>
            <p className="summary-value">7 nog te doen</p>
          </div>
          <div className="summary-block">
            <p className="summary-label">Notities</p>
            <p className="summary-value">Klik op een tegel om te openen</p>
          </div>
        </section>

        <section className="portal-grid">
          {tiles.map((tile) => (
            <article key={tile.id} className="portal-tile">
              <h2>{tile.title}</h2>
              <p className="tile-description">{tile.description}</p>
              <p
                className={
                  'tile-status ' +
                  (tile.status === 'Actief' ? 'tile-status-active' : 'tile-status-pending')
                }
              >
                {tile.status}
              </p>
              <button className="portal-button-primary">Openen</button>
            </article>
          ))}
        </section>
      </main>

      <footer className="portal-footer">
        <span>© {new Date().getFullYear()} Morends B.V. • Rotterdam</span>
        <span>Versie 1.0 – interne testomgeving</span>
      </footer>
    </div>
  )
}

export default App

