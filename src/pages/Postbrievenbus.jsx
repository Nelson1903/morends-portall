// src/pages/Postbrievenbus.jsx
import React from "react";
import { Link } from "react-router-dom";

// Eenvoudige demo-data, alleen in deze file
const demoPostbussen = [
  {
    id: "PB-001",
    naam: "Postbus 1 – Morends Rotterdam",
    klant: "Morends B.V.",
    type: "Digitaal + Fysiek",
    status: "Actief",
    laatstBijgewerkt: "Vandaag, 09:12",
  },
  {
    id: "PB-002",
    naam: "Postbus 2 – Zakelijk klant",
    klant: "Caribbean Trading N.V.",
    type: "Digitaal",
    status: "Actief",
    laatstBijgewerkt: "Vandaag, 08:47",
  },
  {
    id: "PB-003",
    naam: "Postbus 3 – Particulier",
    klant: "J. Peters",
    type: "Fysiek",
    status: "Gepauzeerd",
    laatstBijgewerkt: "Gisteren, 16:03",
  },
  {
    id: "PB-004",
    naam: "Postbus 4 – Suriname route",
    klant: "Suriname Express",
    type: "Digitaal + Fysiek",
    status: "Actief",
    laatstBijgewerkt: "2 dagen geleden",
  },
];

export default function Postbrievenbus() {
  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Terug naar dashboard */}
        <Link
          to="/"
          className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900"
        >
          <span className="mr-1">←</span> Terug naar overzicht
        </Link>

        {/* Titel */}
        <div>
          <h1 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Postbrievenbus
          </h1>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Overzicht postbussen
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Demo-overzicht van postbussen. Later koppelen we dit scherm aan de
            database, net zoals bij de verzendingen.
          </p>
        </div>

        {/* Banner */}
        <div className="rounded-2xl bg-orange-500 px-6 py-4 text-sm font-medium text-white shadow-md">
          POSTBRIEVENBUS MODULE – DEMO DATA
        </div>

        {/* Tabel */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
            Postbussen
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-t border-slate-100 text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-medium uppercase text-slate-500">
                  <th className="px-6 py-3">Postbus</th>
                  <th className="px-6 py-3">Klant</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Laatst bijgewerkt</th>
                  <th className="px-6 py-3 text-right">Acties</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {demoPostbussen.map((box) => (
                  <tr key={box.id} className="hover:bg-slate-50/60">
                    <td className="px-6 py-4 align-top">
                      <div className="font-medium text-slate-900">
                        {box.naam}
                      </div>
                      <div className="text-xs text-slate-500">{box.id}</div>
                    </td>
                    <td className="px-6 py-4 align-top text-slate-700">
                      {box.klant}
                    </td>
                    <td className="px-6 py-4 align-top text-slate-700">
                      {box.type}
                    </td>
                    <td className="px-6 py-4 align-top">
                      <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
                        {box.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 align-top text-slate-700">
                      {box.laatstBijgewerkt}
                    </td>
                    <td className="px-6 py-4 align-top text-right space-x-2">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white hover:bg-slate-800"
                      >
                        Openen
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}










