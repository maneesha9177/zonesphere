import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, MapPin, Compass, ShieldCheck, ExternalLink } from 'lucide-react';
import L from 'leaflet';
import type { JobListing } from '../../types';

export const InteractiveMapModal: React.FC = () => {
  const { 
    isMapModalOpen, 
    setIsMapModalOpen, 
    jobs, 
    selectedZone, 
    searchRadiusKm, 
    filteredJobs,
    setActiveJobModal 
  } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedMapCategory, setSelectedMapCategory] = useState<string>('All');

  // Filter listings based on category
  const jobsToDisplay = (filteredJobs && filteredJobs.length > 0 ? filteredJobs : jobs.filter(j => j.zoneId === selectedZone.id)).filter(job => {
    return selectedMapCategory === 'All' || job.category === selectedMapCategory;
  });

  // Separate jobs with legitimate coordinates from those with locality address only
  const geocodedJobs = jobsToDisplay.filter(j => typeof j.lat === 'number' && typeof j.lng === 'number' && !isNaN(j.lat) && !isNaN(j.lng));
  const localityOnlyJobs = jobsToDisplay.filter(j => typeof j.lat !== 'number' || typeof j.lng !== 'number' || isNaN(j.lat) || isNaN(j.lng));

  useEffect(() => {
    if (!isMapModalOpen || !mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      const centerLat = selectedZone.centerCoordinates.lat;
      const centerLng = selectedZone.centerCoordinates.lng;

      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 13
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Add Zone & Radius Circle (Baby Pink & Sky Blue tone)
      const effectiveRadiusKm = searchRadiusKm > 0 ? searchRadiusKm : selectedZone.radiusKm;
      L.circle([centerLat, centerLng], {
        color: '#28658A',
        fillColor: '#87CEEB',
        fillOpacity: 0.16,
        radius: effectiveRadiusKm * 1000,
        weight: 2,
        dashArray: '5, 5'
      }).addTo(map).bindPopup(`
        <div style="font-family: inherit; padding: 4px;">
          <strong style="color: #28658A; font-size: 13px;">${selectedZone.name}</strong><br/>
          <span style="font-size: 11px; color: #667085;">Geographical Hub: ${effectiveRadiusKm} km coverage</span>
        </div>
      `);

      // Add Genuine Job Workplace Markers (No fabricated offsets)
      geocodedJobs.forEach((job: JobListing) => {
        const shortLocality = job.locality ? job.locality.split(' ')[0] : selectedZone.name.split(' ')[0];
        const isUrgent = job.isUrgent;

        const markerIcon = L.divIcon({
          className: 'job-map-marker',
          html: `
            <div style="
              background: ${isUrgent ? 'linear-gradient(135deg, #EF4444, #DC2626)' : 'linear-gradient(135deg, #28658A, #3D7EAA)'};
              color: white;
              font-weight: 700;
              font-size: 11px;
              padding: 4px 10px;
              border-radius: 20px;
              display: flex;
              align-items: center;
              gap: 5px;
              white-space: nowrap;
              border: 2px solid white;
              box-shadow: 0 4px 12px rgba(40, 101, 138, 0.35);
              transform: translate(-50%, -50%);
            ">
              <span>📍 ${shortLocality}: ${job.title.slice(0, 15)}...</span>
            </div>
          `,
          iconSize: [120, 32]
        });

        const marker = L.marker([job.lat, job.lng], { icon: markerIcon }).addTo(map);
        
        marker.bindPopup(`
          <div style="font-family: inherit; padding: 8px; min-width: 230px;">
            <div style="font-size: 10px; color: #E98BB5; font-weight: 800; text-transform: uppercase;">${job.category}</div>
            <strong style="font-size: 13px; color: #253247; display: block; margin-top: 2px;">${job.title}</strong>
            <div style="font-size: 11px; color: #667085; margin-top: 2px; font-weight: 600;">🏢 ${job.businessName}</div>
            <div style="font-size: 11px; color: #28658A; font-weight: 700; margin-top: 4px;">📍 ${job.locality}</div>
            <div style="font-size: 10px; color: #8B98A9; margin-top: 2px;">${job.workplaceAddress}</div>
            <div style="font-size: 13px; font-weight: 800; color: #28658A; margin: 6px 0;">${job.payCurrency}${job.payAmount.toLocaleString()} / ${job.payPeriod}</div>
            <button id="view-job-${job.id}" style="
              background: linear-gradient(135deg, #28658A, #3D7EAA); 
              color: white; 
              border: none; 
              padding: 6px 12px; 
              border-radius: 6px; 
              font-size: 11px; 
              font-weight: 700; 
              cursor: pointer; 
              width: 100%;
              margin-top: 4px;
            ">View Full Job Details →</button>
          </div>
        `);

        marker.on('popupopen', () => {
          const btn = document.getElementById(`view-job-${job.id}`);
          if (btn) {
            btn.onclick = () => {
              setIsMapModalOpen(false);
              setActiveJobModal(job);
            };
          }
        });
      });

      mapInstanceRef.current = map;
    } catch (err) {
      console.error('Interactive map init error:', err);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isMapModalOpen, geocodedJobs, selectedZone, searchRadiusKm, setActiveJobModal, setIsMapModalOpen]);

  if (!isMapModalOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => setIsMapModalOpen(false)}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '1000px', width: '95%', height: '86vh', display: 'flex', flexDirection: 'column' }}
      >
        
        {/* Header */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--gradient-card-header)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: '10px', 
              background: 'var(--light-blue-bg)', 
              color: 'var(--deep-blue)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px solid var(--border-blue)'
            }}>
              <Compass size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Zone Map • {selectedZone.name}
              </h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Showing verified workplace locations in {selectedZone.city}, {selectedZone.state} ({searchRadiusKm === 0 ? 'Zone Only' : `${searchRadiusKm} km radius`})
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <select
              value={selectedMapCategory}
              onChange={(e) => setSelectedMapCategory(e.target.value)}
              className="input-control input-select"
              style={{ width: '180px', padding: '6px 10px', fontSize: '0.8rem' }}
            >
              <option value="All">All Categories</option>
              <option value="Retail & Shops">Retail & Shops</option>
              <option value="Restaurants & Cafés">Restaurants & Cafés</option>
              <option value="Petrol Bunks & Transport">Petrol Bunks</option>
              <option value="Warehouses & Factories">Warehouses</option>
              <option value="IT & Professional">IT & Tech</option>
              <option value="Education & Tutoring">Education</option>
            </select>

            <button
              onClick={() => setIsMapModalOpen(false)}
              className="btn-outline btn-icon"
              style={{ border: 'none', background: 'transparent' }}
            >
              <X size={20} color="var(--text-secondary)" />
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }}></div>

          {/* Privacy Float Card on Map */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            maxWidth: '340px',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 1000
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: 'var(--deep-blue)', marginBottom: '2px' }}>
              <ShieldCheck size={16} />
              <span>Genuine Verified Workplaces</span>
            </div>
            Workplace markers show registered business commercial addresses. Individual user coordinates are never collected, plotted, or made public.
          </div>

          {/* If there are locality-only listings without coordinates */}
          {localityOnlyJobs.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: '#FFFFFF',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 12px',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              zIndex: 1000,
              boxShadow: 'var(--shadow-md)'
            }}>
              <span>📍 +{localityOnlyJobs.length} listings in {selectedZone.name} (area address only)</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
