import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, ShieldCheck, UploadCloud, CheckCircle2, 
  Clock, Lock 
} from 'lucide-react';
import type { JobCategory } from '../../types';

export const BusinessVerificationModal: React.FC = () => {
  const { 
    isBusinessVerificationModalOpen, 
    setIsBusinessVerificationModalOpen, 
    selectedZone, 
    submitBusinessVerification 
  } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<JobCategory>('Retail & Shops');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState(selectedZone.name);
  const [phone, setPhone] = useState('+91 ');
  const [email, setEmail] = useState('');
  const [regType, setRegType] = useState<'GSTIN' | 'Trade License' | 'Shop & Establishment' | 'Corporate CIN'>('GSTIN');
  const [regNumber, setRegNumber] = useState('');
  const [documentName, setDocumentName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isBusinessVerificationModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !regNumber.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitBusinessVerification({
        name,
        category,
        address: address || `Commercial Complex, ${locality}`,
        locality,
        zoneId: selectedZone.id,
        officialPhone: phone,
        officialEmail: email,
        registrationType: regType,
        registrationNumber: regNumber,
        documentName: documentName || `${regType.replace(/\s+/g, '_')}_Document.pdf`
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsBusinessVerificationModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
          borderBottom: '1px solid #A7F3D0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#059669', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#064E3B' }}>
                Business KYC & Verification
              </h3>
              <div style={{ fontSize: '0.78rem', color: '#047857' }}>
                Earn the verified badge and recruit safely in your zone
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsBusinessVerificationModalOpen(false)}
            className="btn-outline btn-icon"
            style={{ border: 'none', background: 'transparent' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>

          {/* Workflow Timeline Banner */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Verification Workflow
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 700 }}>
                <CheckCircle2 size={14} />
                <span>1. Submit Proof</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#D97706', fontWeight: 700 }}>
                <Clock size={14} />
                <span>2. Admin Review</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#7C3AED', fontWeight: 700 }}>
                <ShieldCheck size={14} />
                <span>3. Badge Active</span>
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Registered Business / Enterprise Name *</label>
            <input
              type="text"
              required
              className="input-control"
              placeholder="e.g. Saffron Bistro Hospitality Pvt Ltd"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="input-group">
              <label className="input-label">Business Sector</label>
              <select
                className="input-control input-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
              >
                <option value="Retail & Shops">Retail & Shops</option>
                <option value="Restaurants & Cafés">Restaurants & Cafés</option>
                <option value="Hotels & Hospitality">Hotels & Hospitality</option>
                <option value="Petrol Bunks & Transport">Petrol Bunks & Transport</option>
                <option value="Warehouses & Factories">Warehouses & Factories</option>
                <option value="Technical & Field Services">Technical Services</option>
                <option value="IT & Professional">IT & Professional</option>
                <option value="Education & Tutoring">Education & Tutoring</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Official Phone *</label>
              <input
                type="tel"
                required
                className="input-control"
                placeholder="+91 98450 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="input-group">
              <label className="input-label">Official Work Email *</label>
              <input
                type="email"
                required
                className="input-control"
                placeholder="contact@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Locality / Zone</label>
              <input
                type="text"
                className="input-control"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="input-group">
              <label className="input-label">Govt Registration Type *</label>
              <select
                className="input-control input-select"
                value={regType}
                onChange={(e) => setRegType(e.target.value as any)}
              >
                <option value="GSTIN">GSTIN Certificate (Goods & Service Tax)</option>
                <option value="Trade License">Municipal Trade License</option>
                <option value="Shop & Establishment">Shop & Commercial Establishment Act</option>
                <option value="Corporate CIN">MCA Certificate of Incorporation (CIN)</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Registration / Tax Number *</label>
              <input
                type="text"
                required
                className="input-control"
                placeholder="e.g. 29ABCDE1234F1Z5 or TL-2026-99"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
              />
            </div>
          </div>

          {/* Document Upload Area */}
          <div className="input-group" style={{ marginBottom: '20px' }}>
            <label className="input-label">Upload Proof Document (PDF, JPEG, PNG)</label>
            <div style={{
              border: '2px dashed #A7F3D0',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              background: '#F0FDF4',
              textAlign: 'center'
            }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#D1FAE5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                <UploadCloud size={20} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#064E3B' }}>
                {documentName ? `Attached: ${documentName}` : 'Click to browse verification document'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#047857', marginTop: '4px' }}>
                Upload GSTIN certificate copy, Trade permit, or FSSAI license (Max 10MB)
              </div>
              <label 
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '12px', cursor: 'pointer', display: 'inline-flex' }}
              >
                <span>Select File</span>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  accept=".pdf,image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setDocumentName(f.name);
                  }}
                />
              </label>
            </div>
          </div>

          {/* Security Notice */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#F8FAFC', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            <Lock size={15} color="#7C3AED" />
            <span>Private Storage: Business registration certificates are restricted strictly to authorized safety reviewers.</span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsBusinessVerificationModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-teal"
              style={{ minWidth: '180px' }}
            >
              <ShieldCheck size={16} />
              <span>{isSubmitting ? 'Uploading...' : 'Submit for Review'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
