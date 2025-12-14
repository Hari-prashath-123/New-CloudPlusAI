import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface User {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'user'
  credits: number
  created_at: string
  updated_at: string
}

export interface UserInsert {
  email: string
  full_name: string
  role?: 'admin' | 'user'
  credits?: number
}

export interface UserUpdate {
  full_name?: string
  role?: 'admin' | 'user'
  credits?: number
}
