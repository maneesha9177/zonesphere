import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Shield, Lock, MapPin, EyeOff, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyNoticeModal: React.FC = () => {
  const { isPrivacyModalOpen, setIsPrivacyModalOpen } = useApp();

  if (!isPrivacyModalOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => setIsPrivacyModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: '#FFFFFF',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
              <Shield size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                Privacy & Location Safety Charter
              </h3>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                How ZONE SPHERE safeguards your identity and coordinates
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsPrivacyModalOpen(false)}
            style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FAF5FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
              <EyeOff size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: '2px' }}>
                1. No Raw Coordinates Exposure
              </h4>
              <p>
                ZONE SPHERE uses polygon and radius cluster estimation. Your exact latitude and longitude are NEVER exposed to employers, recruiters, or fellow discussion room members.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F0FDFA', color: '#0D9488', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
              <MapPin size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: '2px' }}>
                2. Separation of Public Business vs Private User Locations
              </h4>
              <p>
                Public markers shown on maps represent verified physical employer business premises (e.g. stores, offices, warehouses). Job seeker private homes are never geolocated.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FFF7ED', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
              <Lock size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: '2px' }}>
                3. Confidential Verification Proof Vault
              </h4>
              <p>
                Business verification documents (GST certificates, trade licenses) are placed in an encrypted vault accessible only to authorised platform compliance moderators.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
              <FileText size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: '2px' }}>
                4. Content Expiry (TTL) & Right to Erasure
              </h4>
              <p>
                Job vacancies and offers automatically expire from active feeds once their deadline is reached. Users maintain the full right to export or permanently erase application records.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', background: '#F8FAFC' }}>
          <button
            className="btn btn-primary"
            onClick={() => setIsPrivacyModalOpen(false)}
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
