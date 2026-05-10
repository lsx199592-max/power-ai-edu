import { createClient } from '@supabase/supabase-js';
import type { Database } from '../supabase/types';

const SUPABASE_URL = 'https://etpuquqxzzsjyiiixdfw.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_c4bRKSnuD_BTRzglr9AZdw_DBmwbU-m';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export { SUPABASE_URL, SUPABASE_ANON_KEY };