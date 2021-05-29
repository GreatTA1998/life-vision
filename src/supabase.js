import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fzyqsbvhljnoxegtlqje.supabase.co'

// process.env.SUPABASE_KEY 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMTM4NzY3NywiZXhwIjoxOTM2OTYzNjc3fQ.4lL6kli-F259nFvy9-C7vtxGukrf43MVcEZQ-wrayko'
export default createClient(supabaseUrl, supabaseKey)
