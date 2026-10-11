import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, Navigation, X, ShieldCheck, Check, 
  Search, Loader2, AlertCircle, Compass 
} from 'lucide-react';
import type { Zone } from '../../types';
import { searchGeographicLocations } from '../../api/locationApi';

export const ZonePickerModal: React.FC = () => {
  const { 
    isZonePickerOpen, 
    setIsZonePickerOpen, 
    zones, 
    selectedZone, 
    setSelectedZone,
    locationDetection,
    detectDeviceLocation,
    confirmEstimatedZone,
    clearLocationDetection,
    showToast 
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [tempSelectedZone, setTempSelectedZone] = useState<Zone>(selectedZone);

  // Sync state when modal opens
  useEffect(() => {
    if (isZonePickerOpen) {
      setTempSelectedZone(selectedZone);
      setSelectedState(selectedZone.state || 'Telangana');
      setSelectedCity(selectedZone.id);
      setQuery('');
      clearLocationDetection();
    }
  }, [isZonePickerOpen, selectedZone]);

  // Unique states
  const availableStates = useMemo(() => {
    const states = Array.from(new Set(zones.map(z => z.state))).filter(Boolean);
    return states;
  }, [zones]);

  // Cities in the currently selected state
  const citiesInState = useMemo(() => {
    if (!selectedState) return [];
    return zones.filter(z => z.state === selectedState);
  }, [zones, selectedState]);

  // Search results based on user text query
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const hits = searchGeographicLocations(query, zones);
    const map = new Map<string, Zone>();
    hits.forEach(hit => map.set(hit.zone.id, hit.zone));
    return Array.from(map.values());
  }, [query, zones]);

  // When user changes State dropdown
  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    const firstInState = zones.find(z => z.state === stateName);
    if (firstInState) {
      setSelectedCity(firstInState.id);
      setTempSelectedZone(firstInState);
    }
  };

  // When user changes City dropdown
  const handleCityChange = (zoneId: string) => {
    setSelectedCity(zoneId);
    const target = zones.find(z => z.id === zoneId);
    if (target) {
      setTempSelectedZone(target);
    }
  };

  // When user clicks a search result
  const handleSelectSearchResult = (zone: Zone) => {
    setTempSelectedZone(zone);
    setSelectedState(zone.state);
    setSelectedCity(zone.id);
    setQuery('');
  };

  // Confirm and set active zone
  const handleConfirmZone = () => {
    setSelectedZone(tempSelectedZone, false);
    showToast(`📍 Active zone set to "${tempSelectedZone.city || tempSelectedZone.name}, ${tempSelectedZone.state}"`, 'success');
    setIsZonePickerOpen(false);
  };

  if (!isZonePickerOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => setIsZonePickerOpen(false)}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '540px', 
          width: '100%',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1.5px solid #F0DDE7',
          boxShadow: '0 20px 40px rgba(40, 101, 138, 0.16)',
          background: '#FFFFFF'
        }}
      >
        
        {/* Header — Baby Pink & Sky Blue Theme */}
        <div style={{ 
          padding: '20px 24px', 
          borderBottom: '1px solid #F0DDE7', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #FFF5F8 0%, #EAF7FF 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #28658A 0%, #87CEEB 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#FFFFFF',
              boxShadow: '0 4px 10px rgba(40, 101, 138, 0.2)'
            }}>
              <Compass size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#253247', margin: 0 }}>
                Choose Your Zone
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#667085', margin: '2px 0 0' }}>
                Discover opportunities around your chosen area.
              </p>
            </div>
          </div>
          <button 
            type="button"
            className="btn-outline btn-icon"
            onClick={() => setIsZonePickerOpen(false)}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '6px' }}
          >
            <X size={20} color="#667085" />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>

          {/* 1. Search city or location */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#28658A', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>
              Search City or Location
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              background: '#FFFFFF',
              border: '1.5px solid #D4EAF7',
              borderRadius: '12px',
              boxShadow: '0 2px 6px rgba(40, 101, 138, 0.04)'
            }}>
              <Search size={18} color="#28658A" />
              <input
                type="text"
                placeholder="Type city or town (e.g. Mancherial, Visakhapatnam, Hyderabad, Bengaluru)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.9rem',
                  color: '#253247',
                  background: 'transparent'
                }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  style={{ border: 'none', background: 'none', color: '#8B98A9', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Instant Search Suggestions Dropdown */}
            {query.trim().length > 0 && (
              <div style={{
                marginTop: '6px',
                background: '#FFFFFF',
                border: '1.5px solid #D4EAF7',
                borderRadius: '12px',
                boxShadow: '0 8px 20px rgba(40, 101, 138, 0.1)',
                maxHeight: '180px',
                overflowY: 'auto'
              }}>
                {searchResults.length > 0 ? (
                  searchResults.map((zone) => (
                    <div
                      key={zone.id}
                      onClick={() => handleSelectSearchResult(zone)}
                      style={{
                        padding: '10px 14px',
                        borderBottom: '1px solid #F0DDE7',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: tempSelectedZone.id === zone.id ? '#EAF7FF' : '#FFFFFF',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={15} color="#28658A" />
                        <div>
                          <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#253247' }}>
                            {zone.city || zone.name}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: '#667085', marginLeft: '6px' }}>
                            ({zone.state})
                          </span>
                        </div>
                      </div>
                      {tempSelectedZone.id === zone.id && (
                        <Check size={16} color="#28658A" />
                      )}
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '14px', textAlign: 'center', fontSize: '0.84rem', color: '#8B98A9' }}>
                    No supported cities found matching "{query}".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. Simple State / City Selector (Dependent) */}
          <div style={{
            background: '#FFF5F8',
            border: '1px solid #F0DDE7',
            borderRadius: '14px',
            padding: '14px 16px'
          }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#28658A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
              Select Location Manually
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {/* State Dropdown */}
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#667085', display: 'block', marginBottom: '4px' }}>
                  State:
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="input-control input-select"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    fontSize: '0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #D4EAF7',
                    background: '#FFFFFF',
                    color: '#253247',
                    fontWeight: 600
                  }}
                >
                  {availableStates.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* City / Town Dropdown */}
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 600, color: '#667085', display: 'block', marginBottom: '4px' }}>
                  City / Town:
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="input-control input-select"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    fontSize: '0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #D4EAF7',
                    background: '#FFFFFF',
                    color: '#253247',
                    fontWeight: 600
                  }}
                >
                  {citiesInState.map(zone => (
                    <option key={zone.id} value={zone.id}>
                      {zone.city || zone.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 3. Use My Location Button (Genuine Geolocation API) */}
          <div style={{
            background: 'linear-gradient(135deg, #EAF7FF 0%, #FFFFFF 100%)',
            border: '1.5px solid #D4EAF7',
            borderRadius: '14px',
            padding: '14px 16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: '#28658A',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Navigation size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#28658A' }}>
                    Use Device Location
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#667085' }}>
                    Detect nearest supported city via browser GPS
                  </div>
                </div>
              </div>

              <button 
                type="button"
                className="btn btn-secondary btn-sm"
                disabled={locationDetection.status === 'requesting_permission' || locationDetection.status === 'detecting'}
                onClick={detectDeviceLocation}
                style={{ fontWeight: 700, padding: '7px 14px', fontSize: '0.82rem' }}
              >
                {locationDetection.status === 'requesting_permission' || locationDetection.status === 'detecting' ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Detecting...</span>
                  </>
                ) : (
                  <>
                    <Navigation size={14} />
                    <span>Use My Location</span>
                  </>
                )}
              </button>
            </div>

            {/* Detection Success Result */}
            {locationDetection.status === 'success' && locationDetection.estimatedZone && (
              <div style={{
                marginTop: '12px',
                padding: '10px 14px',
                background: '#FFFFFF',
                border: '1.5px solid #87CEEB',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                flexWrap: 'wrap'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#28658A', fontWeight: 800, textTransform: 'uppercase' }}>
                    📍 Detected Nearest City (~{locationDetection.distanceKm} km away)
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.94rem', color: '#253247', marginTop: '2px' }}>
                    {locationDetection.estimatedZone.city || locationDetection.estimatedZone.name}, {locationDetection.estimatedZone.state}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={confirmEstimatedZone}
                    style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                  >
                    <Check size={13} />
                    <span>Confirm This Zone</span>
                  </button>
                  <button
                    type="button"
                    className="btn-outline btn-sm"
                    onClick={clearLocationDetection}
                    style={{ fontSize: '0.8rem', padding: '6px 10px' }}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {/* Error or Denied State */}
            {(locationDetection.status === 'denied' || locationDetection.status === 'timeout' || locationDetection.status === 'unavailable') && (
              <div style={{
                marginTop: '10px',
                padding: '8px 12px',
                background: '#FFF5F8',
                border: '1px solid #F0DDE7',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.78rem',
                color: '#C2410C'
              }}>
                <AlertCircle size={15} />
                <span>{locationDetection.errorMessage || 'Location permission was denied or unavailable. Please select your zone manually.'}</span>
              </div>
            )}
          </div>

          {/* 5. Small Privacy Note */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.76rem',
            color: '#667085',
            padding: '4px 2px'
          }}>
            <ShieldCheck size={15} color="#28658A" />
            <span>Your location is optional. You can choose your zone manually.</span>
          </div>

        </div>

        {/* Footer with 4. Confirm Zone Button */}
        <div style={{ 
          padding: '16px 24px', 
          borderTop: '1px solid #F0DDE7', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between', 
          background: '#FFF5F8'
        }}>
          <div style={{ fontSize: '0.84rem', color: '#667085' }}>
            Zone: <strong style={{ color: '#28658A' }}>{tempSelectedZone.city || tempSelectedZone.name}</strong>, {tempSelectedZone.state}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => setIsZonePickerOpen(false)}
            >
              Cancel
            </button>
            <button 
              type="button"
              className="btn btn-primary"
              onClick={handleConfirmZone}
              style={{ padding: '8px 20px', fontSize: '0.88rem', fontWeight: 700 }}
            >
              Confirm Zone
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
