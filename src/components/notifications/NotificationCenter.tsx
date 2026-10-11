import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, Check, Trash2, Briefcase, Tag, 
  MessageSquare, ShieldCheck, Clock, ArrowRight 
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const { 
    notifications, 
    markNotificationRead, 
    clearAllNotifications, 
    setActiveTab, 
    setActiveJobModal,
    setActiveOfferModal,
    jobs,
    offers 
  } = useApp();

  const handleNotificationClick = (notif: any) => {
    markNotificationRead(notif.id);
    if (notif.actionTarget) {
      if (notif.actionTarget.tab === 'jobs' && notif.actionTarget.targetId) {
        const found = jobs.find(j => j.id === notif.actionTarget.targetId);
        if (found) setActiveJobModal(found);
      } else if (notif.actionTarget.tab === 'offers' && notif.actionTarget.targetId) {
        const found = offers.find(o => o.id === notif.actionTarget.targetId);
        if (found) setActiveOfferModal(found);
      }
      setActiveTab(notif.actionTarget.tab);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'job_match':
        return <Briefcase size={18} color="var(--deep-blue)" />;
      case 'job_expiring':
        return <Clock size={18} color="var(--pink-accent-dark)" />;
      case 'offer_alert':
        return <Tag size={18} color="var(--deep-blue)" />;
      case 'application_update':
        return <ShieldCheck size={18} color="#10B981" />;
      default:
        return <Bell size={18} color="var(--deep-blue)" />;
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Notification Alerts</h2>
            <span className="badge badge-pink" style={{ fontSize: '0.75rem' }}>
              {notifications.filter(n => !n.read).length} Unread
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Matching vacancies, closing job alerts, and local offers tailored to your profile.
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            className="btn btn-outline btn-sm"
            onClick={clearAllNotifications}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Trash2 size={14} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map(n => (
            <div
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              style={{
                background: n.read ? '#FFFFFF' : 'var(--soft-pink-bg)',
                border: n.read ? '1px solid var(--border-subtle)' : '1.5px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: n.read ? 'none' : '0 4px 12px rgba(40, 101, 138, 0.08)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--deep-blue)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = n.read ? 'var(--border-subtle)' : 'var(--border-subtle)')}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#FFFFFF',
                border: '1px solid var(--border-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px'
              }}>
                {getIcon(n.type)}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '2px' }}>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#1E1B4B' }}>
                    {n.title}
                  </h4>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{n.timeAgo}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {n.message}
                </p>
              </div>

              <div style={{ alignSelf: 'center', color: '#7C3AED' }}>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          background: '#FFFFFF',
          border: '1.5px dashed var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '60px 20px',
          textAlign: 'center'
        }}>
          <Bell size={36} color="#94A3B8" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>No New Notifications</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            You're completely up to date! New matches matching your job preferences will appear here.
          </p>
        </div>
      )}

    </div>
  );
};
