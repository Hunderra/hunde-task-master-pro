
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pawvgopqiohmorvdtqjj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhd3Znb3BxaW9obW9ydmR0cWpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTAxMTAsImV4cCI6MjA2MTA2NjExMH0.n3UK1aPLdIIMExqdJkTaHirXOFZhuB4z2ahLwoWh13A";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
