import { createClient } from "@supabase/supabase-js";
import useAuthUser from './../composables/UseAuthUser'

const supabaseUrl = 'https://qhnlkkaregqnwbbfrfje.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobmxra2FyZWdxbndiYmZyZmplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5NTU0OTksImV4cCI6MTk5NTUzMTQ5OX0.6V_ByiN2N8eAHUDqhS5i3jy7nnMyt-53beaBDnb_v14'
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()

  user.value = session?.user || null
})

export default function useSupabase () {
  return { supabase }
}