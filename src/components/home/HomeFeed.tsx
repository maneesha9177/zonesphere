import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeroBanner } from './HeroBanner';
import { ZoneStatsBar } from './ZoneStatsBar';
import { JobCard } from '../jobs/JobCard';
import { OfferCard } from '../offers/OfferCard';
import { 
  Flame, Tag, MessageSquare, Briefcase, 
  ArrowRight, Sparkles, MapPin, Plus 
} from 'lucide-react';

export const HomeFeed: React.FC = () => {
  const { 
    filteredJobs, 
    filteredOffers, 
    filteredRooms, 
    selectedZone, 
    setIsZonePickerOpen,
    setActiveTab, 
    setActiveRoomModal, 
    setIsPostJobModalOpen 
  } = useApp();

  const urgentJobs = filteredJobs.filter(j => j.isUrgent || j.status === 'Closing Soon').slice(0, 3);
  const featuredJobs = filteredJobs.slice(0, 6);
  const hotOffers = filteredOffers.slice(0, 2);
  const trendingRooms = filteredRooms.slice(0, 3);

  const hasContent = filteredJobs.length > 0 || filteredOffers.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Zone Quick Stats Bar */}
      <ZoneStatsBar />

      {/* If No Opportunities in Active Zone */}
      {!hasContent ? (
        <div style={{
          background: '#FFFFFF',
          border: '1.5px dashed var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '48px 24px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--soft-pink-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--deep-blue)',
            margin: '0 auto 16px',
            border: '1px solid var(--border-subtle)'
          }}>
            <Briefcase size={30} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
            No opportunities in this zone yet.
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto 20px' }}>
            Try another zone or check back later.
          </p>
          <button className="btn btn-primary" onClick={() => setIsZonePickerOpen(true)}>
            <MapPin size={16} />
            <span>Choose Another Zone</span>
          </button>
        </div>
      ) : (
        <>
          {/* 3. Urgent / Closing Soon Local Openings Spotlight */}
          {urgentJobs.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--soft-pink-bg)', color: 'var(--pink-accent-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Flame size={18} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      Urgent & Fast-Hiring in {selectedZone.name}
                    </h2>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Employers actively conducting walk-in interviews this week
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setActiveTab('jobs')}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>View All Jobs</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="grid-responsive-3">
                {urgentJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </section>
          )}

          {/* 4. Local Business Deals & Hot Offers Spotlight */}
          {hotOffers.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--light-blue-bg)', color: 'var(--deep-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Tag size={18} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      Verified Local Business Offers
                    </h2>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Discounts, vouchers, and coupons from neighborhood merchants
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setActiveTab('offers')}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>Browse All Deals</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="grid-responsive-2">
                {hotOffers.map(offer => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            </section>
          )}

          {/* 5. Trending Community Discussion Rooms */}
          {trendingRooms.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--light-blue-bg)', color: 'var(--deep-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      Live Neighbourhood Rooms
                    </h2>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Real-time text chat and voice lounges in your zone
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setActiveTab('discussions')}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>All Rooms</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div className="grid-responsive-3">
                {trendingRooms.map(room => (
                  <div
                    key={room.id}
                    className="card"
                    onClick={() => {
                      setActiveRoomModal(room);
                      setActiveTab('discussions');
                    }}
                    style={{
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>
                        {room.topic}
                      </span>
                      {room.isVoiceActive && (
                        <span className="badge badge-teal" style={{ fontSize: '0.68rem' }}>
                          🎙️ Voice ({room.voiceParticipantsCount})
                        </span>
                      )}
                    </div>

                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {room.title}
                    </h4>

                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, flex: 1, marginBottom: '12px' }}>
                      {room.description}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px dashed var(--border-subtle)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <span>👥 {room.activeParticipantsCount} members</span>
                      <span style={{ color: 'var(--deep-blue)', fontWeight: 700 }}>Enter Room →</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 6. All Active Opportunities Grid in Zone */}
          {featuredJobs.length > 0 && (
            <section>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    More Opportunities in {selectedZone.name}
                  </h2>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Non-IT & IT jobs across retail, restaurants, logistics, fuel bunks, and offices
                  </div>
                </div>
              </div>

              <div className="grid-responsive-3">
                {featuredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* 7. Call To Action Banner for Local Businesses */}
      <div style={{
        background: 'linear-gradient(135deg, var(--soft-pink-bg) 0%, var(--light-blue-bg) 100%)',
        border: '1.5px dashed var(--baby-pink)',
        borderRadius: 'var(--radius-xl)',
        padding: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Sparkles size={20} color="var(--pink-accent-dark)" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--deep-blue)' }}>
              Are You a Local Business or Employer?
            </h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '560px' }}>
            Post vacancies, generate hiring notices, and advertise offers directly to verified residents in your neighbourhood.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => setIsPostJobModalOpen(true)}
          >
            <Plus size={18} />
            <span>Post a Vacancy Now</span>
          </button>
        </div>
      </div>

    </div>
  );
};
