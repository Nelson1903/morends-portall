import React from 'react';
import { Link } from 'react-router-dom';

function DashboardB() {
  return (
    <div className="dashboard-page">
      {/* Bovenbalk */}
      <header className="dashboard-topbar">
        <div className="dashboard-topbar-left">
          <div className="dashboard-logo-circle">M</div>
          <div className="dashboard-title">
            <h1>Morends Portal</h1>
            <p>Intern dashboard voor Morends B.V. – Rotterdam</p>
          </div>
        </div>

        <div className="dashboard-user">
          <span className="dashboard-user-name">Ingelogd: Nelson</span>
          <button className="dashboard-logout-button" type="button">
            Uitloggen
          </button>
        </div>
      </header>

      {/* Hoofdcontent */}
      <main className="dashboard-main">
        {/* Stat-kaarten bovenaan */}
        <section className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-label">Vandaag</span>
            <p className="stat-value">12 nieuwe zendingen</p>
            <p className="stat-caption">Laatste update: 10:32 uur</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Postbox</span>
            <p className="stat-value">34 actieve klanten</p>
            <p className="stat-caption">Morends Postbrievenbus</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Open taken</span>
            <p className="stat-value">7 nog te doen</p>
            <p className="stat-caption">Team & interne opvolging</p>
          </div>

          <div className="stat-card">
            <span className="stat-label">Notities</span>
            <p className="stat-value">Klik op een tegel</p>
            <p className="stat-caption">Open een module voor meer details</p>
          </div>
        </section>

        {/* Tegels */}
        <section className="dashboard-tiles">
          <Tile
            title="Postbrievenbus"
            description="Overzicht van alle postbox-klanten en inkomende post."
            status="Actief"
            statusVariant="green"
            to="/postbrievenbus"
          />

          <Tile
            title="Zendingen & Export"
            description="Boekingen, labels en status van zendingen naar Suriname en ABC."
            status="Actief"
            statusVariant="green"
            to="/verzendingen"
          />

          <Tile
            title="Magazijn & Voorraad"
            description="Binnengekomen pallets, dozen en locatie in het magazijn."
            status="In voorbereiding"
            statusVariant="yellow"
          />

          <Tile
            title="Financiën & Facturen"
            description="Facturen, betaalstatus en rapportages per klant / eiland."
            status="In voorbereiding"
            statusVariant="yellow"
            to="/financien"
          />

          <Tile
            title="Klantenservice"
            description="Klantencontact, vragen, klachten en terugbelverzoeken."
            status="Actief"
            statusVariant="green"
          />

          <Tile
            title="Team & Taken"
            description="Dagelijkse taken, overdrachten en planningen per medewerker."
            status="Actief"
            statusVariant="green"
          />
        </section>
      </main>
    </div>
  );
}

function Tile({ title, description, status, statusVariant, to }) {
  const content = (
    <>
      <div className="tile-header">
        <h2>{title}</h2>
        {status && (
          <span className={`tile-status tile-status-${statusVariant}`}>
            {status}
          </span>
        )}
      </div>
      <p className="tile-description">{description}</p>
      {to && <span className="tile-link">Openen</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className="dashboard-tile">
        {content}
      </Link>
    );
  }

  return <div className="dashboard-tile">{content}</div>;
}

export default DashboardB;







