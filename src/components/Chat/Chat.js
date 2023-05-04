import React, { useState, useEffect } from 'react';
import './Chat.css';
import { getChat, postChat, updateChatInRealtime } from '../../services/client';

async function handleSubmit(e) {
  e.preventDefault();
  const message = document.getElementById('new-chat-input').value;
  await postChat(message);
  document.getElementById('new-chat-input').value = '';
}

export default function Chat() {
  // const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChat = async () => {
      // setLoading(true);
      try {
        const chat = await getChat();
        setData(chat);
        // console.log('CHAT: ', chat);

        // this is plugged in from copilot, and is calling
        //  updateChatInRealtime from from client.js,
        //    which is calling subscribe() from supabase-js
        updateChatInRealtime((payload) => {
          setData((prev) => [...prev, payload.new]);
        });
      } catch (error) {
        console.error(error.message);
      }
      // setLoading(false);
    };

    fetchChat();
  });

  return (
    <>
      <h1>Chat</h1>
      <div className="chat-window" id="chat-window">
        {/* {loading && <div>Loading...</div>}
        {!loading && data.length === 0 && <div>No messages yet</div>}
        {!loading && data.length > 0 && ( */}
        <div className="chat-box">
          {data.map((chat) => (
            <div key={chat.id} className="chat-message">
              <div className="chat-message-content">
                <div className="chat-message-date">{chat.created_at.slice(11, 19)}</div>
                <div className="chat-message-text">{chat.message}</div>
              </div>
            </div>
          ))}
        </div>
        {/* )} */}
      </div>
      <form className="new-chat">
        <input type="text" className="new-chat-input" id="new-chat-input" />
        <button
          type="submit"
          className="new-chat-button"
          id="new-chat-button"
          onClick={handleSubmit}
        >
          Send
        </button>
      </form>
    </>
  );
}
