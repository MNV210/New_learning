import React, { useState } from "react";

const ChatTab = ({ isDark, lecture }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      text: `Chào mừng bạn đến với khóa học "${lecture?.title || 'Khóa học'}". Bạn có thể đặt câu hỏi về bất kỳ nội dung nào trong khóa học này.`,
      timestamp: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      timestamp: new Date().toISOString()
    };
    
    // Simulate system response
    const systemResponse = {
      id: messages.length + 2,
      sender: "system",
      text: `Cảm ơn câu hỏi của bạn về "${newMessage}". Giảng viên sẽ phản hồi sớm nhất có thể.`,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, userMessage, systemResponse]);
    setNewMessage("");
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Chat messages */}
      <div 
        className={`flex-1 overflow-y-auto p-3 ${isDark ? "bg-gray-700" : "bg-gray-100"} rounded-lg mb-3`} 
        style={{ minHeight: "300px", maxHeight: "calc(100vh-260px)" }}
      >
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[85%] rounded-lg px-3 py-2 ${
                message.sender === "user" 
                  ? isDark ? "bg-blue-600 text-white" : "bg-blue-500 text-white" 
                  : isDark ? "bg-gray-600 text-white" : "bg-white text-gray-800"
              } shadow`}
            >
              <div className="flex items-center mb-1">
                <span className={`font-medium text-sm ${message.sender === "user" ? "" : "text-green-400"}`}>
                  {message.sender === "user" ? "Bạn" : "Hệ thống"}
                </span>
                <span className={`text-xs ml-2 ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message input */}
      <div className={`${isDark ? "bg-gray-700" : "bg-gray-100"} rounded-lg p-2`}>
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập câu hỏi hoặc ý kiến của bạn..."
            className={`flex-1 p-2 rounded-lg mr-2 text-sm ${
              isDark 
                ? "bg-gray-800 text-white border-gray-600" 
                : "bg-white text-gray-800 border-gray-300"
            } border`}
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-2 rounded-lg ${
              newMessage.trim() 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-gray-400 text-gray-200"
            } flex items-center justify-center`}
          >
            <span className="material-icons text-sm">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatTab; 