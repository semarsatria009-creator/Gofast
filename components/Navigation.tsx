
import React from 'react';
import { AppView } from '../types.ts';

interface NavigationProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  language?: 'id' | 'en';
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange, language = 'id' }) => {
  const translations = {
    id: { home: 'Beranda', activity: 'Aktivitas', profile: 'Profil' },
    en: { home: 'Home', activity: 'Activity', profile: 'Profile' }
  };

  const t = translations[language];

  const tabs = [
    { id: AppView.HOME, label: t.home, icon: 'fa-home' },
    { id: AppView.HISTORY, label: t.activity, icon: 'fa-list-check' },
    { id: AppView.PROFILE, label: t.profile, icon: 'fa-user' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onViewChange(tab.id)}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentView === tab.id ? 'text-sky-500' : 'text-gray-400'
          }`}
        >
          <i className={`fa-solid ${tab.icon} text-xl`}></i>
          <span className="text-[10px] font-bold uppercase tracking-tighter">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};
