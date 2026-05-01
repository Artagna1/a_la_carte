const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL

const MIME_TYPES = {
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
}

export function getIllustrationUrl(type, id, variant, ext = 'svg') {
  return `${SUPABASE_URL}/storage/v1/object/public/illustrations/${type}/${id}-${variant}.${ext}`
}

export function getMimeType(ext) {
  return MIME_TYPES[ext] ?? 'image/svg+xml'
}
