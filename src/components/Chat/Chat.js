import React from 'react';

export default function Chat() {
  return (
    <>
      <div className="chat-window">
        <ul className="chat-list"></ul>
      </div>
      <form className="new-chat">
        <input type="text" className="new-chat-input" />
        <button type="submit" className="new-chat-button">
          Send
        </button>
      </form>
    </>
  );
}
