// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// PUBLIC URL (safe for both sides)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// ADMIN CLIENT (server only)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY, 
  { auth: { persistSession: false } }
);

// PUBLIC CLIENT (browser safe)
export const supabase = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
