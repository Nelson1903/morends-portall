import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const TABLE_NAME = "post_items";

export default function Postbrievenbus() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newItem, setNewItem] = useState({
    box_nummer: "",
    klant_naam: "",
    type: "",
    status: "",
    binnen_sinds: "",
    opmerking: "",
  });

  // Data ophalen uit Supabase
  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select("*")
        .order("binnen_sinds", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        setError(error.message || "Kan de postbrievenbus niet laden.");
      } else {
        setItems(data || []);
      }

      setLoading(false);
    }

    fetchItems();
  }, []);

  // Zoeken / filteren
  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return items;

    return items.filter((item) => {
      const box = (item.box_nummer || "").toLowerCase();
      const klant = (item.klant_naam || "").toLowerCase();
      const type = (item.type || "").toLowerCase();
      const status = (item.status || "").toLowerCase();
      const opmerking = (item.opmerking || "").toLowerCase();

      return (
        box.includes(term) ||
        klant.includes(term) ||
        type.includes(term) ||
        status.includes(term) ||
        opmerking.includes(term)
      );
    });
  }, [items, search]);

  // Formulier velden bijwerken
  function handleChange(e) {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Nieuwe post opslaan in Supabase
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    // Kleinere validatie
    if (!newItem.box_nummer || !newItem.klant_naam) {
      setError("Boxnummer en klantnaam zijn verplicht.");
      setSaving(false);
      return;
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          box_nummer: newItem.box_nummer,
          klant_naam: newItem.klant_naam,
          type: newItem.type,
          status: newItem.status,
          binnen_sinds: newItem.binnen_sinds || null,
          opmerking: newItem.opmerking,
        },
      ])
      .select("*")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      setError(error.message || "Kon de nieuwe post niet opslaan.");
    } else if (data) {
      // Nieuwe rij toevoegen aan lijst
      setItems((prev) => [data, ...prev]);
      // Formulier leegmaken en sluiten
      setNewItem({
        box_nummer: "",
        klant_naam: "",
        type: "",
        status: "",
        binnen_sinds: "",
        opmerking: "",
      });
      setShowForm(false);
    }

    setSaving(false);
  }

  return (
    <div className="px-8 py-8">
      {/* Titel + intro */}
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Postbrievenbus</h1>

      <p className="mb-6 max-w-xl text-sm text-slate-600">
        Overzicht van post en pakketten die bij Morends in de postbrievenbus
        zijn geregistreerd.
      </p>

      {/* Knoppen + zoekveld */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="rounded-full bg-[#003366] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#00224d] focus:outline-none focus:ring-2 focus:ring-[#003366]"
          >
            + Nieuwe post registreren (test)
          </button>

          <button
            type="button"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#003366]"
          >
            Exporteren (Excel)
          </button>
        </div>

        <input
          type="text"
          placeholder="Zoeken op klant, box, type of status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
        />
      </div>

      {/* Eventuele foutmelding */}
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <strong className="font-semibold">Fout:</strong>{" "}
          <span>{error}</span>
        </div>
      )}

      {/* Formulier voor nieuwe post */}
      {showForm && (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-base font-semibold text-slate-900">
            Nieuwe post registreren
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">
                Boxnummer *
              </label>
              <input
                name="box_nummer"
                value={newItem.box_nummer}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
                placeholder="Bijv. MR-2026-01"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">
                Klantnaam *
              </label>
              <input
                name="klant_naam"
                value={newItem.klant_naam}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
                placeholder="Bijv. Johan Neeskens"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">Type</label>
              <input
                name="type"
                value={newItem.type}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
                placeholder="Bijv. aangetekend post, pakket…"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">
                Status
              </label>
              <input
                name="status"
                value={newItem.status}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
                placeholder="Bijv. in box, opgehaald…"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-600">
                Binnen sinds
              </label>
              <input
                type="date"
                name="binnen_sinds"
                value={newItem.binnen_sinds}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
              />
            </div>

            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-medium text-slate-600">
                Opmerking
              </label>
              <textarea
                name="opmerking"
                value={newItem.opmerking}
                onChange={handleChange}
                rows={2}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
                placeholder="Bijv. klant nog mailen, belletje sturen…"
              />
            </div>

            <div className="mt-1 flex items-center gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-[#003366] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#00224d] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "Opslaan..." : "Opslaan"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Annuleren
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabel */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900 text-xs uppercase tracking-wide text-slate-100">
            <tr>
              <th className="px-4 py-3 text-left font-medium">#</th>
              <th className="px-4 py-3 text-left font-medium">Box</th>
              <th className="px-4 py-3 text-left font-medium">Klant</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Binnen sinds</th>
              <th className="px-4 py-3 text-left font-medium">Opmerking</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  Posten aan het laden...
                </td>
              </tr>
            ) : filteredItems.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  Geen posten gevonden.
                </td>
              </tr>
            ) : (
              filteredItems.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-100 bg-white odd:bg-slate-50/60 hover:bg-slate-100/60"
                >
                  <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {item.box_nummer}
                  </td>
                  <td className="px-4 py-3 text-slate-900">
                    {item.klant_naam}
                  </td>
                  <td className="px-4 py-3 text-slate-900">{item.type}</td>
                  <td className="px-4 py-3 text-slate-900">{item.status}</td>
                  <td className="px-4 py-3 text-slate-900">
                    {item.binnen_sinds
                      ? new Date(item.binnen_sinds).toLocaleDateString("nl-NL")
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {item.opmerking || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

