import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { JobCard } from './JobCard';
import { 
  Search, Map, SlidersHorizontal, ArrowUpDown, 
  RotateCcw, Plus, Briefcase, MapPin, Compass
} from 'lucide-react';
import type { JobCategory } from '../../types';
import { calculateHaversineDistanceKm } from '../../api/locationApi';

export const JobList: React.FC = () => {
  const { 
    jobs, 
    selectedZone, 
    searchRadiusKm,
    setIsZonePickerOpen,
    searchQuery, 
    setSearchQuery, 
    selectedLocality,
    setSelectedLocality,
    selectedCategory, 
    setSelectedCategory,
    selectedEmploymentType,
    setSelectedEmploymentType,
    selectedPayPeriod,
    setSelectedPayPeriod,
    setIsPostJobModalOpen,
    setIsMapModalOpen
  } = useApp();

  const [sortBy, setSortBy] = useState<'newest' | 'pay_high' | 'closing_soon' | 'vacancies'>('newest');
  const [showFiltersBar, setShowFiltersBar] = useState(false);
  const [onlyUrgent, setOnlyUrgent] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);

  const CATEGORIES: ('All' | JobCategory)[] = [
    'All',
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

  const EMPLOYMENT_TYPES = [
    'All',
    'Part-Time',
    'Full-Time',
    'Daily-Wage',
    'Shift-Based',
    'Weekend-Only',
    'Internship'
  ];

  const PAY_PERIODS = [
    'All',
    'Hourly',
    'Daily',
    'Monthly'
  ];

  // Filtered and Sorted Jobs — Zone-Based & Radius-Aware
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // 1. Zone & Radius Filter
      const isDirectZone = job.zoneId === selectedZone.id;
      let matchesZone = isDirectZone;

      if (!isDirectZone && searchRadiusKm > 0 && typeof job.lat === 'number' && typeof job.lng === 'number') {
        const dist = calculateHaversineDistanceKm(
          selectedZone.centerCoordinates.lat,
          selectedZone.centerCoordinates.lng,
          job.lat,
          job.lng
        );
        matchesZone = dist <= searchRadiusKm;
      }

      if (!matchesZone) {
        return false;
      }

      // 2. Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        job.title.toLowerCase().includes(q) ||
        job.businessName.toLowerCase().includes(q) ||
        job.category.toLowerCase().includes(q) ||
        job.locality.toLowerCase().includes(q) ||
        job.requiredSkills.some(s => s.toLowerCase().includes(q))
      );

      // 3. Locality / Landmark Filter
      const matchesLocality = selectedLocality === 'All' || job.locality === selectedLocality || job.locality.toLowerCase().includes(selectedLocality.toLowerCase());

      // 4. Category
      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;

      // 5. Employment Type
      const matchesEmpType = selectedEmploymentType === 'All' || job.employmentType === selectedEmploymentType;

      // 6. Pay Period
      const matchesPayPeriod = selectedPayPeriod === 'All' || job.payPeriod === selectedPayPeriod;

      // 7. Urgent toggle
      const matchesUrgent = !onlyUrgent || job.isUrgent;

      // 8. Verified toggle
      const matchesVerified = !onlyVerified || job.businessVerified;

      return matchesSearch && matchesLocality && matchesCategory && matchesEmpType && matchesPayPeriod && matchesUrgent && matchesVerified;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'pay_high') {
        const normA = a.payPeriod === 'Monthly' ? a.payAmount : a.payPeriod === 'Daily' ? a.payAmount * 26 : a.payAmount * 200;
        const normB = b.payPeriod === 'Monthly' ? b.payAmount : b.payPeriod === 'Daily' ? b.payAmount * 26 : b.payAmount * 200;
        return normB - normA;
      }
      if (sortBy === 'closing_soon') {
        return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
      }
      if (sortBy === 'vacancies') {
        return b.vacancies - a.vacancies;
      }
      return 0;
    });
  }, [jobs, selectedZone, searchRadiusKm, searchQuery, selectedLocality, selectedCategory, selectedEmploymentType, selectedPayPeriod, onlyUrgent, onlyVerified, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLocality('All');
    setSelectedCategory('All');
    setSelectedEmploymentType('All');
    setSelectedPayPeriod('All');
    setOnlyUrgent(false);
    setOnlyVerified(false);
    setSortBy('newest');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Top Banner & Control Bar */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Explore Local Jobs</h2>
              <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                {filteredJobs.length} {filteredJobs.length === 1 ? 'Opening' : 'Openings'}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Discover verified retail, hospitality, industrial, and IT positions in <strong>{selectedZone.name}</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              className="btn btn-teal btn-sm"
              onClick={() => setIsMapModalOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Map size={16} />
              <span>Map View</span>
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setIsPostJobModalOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={16} />
              <span>Post Vacancy</span>
            </button>
          </div>
        </div>

        {/* Search & Action Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '12px', alignItems: 'center' }}>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'var(--bg-main)',
            border: '1.5px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px'
          }}>
            <Search size={18} color="#7C3AED" />
            <input
              type="text"
              placeholder="Search by role, business, skills (e.g. Cashier, Chef, React, Delivery)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '0.92rem',
                color: 'var(--text-primary)'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Toggle Advanced Filters */}
          <button
            className={`btn ${showFiltersBar ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '10px 16px', fontSize: '0.875rem' }}
            onClick={() => setShowFiltersBar(!showFiltersBar)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowUpDown size={16} color="#64748B" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-control input-select"
              style={{ width: '160px', padding: '9px 12px', fontSize: '0.85rem' }}
            >
              <option value="newest">Newest First</option>
              <option value="pay_high">Highest Pay</option>
              <option value="closing_soon">Closing Soonest</option>
              <option value="vacancies">Most Vacancies</option>
            </select>
          </div>

        </div>

        {/* Category Carousel Pills */}
        <div style={{ marginTop: '16px' }} className="category-pills-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Advanced Filters Expandable Drawer */}
        {showFiltersBar && (
          <div style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            
            {/* Employment Type */}
            <div>
              <label className="input-label" style={{ fontSize: '0.78rem' }}>Employment Type</label>
              <select
                value={selectedEmploymentType}
                onChange={(e) => setSelectedEmploymentType(e.target.value)}
                className="input-control input-select"
                style={{ padding: '8px 10px', fontSize: '0.82rem' }}
              >
                {EMPLOYMENT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Pay Period */}
            <div>
              <label className="input-label" style={{ fontSize: '0.78rem' }}>Wage Structure</label>
              <select
                value={selectedPayPeriod}
                onChange={(e) => setSelectedPayPeriod(e.target.value)}
                className="input-control input-select"
                style={{ padding: '8px 10px', fontSize: '0.82rem' }}
              >
                {PAY_PERIODS.map(p => (
                  <option key={p} value={p}>{p === 'All' ? 'All Wage Types' : `${p} Pay`}</option>
                ))}
              </select>
            </div>

            {/* Checkboxes: Urgent & Verified */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={onlyUrgent}
                  onChange={(e) => setOnlyUrgent(e.target.checked)}
                  style={{ accentColor: '#EF4444' }}
                />
                <span>🔥 Urgent Openings Only</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                  style={{ accentColor: '#10B981' }}
                />
                <span>🛡️ Verified Employers Only</span>
              </label>
            </div>

            {/* Reset Filter Button */}
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={resetFilters}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid-responsive-3">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div style={{
          background: '#FFFFFF',
          border: '1.5px dashed var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '50px 20px',
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
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-outline" onClick={resetFilters}>
              Reset Filters
            </button>
            <button className="btn btn-primary" onClick={() => setIsZonePickerOpen(true)}>
              <MapPin size={15} />
              <span>Choose Another Zone</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
