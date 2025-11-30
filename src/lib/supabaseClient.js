import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase omgeving niet goed ingesteld (.env.local ontbreekt?).");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

