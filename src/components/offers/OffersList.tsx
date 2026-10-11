import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OfferCard } from './OfferCard';
import { Tag, Search, Plus, Sparkles, Filter } from 'lucide-react';

export const OffersList: React.FC = () => {
  const { offers, selectedZone, setIsPostOfferModalOpen } = useApp();
  const [offerCategory, setOfferCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const CATEGORIES = [
    'All',
    'Groceries & Food',
    'Dining & Cafés',
    'Auto & Transport',
    'Education',
    'Fashion & Apparel',
    'Salon & Wellness'
  ];

  const [showAllOffers, setShowAllOffers] = useState<boolean>(false);

  const filteredOffers = offers.filter(off => {
    const matchesZone = showAllOffers || off.zoneId === selectedZone.id;
    const matchesCat = offerCategory === 'All' || off.category === offerCategory;
    const matchesSearch = !search || (
      off.title.toLowerCase().includes(search.toLowerCase()) ||
      off.businessName.toLowerCase().includes(search.toLowerCase()) ||
      off.discountBadge.toLowerCase().includes(search.toLowerCase())
    );
    return matchesZone && matchesCat && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Local Business Offers & Deals</h2>
              <span className="badge badge-orange" style={{ fontSize: '0.75rem' }}>
                {filteredOffers.length} Deals
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Exclusive savings from verified stores, restaurants, and outlets in <strong>{selectedZone.name}</strong>.
            </p>
          </div>

          <button
            className="btn btn-orange btn-sm"
            onClick={() => setIsPostOfferModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} />
            <span>Post an Offer</span>
          </button>
        </div>

        {/* Search & Categories */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'var(--bg-main)',
            border: '1.5px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px'
          }}>
            <Search size={18} color="#EA580C" />
            <input
              type="text"
              placeholder="Search local discounts, coupons, restaurants, shops..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '0.92rem',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          <div className="category-pills-wrap" style={{ marginBottom: 0 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`category-pill ${offerCategory === cat ? 'active' : ''}`}
                style={offerCategory === cat ? { background: 'var(--orange-gradient)' } : {}}
                onClick={() => setOfferCategory(cat)}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      {filteredOffers.length > 0 ? (
        <div className="grid-responsive-2">
          {filteredOffers.map(offer => (
            <OfferCard key={offer.id} offer={offer} />
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
          <Tag size={36} color="#EA580C" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>No Active Offers in this Category</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Be the first local business to advertise special discounts in {selectedZone.name}.
          </p>
          <button 
            className="btn btn-orange" 
            style={{ marginTop: '16px' }}
            onClick={() => setIsPostOfferModalOpen(true)}
          >
            Create Offer Promotion
          </button>
        </div>
      )}

    </div>
  );
};
