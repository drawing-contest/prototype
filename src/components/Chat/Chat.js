import React, { useState } from 'react';
import './Chat.css';
import { getChat, postChat } from '../../services/client';

async function handleSubmit(e) {
  e.preventDefault();
  const message = document.getElementById('new-chat-input').value;
  await postChat(message);
  document.getElementById('new-chat-input').value = '';
}

export default function Chat() {
  const [data, setData] = useState([]);

  React.useEffect(() => {
    async function fetchChat() {
      const chat = await getChat();
      setData(chat);
      console.log(chat);
    }
    fetchChat();
  }, []);

  return (
    <>
      <div className="chat-window">
        {data.map((chat) => (
          <div key={chat.id} className="chat-message">
            <div className="chat-message-content">
              <div className="chat-message-text">{chat.message}</div>
              <div className="chat-message-date">{chat.created_at}</div>
            </div>
          </div>
        ))}
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
