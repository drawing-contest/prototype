import { checkError, client } from './client';
import { createClient } from '@supabase/supabase-js';
export const client = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

export async function getImage() {
  const response = await client.storage.from('image').getPublicUrl('test.JPG', {
    transform: {
      width: 500,
      height: 600,
    },
  })
  return checkError(response);
}

export async function uploadImage(image) {
  const { data, error } = await supabase.storage.from('bucket_name').upload('file_path', file)
  return checkError(response);
}
