// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  function nogNietActief(naam) {
    alert(`${naam} is nog niet actief. Deze module komt later beschikbaar.`);
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6">
      <div className="mx-auto max-w-6xl">
        {/* Bovenbalk met logo + titel */}
        <header className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Logo – bestand in /public/morends-logo.svg */}
            <img
  src="/morends-logo.png"
  alt="Morends"
  className="h-9 w-auto"
/>

            <div>
              <h1 className="text-xl font-semibold leading-tight text-slate-900">
                Morends Portal
              </h1>
              <p className="text-xs text-slate-500">
                Interne tools voor post, zendingen, financiën en rapportages.
              </p>
            </div>
          </div>
        </header>

        {/* Subtitel / uitleg */}
        <section className="mb-6">
          <h2 className="text-base font-medium text-slate-900">
            Overzicht modules
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Kies een onderdeel om te starten. Nieuwe modules kunnen later worden
            toegevoegd.
          </p>
        </section>

        {/* Tegels */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {/* Postbrievenbus – echte route */}
          <Link
            to="/postbrievenbus"
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#003366] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#003366]"
          >
            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              Postbrievenbus
            </h3>
            <p className="mb-4 text-xs text-slate-600">
              Overzicht van alle postbox-klanten en inkomende post.
            </p>
            <span className="mt-auto inline-flex items-center text-xs font-medium text-[#003366] group-hover:underline">
              Naar postbrievenbus →
            </span>
          </Link>

          {/* Verzendingen */}
          <button
            type="button"
            onClick={() => nogNietActief("Verzendingen")}
            className="flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              Verzendingen
            </h3>
            <p className="mb-3 text-xs text-slate-600">
              Zendingen naar Suriname, ABC-eilanden en overige bestemmingen.
            </p>
            <span className="mt-auto inline-flex items-center text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Binnenkort uitbreiden
            </span>
          </button>

          {/* Financiën */}
          <button
            type="button"
            onClick={() => nogNietActief("Financiën")}
            className="flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              Financiën
            </h3>
            <p className="mb-3 text-xs text-slate-600">
              Facturen, betalingen en overzicht van openstaande posten.
            </p>
            <span className="mt-auto inline-flex items-center text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Nog niet actief
            </span>
          </button>

          {/* Rapportages */}
          <button
            type="button"
            onClick={() => nogNietActief("Rapportages")}
            className="flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              Rapportages
            </h3>
            <p className="mb-3 text-xs text-slate-600">
              Korte dashboards en overzichten voor Morends.
            </p>
            <span className="mt-auto inline-flex items-center text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Nog in ontwikkeling
            </span>
          </button>

          {/* City Hub (DHL) */}
          <button
            type="button"
            onClick={() => nogNietActief("City Hub")}
            className="flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              City Hub (DHL)
            </h3>
            <p className="mb-3 text-xs text-slate-600">
              Toekomstige module voor DHL City Hub-planning en volumes.
            </p>
            <span className="mt-auto inline-flex items-center text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Conceptfase
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}




