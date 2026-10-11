import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Briefcase, Tag, MessageSquare, Bell, User } from 'lucide-react';

export const MobileNavigation: React.FC = () => {
  const { activeTab, setActiveTab, notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="mobile-bottom-nav">
      <button 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'none',
          border: 'none',
          color: activeTab === 'home' ? '#7C3AED' : '#64748B',
          fontWeight: activeTab === 'home' ? 700 : 500,
          fontSize: '0.72rem',
          cursor: 'pointer'
        }}
        onClick={() => setActiveTab('home')}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'none',
          border: 'none',
          color: activeTab === 'jobs' ? '#7C3AED' : '#64748B',
          fontWeight: activeTab === 'jobs' ? 700 : 500,
          fontSize: '0.72rem',
          cursor: 'pointer'
        }}
        onClick={() => setActiveTab('jobs')}
      >
        <Briefcase size={20} />
        <span>Jobs</span>
      </button>

      <button 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'none',
          border: 'none',
          color: activeTab === 'offers' ? '#7C3AED' : '#64748B',
          fontWeight: activeTab === 'offers' ? 700 : 500,
          fontSize: '0.72rem',
          cursor: 'pointer'
        }}
        onClick={() => setActiveTab('offers')}
      >
        <Tag size={20} />
        <span>Offers</span>
      </button>

      <button 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'none',
          border: 'none',
          color: activeTab === 'discussions' ? '#7C3AED' : '#64748B',
          fontWeight: activeTab === 'discussions' ? 700 : 500,
          fontSize: '0.72rem',
          cursor: 'pointer'
        }}
        onClick={() => setActiveTab('discussions')}
      >
        <MessageSquare size={20} />
        <span>Rooms</span>
      </button>

      <button 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'none',
          border: 'none',
          color: activeTab === 'notifications' ? '#7C3AED' : '#64748B',
          fontWeight: activeTab === 'notifications' ? 700 : 500,
          fontSize: '0.72rem',
          position: 'relative',
          cursor: 'pointer'
        }}
        onClick={() => setActiveTab('notifications')}
      >
        <Bell size={20} />
        <span>Alerts</span>
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '12px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#EF4444'
          }}></span>
        )}
      </button>

      <button 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          background: 'none',
          border: 'none',
          color: activeTab === 'profile' ? '#7C3AED' : '#64748B',
          fontWeight: activeTab === 'profile' ? 700 : 500,
          fontSize: '0.72rem',
          cursor: 'pointer'
        }}
        onClick={() => setActiveTab('profile')}
      >
        <User size={20} />
        <span>Profile</span>
      </button>
    </div>
  );
};
