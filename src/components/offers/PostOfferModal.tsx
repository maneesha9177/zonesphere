import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Tag, Sparkles, Building2, UploadCloud, Calendar } from 'lucide-react';

export const PostOfferModal: React.FC = () => {
  const { 
    isPostOfferModalOpen, 
    setIsPostOfferModalOpen, 
    businesses, 
    selectedZone, 
    createOffer 
  } = useApp();

  const [bizId, setBizId] = useState(businesses[0]?.id || 'custom');
  const [title, setTitle] = useState('');
  const [discountBadge, setDiscountBadge] = useState('20% OFF');
  const [category, setCategory] = useState('Groceries & Food');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('ZONE20');
  const [instructions, setInstructions] = useState('Present this digital code to the cashier before billing.');
  const [bannerUrl, setBannerUrl] = useState('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80');
  const [isSponsored, setIsSponsored] = useState(false);

  if (!isPostOfferModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const chosenBiz = businesses.find(b => b.id === bizId) || { name: 'Local Store', locality: selectedZone.name };

    createOffer({
      businessId: bizId,
      businessName: chosenBiz.name,
      title,
      discountBadge,
      category,
      description,
      code,
      instructions,
      bannerImage: bannerUrl,
      isSponsored,
      locality: chosenBiz.locality || selectedZone.name,
      zoneId: selectedZone.id,
      terms: [
        'Valid on in-store purchases within promotion window',
        'Cannot be clubbed with bulk clearance items'
      ]
    });
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsPostOfferModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
          borderBottom: '1px solid #FED7AA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#EA580C', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Tag size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#7C2D12' }}>
                Post Local Business Offer
              </h3>
              <div style={{ fontSize: '0.78rem', color: '#9A3412' }}>
                Attract neighborhood shoppers in {selectedZone.name}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsPostOfferModalOpen(false)}
            className="btn-outline btn-icon"
            style={{ border: 'none', background: 'transparent' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          
          <div className="input-group">
            <label className="input-label">Select Business Merchant *</label>
            <select
              className="input-control input-select"
              value={bizId}
              onChange={(e) => setBizId(e.target.value)}
            >
              {businesses.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
            <div className="input-group">
              <label className="input-label">Offer Headline *</label>
              <input
                type="text"
                required
                className="input-control"
                placeholder="e.g. Weekend Deal: 25% Off Fresh Breads"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Discount Badge *</label>
              <input
                type="text"
                required
                className="input-control"
                placeholder="e.g. 25% OFF / BOGO"
                value={discountBadge}
                onChange={(e) => setDiscountBadge(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="input-group">
              <label className="input-label">Offer Category</label>
              <select
                className="input-control input-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Groceries & Food">Groceries & Food</option>
                <option value="Dining & Cafés">Dining & Cafés</option>
                <option value="Auto & Transport">Auto & Transport</option>
                <option value="Education">Education</option>
                <option value="Fashion & Apparel">Fashion & Apparel</option>
                <option value="Salon & Wellness">Salon & Wellness</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Coupon Promo Code</label>
              <input
                type="text"
                className="input-control"
                placeholder="e.g. ZONEBAKE25"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Offer Description</label>
            <textarea
              rows={3}
              className="input-control"
              placeholder="Describe what customers get, conditions, and special perks..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Redemption Instructions</label>
            <input
              type="text"
              className="input-control"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={isSponsored}
                onChange={(e) => setIsSponsored(e.target.checked)}
                style={{ accentColor: '#EA580C' }}
              />
              <span>⭐ Highlight as Sponsored Top Offer in Zone Feed</span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsPostOfferModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-orange"
              style={{ minWidth: '160px' }}
            >
              <span>Publish Offer</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
