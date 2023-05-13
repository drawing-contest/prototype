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
  const [data, setData] = useState([]);

  // shows loading state while fetching data
  const isLoading = !data.length;

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const chat = await getChat();
        setData(chat);

        // realtime updates (still need to add an unsubscribe function)
        updateChatInRealtime((payload) => {
          setData((prev) => [...prev, payload.new]);
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchChat();
  });

  return (
    <>
      <h1>Chat</h1>
      <div className="chat-window" id="chat-window">
        {/* Loading state */}
        {isLoading && <div>Loading...</div>}
        <div className="chat-box">
          {data.slice(data.length - 15, data.length).map((chat) => (
            <div key={chat.id} className="chat-message">
              <div className="chat-message-content">
                <div className="chat-message-date">{chat.created_at.slice(11, 19)}</div>
                <div className="chat-message-text">{chat.message}</div>
              </div>
            </div>
          ))}
        </div>
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
