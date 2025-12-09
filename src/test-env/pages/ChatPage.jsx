// src/test-env/pages/ChatPage.jsx
// Full chat conversation page with messages, input, and interactions
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  MoreVertical, 
  Phone, 
  Video, 
  Smile,
  Paperclip,
  Send,
  Image as ImageIcon,
  Mic,
  Check,
  CheckCheck
} from "lucide-react";

// Sample messages data
const sampleMessages = [
  {
    id: 1,
    text: "Hey! Just finished my night shift 😭",
    sender: "them",
    timestamp: "10:23 AM",
    status: "read",
  },
  {
    id: 2,
    text: "How was yours?",
    sender: "them",
    timestamp: "10:23 AM",
    status: "read",
  },
  {
    id: 3,
    text: "Exhausting but we made it through! 💪",
    sender: "me",
    timestamp: "10:25 AM",
    status: "read",
  },
  {
    id: 4,
    text: "Same here. Wanna grab coffee later?",
    sender: "them",
    timestamp: "10:26 AM",
    status: "read",
  },
  {
    id: 5,
    text: "Absolutely! I need proper caffeine after that shift",
    sender: "me",
    timestamp: "10:27 AM",
    status: "delivered",
  },
  {
    id: 6,
    text: "How about that new place near the hospital?",
    sender: "me",
    timestamp: "10:27 AM",
    status: "sent",
  },
];

const ChatPage = ({ contact, onBack }) => {
  const [messages, setMessages] = useState(sampleMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Default contact if none provided
  const defaultContact = {
    name: "Sarah",
    avatar: "https://images.pexels.com/photos/6129681/pexels-photo-6129681.jpeg?auto=compress&cs=tinysrgb&w=200",
    status: "online",
    shiftLabel: "Night shift brain",
  };

  const activeContact = contact || defaultContact;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: "me",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: "sent",
      };
      setMessages([...messages, newMessage]);
      setInputText("");
      
      // Simulate other person typing
      setTimeout(() => setIsTyping(true), 1000);
      setTimeout(() => setIsTyping(false), 3000);
    }
  };

  const MessageBubble = ({ message }) => {
    const isMe = message.sender === "me";
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`flex ${isMe ? "justify-end" : "justify-start"} mb-3`}
      >
        <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"} flex flex-col`}>
          <div
            className={`rounded-[18px] px-4 py-2.5 ${
              isMe
                ? "bg-gradient-to-br from-purple-500 to-violet-500 text-white"
                : "bg-white text-slate-800 shadow-sm"
            }`}
          >
            <p className="text-[14px] leading-relaxed">{message.text}</p>
          </div>
          <div className="flex items-center gap-1 mt-1 px-2">
            <span className="text-[11px] text-slate-400">{message.timestamp}</span>
            {isMe && (
              <span>
                {message.status === "sent" && <Check className="w-3 h-3 text-slate-400" />}
                {message.status === "delivered" && <CheckCheck className="w-3 h-3 text-slate-400" />}
                {message.status === "read" && <CheckCheck className="w-3 h-3 text-purple-500" />}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8F7FA]">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center active:scale-95 transition"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-200">
                <img 
                  src={activeContact.avatar} 
                  alt={activeContact.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {activeContact.status === "online" && (
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
              )}
            </div>

            <div>
              <p className="text-[15px] font-semibold text-[#0F213A]">{activeContact.name}</p>
              {isTyping ? (
                <p className="text-[12px] text-purple-500">typing...</p>
              ) : (
                <p className="text-[12px] text-slate-500">{activeContact.shiftLabel}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center active:scale-95 transition">
            <Phone className="w-4 h-4 text-slate-600" />
          </button>
          <button className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center active:scale-95 transition">
            <Video className="w-4 h-4 text-slate-600" />
          </button>
          <button className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center active:scale-95 transition">
            <MoreVertical className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Date divider */}
        <div className="flex items-center justify-center mb-6">
          <span className="px-3 py-1 rounded-full bg-white text-[11px] text-slate-500 shadow-sm">
            Today
          </span>
        </div>

        {/* Messages */}
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex justify-start mb-3"
          >
            <div className="bg-white rounded-[18px] px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 px-4 py-3 safe-area-bottom">
        <div className="flex items-end gap-2">
          {/* Attachment button */}
          <button className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center active:scale-95 transition shrink-0">
            <Paperclip className="w-5 h-5 text-slate-600" />
          </button>

          {/* Input field */}
          <div className="flex-1 bg-slate-50 rounded-[20px] px-4 py-2 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Message..."
              className="flex-1 bg-transparent text-[15px] outline-none text-slate-800 placeholder:text-slate-400"
            />
            <button className="shrink-0 active:scale-95 transition">
              <Smile className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Send/Voice button */}
          {inputText.trim() ? (
            <button 
              onClick={handleSend}
              className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center active:scale-95 transition shadow-lg shrink-0"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          ) : (
            <button className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center active:scale-95 transition shrink-0">
              <Mic className="w-5 h-5 text-slate-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
