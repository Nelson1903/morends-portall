import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import jsPDF from "jspdf";

export default function Verzending() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");


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
                return [newRow, ...current];
              case "UPDATE":
                return current.map((s) =>
                  s.id === newRow.id ? newRow : s
                );
              case "DELETE":
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

  // -------- 3. Helpers --------
  function formatDate(value) {
    if (!value) return "-";
    if (isNaN(Date.parse(value))) return value; // bv. "Vandaag, 09:12"

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

  const filteredShipments = shipments.filter((s) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      s.zending_id?.toLowerCase().includes(term) ||
      s.klant?.toLowerCase().includes(term) ||
      s.type?.toLowerCase().includes(term) ||
      s.bestemming?.toLowerCase().includes(term)
    );
  });

  // -------- 4. Export naar PDF (demo) --------
  function handleExportPDF() {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    doc.setFontSize(16);
    doc.text("Verzendingen – demo export", 40, 40);

    doc.setFontSize(10);
    let y = 80;

    // kopregel
    doc.text("Zending ID", 40, y);
    doc.text("Klant", 140, y);
    doc.text("Type", 280, y);
    doc.text("Status", 380, y);
    doc.text("Bestemming", 480, y);
    doc.text("Datum", 640, y);

    y += 16;

    filteredShipments.slice(0, 20).forEach((s) => {
      if (y > 530) {
        doc.addPage();
        y = 60;
      }

      doc.text(String(s.zending_id || "-"), 40, y);
      doc.text(String(s.klant || "-"), 140, y);
      doc.text(String(s.type || "-"), 280, y);
      doc.text(String(s.status || "-"), 380, y);
      doc.text(String(s.bestemming || "-"), 480, y);
      doc.text(formatDate(s.created_at || s.datum), 640, y);

      y += 14;
    });

    doc.save("verzendingen-demo.pdf");
  }

  // -------- 5. UI --------
  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* 🔙 Terug naar overzicht */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900"
          >
            <span className="mr-1">←</span> Terug naar overzicht
          </Link>

          <button
            type="button"
            onClick={handleExportPDF}
            className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Exporteer als PDF (demo)
          </button>
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

        {/* Zoek & filter */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Zoek op klant, referentie, bestemming of zending ID..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-0 focus:border-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>Data uit Supabase (met realtime updates)</span>
          </div>
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
              <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                <thead className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="border-b border-slate-100 px-6 py-3">
                      Zending ID
                    </th>
                    <th className="border-b border-slate-100 px-6 py-3">
                      Klant
                    </th>
                    <th className="border-b border-slate-100 px-6 py-3">
                      Type
                    </th>
                    <th className="border-b border-slate-100 px-6 py-3">
                      Status
                    </th>
                    <th className="border-b border-slate-100 px-6 py-3">
                      Bestemming
                    </th>
                    <th className="border-b border-slate-100 px-6 py-3">
                      Datum
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredShipments.map((shipment) => (
                    <tr key={shipment.id}>
                      <td className="px-6 py-3 align-top text-slate-900">
                        {shipment.zending_id || "-"}
                      </td>
                      <td className="px-6 py-3 align-top text-slate-700">
                        {shipment.klant || "-"}
                      </td>
                      <td className="px-6 py-3 align-top text-slate-700">
                        {shipment.type || "-"}
                      </td>
                      <td className="px-6 py-3 align-top">
                        <span
                          className={
                            "inline-flex rounded-full px-2.5 py-1 text-xs font-medium " +
                            getStatusBadgeClasses(shipment.status)
                          }
                        >
                          {shipment.status || "Onbekend"}
                        </span>
                      </td>
                      <td className="px-6 py-3 align-top text-slate-700">
                        {shipment.bestemming || "-"}
                      </td>
                      <td className="px-6 py-3 align-top text-slate-500">
                        {formatDate(shipment.created_at || shipment.datum)}
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














