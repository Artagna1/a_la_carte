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

const supabase = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const RENAMES = [
  ...Array.from({ length: 15 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0')
    return [
      { from: `contraintes/f${n}-bg.svg`,    to: `contraintes/cf${n}-bg.svg` },
      { from: `contraintes/f${n}-thumb.svg`, to: `contraintes/cf${n}-thumb.svg` },
    ]
  }).flat(),
  ...Array.from({ length: 20 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0')
    return [
      { from: `contraintes/c${n}-bg.svg`,    to: `contraintes/cc${n}-bg.svg` },
      { from: `contraintes/c${n}-thumb.svg`, to: `contraintes/cc${n}-thumb.svg` },
    ]
  }).flat(),
]

async function run() {
  console.log(`Renommage de ${RENAMES.length} fichiers…\n`)
  for (const { from, to } of RENAMES) {
    const { error } = await supabase.storage.from('illustrations').move(from, to)
    if (error) {
      console.error(`❌ ${from} → ${to} : ${error.message}`)
    } else {
      console.log(`✓  ${from} → ${to}`)
    }
  }
  console.log('\n✅ Terminé.')
}

run()
