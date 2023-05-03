import { createClient } from '@supabase/supabase-js';
export const client = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

export function checkError({ data, error }) {
  if (error) {
    throw error;
  }
  return data;
}

export async function getChat() {
  return await client
    .from('chat')
    .select('*')
    .order('created_at', { ascending: true })
    .then(checkError);
}

export async function postChat(message) {
  return await client.from('chat').insert([{ message }]).then(checkError);
}
