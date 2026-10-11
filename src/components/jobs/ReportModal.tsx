import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, AlertTriangle, ShieldAlert, Send } from 'lucide-react';

export const ReportModal: React.FC = () => {
  const { reportTarget, setReportTarget, submitReport } = useApp();

  const [reason, setReason] = useState<any>('Fraudulent job or fake employer');
  const [details, setDetails] = useState('');

  if (!reportTarget) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport({
      contentType: reportTarget.type,
      contentId: reportTarget.id,
      contentTitle: reportTarget.title,
      reason,
      additionalDetails: details || 'User flagged for safety review.'
    });
  };

  return (
    <div className="modal-backdrop" onClick={() => setReportTarget(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
          borderBottom: '1px solid #FECDD3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#F43F5E', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#9F1239' }}>
                Safety & Moderation Report
              </h3>
              <div style={{ fontSize: '0.78rem', color: '#BE123C' }}>
                Flagging: "{reportTarget.title}"
              </div>
            </div>
          </div>
          <button
            onClick={() => setReportTarget(null)}
            className="btn-outline btn-icon"
            style={{ border: 'none', background: 'transparent' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          
          <div className="input-group">
            <label className="input-label">Reason for Flagging *</label>
            <select
              className="input-control input-select"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="Fraudulent job or fake employer">Fraudulent job or fake employer</option>
              <option value="Asking for upfront security money">Asking for upfront security money (Deposit / Training fee)</option>
              <option value="Misleading pay / terms">Misleading salary / job terms</option>
              <option value="Spam or abusive content">Spam or abusive content</option>
              <option value="Expired or closed vacancy">Expired or closed vacancy</option>
              <option value="Inappropriate discussion content">Inappropriate discussion content</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Additional Details / Evidence (Optional)</label>
            <textarea
              rows={4}
              className="input-control"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe what happened or provide message screenshots context..."
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ padding: '10px 14px', background: '#F8FAFC', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Reports are immediately sent to the human moderation queue and recorded in the system audit logs.
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setReportTarget(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn"
              style={{ background: '#E11D48', color: 'white', minWidth: '140px' }}
            >
              <Send size={15} />
              <span>Submit Report</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
