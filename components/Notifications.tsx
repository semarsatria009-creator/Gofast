
import React from 'react';
import { AppNotification } from '../types.ts';

interface NotificationsProps {
  onBack: () => void;
  notifications: AppNotification[];
  onNotificationClick: (n: AppNotification) => void;
  onMarkAllAsRead: () => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ 
  onBack, 
  notifications, 
  onNotificationClick,
  onMarkAllAsRead 
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'promo': return { icon: 'fa-tag', color: 'bg-red-50 text-red-600' };
      case 'order': return { icon: 'fa-box', color: 'bg-orange-50 text-orange-600' };
      case 'success': return { icon: 'fa-circle-check', color: 'bg-green-50 text-green-600' };
      case 'info': return { icon: 'fa-circle-info', color: 'bg-blue-50 text-blue-600' };
      default: return { icon: 'fa-bell', color: 'bg-gray-50 text-gray-600' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fade-in">
      {/* Header */}
      <div className="bg-white px-6 pt-16 pb-6 sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-800 active:scale-90 transition-transform">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">Notifikasi</h1>
          </div>
          {notifications.some(n => !n.isRead) && (
            <button 
              onClick={onMarkAllAsRead}
              className="text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-3 py-2 rounded-xl active:scale-95 transition-all"
            >
              Baca Semua
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex justify-between items-center px-2">
           <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Informasi & Update</h2>
           <span className="text-[10px] font-black text-gray-300 uppercase">{notifications.length} Pesan</span>
        </div>
        
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-32 opacity-30">
               <i className="fa-solid fa-bell-slash text-5xl mb-4"></i>
               <p className="text-sm font-bold">Belum ada notifikasi</p>
            </div>
          ) : (
            notifications.map((notif) => {
              const style = getIcon(notif.type);

              return (
                <div 
                  key={notif.id} 
                  onClick={() => onNotificationClick(notif)}
                  className={`p-5 rounded-[2rem] border transition-all animate-slide-up relative overflow-hidden cursor-pointer active:scale-[0.98] ${
                    notif.isRead ? 'bg-white border-gray-100' : 'bg-white border-green-200 shadow-md ring-1 ring-green-50'
                  }`}
                >
                  {!notif.isRead && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5">
                       <span className="text-[8px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">Baru</span>
                       <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                    </div>
                  )}
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${style.color} shadow-inner`}>
                      <i className={`fa-solid ${style.icon} text-lg`}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className={`text-sm leading-tight ${notif.isRead ? 'font-bold text-gray-600' : 'font-black text-gray-900'}`}>{notif.title}</h3>
                        <span className="text-[9px] font-bold text-gray-300 uppercase">{notif.timestamp}</span>
                      </div>
                      <p className={`text-[11px] leading-relaxed ${notif.isRead ? 'text-gray-400 font-medium' : 'text-gray-600 font-bold'}`}>
                        {notif.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        <div className="pt-8 text-center pb-10">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Pusat Informasi GoFast</p>
        </div>
      </div>
    </div>
  );
};
