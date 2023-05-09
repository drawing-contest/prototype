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
  const response = await client.from('chat').select('*').order('created_at', { ascending: true });
  return checkError(response);
}

export async function postChat(message) {
  const response = await client.from('chat').insert({
    created_at: new Date().toISOString(),
    message,
  });
  return checkError(response);
}

export function updateChatInRealtime(handleInsert) {
  // const subscription = client.from('chat').on('*', (payload) => callback(payload.new));
  // return () => {
  //   subscription.unsubscribe();
  // };
  return client.from('chat').on('INSERT', handleInsert).subscribe();
}
