import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf-8')
    .split('\n')
    .filter(line => line.trim() && !line.startsWith('#'))
    .map(line => {
      const [key, ...rest] = line.split('=')
      return [key.trim(), rest.join('=').trim()]
    })
)

const SUPABASE_URL = env.VITE_SUPABASE_URL
const SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌ VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant dans .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

const bgFile = readFileSync('placeholder-bg.svg')
const thumbFile = readFileSync('placeholder-thumb.svg')

const CARDS = {
  clients:    Array.from({ length: 30 }, (_, i) => `c${String(i + 1).padStart(2, '0')}`),
  commandes:  Array.from({ length: 20 }, (_, i) => `o${String(i + 1).padStart(2, '0')}`),
  publics:    Array.from({ length: 20 }, (_, i) => `p${String(i + 1).padStart(2, '0')}`),
  contraintes: [
    ...Array.from({ length: 15 }, (_, i) => `f${String(i + 1).padStart(2, '0')}`),
    ...Array.from({ length: 20 }, (_, i) => `c${String(i + 1).padStart(2, '0')}`),
  ],
}

async function upload(type, id, variant, file) {
  const path = `${type}/${id}-${variant}.svg`
  const { error } = await supabase.storage
    .from('illustrations')
    .upload(path, file, { contentType: 'image/svg+xml', upsert: true })
  if (error) {
    console.error(`❌ ${path}: ${error.message}`)
  } else {
    console.log(`✓  ${path}`)
  }
}

async function run() {
  console.log('Upload en cours… (210 fichiers)\n')
  for (const [type, ids] of Object.entries(CARDS)) {
    for (const id of ids) {
      await upload(type, id, 'bg', bgFile)
      await upload(type, id, 'thumb', thumbFile)
    }
  }
  console.log('\n✅ Terminé.')
}

run()
