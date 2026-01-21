
import React, { useState } from 'react';
import { ChatThread } from '../types.ts';

interface ChatHistoryProps {
  onBack: () => void;
  onChatClick: (chat: ChatThread) => void;
  allChats: ChatThread[];
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ onBack, onChatClick, allChats }) => {
  const [search, setSearch] = useState('');

  const filteredChats = allChats.filter(chat => 
    chat.name.toLowerCase().includes(search.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white flex flex-col animate-fade-in">
      {/* Header */}
      <div className="px-6 pt-16 pb-6 sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">Pesan</h1>
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari chat..."
            className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-green-500"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs"></i>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center opacity-40">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <i className="fa-solid fa-message-slash text-2xl text-gray-400"></i>
            </div>
            <p className="text-sm font-bold">Belum ada percakapan</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filteredChats.map((chat) => (
              <button 
                key={chat.id} 
                onClick={() => onChatClick(chat)}
                className="w-full px-6 py-5 flex gap-4 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left group"
              >
                <div className="relative shrink-0">
                  <img src={chat.avatar} alt={chat.name} className="w-14 h-14 rounded-[1.5rem] object-cover shadow-sm group-hover:scale-105 transition-transform" />
                  {chat.status === 'online' && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                  {chat.role === 'System' && (
                    <div className="absolute -top-1 -left-1 w-5 h-5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white">
                      <i className="fa-solid fa-shield-check"></i>
                    </div>
                  )}
                </div>
                <div className="flex-1 py-1">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-sm font-black leading-none ${chat.role === 'System' ? 'text-blue-700' : 'text-gray-900'}`}>{chat.name}</h3>
                      <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md ${chat.role === 'System' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-300'}`}>{chat.role}</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-300">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={`text-[11px] leading-relaxed line-clamp-1 ${chat.unreadCount > 0 || chat.role === 'System' ? 'font-bold text-gray-900' : 'text-gray-400 font-medium'}`}>
                      {chat.lastMessage}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="w-5 h-5 bg-green-600 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
