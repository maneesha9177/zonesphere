import type { Zone, GeographicHierarchy, JobListing, LocalOffer, Business, DiscussionRoom, UserPreferences } from '../types';
import { 
  SEED_ZONES, GEOGRAPHIC_HIERARCHY, SEED_JOBS, 
  SEED_OFFERS, SEED_BUSINESSES, SEED_ROOMS 
} from '../data/seedData';
import { calculateHaversineDistanceKm } from './locationApi';

const STORAGE_KEY_PREFS = 'zonesphere_user_location_prefs_v3';

export interface LocationPreferencesPayload {
  selectedZoneId: string;
  searchRadiusKm: number;
  radiusMode: 'zone_only' | 'radius_1km' | 'radius_5km' | 'radius_10km' | 'radius_25km';
  lastUpdated: string;
  isGpsConfirmed?: boolean;
}

export const zonesApi = {
  /**
   * Fetch all supported zones
   */
  async getZones(): Promise<Zone[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(SEED_ZONES), 50);
    });
  },

  /**
   * Get zone by unique ID
   */
  async getZoneById(zoneId: string): Promise<Zone | null> {
    const zone = SEED_ZONES.find((z) => z.id === zoneId) || null;
    return zone;
  },

  /**
   * Get complete administrative geographic hierarchy
   */
  async getGeographicHierarchy(): Promise<GeographicHierarchy> {
    return GEOGRAPHIC_HIERARCHY;
  },

  /**
   * Filter job listings by active zone and radius distance
   */
  async getJobsByZone(
    zoneId: string,
    radiusKm: number = 0,
    allJobs: JobListing[] = SEED_JOBS
  ): Promise<JobListing[]> {
    const targetZone = SEED_ZONES.find((z) => z.id === zoneId);
    if (!targetZone) return allJobs;

    return allJobs.filter((job) => {
      // 1. Direct zone match
      if (job.zoneId === zoneId) return true;

      // 2. If radiusKm > 0, calculate true geographic distance
      if (radiusKm > 0 && job.lat && job.lng) {
        const distance = calculateHaversineDistanceKm(
          targetZone.centerCoordinates.lat,
          targetZone.centerCoordinates.lng,
          job.lat,
          job.lng
        );
        return distance <= radiusKm;
      }

      return false;
    });
  },

  /**
   * Filter local offers by active zone and optional radius
   */
  async getOffersByZone(
    zoneId: string,
    allOffers: LocalOffer[] = SEED_OFFERS
  ): Promise<LocalOffer[]> {
    return allOffers.filter((offer) => offer.zoneId === zoneId);
  },

  /**
   * Filter businesses by active zone
   */
  async getBusinessesByZone(
    zoneId: string,
    allBusinesses: Business[] = SEED_BUSINESSES
  ): Promise<Business[]> {
    return allBusinesses.filter((b) => b.zoneId === zoneId);
  },

  /**
   * Filter discussion rooms by active zone
   */
  async getRoomsByZone(
    zoneId: string,
    allRooms: DiscussionRoom[] = SEED_ROOMS
  ): Promise<DiscussionRoom[]> {
    return allRooms.filter((room) => room.zoneId === zoneId);
  },

  /**
   * Save user's active zone and search distance preferences
   */
  async saveUserLocationPreferences(payload: LocationPreferencesPayload): Promise<boolean> {
    try {
      localStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(payload));
      return true;
    } catch (e) {
      console.warn('Failed to save location preferences locally', e);
      return false;
    }
  },

  /**
   * Load stored user location preferences
   */
  async getUserLocationPreferences(): Promise<LocationPreferencesPayload | null> {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PREFS);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Clear stored location preferences
   */
  async clearStoredLocationPreferences(): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEY_PREFS);
    } catch (e) {
      // ignore
    }
  }
};
