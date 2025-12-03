// src/pages/PostbusDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const fakeMailItems = [
  {
    id: "ITEM-001",
    datum: "Vandaag, 09:12",
    type: "Scan PDF",
    omschrijving: "Inkomende brief Belastingdienst",
    status: "Nieuw",
  },
  {
    id: "ITEM-002",
    datum: "Vandaag, 08:47",
    type: "Fysieke post",
    omschrijving: "Pakket PostNL",
    status: "In behandeling",
  },
  {
    id: "ITEM-003",
    datum: "Gisteren, 16:03",
    type: "Scan PDF",
    omschrijving: "Bankafschrift ABN AMRO",
    status: "Afgerond",
  },
];

function PostbusDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      {/* Terug-link */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
      >
        <span className="mr-1">←</span> Terug naar overzicht
      </button>

      {/* Hoofdkaart met info over de postbus */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">
          Postbus {id}
        </h1>

        <p className="text-slate-600">
          Dit is een <span className="font-medium">demo-detailpagina</span> voor
          postbus <span className="font-mono">{id}</span>. Later koppelen we
          deze pagina aan Supabase zodat hier de echte postbusgegevens van
          Morends-klanten zichtbaar worden.
        </p>

        <div className="grid gap-4 sm:grid-cols-3 mt-4">
          <div className="bg-slate-50 rounded-xl px-4 py-3">
            <p className="text-xs font-medium text-slate-500 uppercase">
              Klant
            </p>
            <p className="text-sm font-semibold text-slate-900 mt-1">
              Demo-klant (komt straks uit database)
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl px-4 py-3">
            <p className="text-xs font-medium text-slate-500 uppercase">
              Type postbus
            </p>
            <p className="text-sm font-semibold text-slate-900 mt-1">
              Digitaal + fysiek
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl px-4 py-3">
            <p className="text-xs font-medium text-slate-500 uppercase">
              Status
            </p>
            <p className="text-sm font-semibold text-emerald-600 mt-1">
              ● Actief
            </p>
          </div>
        </div>
      </div>

      {/* Inkomende post tabel */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Inkomende post
            </h2>
            <p className="text-sm text-slate-500">
              Demo-data. Later tonen we hier echte stukken uit Supabase.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Datum
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Omschrijving
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">
                  Acties
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {fakeMailItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {item.datum}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {item.type}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {item.omschrijving}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.status === "Nieuw" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                        ● Nieuw
                      </span>
                    )}
                    {item.status === "In behandeling" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                        ● In behandeling
                      </span>
                    )}
                    {item.status === "Afgerond" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-700">
                        ● Afgerond
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-right space-x-2">
                    <button className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200 text-slate-700 hover:bg-slate-50">
                      Bekijken
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200 text-slate-700 hover:bg-slate-50">
                      Doorsturen
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

export default PostbusDetail;
