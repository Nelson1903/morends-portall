import React from "react";
import { postbussenDemo } from "../postbussenDemo";

export default function Postbrievenbus() {
  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Titel */}
        <div>
          <h1 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Postbrievenbus
          </h1>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Beheer postbussen (demo)
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Dit is een demo-overzicht van digitale en fysieke postbussen binnen
            Morends.
          </p>
        </div>

        {/* Tabel met postbussen */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">
                  ID
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">
                  Naam
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">
                  Actie
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {postbussenDemo.map((box) => (
                <tr key={box.id}>
                  <td className="px-4 py-3 text-slate-900">{box.id}</td>
                  <td className="px-4 py-3 text-slate-900">{box.naam}</td>
                  <td className="px-4 py-3 text-slate-900">{box.type}</td>
                  <td className="px-4 py-3 text-slate-900">{box.status}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => alert("Bijwerken (demo)")}
                      className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white hover:bg-slate-800"
                    >
                      Bijwerken
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}












