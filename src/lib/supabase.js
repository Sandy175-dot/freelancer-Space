import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Log environment variable status (remove sensitive values)
console.log('[Supabase Init] URL present:', !!supabaseUrl, 'Key present:', !!supabaseAnonKey);
if (supabaseUrl) {
  console.log('[Supabase Init] URL:', supabaseUrl.substring(0, 30) + '...');
}
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase Init] Missing environment variables! Running in fallback mode.');
  console.warn('[Supabase Init] Make sure .env file exists with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
} else {
  console.log('[Supabase Init] ✅ Real Supabase client initialized successfully');
}

// Provide a safe fallback that allows the UI to render when env vars are missing.
// Auth/db calls will no-op gracefully with clear console warnings.
function createFallbackSupabase() {
  const warn = (method) => console.warn(`[Supabase Mock] ${method} called but VITE_SUPABASE_URL/KEY are not configured.`);
  const ok = (payload) => ({ data: payload, error: null });
  const err = (message) => ({ data: null, error: new Error(message) });
  
  // Create a chainable query builder
  const createQueryBuilder = () => {
    const builder = {
      select: function(query) { return this; },
      insert: function(data) { return this; },
      update: function(data) { return this; },
      delete: function() { return this; },
      upsert: function(data) { return this; },
      eq: function(column, value) { return this; },
      neq: function(column, value) { return this; },
      gt: function(column, value) { return this; },
      gte: function(column, value) { return this; },
      lt: function(column, value) { return this; },
      lte: function(column, value) { return this; },
      like: function(column, pattern) { return this; },
      ilike: function(column, pattern) { return this; },
      is: function(column, value) { return this; },
      in: function(column, values) { return this; },
      contains: function(column, value) { return this; },
      containedBy: function(column, value) { return this; },
      or: function(query) { return this; },
      order: function(column, options) { return this; },
      limit: function(count) { return this; },
      range: function(from, to) { return this; },
      single: async function() { 
        warn('Database query');
        return ok(null); 
      },
      maybeSingle: async function() { 
        warn('Database query');
        return ok(null); 
      },
      then: async function(resolve) {
        warn('Database query');
        const result = ok([]);
        return resolve(result);
      }
    };
    return builder;
  };
  
  return {
    auth: {
      getSession: async () => ok({ session: null }),
      onAuthStateChange: (cb) => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: async () => err('Supabase not configured'),
      signInWithPassword: async () => err('Supabase not configured'),
      signInWithOAuth: async () => err('Supabase not configured'),
      signOut: async () => ok(null),
      resetPasswordForEmail: async () => ok(null),
      getUser: async () => ok({ user: null }),
      resend: async () => ok(null),
    },
    from: (table) => {
      warn(`Accessing table: ${table}`);
      return createQueryBuilder();
    },
    rpc: async () => err('Supabase not configured'),
    channel: (name) => ({
      on: function() { return this; },
      subscribe: () => ({ unsubscribe: () => {} }),
    }),
    removeChannel: () => {},
  };
}

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createFallbackSupabase();
