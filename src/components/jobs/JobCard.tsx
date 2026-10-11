import React from 'react';
import { useApp } from '../../context/AppContext';
import type { JobListing } from '../../types';
import { 
  Building2, MapPin, Clock, Bookmark, BookmarkCheck, 
  Sparkles, ShieldCheck, Flame, ArrowRight, Share2, AlertTriangle 
} from 'lucide-react';

interface JobCardProps {
  job: JobListing;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { 
    savedJobIds, 
    toggleSaveJob, 
    setActiveJobModal, 
    setIsApplyModalOpen,
    setReportTarget,
    showToast 
  } = useApp();

  const isSaved = savedJobIds.includes(job.id);

  // Expiry duration calculation
  const getExpiryDisplay = (expiryDate: string) => {
    const diffMs = new Date(expiryDate).getTime() - new Date().getTime();
    const diffHours = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours <= 0) return { label: 'Expired', badgeClass: 'badge-urgent' };
    if (diffHours < 24) return { label: `Closing in ${diffHours}h`, badgeClass: 'badge-urgent' };
    if (diffDays <= 3) return { label: `Closing in ${diffDays}d`, badgeClass: 'badge-closing' };
    return { label: `Active (${diffDays}d left)`, badgeClass: 'badge-purple' };
  };

  const expiry = getExpiryDisplay(job.expiresAt);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    showToast(`🔗 Link for "${job.title}" copied to clipboard!`, 'info');
  };

  return (
    <div 
      className="job-card"
      onClick={() => setActiveJobModal(job)}
      style={{ cursor: 'pointer' }}
    >
      {/* Header Row */}
      <div className="job-card-header">
        <div>
          <div className="job-biz-title">
            <Building2 size={15} color="var(--deep-blue)" />
            <span style={{ fontWeight: 700 }}>{job.businessName}</span>
            {job.businessVerified && (
              <span className="badge badge-verified" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                <ShieldCheck size={11} />
                Verified
              </span>
            )}
          </div>
          <h3 className="job-main-title">{job.title}</h3>
        </div>

        {/* Bookmark Action */}
        <button
          className="btn-outline btn-icon"
          style={{ 
            borderRadius: '50%', 
            width: '36px', 
            height: '36px', 
            border: 'none', 
            background: isSaved ? 'var(--soft-pink-bg)' : 'var(--light-blue-bg)',
            color: isSaved ? 'var(--pink-accent-dark)' : 'var(--deep-blue)' 
          }}
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveJob(job.id);
          }}
          title={isSaved ? "Remove from bookmarks" : "Save this job"}
        >
          {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>

      {/* Tags Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
        <span className="badge badge-pink" style={{ fontSize: '0.72rem' }}>
          {job.category}
        </span>
        <span className="badge badge-blue" style={{ fontSize: '0.72rem' }}>
          {job.employmentType}
        </span>
        {job.isUrgent && (
          <span className="badge badge-urgent" style={{ fontSize: '0.72rem' }}>
            <Flame size={12} />
            Urgent
          </span>
        )}
        <span className={`badge ${expiry.badgeClass}`} style={{ fontSize: '0.72rem' }}>
          {expiry.label}
        </span>
      </div>

      {/* Salary Highlight Box */}
      <div className="job-salary-banner">
        <div>
          <div className="salary-amount">
            {job.payCurrency}{job.payAmount.toLocaleString()}
          </div>
          <div className="salary-period">
            per {job.payPeriod.toLowerCase()}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {job.vacancies} {job.vacancies === 1 ? 'Vacancy' : 'Vacancies'}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {job.workMode}
          </div>
        </div>
      </div>

      {/* Info Chips */}
      <div className="job-info-chips">
        <div className="info-chip">
          <Clock size={13} color="var(--deep-blue)" />
          <span>{job.shiftTiming.split('/')[0]}</span>
        </div>
        <div className="info-chip">
          <span>🎓 {job.requiredEducation}</span>
        </div>
        <div className="info-chip">
          <span>💼 {job.experienceRequired}</span>
        </div>
      </div>

      {/* Locality Landmark Box */}
      <div style={{
        marginTop: '12px',
        padding: '6px 10px',
        background: 'var(--light-blue-bg)',
        border: '1px solid var(--border-blue)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <MapPin size={14} color="var(--deep-blue)" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--deep-blue)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          📍 {job.locality}
        </span>
      </div>

      {/* Actions Footer */}
      <div className="job-locality-row" style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          {job.applicationMethod === 'Walk-In' ? '🚶 Walk-In Available' : job.applicationMethod === 'Direct Call' ? '📞 Direct Recruiter Call' : '⚡ 1-Click Fast Apply'}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              setActiveJobModal(job);
            }}
          >
            Details
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              setActiveJobModal(job);
              setIsApplyModalOpen(true);
            }}
          >
            <span>Apply</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
};
