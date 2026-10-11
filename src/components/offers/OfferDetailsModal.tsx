import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, QrCode, Tag, Building2, MapPin, Clock, 
  CheckCircle2, Copy, ShieldCheck, Share2 
} from 'lucide-react';

export const OfferDetailsModal: React.FC = () => {
  const { activeOfferModal, setActiveOfferModal, claimOffer, showToast } = useApp();
  const offer = activeOfferModal;

  if (!offer) return null;

  const handleCopyCode = () => {
    if (offer.code) {
      navigator.clipboard?.writeText(offer.code);
      showToast(`🎟️ Coupon code "${offer.code}" copied to clipboard!`, 'success');
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setActiveOfferModal(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        
        {/* Banner */}
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          <img
            src={offer.bannerImage}
            alt={offer.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)'
          }}></div>

          <button
            onClick={() => setActiveOfferModal(null)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#334155'
            }}
          >
            <X size={18} />
          </button>

          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '20px',
            right: '20px',
            color: 'white'
          }}>
            <div className="offer-discount-tag" style={{ position: 'static', display: 'inline-block', marginBottom: '8px' }}>
              {offer.discountBadge}
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>
              {offer.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            <Building2 size={16} color="#7C3AED" />
            <strong style={{ color: '#0F172A' }}>{offer.businessName}</strong>
            {offer.businessVerified && (
              <span className="badge badge-verified" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                <ShieldCheck size={11} />
                Verified Merchant
              </span>
            )}
            <span>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={15} color="#0D9488" />
              <span>{offer.locality}</span>
            </div>
          </div>

          <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            {offer.description}
          </p>

          {/* Coupon Code Redemption Box */}
          <div style={{
            background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
            border: '2px dashed #FDBA74',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#C2410C', textTransform: 'uppercase', marginBottom: '6px' }}>
              Digital Coupon Code
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: '#FFFFFF',
              border: '1.5px solid #F97316',
              padding: '10px 20px',
              borderRadius: 'var(--radius-md)',
              fontSize: '1.4rem',
              fontWeight: 900,
              color: '#EA580C',
              letterSpacing: '0.08em',
              fontFamily: 'var(--font-heading)'
            }}>
              <span>{offer.code || 'ZONEPROMO'}</span>
              <button
                onClick={handleCopyCode}
                className="btn btn-orange btn-sm"
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                title="Copy code"
              >
                <Copy size={13} />
                <span>Copy</span>
              </button>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#9A3412', marginTop: '10px' }}>
              {offer.instructions}
            </div>
          </div>

          {/* Terms & Conditions */}
          {offer.terms && offer.terms.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>Terms & Conditions</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {offer.terms.map((t, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <CheckCircle2 size={14} color="#EA580C" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Claimed by {offer.claimedCount} local residents
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              claimOffer(offer.id);
              handleCopyCode();
            }}
          >
            <CheckCircle2 size={16} />
            <span>Redeem Coupon</span>
          </button>
        </div>

      </div>
    </div>
  );
};
