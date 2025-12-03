import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../src/lib/supabaseClient";

export default function Verzending() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // -------- 1. Data ophalen uit Supabase --------
  useEffect(() => {
    async function loadShipments() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("Shipments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setError(error.message);
      } else {
        setShipments(data || []);
      }

      setLoading(false);
    }

    loadShipments();
  }, []);

  // -------- 2. Realtime updates van Shipments --------
  useEffect(() => {
    const channel = supabase
      .channel("shipments-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Shipments" },
        (payload) => {
          setShipments((current) => {
            const { eventType, new: newRow, old: oldRow } = payload;

            switch (eventType) {
              case "INSERT":
                // nieuwe zending vooraan zetten
                return [newRow, ...current];

              case "UPDATE":
                // bestaande zending vervangen (bijv. status-update)
                return current.map((s) => (s.id === newRow.id ? newRow : s));

              case "DELETE":
                // zending uit lijst halen
                return current.filter((s) => s.id !== oldRow.id);

              default:
                return current;
            }
          });
        }
      )
      .subscribe();

    // opruimen als component verdwijnt
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // -------- 3. Filter op zoekveld --------
  const filteredShipments = shipments.filter((s) => {
    const q = search.toLowerCase();
    if (!q) return true;

    return (
      s.zending_id?.toLowerCase().includes(q) ||
      s.klant?.toLowerCase().includes(q) ||
      s.route?.toLowerCase().includes(q) ||
      s.type?.toLowerCase().includes(q) ||
      s.status?.toLowerCase().includes(q)
    );
  });

  // -------- 4. Helpers voor statistieken --------
  const totalShipments = shipments.length;

  const deliveredCount = shipments.filter(
    (s) => s.status && s.status.toLowerCase() === "afgeleverd"
  ).length;

  const uniqueDestinations = new Set(
    shipments
      .map((s) => {
        if (!s.route) return null;
        const parts = s.route.split("→");
        return parts[1]?.trim() || null;
      })
      .filter(Boolean)
  ).size;

  function formatDate(value) {
    if (!value) return "-";
    if (isNaN(Date.parse(value))) return value; // tekst zoals "Vandaag, 09:12" gewoon tonen
    const d = new Date(value);
    return d.toLocaleString("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getStatusBadgeClasses(status) {
    switch (status?.toLowerCase()) {
      case "afgeleverd":
        return "bg-emerald-100 text-emerald-800";
      case "in behandeling":
        return "bg-amber-100 text-amber-800";
      case "onderweg":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  }

  // -------- 5. UI --------
  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* 🔙 Terug naar dashboard */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900"
          >
            <span className="mr-1">←</span> Terug naar overzicht
          </Link>
        </div>

        {/* Titel */}
        <div>
          <h1 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Verzending
          </h1>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Verzendingsoverzicht
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Overzicht van alle zendingen binnen Morends. Dit scherm gebruikt nu
            data uit de Supabase-tabel{" "}
            <span className="font-mono">Shipments</span>.
          </p>
        </div>

        {/* Banner */}
        <div className="rounded-2xl bg-orange-500 px-6 py-4 text-sm font-medium text-white shadow-md">
          VERZENDING MODULE – DATA VIA SUPABASE (MET REALTIME)
        </div>

        {/* Stat tiles */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase text-slate-500">
              Totaal zendingen
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {totalShipments}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase text-slate-500">
              Afgeleverd (alle)
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {deliveredCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase text-slate-500">
              Bestemmingen (uniek)
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">
              {uniqueDestinations}
            </p>
          </div>
        </div>

        {/* Realtime-info */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          <span>
            Data uit <span className="font-mono">public."Shipments"</span> in
            Supabase (met realtime updates).
          </span>
        </div>

        {/* Zoek & filter */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Zoek op klant, referentie, bestemming of zending ID..."
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Filter (demo)
          </button>
        </div>

        {/* Tabel */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
            Zendingen
          </div>

          {loading ? (
            <div className="px-6 py-10 text-sm text-slate-500">
              Zendingen worden geladen...
            </div>
          ) : error ? (
            <div className="px-6 py-10 text-sm text-red-600">{error}</div>
          ) : filteredShipments.length === 0 ? (
            <div className="px-6 py-10 text-sm text-slate-500">
              Geen zendingen gevonden.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-t border-slate-100 text-sm">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-medium uppercase text-slate-500">
                    <th className="px-6 py-3">Zending</th>
                    <th className="px-6 py-3">Klant</th>
                    <th className="px-6 py-3">Type / service</th>
                    <th className="px-6 py-3">Route</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Laatst bijgewerkt</th>
                    <th className="px-6 py-3 text-right">Acties</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredShipments.map((shipment) => (
                    <tr key={shipment.id} className="hover:bg-slate-50/60">
                      <td className="px-6 py-4 align-top">
                        <div className="font-medium text-slate-900">
                          {shipment.zending_id}
                        </div>
                      </td>

                      <td className="px-6 py-4 align-top text-slate-700">
                        {shipment.klant}
                      </td>

                      <td className="px-6 py-4 align-top text-slate-700">
                        {shipment.type}
                      </td>

                      <td className="px-6 py-4 align-top text-slate-700">
                        {shipment.route}
                      </td>

                      <td className="px-6 py-4 align-top">
                        <span
                          className={
                            "inline-flex rounded-full px-2.5 py-1 text-xs font-medium " +
                            getStatusBadgeClasses(shipment.status)
                          }
                        >
                          {shipment.status || "Onbekend"}
                        </span>
                      </td>

                      <td className="px-6 py-4 align-top text-slate-700">
                        {formatDate(
                          shipment.laatst_bijgewerkt || shipment.updated_at
                        )}
                      </td>

                      <td className="px-6 py-4 align-top text-right space-x-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/verzending/${shipment.id}`)
                          }
                          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          Details
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/verzending/${shipment.id}`)
                          }
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
          )}
        </div>
      </div>
    </div>
  );
}













