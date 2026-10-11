import React from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, ShieldCheck, Tag, MessageSquare } from 'lucide-react';

export const ZoneStatsBar: React.FC = () => {
  const { filteredJobs, filteredBusinesses, filteredOffers, filteredRooms, selectedZone } = useApp();

  const activeJobsCount = filteredJobs.filter(j => j.status === 'Active' || j.status === 'Closing Soon').length;
  const verifiedBizCount = filteredBusinesses.filter(b => b.verificationStatus === 'Approved').length;
  const activeOffersCount = filteredOffers.length;
  const liveRoomsCount = filteredRooms.length;

  return (
    <div className="stats-bar" style={{ border: '1.5px solid var(--border-subtle)', background: '#FFFFFF' }}>
      
      <div className="stat-item">
        <div className="stat-icon-wrapper" style={{ background: 'var(--soft-pink-bg)', color: 'var(--pink-accent-dark)' }}>
          <Briefcase size={22} />
        </div>
        <div>
          <div className="stat-val" style={{ color: 'var(--deep-blue)' }}>{activeJobsCount} Active Jobs</div>
          <div className="stat-label">In {selectedZone.name.split(' ')[0]}</div>
        </div>
      </div>

      <div style={{ width: '1px', height: '36px', background: 'var(--border-subtle)' }} className="stat-divider"></div>

      <div className="stat-item">
        <div className="stat-icon-wrapper" style={{ background: 'var(--light-blue-bg)', color: 'var(--deep-blue)' }}>
          <ShieldCheck size={22} />
        </div>
        <div>
          <div className="stat-val" style={{ color: 'var(--deep-blue)' }}>{verifiedBizCount} Verified Employers</div>
          <div className="stat-label">KYC Checked & Audited</div>
        </div>
      </div>

      <div style={{ width: '1px', height: '36px', background: 'var(--border-subtle)' }} className="stat-divider"></div>

      <div className="stat-item">
        <div className="stat-icon-wrapper" style={{ background: 'var(--soft-pink-bg)', color: 'var(--pink-accent-dark)' }}>
          <Tag size={22} />
        </div>
        <div>
          <div className="stat-val" style={{ color: 'var(--deep-blue)' }}>{activeOffersCount} Local Deals</div>
          <div className="stat-label">Exclusive Discounts</div>
        </div>
      </div>

      <div style={{ width: '1px', height: '36px', background: 'var(--border-subtle)' }} className="stat-divider"></div>

      <div className="stat-item">
        <div className="stat-icon-wrapper" style={{ background: 'var(--light-blue-bg)', color: 'var(--deep-blue)' }}>
          <MessageSquare size={22} />
        </div>
        <div>
          <div className="stat-val" style={{ color: 'var(--deep-blue)' }}>{liveRoomsCount} Community Rooms</div>
          <div className="stat-label">Voice & Text Discussions</div>
        </div>
      </div>

    </div>
  );
};
