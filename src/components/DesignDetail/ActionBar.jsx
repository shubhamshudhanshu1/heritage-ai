import { useState } from "react";

const ActionBar = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Logic to send message
      setMessage("");
    }
  };

  return (
    <div className="flex items-center mt-4 gap-3">
      <input
        type="text"
        placeholder="Message Custom Chat AI"
        className="flex-1 p-2 border rounded-l"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSendMessage}
        className="bg-primary text-white px-4 py-2 rounded-r">
        <i className="fas fa-paper-plane"></i>
      </button>
    </div>
  );
};

export default ActionBar;
