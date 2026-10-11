import React from 'react';
import { useApp } from '../../context/AppContext';
import type { LocalOffer } from '../../types';
import { 
  Building2, MapPin, Clock, Tag, ShieldCheck, 
  Sparkles, CheckCircle2, QrCode, ArrowRight 
} from 'lucide-react';

interface OfferCardProps {
  offer: LocalOffer;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const { setActiveOfferModal, claimOffer } = useApp();

  const getExpiryLabel = (exp: string) => {
    const diffMs = new Date(exp).getTime() - new Date().getTime();
    const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    if (diffDays <= 0) return 'Ending today';
    return `${diffDays} days left`;
  };

  return (
    <div 
      className="offer-card"
      onClick={() => setActiveOfferModal(offer)}
      style={{ cursor: 'pointer' }}
    >
      {/* Banner Image with Overlays */}
      <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
        <img
          src={offer.bannerImage}
          alt={offer.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.3) 100%)'
        }}></div>

        {/* Discount Badge */}
        <div className="offer-discount-tag">
          {offer.discountBadge}
        </div>

        {/* Sponsored Tag */}
        {offer.isSponsored && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0, 0, 0, 0.65)',
            color: '#FDE047',
            padding: '3px 8px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.68rem',
            fontWeight: 700,
            backdropFilter: 'blur(4px)'
          }}>
            ⭐ Sponsored
          </div>
        )}

        {/* Expiry Pill */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '12px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: '#FFFFFF',
          padding: '3px 8px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.7rem',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backdropFilter: 'blur(4px)'
        }}>
          <Clock size={11} color="#5EEAD4" />
          <span>{getExpiryLabel(offer.expiresAt)}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
          <Building2 size={14} color="#7C3AED" />
          <span style={{ fontWeight: 700 }}>{offer.businessName}</span>
          {offer.businessVerified && (
            <ShieldCheck size={14} color="#10B981" />
          )}
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '8px' }}>
          {offer.title}
        </h3>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '14px', flex: 1 }}>
          {offer.description}
        </p>

        {/* Locality & Claim Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px dashed var(--border-subtle)', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <MapPin size={14} color="#0D9488" />
            <span>{offer.locality}</span>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              claimOffer(offer.id);
              setActiveOfferModal(offer);
            }}
          >
            <QrCode size={14} />
            <span>Redeem Coupon</span>
          </button>
        </div>

      </div>

    </div>
  );
};
