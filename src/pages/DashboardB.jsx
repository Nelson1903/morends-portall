// src/pages/DashboardB.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardB({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-8">
      {/* Header */}
      <header className="mx-auto max-w-6xl mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Morends Portal
          </h1>
          <p className="text-sm text-slate-600">
            Intern dashboard voor Morends B.V. – Rotterdam
          </p>
          {user?.email && (
            <p className="mt-1 text-xs text-slate-500">
              Ingelogd als: <span className="font-medium">{user.email}</span>
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800"
        >
          Afmelden
        </button>
      </header>

      <main className="mx-auto max-w-6xl space-y-8">
        {/* Tegels */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
            Modules
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Postbrievenbus */}
            <button
              type="button"
              onClick={() => navigate("/postbrievenbus")}
              className="group flex flex-col items-start justify-between rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm hover:border-slate-300 hover:shadow-md transition"
            >
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Postbrievenbus
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  Beheer postbussen
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Ingekomen post, digitale en fysieke postbussen.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center text-xs font-medium text-slate-700 group-hover:text-slate-900">
                Openen
                <span className="ml-1">→</span>
              </span>
            </button>

            {/* Verzendingen */}
            <button
              type="button"
              onClick={() => navigate("/verzending")}
              className="group flex flex-col items-start justify-between rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm hover:border-slate-300 hover:shadow-md transition"
            >
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Verzendingen
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  Zendingen & status
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Overzicht van alle zendingen, routes en statussen.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center text-xs font-medium text-slate-700 group-hover:text-slate-900">
                Openen
                <span className="ml-1">→</span>
              </span>
            </button>

            {/* Rapportages */}
            <button
              type="button"
              onClick={() => navigate("/rapportages")}
              className="group flex flex-col items-start justify-between rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm hover:border-slate-300 hover:shadow-md transition"
            >
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Rapportages
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  Overzicht & KPI&apos;s
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Basale rapportages voor operationele sturing.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center text-xs font-medium text-slate-700 group-hover:text-slate-900">
                Openen
                <span className="ml-1">→</span>
              </span>
            </button>

            {/* Instellingen */}
            <button
              type="button"
              onClick={() => navigate("/instellingen")}
              className="group flex flex-col items-start justify-between rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm hover:border-slate-300 hover:shadow-md transition"
            >
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Instellingen
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  Portal & gebruikers
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Basisinstellingen en gebruikersbeheer (in opbouw).
                </p>
              </div>
              <span className="mt-4 inline-flex items-center text-xs font-medium text-slate-700 group-hover:text-slate-900">
                Openen
                <span className="ml-1">→</span>
              </span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}




