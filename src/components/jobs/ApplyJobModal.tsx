import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, Sparkles, Building2, CheckCircle, UploadCloud, FileText } from 'lucide-react';

export const ApplyJobModal: React.FC = () => {
  const { isApplyModalOpen, setIsApplyModalOpen, activeJobModal, applyForJob } = useApp();

  const [name, setName] = useState('Alex Morgan');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('alex.morgan@email.com');
  const [shift, setShift] = useState('Flexible / As per schedule');
  const [summary, setSummary] = useState('Motivated, reliable local worker eager to contribute immediately with good attendance.');
  const [uploadedResumeName, setUploadedResumeName] = useState<string | null>('Alex_Morgan_BioData.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isApplyModalOpen || !activeJobModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      applyForJob(activeJobModal.id, {
        name,
        phone,
        email,
        shift,
        summary
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsApplyModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
          borderBottom: '1px solid var(--border-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#6B21A8', fontWeight: 800, textTransform: 'uppercase' }}>
              Quick Job Application
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E1B4B' }}>
              Apply for {activeJobModal.title}
            </h3>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              at {activeJobModal.businessName} • {activeJobModal.locality}
            </div>
          </div>
          <button
            onClick={() => setIsApplyModalOpen(false)}
            className="btn-outline btn-icon"
            style={{ border: 'none', background: 'transparent' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="input-group">
              <label className="input-label">Full Name *</label>
              <input 
                type="text" 
                required
                className="input-control" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Your full name"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Phone / WhatsApp *</label>
              <input 
                type="tel" 
                required
                className="input-control" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="+91 98000 00000"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Email Address *</label>
            <input 
              type="email" 
              required
              className="input-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="you@email.com"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Preferred Shift / Availability</label>
            <select 
              className="input-control input-select"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              <option value="Flexible / As per schedule">Flexible / As per schedule</option>
              <option value="Morning Shift (Early Hours)">Morning Shift (Early Hours)</option>
              <option value="Day Shift (9 AM – 6 PM)">Day Shift (9 AM – 6 PM)</option>
              <option value="Evening / Night Shift">Evening / Night Shift</option>
              <option value="Weekends Only (Sat-Sun)">Weekends Only (Sat-Sun)</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Experience & Why You're a Great Fit</label>
            <textarea 
              rows={3}
              className="input-control"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Briefly describe your background, skills or enthusiasm for this role..."
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Resume Upload Box */}
          <div className="input-group" style={{ marginBottom: '24px' }}>
            <label className="input-label">Resume / Bio-Data (Optional)</label>
            <div style={{
              border: '1.5px dashed var(--primary-300)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              background: '#FAF5FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EDE9FE', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E1B4B' }}>
                    {uploadedResumeName || 'No resume attached'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#6B21A8' }}>
                    PDF, DOCX or image bio-data (Max 5MB)
                  </div>
                </div>
              </div>

              <label 
                className="btn btn-secondary btn-sm" 
                style={{ cursor: 'pointer', margin: 0, padding: '6px 12px', fontSize: '0.78rem' }}
              >
                <UploadCloud size={14} />
                <span>Upload</span>
                <input 
                  type="file" 
                  style={{ display: 'none' }} 
                  accept=".pdf,.doc,.docx,image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setUploadedResumeName(file.name);
                  }}
                />
              </label>
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsApplyModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{ minWidth: '160px' }}
            >
              <Send size={16} />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
