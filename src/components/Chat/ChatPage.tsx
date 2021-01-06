import React from "react";

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};

const Messages: React.FC = () => {
  return (
    <div>
      <h3>Messages</h3>
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  return (
    <div>
      <textarea></textarea>
      <button>Send</button>
    </div>
  );
};

export default ChatPage;
