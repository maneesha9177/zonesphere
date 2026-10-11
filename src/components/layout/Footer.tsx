import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Shield, MapPin, Heart, Lock, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsPrivacyModalOpen, setIsZonePickerOpen, setSelectedCategory, setActiveTab } = useApp();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setActiveTab('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#0F172A', color: '#94A3B8', padding: '48px 20px 32px', marginTop: '60px', borderTop: '1px solid #1E293B' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '36px', marginBottom: '40px' }}>
          
          {/* Col 1: Brand & Tagline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div className="brand-sphere" style={{ width: '34px', height: '34px' }}>
                <Sparkles size={18} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                ZONE SPHERE
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#CBD5E1', marginBottom: '16px' }}>
              Your Zone. Your Opportunities. Your Community. Connecting local job seekers, verified businesses, shopping deals, and real-time neighbourhood discussions.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#5EEAD4' }}>
              <Shield size={16} />
              <span>Privacy-First: Exact user coordinates never stored or shared</span>
            </div>
          </div>

          {/* Col 2: Popular Non-IT & IT Sectors */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>
              Local Employment Sectors
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <button 
                onClick={() => handleCategoryClick('Retail & Shops')}
                style={{ background: 'none', border: 'none', color: '#94A3B8', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C084FC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                • Retail, Shops & Cashiers
              </button>
              <button 
                onClick={() => handleCategoryClick('Restaurants & Cafés')}
                style={{ background: 'none', border: 'none', color: '#94A3B8', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C084FC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                • Restaurants, Baristas & Chefs
              </button>
              <button 
                onClick={() => handleCategoryClick('Petrol Bunks & Transport')}
                style={{ background: 'none', border: 'none', color: '#94A3B8', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C084FC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                • Petrol Bunks, Drivers & Helpers
              </button>
              <button 
                onClick={() => handleCategoryClick('Warehouses & Factories')}
                style={{ background: 'none', border: 'none', color: '#94A3B8', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C084FC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                • Warehouses, Packing & Sorters
              </button>
              <button 
                onClick={() => handleCategoryClick('IT & Professional')}
                style={{ background: 'none', border: 'none', color: '#94A3B8', textAlign: 'left', cursor: 'pointer', padding: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C084FC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                • IT Developers, Web & Tech Support
              </button>
            </div>
          </div>

          {/* Col 3: Platform Safety & Privacy */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>
              Safety & Verification
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={15} color="#A855F7" />
                <span>Verified Business Badging</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} color="#14B8A6" />
                <span>Fuzzed Geofenced Zone Feeds</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={15} color="#F97316" />
                <span>Anti-Scam & Wage Fraud Audits</span>
              </div>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setIsPrivacyModalOpen(true)}
                style={{ marginTop: '6px', alignSelf: 'flex-start', fontSize: '0.78rem' }}
              >
                View Privacy & Safety Policy
              </button>
            </div>
          </div>

          {/* Col 4: Zone Switcher */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>
              Geographical Zones
            </h4>
            <p style={{ fontSize: '0.82rem', marginBottom: '12px' }}>
              Switch your active zone radius or search in neighbouring municipal clusters.
            </p>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setIsZonePickerOpen(true)}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <MapPin size={16} />
              <span>Change Zone / Radius</span>
            </button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1E293B', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.8rem' }}>
          <div>
            © 2026 ZONE SPHERE Inc. • All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => setIsPrivacyModalOpen(true)}>Privacy Notice</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Moderator Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
