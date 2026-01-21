
import React, { useState, useEffect, useRef } from 'react';
import { ChatThread, ChatMessage } from '../types.ts';

interface ChatDetailProps {
  chat: ChatThread;
  onBack: () => void;
  onSystemLinkClick?: (msg: ChatMessage) => void;
}

export const ChatDetail: React.FC<ChatDetailProps> = ({ chat, onBack, onSystemLinkClick }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(chat.messages || []);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(chat.messages || []);
  }, [chat.messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || chat.role === 'System') return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulated Auto Response for non-system chats
    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Baik kak, mohon ditunggu sebentar ya.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'other'
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col animate-fade-in max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 flex items-center gap-4 sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="flex-1 flex items-center gap-3">
          <div className="relative">
            <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-xl object-cover" />
            {chat.status === 'online' && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <h2 className="text-sm font-black text-gray-900 leading-tight">{chat.name}</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{chat.role} • {chat.status}</p>
          </div>
        </div>
        {chat.role !== 'System' && (
          <button className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center active:scale-90">
            <i className="fa-solid fa-phone"></i>
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm relative ${
              msg.sender === 'me' 
                ? 'bg-green-600 text-white rounded-tr-none' 
                : chat.role === 'System'
                  ? 'bg-blue-600 text-white rounded-tl-none border border-blue-500'
                  : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            }`}>
              <p className="text-xs font-medium leading-relaxed">{msg.text}</p>
              
              {msg.isTransactionLink && (
                <button 
                  onClick={() => onSystemLinkClick && onSystemLinkClick(msg)}
                  className="mt-3 w-full bg-white/20 hover:bg-white/30 transition-colors py-2 px-3 rounded-xl flex items-center justify-between group"
                >
                   <span className="text-[10px] font-black uppercase tracking-widest">Lihat Rincian</span>
                   <i className="fa-solid fa-arrow-right text-[10px] group-active:translate-x-1 transition-transform"></i>
                </button>
              )}

              <p className={`text-[8px] font-bold mt-2 text-right ${msg.sender === 'me' || chat.role === 'System' ? 'text-white/60' : 'text-gray-300'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      {chat.role !== 'System' ? (
        <div className="bg-white p-4 pb-10 border-t border-gray-100">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200">
            <button type="button" className="w-10 h-10 text-gray-300 hover:text-green-600">
              <i className="fa-solid fa-circle-plus text-xl"></i>
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 bg-transparent border-none py-2 text-sm font-medium focus:ring-0 placeholder:text-gray-300"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                inputText.trim() ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-200 text-gray-400'
              }`}
            >
              <i className="fa-solid fa-paper-plane text-sm"></i>
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-gray-50 p-4 pb-10 text-center border-t border-gray-100">
           <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest flex items-center justify-center gap-2">
             <i className="fa-solid fa-lock"></i> Chat ini bersifat satu arah & otomatis
           </p>
        </div>
      )}
    </div>
  );
};
