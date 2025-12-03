import React from "react";
import { useNavigate } from "react-router-dom";

function Rapportages() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Rapportages
            </p>
            <h1 className="text-xl font-semibold text-slate-900">
              Overzicht & statistieken
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Inzichten in omzet, volumes en klantactiviteit. Nu nog demo, later
              gekoppeld aan echte data.
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

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 lg:px-6">
        {/* Stat cards */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Omzet deze maand (demo)
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              € 48.750
            </p>
            <p className="mt-1 text-xs text-emerald-600">
              +18% t.o.v. vorige maand
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Zendingen
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">132</p>
            <p className="mt-1 text-xs text-slate-500">
              Inclusief zee-, lucht- en groupagezendingen.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Actieve klanten
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">26</p>
            <p className="mt-1 text-xs text-slate-500">
              Klanten met minimaal 1 zending in de afgelopen 90 dagen.
            </p>
          </div>
        </div>

        {/* Plaatshouder "grafiek" */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Volume per bestemming (demo)
              </h2>
              <p className="text-xs text-slate-500">
                Later tonen we hier echte grafieken (bijvoorbeeld met Recharts).
              </p>
            </div>
            <select className="h-8 rounded-full border border-slate-200 bg-white px-3 text-xs text-slate-700">
              <option>Laatste 30 dagen</option>
              <option>Laatste 90 dagen</option>
              <option>Dit jaar</option>
            </select>
          </div>

          <div className="grid gap-3 text-xs text-slate-700 md:grid-cols-2">
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>Suriname</span>
                <span className="font-semibold">38 zendingen</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Aruba</span>
                <span className="font-semibold">21 zendingen</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Curaçao</span>
                <span className="font-semibold">29 zendingen</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Bonaire</span>
                <span className="font-semibold">17 zendingen</span>
              </li>
              <li className="flex items-center justify-between">
                <span>St. Maarten</span>
                <span className="font-semibold">9 zendingen</span>
              </li>
            </ul>
            <div className="flex items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-8 text-center text-xs text-slate-500">
              Hier komt later een echte grafiek (bar / line chart) met volumes
              per bestemming. Voor nu is het een veilige placeholder.
            </div>
          </div>
        </div>

        {/* Export */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Exporteer rapportages
              </h2>
              <p className="text-xs text-slate-500">
                Download filters als CSV of PDF om te delen met klanten,
                administratie of partners.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                Exporteer als CSV (demo)
              </button>
              <button className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-white shadow hover:bg-slate-800">
                Exporteer als PDF (demo)
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Rapportages;








