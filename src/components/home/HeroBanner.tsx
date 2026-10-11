import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MapPin } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { 
    selectedZone, 
    hasConfirmedZone,
    searchQuery, 
    setSearchQuery, 
    setActiveTab, 
    setSelectedCategory,
    selectedCategory 
  } = useApp();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('jobs');
  };

  const handlePillClick = (cat: string) => {
    setSelectedCategory(cat);
    setActiveTab('jobs');
  };

  const QUICK_SECTORS = [
    { label: '🏪 Retail & Shops', cat: 'Retail & Shops' },
    { label: '☕ Restaurants & Cafés', cat: 'Restaurants & Cafés' },
    { label: '⛽ Fuel & Logistics', cat: 'Petrol Bunks & Transport' },
    { label: '📦 Warehouses & Field', cat: 'Warehouses & Factories' },
    { label: '🏨 Hotels & Hospitality', cat: 'Hotels & Hospitality' },
    { label: '💻 IT & Technical', cat: 'IT & Professional' },
    { label: '📚 Education & Tutoring', cat: 'Education & Tutoring' }
  ];

  return (
    <div className="hero-banner">
      <div className="hero-content">
        
        {/* Hero Title */}
        <h1 className="hero-title">
          Your Zone. Your Opportunities. <span>Your Community.</span>
        </h1>

        <p className="hero-subtitle">
          Discover verified local jobs, community discussions, and neighborhood offers in {hasConfirmedZone ? <strong>{selectedZone.city || selectedZone.name}</strong> : 'your chosen area'}.
        </p>

        {/* Interactive Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hero-search-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--deep-blue)', paddingLeft: '6px' }}>
            <Search size={22} />
          </div>
          <input
            type="text"
            className="hero-search-input"
            placeholder="Search jobs by role, skills or business (e.g. Cashier, Store Staff, Delivery, Web Dev)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div style={{ height: '24px', width: '1px', background: '#E2E8F0' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '0.85rem', fontWeight: 600 }}>
            <MapPin size={16} color="var(--deep-blue)" />
            <span style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {hasConfirmedZone ? (selectedZone.city || selectedZone.name).split(' ')[0] : 'Any Zone'}
            </span>
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '10px 22px' }}>
            Find Jobs
          </button>
        </form>

        {/* Quick Suggestion Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: '#FFFFFF', opacity: 0.9, fontWeight: 700, textTransform: 'uppercase' }}>
            Browse Sectors:
          </span>
          {QUICK_SECTORS.map((sec) => (
            <button
              key={sec.cat}
              type="button"
              onClick={() => handlePillClick(sec.cat)}
              style={{
                background: selectedCategory === sec.cat ? '#FFFFFF' : 'rgba(255, 255, 255, 0.18)',
                color: selectedCategory === sec.cat ? 'var(--deep-blue)' : '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 'var(--radius-full)',
                padding: '4px 12px',
                fontSize: '0.78rem',
                fontWeight: selectedCategory === sec.cat ? 700 : 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(4px)'
              }}
            >
              {sec.label}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
