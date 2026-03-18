export const environment = {
  production: true,
  supabaseUrl: process.env['SUPABASE_URL'] || 'SUPABASE_URL',
  supabaseKey: process.env['SUPABASE_KEY'] || 'SUPABASE_ANON_KEY'
};