// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase env vars missen", { supabaseUrl, supabaseAnonKey });
  throw new Error("VITE_SUPABASE_URL of VITE_SUPABASE_ANON_KEY ontbreekt");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

