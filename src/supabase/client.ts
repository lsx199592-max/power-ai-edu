import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * 获取 Supabase URL，优先级：
 * 1. 环境变量 REACT_APP_SUPABASE_URL（生产/构建时注入）
 * 2. window.MEOO_CONFIG?.meoo_app_access_url（运行时动态注入，用于 iframe 等场景）
 * 3. 当前页面 origin（本地开发 fallback）
 */
export function getSupabaseUrl(): string {
  // 构建时环境变量（Vercel / CI/CD 注入）
  const envUrl = (process.env as any).REACT_APP_SUPABASE_URL;
  if (envUrl) return envUrl;

  // 运行时动态配置（iframe 场景等）
  const meooUrl = (window as any).MEOO_CONFIG?.meoo_app_access_url;
  if (meooUrl) return meooUrl;

  // 本地开发 fallback
  return `${location.origin}/sb-api`;
}

/**
 * 获取 Supabase Anon Key，优先级：
 * 1. 环境变量 REACT_APP_SUPABASE_ANON_KEY
 * 2. window.MEOO_CONFIG?.meoo_app_access_token
 * 3. 空字符串（生产环境必须有环境变量）
 */
export function getSupabaseAnonKey(): string {
  const envKey = (process.env as any).REACT_APP_SUPABASE_ANON_KEY;
  if (envKey) return envKey;

  const meooKey = (window as any).MEOO_CONFIG?.meoo_app_access_token;
  if (meooKey) return meooKey;

  // ⚠️ 生产环境不应走到这里
  console.warn('[Supabase] 未检测到有效的 Anon Key，请配置环境变量 REACT_APP_SUPABASE_ANON_KEY');
  return '';
}

const supabaseUrl = getSupabaseUrl();
const supabaseAnonKey = getSupabaseAnonKey();

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
