const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL

export function getIllustrationUrl(type, id, variant) {
  return `${SUPABASE_URL}/storage/v1/object/public/illustrations/${type}/${id}-${variant}.svg`
}
