import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, Bell, Plus, ShieldCheck, User, Sparkles, 
  Briefcase, Tag, MessageSquare, ChevronDown, CheckCircle2, Shield
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    selectedZone, 
    hasConfirmedZone,
    setIsZonePickerOpen, 
    notifications,
    setIsPostJobModalOpen,
    setIsPostOfferModalOpen,
    setIsCreateRoomModalOpen,
    setIsBusinessVerificationModalOpen,
    setIsAdminDashboardOpen,
    setIsPrivacyModalOpen
  } = useApp();

  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand Logo */}
        <div className="brand-logo-container" onClick={() => setActiveTab('home')}>
          <div className="brand-sphere">
            <Sparkles size={22} />
          </div>
          <div>
            <div className="brand-name">ZONE SPHERE</div>
            <div className="brand-tagline-sub">Your Zone. Your Opportunities. Your Community.</div>
          </div>
        </div>

        {/* Zone Selector Button */}
        <button 
          className="zone-selector-chip"
          onClick={() => setIsZonePickerOpen(true)}
          title={hasConfirmedZone ? `Active zone: ${selectedZone.city || selectedZone.name}, ${selectedZone.state}` : 'Click to choose your zone'}
        >
          <MapPin size={16} color="var(--deep-blue)" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-primary)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {hasConfirmedZone ? `${selectedZone.city || selectedZone.name}, ${selectedZone.state}` : 'Choose your zone'}
            </div>
          </div>
          <ChevronDown size={14} color="var(--deep-blue)" />
        </button>

        {/* Desktop Navigation Tabs */}
        <nav className="nav-tab-list">
          <button 
            className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Feed
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            <Briefcase size={16} />
            Jobs
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'offers' ? 'active' : ''}`}
            onClick={() => setActiveTab('offers')}
          >
            <Tag size={16} />
            Offers
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'discussions' ? 'active' : ''}`}
            onClick={() => setActiveTab('discussions')}
          >
            <MessageSquare size={16} />
            Rooms
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
            style={{ position: 'relative' }}
          >
            <Bell size={16} />
            Alerts
            {unreadNotificationsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#EF4444'
              }}></span>
            )}
          </button>
        </nav>

        {/* Action Controls: + Post, Admin, Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
          {/* Post Dropdown */}
          <div style={{ position: 'relative' }}>
            <button 
              className="btn btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.875rem' }}
              onClick={() => setIsPostMenuOpen(!isPostMenuOpen)}
            >
              <Plus size={16} />
              <span>Post / Create</span>
              <ChevronDown size={14} />
            </button>

            {isPostMenuOpen && (
              <div 
                className="card"
                style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '240px',
                  padding: '8px',
                  zIndex: 600,
                  boxShadow: 'var(--shadow-xl)',
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)'
                }}
              >
                <div style={{ padding: '6px 10px', fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Choose Action
                </div>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F3E8FF')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => {
                    setIsPostMenuOpen(false);
                    setIsPostJobModalOpen(true);
                  }}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED' }}>
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <div>Post a Job Vacancy</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>With Auto-Poster Studio</div>
                  </div>
                </button>

                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#CCFBF1')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => {
                    setIsPostMenuOpen(false);
                    setIsPostOfferModalOpen(true);
                  }}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#CCFBF1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0D9488' }}>
                    <Tag size={16} />
                  </div>
                  <div>
                    <div>Post Local Offer</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Promote verified deals</div>
                  </div>
                </button>

                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#DBEAFE')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => {
                    setIsPostMenuOpen(false);
                    setIsCreateRoomModalOpen(true);
                  }}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <div>Start Discussion Room</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Text or Voice enabled</div>
                  </div>
                </button>

                <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '6px 0' }}></div>

                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 10px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: '#059669',
                    fontWeight: 600,
                    fontSize: '0.8125rem'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#D1FAE5')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => {
                    setIsPostMenuOpen(false);
                    setIsBusinessVerificationModalOpen(true);
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>Verify My Business</span>
                </button>
              </div>
            )}
          </div>

          {/* Admin Portal Button */}
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setIsAdminDashboardOpen(true)}
            title="Open Admin Review & Moderation Panel"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Shield size={15} color="var(--deep-blue)" />
            <span style={{ fontWeight: 700 }}>Admin</span>
          </button>

          {/* Profile Button */}
          <button 
            className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-outline'} btn-icon`}
            onClick={() => setActiveTab('profile')}
            title="My Profile & Job Preferences"
            style={{ width: '38px', height: '38px' }}
          >
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
