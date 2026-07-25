import { createClient } from '@supabase/supabase-js'

// Supabaseの接続情報は.envファイルで管理する（.gitignore対象）
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabasePublishableKey)
