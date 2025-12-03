import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../../src/lib/supabaseClient";

export default function VerzendingDetail() {
  const { id } = useParams(); // UUID uit de URL
  const navigate = useNavigate();

  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Zending ophalen uit Supabase
  useEffect(() => {
    async function fetchShipment() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("Shipments")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Fout bij ophalen zending:", error);
        setError(error.message);
      } else {
        setShipment(data);
      }

      setLoading(false);
    }

    fetchShipment();
  }, [id]);

  // Helper voor nette datum
  function formatDate(value) {
    if (!value) return "-";
    // als het een leesbare tekst is (zoals "Vandaag, 09:12"), gewoon tonen:
    if (isNaN(Date.parse(value))) return value;

    const d = new Date(value);
    return d.toLocaleString("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Status bijwerken
  async function updateStatus(newStatus) {
    if (!shipment || saving) return;

    setSaving(true);
    setError("");

    const { error } = await supabase
      .from("Shipments")
      .update({
        status: newStatus,
        laatst_bijgewerkt: new Date().toISOString(),
      })
      .eq("id", shipment.id); // let op: we pakken nu zeker shipment.id

    if (error) {
      console.error("Fout bij bijwerken status:", error);
      setError("Fout bij bijwerken status: " + error.message);
      setSaving(false);
      return;
    }

    // Lokaal meteen bijwerken zodat je direct resultaat ziet
    setShipment((prev) =>
      prev
        ? {
            ...prev,
            status: newStatus,
            laatst_bijgewerkt: new Date().toISOString(),
          }
        : prev
    );

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-600 text-sm">Zending wordt geladen…</p>
      </div>
    );
  }

  if (error && !shipment) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-md text-center space-y-3">
          <p className="text-sm text-red-600">
            Er ging iets mis: {error || "Zending niet gevonden."}
          </p>
          <button
            onClick={() => navigate("/verzending")}
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800"
          >
            ← Terug naar overzicht
          </button>
        </div>
      </div>
    );
  }

  if (!shipment) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* 🔙 Terug naar verzendlijst */}
        <Link
          to="/verzending"
          className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900"
        >
          <span className="mr-1">←</span> Terug naar overzicht
        </Link>

        {/* Header */}
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">
            Zending details
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            {shipment.zending_id}
          </h1>
          <p className="mt-1 text-slate-600 text-sm">
            Route: {shipment.route}
          </p>
        </div>

        {/* Info kaarten */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
            <p className="text-xs uppercase font-semibold text-slate-500">
              Klant
            </p>
            <p className="mt-2 text-lg text-slate-900">{shipment.klant}</p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
            <p className="text-xs uppercase font-semibold text-slate-500">
              Type dienst
            </p>
            <p className="mt-2 text-lg text-slate-900">{shipment.type}</p>
          </div>
        </div>

        {/* Status + knoppen */}
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 space-y-4">
          <div>
            <p className="text-xs uppercase font-semibold text-slate-500 mb-2">
              Huidige status
            </p>
            <p className="inline-block rounded-full bg-blue-600 text-white text-xs font-medium px-3 py-1">
              {shipment.status}
            </p>
          </div>

          {error && (
            <p className="text-xs text-red-600">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => updateStatus("Onderweg")}
              disabled={saving}
              className="px-3 py-2 text-xs font-medium rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Onderweg
            </button>

            <button
              onClick={() => updateStatus("In behandeling")}
              disabled={saving}
              className="px-3 py-2 text-xs font-medium rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              In behandeling
            </button>

            <button
              onClick={() => updateStatus("Afgeleverd")}
              disabled={saving}
              className="px-3 py-2 text-xs font-medium rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Afgeleverd
            </button>
          </div>

          {saving && (
            <p className="text-xs text-slate-500 mt-1">
              Status wordt opgeslagen…
            </p>
          )}
        </div>

        {/* Timestamps */}
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
          <p className="text-xs uppercase font-semibold text-slate-500">
            Laatst bijgewerkt
          </p>
          <p className="mt-2 text-slate-700 text-sm">
            {formatDate(shipment.laatst_bijgewerkt || shipment.updated_at)}
          </p>
        </div>
      </div>
    </div>
  );
}


