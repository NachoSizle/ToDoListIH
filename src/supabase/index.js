import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zavaajbmjnwcfnikcgcf.supabase.co';
const supabaseAnonToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphdmFhamJtam53Y2ZuaWtjZ2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE4ODAwNjUsImV4cCI6MTk3NzQ1NjA2NX0.R9YyywZXXPEFt9T59kwJW0EZ9pxm93nKPh1QgHgDPvE';

export default createClient(supabaseUrl, supabaseAnonToken);
