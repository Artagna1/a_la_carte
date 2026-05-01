import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync } from 'fs'
import { join, extname, basename } from 'path'

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

const FOLDER = process.argv[2]
if (!FOLDER) {
  console.error('❌ Indique le dossier : node sync-illustrations.js <chemin-du-dossier>')
  process.exit(1)
}

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
}

function getSupabaseFolder(filename) {
  if (filename.startsWith('cc')) return 'contraintes'
  if (filename.startsWith('cf')) return 'contraintes'
  if (filename.startsWith('c'))  return 'clients'
  if (filename.startsWith('o'))  return 'commandes'
  if (filename.startsWith('p'))  return 'publics'
  return null
}

async function upload(storagePath, file, mimeType) {
  const { error } = await supabase.storage
    .from('illustrations')
    .upload(storagePath, file, { contentType: mimeType, upsert: true })
  if (error) {
    console.error(`❌ ${storagePath} : ${error.message}`)
  } else {
    console.log(`✓  ${storagePath}`)
  }
}

async function run() {
  const SUPPORTED = ['.jpg', '.jpeg', '.png', '.svg']
  const files = readdirSync(FOLDER).filter(f => SUPPORTED.includes(extname(f).toLowerCase()))

  if (files.length === 0) {
    console.error('❌ Aucun fichier image trouvé (jpg, png, svg).')
    process.exit(1)
  }

  console.log(`${files.length} fichier(s) trouvé(s)…\n`)

  for (const filename of files) {
    const ext = extname(filename).toLowerCase()
    const id = basename(filename, ext).replace(/-bg$|-thumb$/, '')
    const folder = getSupabaseFolder(id)
    const mimeType = MIME_TYPES[ext]

    if (!folder) {
      console.warn(`⚠️  ${filename} — préfixe non reconnu, ignoré`)
      continue
    }

    const file = readFileSync(join(FOLDER, filename))

    await upload(`${folder}/${id}-bg${ext}`, file, mimeType)
    await upload(`${folder}/${id}-thumb${ext}`, file, mimeType)
  }

  console.log('\n✅ Terminé.')
}

run()
