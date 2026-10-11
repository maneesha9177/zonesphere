import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bookmark, Clock, Check, Sliders, 
  ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { JobCard } from '../jobs/JobCard';
import type { JobCategory, EmploymentType } from '../../types';

export const ProfileView: React.FC = () => {
  const { 
    jobs, 
    savedJobIds, 
    applications, 
    userPreferences, 
    updateUserPreferences, 
    selectedZone, 
    setIsPrivacyModalOpen, 
    showToast 
  } = useApp();

  const [activeProfileTab, setActiveProfileTab] = useState<'preferences' | 'saved' | 'applied' | 'privacy'>('preferences');

  // Local preferences draft state
  const [categories, setCategories] = useState<JobCategory[]>(userPreferences.preferredCategories);
  const [empTypes, setEmpTypes] = useState<EmploymentType[]>(userPreferences.preferredEmploymentTypes);
  const [shifts, setShifts] = useState<string[]>(userPreferences.preferredShifts);
  const [minPay, setMinPay] = useState<number>(userPreferences.minimumPayMonthly);
  const [jobAlerts, setJobAlerts] = useState<boolean>(userPreferences.enableJobAlerts);
  const [offerAlerts, setOfferAlerts] = useState<boolean>(userPreferences.enableOfferAlerts);

  const ALL_CATEGORIES: JobCategory[] = [
    'Retail & Shops',
    'Restaurants & Cafés',
    'Hotels & Hospitality',
    'Petrol Bunks & Transport',
    'Warehouses & Factories',
    'Daily-Wage & Local Labor',
    'Technical & Field Services',
    'Office, Support & Admin',
    'IT & Professional',
    'Education & Tutoring'
  ];

  const ALL_EMP_TYPES: EmploymentType[] = [
    'Full-Time',
    'Part-Time',
    'Daily-Wage',
    'Shift-Based',
    'Weekend-Only',
    'Internship'
  ];

  const ALL_SHIFTS = [
    'Morning Shift (6 AM - 2 PM)',
    'Day Shift (9 AM - 6 PM)',
    'Evening Shift (4 PM - 10 PM)',
    'Night Shift (10 PM - 6 AM)',
    'Weekend Only (Sat - Sun)',
    'Flexible Hours'
  ];

  const toggleCategory = (cat: JobCategory) => {
    if (categories.includes(cat)) {
      setCategories(prev => prev.filter(c => c !== cat));
    } else {
      setCategories(prev => [...prev, cat]);
    }
  };

  const toggleEmpType = (t: EmploymentType) => {
    if (empTypes.includes(t)) {
      setEmpTypes(prev => prev.filter(x => x !== t));
    } else {
      setEmpTypes(prev => [...prev, t]);
    }
  };

  const toggleShift = (s: string) => {
    if (shifts.includes(s)) {
      setShifts(prev => prev.filter(x => x !== s));
    } else {
      setShifts(prev => [...prev, s]);
    }
  };

  const handleSavePreferences = () => {
    updateUserPreferences({
      preferredCategories: categories,
      preferredEmploymentTypes: empTypes,
      preferredShifts: shifts,
      minimumPayMonthly: minPay,
      enableJobAlerts: jobAlerts,
      enableOfferAlerts: offerAlerts
    });
  };

  const savedJobsList = jobs.filter(j => savedJobIds.includes(j.id));

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Profile Header Card */}
      <div style={{
        background: 'var(--gradient-card-header)',
        border: '1.5px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="Alex Morgan"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #FFFFFF',
              boxShadow: '0 4px 14px rgba(40, 101, 138, 0.15)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Alex Morgan
              </h2>
              <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                Active Seeker
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--deep-blue)', fontWeight: 600, marginTop: '2px' }}>
              📍 {selectedZone.name} • Looking for Part-Time & Weekend Opportunities
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              <span>📞 +91 98765 43210</span>
              <span>•</span>
              <span>✉️ alex.morgan@email.com</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Pill */}
        <div style={{
          display: 'flex',
          gap: '14px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          padding: '12px 18px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--deep-blue)' }}>{savedJobsList.length}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Saved Jobs</div>
          </div>
          <div style={{ width: '1px', background: 'var(--border-subtle)' }}></div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--pink-accent-dark)' }}>{applications.length}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Applications</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '4px',
        overflowX: 'auto'
      }}>
        <button
          className={`btn ${activeProfileTab === 'preferences' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveProfileTab('preferences')}
          style={{ fontSize: '0.875rem' }}
        >
          <Sliders size={15} />
          <span>My Job Preferences</span>
        </button>

        <button
          className={`btn ${activeProfileTab === 'saved' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveProfileTab('saved')}
          style={{ fontSize: '0.875rem' }}
        >
          <Bookmark size={15} />
          <span>Saved Bookmarks ({savedJobsList.length})</span>
        </button>

        <button
          className={`btn ${activeProfileTab === 'applied' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveProfileTab('applied')}
          style={{ fontSize: '0.875rem' }}
        >
          <Clock size={15} />
          <span>My Applications ({applications.length})</span>
        </button>

        <button
          className={`btn ${activeProfileTab === 'privacy' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveProfileTab('privacy')}
          style={{ fontSize: '0.875rem' }}
        >
          <ShieldCheck size={15} />
          <span>Privacy & Controls</span>
        </button>
      </div>

      {/* Tab 1: MY JOB PREFERENCES */}
      {activeProfileTab === 'preferences' && (
        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
          
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '4px' }}>
              Target Employment Sectors
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Select all sectors you are willing to work in. We notify you immediately when new listings match.
            </p>
          </div>

          {/* Sector Checkbox Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px', marginBottom: '28px' }}>
            {ALL_CATEGORIES.map(cat => {
              const checked = categories.includes(cat);
              return (
                <div
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: checked ? '2px solid #7C3AED' : '1px solid var(--border-subtle)',
                    background: checked ? '#FAF5FF' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: checked ? '2px solid #7C3AED' : '1.5px solid #94A3B8',
                    background: checked ? '#7C3AED' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    {checked && <Check size={12} />}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: checked ? 700 : 500, color: checked ? '#4C1D95' : 'var(--text-primary)' }}>
                    {cat}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Employment Type Preferences */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '4px' }}>
              Preferred Employment Types
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px', marginTop: '12px' }}>
              {ALL_EMP_TYPES.map(type => {
                const checked = empTypes.includes(type);
                return (
                  <div
                    key={type}
                    onClick={() => toggleEmpType(type)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: checked ? '2px solid #2563EB' : '1px solid var(--border-subtle)',
                      background: checked ? '#EFF6FF' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '4px',
                      border: checked ? '2px solid #2563EB' : '1.5px solid #94A3B8',
                      background: checked ? '#2563EB' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      {checked && <Check size={11} />}
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: checked ? 700 : 500, color: checked ? '#1D4ED8' : 'var(--text-primary)' }}>
                      {type}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preferred Shifts */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '4px' }}>
              Preferred Shift Timings
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginTop: '12px' }}>
              {ALL_SHIFTS.map(shift => {
                const checked = shifts.includes(shift);
                return (
                  <div
                    key={shift}
                    onClick={() => toggleShift(shift)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: checked ? '2px solid #0D9488' : '1px solid var(--border-subtle)',
                      background: checked ? '#F0FDFA' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '4px',
                      border: checked ? '2px solid #0D9488' : '1.5px solid #94A3B8',
                      background: checked ? '#0D9488' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      {checked && <Check size={11} />}
                    </div>
                    <span style={{ fontSize: '0.82rem', fontWeight: checked ? 700 : 500, color: checked ? '#0F766E' : 'var(--text-primary)' }}>
                      {shift}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Minimum Pay Expectation Slider */}
          <div style={{ marginBottom: '28px', background: '#F8FAFC', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="input-label" style={{ marginBottom: 0 }}>
                Minimum Pay Floor Expectation: <strong style={{ color: '#7C3AED' }}>₹{minPay.toLocaleString()} / month</strong>
              </label>
            </div>
            <input
              type="range"
              min="5000"
              max="60000"
              step="2000"
              value={minPay}
              onChange={(e) => setMinPay(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#7C3AED', cursor: 'pointer' }}
            />
          </div>

          {/* Alert Toggles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={jobAlerts}
                onChange={(e) => setJobAlerts(e.target.checked)}
                style={{ accentColor: '#7C3AED', width: '18px', height: '18px' }}
              />
              <span>🔔 Send instant in-app alerts whenever new vacancies match these sectors in {selectedZone.name}</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={offerAlerts}
                onChange={(e) => setOfferAlerts(e.target.checked)}
                style={{ accentColor: '#7C3AED', width: '18px', height: '18px' }}
              />
              <span>🏷️ Notify me about special local store discounts & shopping offers</span>
            </label>
          </div>

          {/* Save Button */}
          <button
            className="btn btn-primary btn-lg"
            onClick={handleSavePreferences}
          >
            <CheckCircle2 size={18} />
            <span>Save Preferences & Matching Criteria</span>
          </button>

        </div>
      )}

      {/* Tab 2: SAVED BOOKMARKS */}
      {activeProfileTab === 'saved' && (
        <div>
          {savedJobsList.length > 0 ? (
            <div className="grid-responsive-2">
              {savedJobsList.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div style={{ background: '#FFFFFF', padding: '60px 20px', textAlign: 'center', borderRadius: 'var(--radius-xl)', border: '1.5px dashed var(--border-card)' }}>
              <Bookmark size={36} color="#94A3B8" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>No Bookmarked Jobs Yet</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Click the bookmark icon on any job card in the Jobs tab to save it here for later.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: MY APPLICATIONS TRACKER */}
      {activeProfileTab === 'applied' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {applications.map(app => (
            <div
              key={app.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Applied at {app.businessName} • {new Date(app.appliedAt).toLocaleDateString()}
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                  {app.jobTitle}
                </h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Availability: <strong>{app.preferredShift}</strong>
                </div>
              </div>

              <div>
                <span className={`badge ${
                  app.status === 'Interview Shortlisted' ? 'badge-teal' :
                  app.status === 'Accepted' ? 'badge-verified' : 'badge-purple'
                }`} style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: PRIVACY & DATA CONTROLS */}
      {activeProfileTab === 'privacy' && (
        <div style={{ background: '#FFFFFF', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: '28px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>
            Privacy-First Architecture & Data Rights
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
            ZONE SPHERE operates under strict privacy-preserving principles. We believe that discovering local jobs and neighborhood deals should never require continuous GPS tracking or exposure of your physical coordinates.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '16px', background: '#FAF5FF', borderRadius: 'var(--radius-md)', border: '1px solid #EDE9FE' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#581C87', marginBottom: '6px' }}>
                🛡️ Fuzzed Geofence Only
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#6B21A8', lineHeight: 1.5 }}>
                Your GPS signals are converted to approximate municipal clusters. Exact latitude and longitude are NEVER stored or transmitted to other users or employers.
              </p>
            </div>

            <div style={{ padding: '16px', background: '#F0FDFA', borderRadius: 'var(--radius-md)', border: '1px solid #CCFBF1' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F766E', marginBottom: '6px' }}>
                🔒 Encrypted Document Storage
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#115E59', lineHeight: 1.5 }}>
                Business KYC certificates (GST, trade licenses) are placed in private access-controlled storage accessible only to safety compliance moderators.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setIsPrivacyModalOpen(true)}
            >
              Read Full Safety Notice
            </button>
            <button
              className="btn btn-outline"
              onClick={() => showToast('📥 Profile data archive downloaded (JSON)', 'info')}
            >
              Export My Data Archive
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
