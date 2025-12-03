import React from "react";
import { useNavigate } from "react-router-dom";

const TEAM = [
  {
    name: "Nelson End",
    role: "Beheerder",
    email: "nelson@morends.com",
    status: "Actief",
  },
  {
    name: "Operations – Zendingen",
    role: "Medewerker",
    email: "operations@morends.com",
    status: "Actief",
  },
  {
    name: "Finance – Facturatie",
    role: "Alleen rapportages",
    email: "finance@morends.com",
    status: "Actief",
  },
  {
    name: "Support – Tijdelijk",
    role: "Beperkte toegang",
    email: "support@morends.com",
    status: "Uitgenodigd",
  },
];

function Instellingen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 lg:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Instellingen &amp; Team
            </p>
            <h1 className="text-xl font-semibold text-slate-900">
              Teamleden & rolbeheer
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Beheer toegang tot Morends Portal per medewerker.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center rounded-full border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Terug naar overzicht
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 lg:px-6">
        <div className="mb-6 rounded-2xl bg-orange-500 px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-sm">
          Team- en rechtenbeheer wordt later gekoppeld aan Supabase Auth / RLS.
        </div>

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Teamleden
            </h2>
            <p className="text-xs text-slate-500">
              Overzicht van iedereen met toegang tot het portal.
            </p>
          </div>
          <button className="inline-flex items-center rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-white shadow hover:bg-slate-800">
            Nieuw teamlid uitnodigen (demo)
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50/60 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <tr>
                <th className="py-3 pl-4 pr-3 text-left">Naam</th>
                <th className="px-3 py-3 text-left">Rol</th>
                <th className="px-3 py-3 text-left">E-mailadres</th>
                <th className="px-3 py-3 text-left">Status</th>
                <th className="px-3 py-3 text-right">Acties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {TEAM.map((m) => (
                <tr key={m.email} className="hover:bg-slate-50/60">
                  <td className="whitespace-nowrap py-3 pl-4 pr-3">
                    <div className="text-slate-900">{m.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-700">
                    {m.role}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                    {m.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                        m.status === "Actief"
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                          : "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right">
                    <button className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50">
                      Bewerken (demo)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Instellingen;



