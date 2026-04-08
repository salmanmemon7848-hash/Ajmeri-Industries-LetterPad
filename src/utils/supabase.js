import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Template functions
export async function loadTemplates() {
  const { data, error } = await supabase
    .from('letter_templates')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error loading templates:', error)
    return []
  }
  
  return data || []
}

export async function saveTemplate(template) {
  const { data, error } = await supabase
    .from('letter_templates')
    .insert([template])
    .select()
  
  if (error) {
    console.error('Error saving template:', error)
    throw error
  }
  
  return data[0]
}

export async function deleteTemplate(id) {
  const { error } = await supabase
    .from('letter_templates')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting template:', error)
    throw error
  }
}

// Storage functions
export async function uploadImage(file, bucket) {
  const fileName = `${bucket}_${Date.now()}.${file.name.split('.').pop()}`
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file)
  
  if (error) {
    console.error('Error uploading image:', error)
    throw error
  }
  
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)
  
  return urlData.publicUrl
}
