import type { Zone, GeographicHierarchy, LocationDetectionResult } from '../types';
import { SEED_ZONES, GEOGRAPHIC_HIERARCHY } from '../data/seedData';

/**
 * Calculates the great-circle distance between two geographic points using the Haversine formula.
 * Returns distance in kilometers (km).
 */
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal place
}

/**
 * Finds the closest configured Zone Sphere zone from user coordinates.
 * Returns the matched zone and distance, or null if no zones exist.
 */
export function findNearestSupportedZone(
  latitude: number,
  longitude: number,
  allZones: Zone[] = SEED_ZONES
): { zone: Zone; distanceKm: number } | null {
  if (!allZones || allZones.length === 0) return null;

  let closestZone: Zone = allZones[0];
  let minDistance = calculateHaversineDistanceKm(
    latitude,
    longitude,
    closestZone.centerCoordinates.lat,
    closestZone.centerCoordinates.lng
  );

  for (let i = 1; i < allZones.length; i++) {
    const zone = allZones[i];
    const dist = calculateHaversineDistanceKm(
      latitude,
      longitude,
      zone.centerCoordinates.lat,
      zone.centerCoordinates.lng
    );
    if (dist < minDistance) {
      minDistance = dist;
      closestZone = zone;
    }
  }

  return {
    zone: closestZone,
    distanceKm: minDistance
  };
}

/**
 * Real browser Geolocation API request.
 * Requests device coordinates only upon explicit user action.
 * Never performs continuous tracking.
 */
export async function requestBrowserDeviceLocation(
  zones: Zone[] = SEED_ZONES
): Promise<LocationDetectionResult> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    return {
      status: 'unsupported',
      errorMessage: 'Geolocation is not supported by your browser. Please select your zone manually.'
    };
  }

  return new Promise<LocationDetectionResult>((resolve) => {
    const geoOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 second timeout
      maximumAge: 60000 // Cache for 60s
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const match = findNearestSupportedZone(latitude, longitude, zones);

        if (!match) {
          resolve({
            status: 'no_supported_zone',
            coords: { latitude, longitude, accuracy },
            errorMessage: 'No configured zones found in the database.'
          });
          return;
        }

        // If distance is very large (> 200 km), inform user about nearest supported hub
        const isFar = match.distanceKm > 150;

        resolve({
          status: 'success',
          coords: { latitude, longitude, accuracy },
          estimatedZone: match.zone,
          distanceKm: match.distanceKm,
          resolvedAddress: `Approx. ${match.distanceKm} km from ${match.zone.name}, ${match.zone.state}`,
          errorMessage: isFar
            ? `Your location is ~${match.distanceKm} km from our nearest zone (${match.zone.name}). You can confirm this or select another zone manually.`
            : undefined,
          timestamp: position.timestamp
        });
      },
      (error) => {
        let status: LocationDetectionResult['status'] = 'unavailable';
        let errorMessage = 'Unable to retrieve your location.';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            status = 'denied';
            errorMessage = 'Location permission was denied. You can continue using Zone Sphere seamlessly with manual zone selection.';
            break;
          case error.TIMEOUT:
            status = 'timeout';
            errorMessage = 'Location request timed out. Please select your zone manually or try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            status = 'unavailable';
            errorMessage = 'Location information is currently unavailable on your device.';
            break;
        }

        resolve({
          status,
          errorMessage
        });
      },
      geoOptions
    );
  });
}

/**
 * Searches through geographical hierarchy and zones by keyword.
 */
export interface SearchLocationResultItem {
  id: string;
  type: 'zone' | 'locality' | 'city' | 'district' | 'state';
  title: string;
  subtitle: string;
  zone: Zone;
  landmark?: string;
}

export function searchGeographicLocations(
  query: string,
  zones: Zone[] = SEED_ZONES
): SearchLocationResultItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchLocationResultItem[] = [];
  const seenZoneIds = new Set<string>();

  // 1. Check direct zone names, codes, cities, states, districts
  zones.forEach((zone) => {
    const matchesName = zone.name.toLowerCase().includes(q);
    const matchesCity = zone.city.toLowerCase().includes(q);
    const matchesState = zone.state.toLowerCase().includes(q);
    const matchesDistrict = zone.district.toLowerCase().includes(q);
    const matchesCode = zone.code.toLowerCase().includes(q);

    if (matchesName || matchesCity || matchesState || matchesDistrict || matchesCode) {
      results.push({
        id: `zone-${zone.id}`,
        type: 'zone',
        title: zone.name,
        subtitle: `${zone.city}, ${zone.district}, ${zone.state} (${zone.code})`,
        zone
      });
      seenZoneIds.add(zone.id);
    }

    // 2. Check landmarks / localities
    if (zone.popularLandmarks) {
      zone.popularLandmarks.forEach((lm) => {
        if (lm.toLowerCase().includes(q)) {
          results.push({
            id: `landmark-${zone.id}-${lm}`,
            type: 'locality',
            title: lm,
            subtitle: `In ${zone.name} • ${zone.city}, ${zone.state}`,
            zone,
            landmark: lm
          });
        }
      });
    }
  });

  return results.slice(0, 15);
}
