import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, ShieldCheck, CheckCircle, 
  ArrowRight, ArrowLeft, AlertCircle 
} from 'lucide-react';
import { JobPosterGenerator } from '../poster/JobPosterGenerator';
import type { JobCategory, EmploymentType, PayPeriod } from '../../types';

export const PostJobModal: React.FC = () => {
  const { 
    isPostJobModalOpen, 
    setIsPostJobModalOpen, 
    selectedZone, 
    businesses, 
    createJobListing,
    setIsBusinessVerificationModalOpen 
  } = useApp();

  const [step, setStep] = useState<1 | 2>(1); // Step 1: Vacancy Form, Step 2: Poster Studio & Publish

  // Form fields
  const [selectedBizId, setSelectedBizId] = useState<string>(businesses[0]?.id || 'custom');
  const [businessName, setBusinessName] = useState<string>(businesses[0]?.name || 'My Local Business');
  const [isVerified, setIsVerified] = useState<boolean>(businesses[0]?.verificationStatus === 'Approved');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<JobCategory>('Retail & Shops');
  const [vacancies, setVacancies] = useState<number>(2);
  const [employmentType, setEmploymentType] = useState<EmploymentType>('Full-Time');
  const [payAmount, setPayAmount] = useState<number>(22000);
  const [payPeriod, setPayPeriod] = useState<PayPeriod>('Monthly');
  const [payCurrency] = useState('₹');
  const [shiftTiming, setShiftTiming] = useState('Morning Shift: 8:00 AM – 4:00 PM');
  const [weeklyHolidays, setWeeklyHolidays] = useState('1 Day Rotational Off');
  const [requiredEducation, setRequiredEducation] = useState('10th / 12th Pass');
  const [experienceRequired, setExperienceRequired] = useState('Freshers Welcome / 0-1 yr');
  const [skillsInput, setSkillsInput] = useState('Customer Service, Punctuality, POS Billing');
  const [description, setDescription] = useState('Looking for energetic, friendly staff with immediate joining and positive attitude.');
  const [workplaceAddress, setWorkplaceAddress] = useState(`Main Commercial Street, ${selectedZone.name}`);
  const [locality, setLocality] = useState(selectedZone.name);
  const [isUrgent, setIsUrgent] = useState(false);
  const [posterTheme, setPosterTheme] = useState('purple');
  const [posterBadge, setPosterBadge] = useState('⚡ IMMEDIATE HIRING');

  if (!isPostJobModalOpen) return null;

  const handleBizChange = (bizId: string) => {
    setSelectedBizId(bizId);
    const found = businesses.find(b => b.id === bizId);
    if (found) {
      setBusinessName(found.name);
      setIsVerified(found.verificationStatus === 'Approved');
      setWorkplaceAddress(found.address);
      setLocality(found.locality);
    }
  };

  const handleNextToPoster = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setStep(2);
  };

  const handlePublishJob = () => {
    const skillsArray = skillsInput.split(',').map(s => s.trim()).filter(Boolean);

    createJobListing({
      businessId: selectedBizId,
      businessName,
      businessVerified: isVerified,
      title,
      category,
      vacancies,
      employmentType,
      workMode: 'On-site',
      payAmount: Number(payAmount),
      payPeriod,
      payCurrency,
      shiftTiming,
      weeklyHolidays,
      requiredEducation,
      experienceRequired,
      requiredSkills: skillsArray.length > 0 ? skillsArray : ['Reliability', 'Good Communication'],
      requiredLanguages: ['Local Language', 'English'],
      description,
      responsibilities: [
        'Perform daily workplace tasks efficiently with high punctuality.',
        'Follow supervisor instructions and safety guidelines.',
        'Ensure customer satisfaction and clean work area.'
      ],
      benefits: [
        'Timely salary disbursement with bank receipt',
        'Overtime bonuses & snack allowance'
      ],
      workplaceAddress,
      locality,
      zoneId: selectedZone.id,
      lat: selectedZone.centerCoordinates.lat + (Math.random() - 0.5) * 0.015,
      lng: selectedZone.centerCoordinates.lng + (Math.random() - 0.5) * 0.015,
      applicationMethod: 'In-App',
      posterTheme,
      posterCustomBadge: posterBadge,
      isUrgent
    });

    // Reset
    setStep(1);
    setTitle('');
  };

  const currentJobDraft = {
    title: title || 'Store Assistant & Support Staff',
    businessName,
    businessVerified: isVerified,
    category,
    vacancies,
    employmentType,
    payAmount: Number(payAmount),
    payPeriod,
    payCurrency,
    shiftTiming,
    weeklyHolidays,
    requiredEducation,
    experienceRequired,
    requiredSkills: skillsInput.split(',').map(s => s.trim()).filter(Boolean),
    locality,
    posterTheme,
    posterCustomBadge: posterBadge
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsPostJobModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px' }}>
        
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                Step {step} of 2: {step === 1 ? 'Vacancy Specifications' : 'Auto-Poster Studio & Confirmation'}
              </span>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1E1B4B', marginTop: '4px' }}>
              {step === 1 ? 'Post a Local Job Vacancy' : 'Preview & Confirm Job Poster'}
            </h3>
          </div>
          <button
            onClick={() => setIsPostJobModalOpen(false)}
            className="btn-outline btn-icon"
            style={{ border: 'none', background: 'transparent' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>

          {step === 1 ? (
            /* STEP 1: VACANCY FORM */
            <form onSubmit={handleNextToPoster}>

              {/* Business Select */}
              <div className="input-group">
                <label className="input-label">Posting as Business / Employer *</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <select
                    className="input-control input-select"
                    value={selectedBizId}
                    onChange={(e) => handleBizChange(e.target.value)}
                  >
                    {businesses.map(biz => (
                      <option key={biz.id} value={biz.id}>
                        {biz.name} ({biz.verificationStatus})
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setIsPostJobModalOpen(false);
                      setIsBusinessVerificationModalOpen(true);
                    }}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <ShieldCheck size={14} />
                    <span>Get Verified</span>
                  </button>
                </div>
                {!isVerified && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#D97706', marginTop: '4px' }}>
                    <AlertCircle size={14} />
                    <span>This business is currently unverified. Verified badge will only appear after document review.</span>
                  </div>
                )}
              </div>

              {/* Title & Category */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="input-group">
                  <label className="input-label">Job Title / Designation *</label>
                  <input
                    type="text"
                    required
                    className="input-control"
                    placeholder="e.g. Senior Store Cashier, Barista, Fuel Attendant..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Category Sector *</label>
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
                    <option value="Daily-Wage & Local Labor">Daily-Wage & Local Labor</option>
                    <option value="Technical & Field Services">Technical & Field Services</option>
                    <option value="Office, Support & Admin">Office & Admin</option>
                    <option value="IT & Professional">IT & Professional</option>
                    <option value="Education & Tutoring">Education & Tutoring</option>
                  </select>
                </div>
              </div>

              {/* Pay & Period */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div className="input-group">
                  <label className="input-label">Pay Amount *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="input-control"
                    placeholder="22000"
                    value={payAmount}
                    onChange={(e) => setPayAmount(Number(e.target.value))}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Pay Period *</label>
                  <select
                    className="input-control input-select"
                    value={payPeriod}
                    onChange={(e) => setPayPeriod(e.target.value as any)}
                  >
                    <option value="Hourly">Hourly Rate</option>
                    <option value="Daily">Daily Wage</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly Salary</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">Vacancies Count</label>
                  <input
                    type="number"
                    min="1"
                    className="input-control"
                    value={vacancies}
                    onChange={(e) => setVacancies(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Shifts & Schedule */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="input-group">
                  <label className="input-label">Shift Timing</label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="e.g. Morning 8 AM – 4 PM / Night 10 PM – 6 AM"
                    value={shiftTiming}
                    onChange={(e) => setShiftTiming(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Employment Type</label>
                  <select
                    className="input-control input-select"
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value as any)}
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Daily-Wage">Daily-Wage</option>
                    <option value="Shift-Based">Shift-Based</option>
                    <option value="Weekend-Only">Weekend-Only</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              {/* Education, Experience & Skills */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="input-group">
                  <label className="input-label">Required Education</label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="e.g. 10th Pass, 12th Pass, No formal degree"
                    value={requiredEducation}
                    onChange={(e) => setRequiredEducation(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Experience Required</label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="e.g. Freshers welcome, 6 months retail"
                    value={experienceRequired}
                    onChange={(e) => setExperienceRequired(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Key Skills (Comma separated)</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="e.g. POS Billing, Cash Handling, Smiling Hospitality"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                />
              </div>

              {/* Address & Locality */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
                <div className="input-group">
                  <label className="input-label">Workplace Address</label>
                  <input
                    type="text"
                    className="input-control"
                    value={workplaceAddress}
                    onChange={(e) => setWorkplaceAddress(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Locality / Landmark</label>
                  <input
                    type="text"
                    className="input-control"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                  />
                </div>
              </div>

              {/* Urgent Checkbox */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    style={{ accentColor: '#EF4444', width: '16px', height: '16px' }}
                  />
                  <span>🔥 Mark as Urgent Opening (Prioritized in Zone Feed & Alerts)</span>
                </label>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsPostJobModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ minWidth: '200px' }}
                >
                  <span>Generate Poster Studio</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </form>
          ) : (
            /* STEP 2: AUTO-POSTER STUDIO & CONFIRMATION */
            <div>
              <div style={{ marginBottom: '16px', background: '#F8FAFC', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Review your automatic job promotional poster. Customize palette or highlight badge below.
                </div>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setStep(1)}
                  style={{ gap: '4px' }}
                >
                  <ArrowLeft size={14} />
                  <span>Edit Details</span>
                </button>
              </div>

              {/* Poster Generator */}
              <JobPosterGenerator
                jobData={currentJobDraft}
                onThemeChange={(th) => setPosterTheme(th)}
                onCustomBadgeChange={(bg) => setPosterBadge(bg)}
              />

              {/* Explicit Employer Confirmation */}
              <div style={{
                background: '#FAF5FF',
                border: '1.5px solid #DDD6FE',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                marginTop: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#4C1D95' }}>
                    Ready to Publish Live to {selectedZone.name}?
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#6B21A8' }}>
                    This listing and auto-generated poster will be immediately searchable by local candidates.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="btn btn-outline"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handlePublishJob}
                  >
                    <CheckCircle size={18} />
                    <span>Confirm & Publish Live</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
