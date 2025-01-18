import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zlrlnwtobbvfplhcfxvw.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpscmxud3RvYmJ2ZnBsaGNmeHZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNzk3MDYsImV4cCI6MjA1MTg1NTcwNn0.WXYp0Wzq69XG7U8hPCGCujEOoTaXRO7lf03cCjesrcM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
