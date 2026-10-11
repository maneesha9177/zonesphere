import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, Building2, MapPin, Clock, Calendar, GraduationCap, 
  CheckCircle2, Gift, Phone, Mail, Navigation, Share2, 
  Bookmark, BookmarkCheck, ShieldCheck, AlertTriangle, ArrowRight 
} from 'lucide-react';
import L from 'leaflet';

export const JobDetailsModal: React.FC = () => {
  const { 
    activeJobModal, 
    setActiveJobModal, 
    setIsApplyModalOpen, 
    savedJobIds, 
    toggleSaveJob,
    setReportTarget,
    showToast 
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const job = activeJobModal;
  const isSaved = job ? savedJobIds.includes(job.id) : false;

  // Render mini interactive map for workplace location
  useEffect(() => {
    if (!job || !mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      const map = L.map(mapContainerRef.current, {
        center: [job.lat, job.lng],
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Custom icon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="background: linear-gradient(135deg, #7C3AED, #9333EA); color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4); border: 2px solid white; font-size: 16px;">📍</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 34]
      });

      L.marker([job.lat, job.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<strong>${job.businessName}</strong><br/>${job.workplaceAddress}`)
        .openPopup();

      mapInstanceRef.current = map;
    } catch (e) {
      console.error('Leaflet error:', e);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [job]);

  if (!job) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`🔗 Link for "${job.title}" copied to clipboard!`, 'info');
  };

  const handleDirections = () => {
    showToast(`🧭 Opening navigation routes to "${job.workplaceAddress}"`, 'info');
  };

  return (
    <div className="modal-backdrop" onClick={() => setActiveJobModal(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px' }}>
        
        {/* Top Header */}
        <div style={{
          padding: '24px',
          background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
          borderBottom: '1px solid var(--border-card)',
          position: 'relative'
        }}>
          <button
            onClick={() => setActiveJobModal(null)}
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748B'
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-purple">{job.category}</span>
            <span className="badge badge-teal">{job.employmentType}</span>
            <span className="badge badge-blue">{job.workMode}</span>
            {job.businessVerified && (
              <span className="badge badge-verified">
                <ShieldCheck size={12} />
                Verified Business
              </span>
            )}
          </div>

          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#1E1B4B', marginBottom: '6px' }}>
            {job.title}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
              <Building2 size={16} color="#7C3AED" />
              <span>{job.businessName}</span>
            </div>
            <span>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={16} color="#0D9488" />
              <span>{job.locality}</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '24px' }}>
          
          {/* Salary & Vacancies Bar */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid #DDD6FE',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px',
            boxShadow: '0 4px 14px rgba(124, 58, 237, 0.08)'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Offered Pay Rate
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-700)', fontFamily: 'var(--font-heading)' }}>
                {job.payCurrency}{job.payAmount.toLocaleString()}{' '}
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  per {job.payPeriod.toLowerCase()}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Vacancies
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                  {job.vacancies} {job.vacancies === 1 ? 'Open Position' : 'Open Positions'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Work Schedule
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A' }}>
                  {job.weeklyHolidays}
                </div>
              </div>
            </div>
          </div>

          {/* Shift Details */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            marginBottom: '24px'
          }}>
            <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                <Clock size={14} color="#7C3AED" />
                <span>SHIFT TIMINGS</span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, marginTop: '4px', color: '#1E293B' }}>
                {job.shiftTiming}
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                <GraduationCap size={14} color="#0D9488" />
                <span>QUALIFICATION</span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, marginTop: '4px', color: '#1E293B' }}>
                {job.requiredEducation}
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                <Calendar size={14} color="#EA580C" />
                <span>EXPERIENCE</span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, marginTop: '4px', color: '#1E293B' }}>
                {job.experienceRequired}
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '8px' }}>About the Role</h4>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '8px' }}>Key Responsibilities</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} color="#7C3AED" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Skills & Languages */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '8px' }}>Required Skills & Languages</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {job.requiredSkills.map(skill => (
                <span key={skill} className="badge badge-purple" style={{ fontSize: '0.78rem' }}>
                  {skill}
                </span>
              ))}
              {job.requiredLanguages.map(lang => (
                <span key={lang} className="badge badge-teal" style={{ fontSize: '0.78rem' }}>
                  🗣️ {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits & Perks */}
          {job.benefits && job.benefits.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '8px' }}>Job Perks & Benefits</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                {job.benefits.map((benefit, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#FAF5FF', border: '1px solid #EDE9FE', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', fontWeight: 600, color: '#581C87' }}>
                    <Gift size={15} color="#9333EA" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Workplace Location & Interactive Map */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Workplace Location</h4>
              <button 
                className="btn btn-outline btn-sm"
                onClick={handleDirections}
                style={{ fontSize: '0.75rem', gap: '4px' }}
              >
                <Navigation size={13} color="#7C3AED" />
                <span>Get Directions</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              <MapPin size={16} color="#7C3AED" />
              <span>{job.workplaceAddress}</span>
            </div>

            {/* Leaflet Map Box */}
            <div 
              ref={mapContainerRef} 
              style={{
                height: '200px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-card)',
                boxShadow: 'var(--shadow-sm)'
              }}
            ></div>
          </div>

          {/* Direct Contact Option if provided */}
          {job.contactPhone && (
            <div style={{ padding: '14px', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>DIRECT RECRUITER CONTACT</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A' }}>{job.contactPhone}</div>
              </div>
              <a 
                href={`tel:${job.contactPhone}`}
                className="btn btn-secondary btn-sm"
                style={{ textDecoration: 'none' }}
              >
                <Phone size={14} />
                <span>Call Employer</span>
              </a>
            </div>
          )}

          {/* Report Job button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              onClick={() => setReportTarget({ type: 'job', id: job.id, title: job.title })}
            >
              <AlertTriangle size={13} />
              <span>Report this job (Fraud / Wage Discrepancy / Fake Fee)</span>
            </button>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          background: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-outline"
              onClick={() => toggleSaveJob(job.id)}
            >
              {isSaved ? <BookmarkCheck size={16} color="#7C3AED" /> : <Bookmark size={16} />}
              <span>{isSaved ? 'Saved' : 'Save Job'}</span>
            </button>
            <button
              className="btn btn-outline"
              onClick={handleShare}
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => setIsApplyModalOpen(true)}
            style={{ minWidth: '180px' }}
          >
            <span>Apply for this Job</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};
