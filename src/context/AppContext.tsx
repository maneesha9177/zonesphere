import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { 
  Zone, Business, JobListing, LocalOffer, DiscussionRoom, ChatMessage, 
  JobApplication, UserPreferences, NotificationItem, ContentReport, 
  AuditLogItem, VerificationStatus, SearchRadiusMode, LocationDetectionResult 
} from '../types';
import { 
  SEED_ZONES, SEED_BUSINESSES, SEED_JOBS, SEED_OFFERS, 
  SEED_ROOMS, SEED_MESSAGES, SEED_REPORTS, SEED_AUDIT_LOGS 
} from '../data/seedData';
import { requestBrowserDeviceLocation, calculateHaversineDistanceKm } from '../api/locationApi';
import { zonesApi } from '../api/zonesApi';
import confetti from 'canvas-confetti';

export type ActiveTab = 'home' | 'jobs' | 'offers' | 'discussions' | 'notifications' | 'profile';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedZone: Zone;
  hasConfirmedZone: boolean;
  setSelectedZone: (zone: Zone, isGpsConfirmed?: boolean) => void;
  zones: Zone[];
  searchRadiusKm: number;
  setSearchRadiusKm: (radius: number) => void;
  searchRadiusMode: SearchRadiusMode;
  setSearchRadiusMode: (mode: SearchRadiusMode) => void;
  isGpsConfirmed: boolean;
  locationDetection: LocationDetectionResult;
  detectDeviceLocation: () => Promise<void>;
  confirmEstimatedZone: () => void;
  clearLocationDetection: () => void;
  resetZoneSelection: () => void;
  gpsActive: boolean;
  gpsLocalityName: string;
  
  // Data lists
  businesses: Business[];
  jobs: JobListing[];
  offers: LocalOffer[];
  rooms: DiscussionRoom[];
  filteredJobs: JobListing[];
  filteredOffers: LocalOffer[];
  filteredBusinesses: Business[];
  filteredRooms: DiscussionRoom[];
  messages: Record<string, ChatMessage[]>;
  applications: JobApplication[];
  savedJobIds: string[];
  notifications: NotificationItem[];
  reports: ContentReport[];
  auditLogs: AuditLogItem[];
  userPreferences: UserPreferences;
  
  // Search & Filter Global State
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedLocality: string;
  setSelectedLocality: (loc: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedEmploymentType: string;
  setSelectedEmploymentType: (type: string) => void;
  selectedPayPeriod: string;
  setSelectedPayPeriod: (p: string) => void;
  
  // Modals & Drawers
  activeJobModal: JobListing | null;
  setActiveJobModal: (job: JobListing | null) => void;
  isApplyModalOpen: boolean;
  setIsApplyModalOpen: (open: boolean) => void;
  activeOfferModal: LocalOffer | null;
  setActiveOfferModal: (offer: LocalOffer | null) => void;
  activeRoomModal: DiscussionRoom | null;
  setActiveRoomModal: (room: DiscussionRoom | null) => void;
  isVoiceActiveModalOpen: boolean;
  setIsVoiceActiveModalOpen: (open: boolean) => void;
  isPostJobModalOpen: boolean;
  setIsPostJobModalOpen: (open: boolean) => void;
  isPostOfferModalOpen: boolean;
  setIsPostOfferModalOpen: (open: boolean) => void;
  isCreateRoomModalOpen: boolean;
  setIsCreateRoomModalOpen: (open: boolean) => void;
  isBusinessVerificationModalOpen: boolean;
  setIsBusinessVerificationModalOpen: (open: boolean) => void;
  isAdminDashboardOpen: boolean;
  setIsAdminDashboardOpen: (open: boolean) => void;
  isPrivacyModalOpen: boolean;
  setIsPrivacyModalOpen: (open: boolean) => void;
  isZonePickerOpen: boolean;
  setIsZonePickerOpen: (open: boolean) => void;
  isMapModalOpen: boolean;
  setIsMapModalOpen: (open: boolean) => void;
  reportTarget: { type: 'job' | 'business' | 'offer' | 'message' | 'room'; id: string; title: string } | null;
  setReportTarget: (target: { type: 'job' | 'business' | 'offer' | 'message' | 'room'; id: string; title: string } | null) => void;

  // Actions
  toggleSaveJob: (jobId: string) => void;
  applyForJob: (jobId: string, applicant: { name: string; phone: string; email: string; shift: string; summary: string }) => void;
  claimOffer: (offerId: string) => void;
  createJobListing: (newJob: Partial<JobListing>) => void;
  createOffer: (newOffer: Partial<LocalOffer>) => void;
  createDiscussionRoom: (roomData: { title: string; topic: any; description: string; enableVoice: boolean; tags: string[] }) => void;
  sendChatMessage: (roomId: string, text: string) => void;
  submitBusinessVerification: (data: Partial<Business>) => void;
  adminVerifyBusiness: (businessId: string, status: VerificationStatus, notes?: string) => void;
  submitReport: (report: { contentType: 'job' | 'business' | 'offer' | 'message' | 'room'; contentId: string; contentTitle: string; reason: any; additionalDetails: string }) => void;
  adminResolveReport: (reportId: string, status: 'Resolved - Removed' | 'Dismissed - Valid', notes?: string) => void;
  renewJobListing: (jobId: string, daysToAdd?: number) => void;
  updateUserPreferences: (prefs: Partial<UserPreferences>) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'purple') => void;
  toast: { message: string; type: string } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'zonesphere_app_v2_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [zones] = useState<Zone[]>(SEED_ZONES);
  const [hasConfirmedZone, setHasConfirmedZone] = useState<boolean>(() => {
    return localStorage.getItem(LOCAL_STORAGE_PREFIX + 'has_confirmed_zone') === 'true';
  });

  const [isGpsConfirmed, setIsGpsConfirmed] = useState<boolean>(() => {
    return localStorage.getItem(LOCAL_STORAGE_PREFIX + 'is_gps_confirmed') === 'true';
  });

  const [selectedZoneState, setSelectedZoneState] = useState<Zone>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'selected_zone');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const match = SEED_ZONES.find((z) => z.id === parsed.id);
        if (match) return match;
      } catch (e) {
        /* ignore */
      }
    }
    // Default to Mancherial Commercial & Market Hub
    return SEED_ZONES[0];
  });

  const [selectedLocality, setSelectedLocality] = useState<string>('All');

  const [searchRadiusMode, setSearchRadiusModeState] = useState<SearchRadiusMode>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'search_radius_mode');
    return (saved as SearchRadiusMode) || 'radius_5km';
  });

  const [searchRadiusKm, setSearchRadiusKmState] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'search_radius_km');
    return saved ? Number(saved) : 5;
  });

  const setSearchRadiusMode = (mode: SearchRadiusMode) => {
    setSearchRadiusModeState(mode);
    let km = 5;
    if (mode === 'zone_only') km = 0;
    else if (mode === 'radius_1km') km = 1;
    else if (mode === 'radius_5km') km = 5;
    else if (mode === 'radius_10km') km = 10;
    else if (mode === 'radius_25km') km = 25;
    setSearchRadiusKmState(km);
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'search_radius_mode', mode);
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'search_radius_km', km.toString());
  };

  const setSearchRadiusKm = (radius: number) => {
    setSearchRadiusKmState(radius);
    let mode: SearchRadiusMode = 'radius_5km';
    if (radius <= 0) mode = 'zone_only';
    else if (radius <= 2) mode = 'radius_1km';
    else if (radius <= 7) mode = 'radius_5km';
    else if (radius <= 15) mode = 'radius_10km';
    else mode = 'radius_25km';
    setSearchRadiusModeState(mode);
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'search_radius_km', radius.toString());
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'search_radius_mode', mode);
  };

  const [locationDetection, setLocationDetection] = useState<LocationDetectionResult>({
    status: 'idle'
  });

  const setSelectedZone = (zone: Zone, confirmedViaGps: boolean = false) => {
    setSelectedZoneState(zone);
    setSelectedLocality('All');
    setHasConfirmedZone(true);
    setIsGpsConfirmed(confirmedViaGps);
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'has_confirmed_zone', 'true');
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'is_gps_confirmed', confirmedViaGps ? 'true' : 'false');
    zonesApi.saveUserLocationPreferences({
      selectedZoneId: zone.id,
      searchRadiusKm,
      radiusMode: searchRadiusMode,
      lastUpdated: new Date().toISOString(),
      isGpsConfirmed: confirmedViaGps
    });
  };

  const selectedZone = selectedZoneState;
  const gpsActive = isGpsConfirmed;
  const gpsLocalityName = isGpsConfirmed 
    ? `Verified near ${selectedZone.name}` 
    : 'Manually Selected Zone';
  
  // Lists with LocalStorage Persistence
  const [businesses, setBusinesses] = useState<Business[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'businesses');
    return saved ? JSON.parse(saved) : SEED_BUSINESSES;
  });

  const [jobs, setJobs] = useState<JobListing[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'jobs');
    return saved ? JSON.parse(saved) : SEED_JOBS;
  });

  const [offers, setOffers] = useState<LocalOffer[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'offers');
    return saved ? JSON.parse(saved) : SEED_OFFERS;
  });

  const [rooms, setRooms] = useState<DiscussionRoom[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'rooms');
    return saved ? JSON.parse(saved) : SEED_ROOMS;
  });

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'messages');
    return saved ? JSON.parse(saved) : SEED_MESSAGES;
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'applications');
    return saved ? JSON.parse(saved) : [
      {
        id: 'app-init-01',
        jobId: 'job-001',
        jobTitle: 'Store Cashier & Billing Staff',
        businessName: 'Sri Krishna Supermarket & Daily Needs',
        applicantName: 'Alex Morgan / local applicant',
        applicantPhone: '+91 98480 99887',
        applicantEmail: 'alex.applicant@email.com',
        preferredShift: 'Morning Shift: 8:00 AM – 4:00 PM',
        experienceSummary: 'Comfortable with PhonePe/GPay barcode billing and cash handling.',
        appliedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        status: 'Interview Shortlisted'
      }
    ];
  });

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'saved_job_ids');
    return saved ? JSON.parse(saved) : ['job-001', 'job-002'];
  });

  const [reports, setReports] = useState<ContentReport[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'reports');
    return saved ? JSON.parse(saved) : SEED_REPORTS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'audit_logs');
    return saved ? JSON.parse(saved) : SEED_AUDIT_LOGS;
  });

  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'user_prefs');
    return saved ? JSON.parse(saved) : {
      selectedZoneId: 'zone-gajuwaka',
      searchRadiusKm: 5,
      preferredCategories: ['Retail & Shops', 'Petrol Bunks & Transport', 'Warehouses & Factories'],
      preferredEmploymentTypes: ['Full-Time', 'Part-Time', 'Daily-Wage'],
      preferredShifts: ['Morning Shift', 'Day Shift', 'Flexible Hours'],
      minimumPayMonthly: 15000,
      enableJobAlerts: true,
      enableOfferAlerts: true,
      enableExpiryAlerts: true,
      pushNotificationsEnabled: true
    };
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      type: 'job_match',
      title: '🎯 3 New Jobs Match Your Preferences in Gajuwaka',
      message: 'Sri Krishna Supermarket and Highway Express Petrol Bunk posted new openings today in Gajuwaka.',
      timeAgo: '10 mins ago',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      read: false,
      actionTarget: { tab: 'jobs' }
    },
    {
      id: 'notif-2',
      type: 'job_expiring',
      title: '⏰ Gajuwaka Petrol Bunk Job Closing Soon!',
      message: 'Highway Express Petrol Bunk listing in Gajuwaka is closing in 18 hours.',
      timeAgo: '1 hour ago',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      actionTarget: { tab: 'jobs', targetId: 'job-002' }
    },
    {
      id: 'notif-3',
      type: 'offer_alert',
      title: '🏷️ Gajuwaka Deal: 20% Off Rice & Groceries',
      message: 'Sri Krishna Supermarket launched weekend grocery discounts in Old Gajuwaka.',
      timeAgo: '3 hours ago',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      read: true,
      actionTarget: { tab: 'offers', targetId: 'offer-001' }
    },
    {
      id: 'notif-4',
      type: 'application_update',
      title: '🎉 Application Shortlisted!',
      message: 'Sri Krishna Supermarket reviewed your Cashier application and invited you for a walk-in interview.',
      timeAgo: 'Yesterday',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      actionTarget: { tab: 'profile' }
    }
  ]);

  // Search & Filters Global State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string>('All');
  const [selectedPayPeriod, setSelectedPayPeriod] = useState<string>('All');

  // Modal States
  const [activeJobModal, setActiveJobModal] = useState<JobListing | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [activeOfferModal, setActiveOfferModal] = useState<LocalOffer | null>(null);
  const [activeRoomModal, setActiveRoomModal] = useState<DiscussionRoom | null>(null);
  const [isVoiceActiveModalOpen, setIsVoiceActiveModalOpen] = useState<boolean>(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState<boolean>(false);
  const [isPostOfferModalOpen, setIsPostOfferModalOpen] = useState<boolean>(false);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState<boolean>(false);
  const [isBusinessVerificationModalOpen, setIsBusinessVerificationModalOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [isZonePickerOpen, setIsZonePickerOpen] = useState<boolean>(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
  const [reportTarget, setReportTarget] = useState<{ type: 'job' | 'business' | 'offer' | 'message' | 'room'; id: string; title: string } | null>(null);

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'purple' = 'purple') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'selected_zone', JSON.stringify(selectedZone));
  }, [selectedZone]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'businesses', JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'saved_job_ids', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'user_prefs', JSON.stringify(userPreferences));
  }, [userPreferences]);

  // Real Device Geolocation Detection
  const detectDeviceLocation = async () => {
    setLocationDetection({ status: 'requesting_permission' });
    const result = await requestBrowserDeviceLocation(zones);
    setLocationDetection(result);

    if (result.status === 'success' && result.estimatedZone) {
      showToast(
        `📍 Found closest zone: ${result.estimatedZone.name} (~${result.distanceKm} km). Review & confirm below.`,
        'info'
      );
    } else if (result.status === 'denied') {
      showToast('⚠️ Location access was denied. You can select your zone manually anytime.', 'warning');
    } else if (result.status === 'timeout' || result.status === 'unavailable') {
      showToast('⚠️ Device location is unavailable. Please pick your active zone manually.', 'warning');
    }
  };

  const confirmEstimatedZone = () => {
    if (locationDetection.estimatedZone) {
      setSelectedZone(locationDetection.estimatedZone, true);
      showToast(`✅ Active zone set to "${locationDetection.estimatedZone.name}" based on device position`, 'success');
      setLocationDetection({ status: 'idle' });
      setIsZonePickerOpen(false);
    }
  };

  const clearLocationDetection = () => {
    setLocationDetection({ status: 'idle' });
  };

  const resetZoneSelection = () => {
    setSelectedZoneState(SEED_ZONES[0]);
    setHasConfirmedZone(false);
    setSelectedLocality('All');
    setSearchRadiusMode('radius_5km');
    setLocationDetection({ status: 'idle' });
    localStorage.removeItem(LOCAL_STORAGE_PREFIX + 'has_confirmed_zone');
    localStorage.removeItem(LOCAL_STORAGE_PREFIX + 'is_gps_confirmed');
    zonesApi.clearStoredLocationPreferences();
    showToast('Zone preferences reset to default.', 'info');
  };

  // Computed Filtered Lists based on active zone and search radius
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. In active zone
      if (job.zoneId === selectedZone.id) return true;
      // 2. If search radius > 0, check real geographic distance from zone centroid
      if (searchRadiusKm > 0 && job.lat && job.lng) {
        const dist = calculateHaversineDistanceKm(
          selectedZone.centerCoordinates.lat,
          selectedZone.centerCoordinates.lng,
          job.lat,
          job.lng
        );
        return dist <= searchRadiusKm;
      }
      return false;
    });
  }, [jobs, selectedZone, searchRadiusKm]);

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => offer.zoneId === selectedZone.id);
  }, [offers, selectedZone]);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((b) => b.zoneId === selectedZone.id);
  }, [businesses, selectedZone]);

  const filteredRooms = useMemo(() => {
    return rooms.filter((r) => r.zoneId === selectedZone.id);
  }, [rooms, selectedZone]);

  // Bookmark Toggle
  const toggleSaveJob = (jobId: string) => {
    if (savedJobIds.includes(jobId)) {
      setSavedJobIds(prev => prev.filter(id => id !== jobId));
      showToast('Removed job from your saved bookmarks.', 'info');
    } else {
      setSavedJobIds(prev => [...prev, jobId]);
      showToast('⭐ Job saved to your profile bookmarks!', 'purple');
    }
  };

  // Job Application
  const applyForJob = (jobId: string, applicant: { name: string; phone: string; email: string; shift: string; summary: string }) => {
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob) return;

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: targetJob.title,
      businessName: targetJob.businessName,
      applicantName: applicant.name,
      applicantPhone: applicant.phone,
      applicantEmail: applicant.email,
      preferredShift: applicant.shift || 'Flexible / As per schedule',
      experienceSummary: applicant.summary,
      appliedAt: new Date().toISOString(),
      status: 'Submitted'
    };

    setApplications(prev => [newApp, ...prev]);
    setIsApplyModalOpen(false);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) { /* ignore */ }

    showToast(`🎉 Application successfully sent to ${targetJob.businessName}!`, 'success');

    // Add in-app notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'application_update',
      title: '✅ Application Submitted',
      message: `Your application for "${targetJob.title}" at ${targetJob.businessName} was delivered successfully.`,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      read: false,
      actionTarget: { tab: 'profile' }
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Claim Offer
  const claimOffer = (offerId: string) => {
    setOffers(prev => prev.map(off => {
      if (off.id === offerId) {
        return { ...off, claimedCount: off.claimedCount + 1 };
      }
      return off;
    }));
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) { /* ignore */ }
    showToast('🎟️ Offer code revealed and copied to clipboard!', 'success');
  };

  // Create Job Listing (with Auto Poster)
  const createJobListing = (newJobData: Partial<JobListing>) => {
    const newJob: JobListing = {
      id: `job-${Date.now()}`,
      businessId: newJobData.businessId || 'biz-custom',
      businessName: newJobData.businessName || 'Local Verified Enterprise',
      businessVerified: newJobData.businessVerified ?? true,
      title: newJobData.title || 'New Open Position',
      category: newJobData.category || 'Retail & Shops',
      vacancies: newJobData.vacancies || 1,
      employmentType: newJobData.employmentType || 'Full-Time',
      workMode: newJobData.workMode || 'On-site',
      payAmount: newJobData.payAmount || 20000,
      payPeriod: newJobData.payPeriod || 'Monthly',
      payCurrency: newJobData.payCurrency || '₹',
      shiftTiming: newJobData.shiftTiming || 'Day Shift: 9:00 AM – 6:00 PM',
      weeklyHolidays: newJobData.weeklyHolidays || '1 Day Off',
      requiredEducation: newJobData.requiredEducation || '10th / 12th Pass',
      experienceRequired: newJobData.experienceRequired || 'Freshers welcome',
      requiredSkills: newJobData.requiredSkills || ['Customer Support', 'Punctuality'],
      requiredLanguages: newJobData.requiredLanguages || ['Local Language', 'English'],
      description: newJobData.description || 'Exciting local opportunity with immediate joining.',
      responsibilities: newJobData.responsibilities || ['Perform daily duty functions with care.'],
      benefits: newJobData.benefits || ['On-time salary payment', 'Snack allowance'],
      workplaceAddress: newJobData.workplaceAddress || 'Commercial Street, Metro City',
      locality: newJobData.locality || selectedZone.name,
      zoneId: newJobData.zoneId || selectedZone.id,
      lat: newJobData.lat || selectedZone.centerCoordinates.lat + 0.002,
      lng: newJobData.lng || selectedZone.centerCoordinates.lng + 0.002,
      applicationMethod: newJobData.applicationMethod || 'In-App',
      contactPhone: newJobData.contactPhone || '+91 98000 00000',
      contactEmail: newJobData.contactEmail || 'hiring@zonesphere.local',
      posterTheme: newJobData.posterTheme || 'purple',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000 * 14).toISOString(), // 14 days TTL
      isUrgent: newJobData.isUrgent || false,
      status: 'Active'
    };

    setJobs(prev => [newJob, ...prev]);

    // Record audit log
    const audit: AuditLogItem = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: newJob.businessName,
      action: 'JOB_LISTING_PUBLISHED',
      targetType: 'JobListing',
      targetId: newJob.id,
      details: `Published "${newJob.title}" with automatic promo poster in ${newJob.locality}.`
    };
    setAuditLogs(prev => [audit, ...prev]);

    // Toast and confetti
    try {
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    } catch (e) { /* ignore */ }
    
    showToast(`🚀 "${newJob.title}" and automatic job poster published live!`, 'purple');
    setIsPostJobModalOpen(false);
  };

  // Create Offer
  const createOffer = (newOfferData: Partial<LocalOffer>) => {
    const newOffer: LocalOffer = {
      id: `offer-${Date.now()}`,
      businessId: newOfferData.businessId || 'biz-custom',
      businessName: newOfferData.businessName || 'Local Partner',
      businessVerified: true,
      title: newOfferData.title || 'Special Zone Discount',
      description: newOfferData.description || 'Exclusive local deal for community members.',
      discountBadge: newOfferData.discountBadge || '20% OFF',
      category: newOfferData.category || 'Retail & Shopping',
      zoneId: newOfferData.zoneId || selectedZone.id,
      locality: newOfferData.locality || selectedZone.name,
      terms: newOfferData.terms || ['Valid on presentation of coupon code'],
      code: newOfferData.code || 'ZONEPROMO',
      instructions: newOfferData.instructions || 'Show at counter before bill.',
      bannerImage: newOfferData.bannerImage || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80',
      accentColor: newOfferData.accentColor || '#7C3AED',
      isSponsored: newOfferData.isSponsored || false,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
      claimedCount: 0
    };

    setOffers(prev => [newOffer, ...prev]);
    showToast('✨ Local Offer published live to Zone feed!', 'success');
    setIsPostOfferModalOpen(false);
  };

  // Create Discussion Room
  const createDiscussionRoom = (data: { title: string; topic: any; description: string; enableVoice: boolean; tags: string[] }) => {
    const newRoom: DiscussionRoom = {
      id: `room-${Date.now()}`,
      title: data.title,
      topic: data.topic,
      description: data.description,
      zoneId: selectedZone.id,
      zoneName: selectedZone.name,
      createdBy: 'You (Host)',
      createdAt: new Date().toISOString(),
      activeParticipantsCount: 1,
      isVoiceActive: data.enableVoice,
      voiceParticipantsCount: data.enableVoice ? 1 : 0,
      tags: data.tags.length > 0 ? data.tags : ['Local', 'Discussion'],
      isPinned: false
    };

    setRooms(prev => [newRoom, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newRoom.id]: [
        {
          id: `msg-welcome-${Date.now()}`,
          roomId: newRoom.id,
          senderName: 'Zone Sphere Bot',
          senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
          senderRole: 'Moderator',
          text: `Welcome to "${newRoom.title}"! Keep discussions respectful, helpful, and community-focused.`,
          timestamp: 'Just now',
          isSelf: false
        }
      ]
    }));

    showToast(`💬 Community Room "${newRoom.title}" is now open!`, 'purple');
    setIsCreateRoomModalOpen(false);
    setActiveRoomModal(newRoom);
  };

  // Send Chat Message
  const sendChatMessage = (roomId: string, text: string) => {
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      roomId,
      senderName: 'You (Community Member)',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      senderRole: 'Local Member',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true
    };

    setMessages(prev => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), newMsg]
    }));

    // Auto simulated community response after 3 seconds if first user message
    setTimeout(() => {
      const simulatedReplies = [
        "Thanks for sharing! Really helpful info for the zone.",
        "Good point! I will check that opening today.",
        "Appreciate the update! Let's stay connected here.",
        "Glad to see our local community actively discussing this!"
      ];
      const randomReply = simulatedReplies[Math.floor(Math.random() * simulatedReplies.length)];

      const botMsg: ChatMessage = {
        id: `msg-sim-${Date.now()}`,
        roomId,
        senderName: 'Local Peer (Online)',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        senderRole: 'Local Member',
        text: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: false
      };

      setMessages(p => ({
        ...p,
        [roomId]: [...(p[roomId] || []), botMsg]
      }));
    }, 2500);
  };

  // Submit Business Verification Request
  const submitBusinessVerification = (data: Partial<Business>) => {
    const newBiz: Business = {
      id: `biz-${Date.now()}`,
      name: data.name || 'New Enterprise',
      category: data.category || 'Retail & Shops',
      address: data.address || 'Local Street',
      locality: data.locality || selectedZone.name,
      zoneId: data.zoneId || selectedZone.id,
      officialPhone: data.officialPhone || '+91 90000 00000',
      officialEmail: data.officialEmail || 'business@domain.com',
      registrationNumber: data.registrationNumber || 'REG-PENDING-2026',
      registrationType: data.registrationType || 'GSTIN',
      documentName: data.documentName || 'Official_Business_Proof.pdf',
      documentUploadedAt: new Date().toISOString(),
      verificationStatus: 'Pending Review',
      rating: 5.0
    };

    setBusinesses(prev => [newBiz, ...prev]);

    // Audit log
    const audit: AuditLogItem = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: newBiz.name,
      action: 'BUSINESS_VERIFICATION_SUBMITTED',
      targetType: 'Business',
      targetId: newBiz.id,
      details: `Submitted ${newBiz.registrationType} (${newBiz.registrationNumber}) with proof document ${newBiz.documentName}.`
    };
    setAuditLogs(prev => [audit, ...prev]);

    showToast('📄 Verification documents uploaded. Status is "Pending Review". Admins will inspect.', 'purple');
    setIsBusinessVerificationModalOpen(false);
  };

  // Admin Action: Verify / Reject Business
  const adminVerifyBusiness = (businessId: string, status: VerificationStatus, notes?: string) => {
    setBusinesses(prev => prev.map(biz => {
      if (biz.id === businessId) {
        return {
          ...biz,
          verificationStatus: status,
          verifiedAt: status === 'Approved' ? new Date().toISOString() : undefined,
          verifiedBy: 'Administrator (Safety Team)',
          adminNotes: notes
        };
      }
      return biz;
    }));

    const audit: AuditLogItem = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: 'Administrator (Safety Team)',
      action: `BUSINESS_${status.toUpperCase().replace(/\s+/g, '_')}`,
      targetType: 'Business',
      targetId: businessId,
      details: notes || `Business verification status updated to ${status}.`
    };
    setAuditLogs(prev => [audit, ...prev]);

    showToast(`Business verification updated to "${status}".`, status === 'Approved' ? 'success' : 'warning');
  };

  // Submit Content Report
  const submitReport = (rep: { contentType: any; contentId: string; contentTitle: string; reason: any; additionalDetails: string }) => {
    const newReport: ContentReport = {
      id: `rep-${Date.now()}`,
      contentType: rep.contentType,
      contentId: rep.contentId,
      contentTitle: rep.contentTitle,
      reportedBy: 'Concerned User (You)',
      reason: rep.reason,
      additionalDetails: rep.additionalDetails,
      timestamp: new Date().toISOString(),
      status: 'Pending Review'
    };

    setReports(prev => [newReport, ...prev]);
    setReportTarget(null);
    showToast('🛡️ Report submitted to moderators for safety inspection.', 'info');
  };

  // Admin Resolve Report
  const adminResolveReport = (reportId: string, status: 'Resolved - Removed' | 'Dismissed - Valid', notes?: string) => {
    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return { ...r, status, moderatorNotes: notes || 'Reviewed by Admin Team' };
      }
      return r;
    }));

    showToast(`Report updated: ${status}`, 'info');
  };

  // Renew Job Listing (TTL extension)
  const renewJobListing = (jobId: string, daysToAdd: number = 14) => {
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        const newExpiry = new Date(Date.now() + 86400000 * daysToAdd).toISOString();
        return {
          ...job,
          expiresAt: newExpiry,
          status: 'Active'
        };
      }
      return job;
    }));

    showToast('🔄 Job listing renewed for another 14 days!', 'success');
  };

  // Update Preferences
  const updateUserPreferences = (prefs: Partial<UserPreferences>) => {
    setUserPreferences(prev => ({ ...prev, ...prefs }));
    showToast('⚙️ Job preferences and alert criteria saved!', 'success');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedZone,
        hasConfirmedZone,
        setSelectedZone,
        zones,
        searchRadiusKm,
        setSearchRadiusKm,
        searchRadiusMode,
        setSearchRadiusMode,
        isGpsConfirmed,
        locationDetection,
        detectDeviceLocation,
        confirmEstimatedZone,
        clearLocationDetection,
        resetZoneSelection,
        gpsActive,
        gpsLocalityName,

        businesses,
        jobs,
        offers,
        rooms,
        filteredJobs,
        filteredOffers,
        filteredBusinesses,
        filteredRooms,
        messages,
        applications,
        savedJobIds,
        notifications,
        reports,
        auditLogs,
        userPreferences,

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

        activeJobModal,
        setActiveJobModal,
        isApplyModalOpen,
        setIsApplyModalOpen,
        activeOfferModal,
        setActiveOfferModal,
        activeRoomModal,
        setActiveRoomModal,
        isVoiceActiveModalOpen,
        setIsVoiceActiveModalOpen,
        isPostJobModalOpen,
        setIsPostJobModalOpen,
        isPostOfferModalOpen,
        setIsPostOfferModalOpen,
        isCreateRoomModalOpen,
        setIsCreateRoomModalOpen,
        isBusinessVerificationModalOpen,
        setIsBusinessVerificationModalOpen,
        isAdminDashboardOpen,
        setIsAdminDashboardOpen,
        isPrivacyModalOpen,
        setIsPrivacyModalOpen,
        isZonePickerOpen,
        setIsZonePickerOpen,
        isMapModalOpen,
        setIsMapModalOpen,
        reportTarget,
        setReportTarget,

        toggleSaveJob,
        applyForJob,
        claimOffer,
        createJobListing,
        createOffer,
        createDiscussionRoom,
        sendChatMessage,
        submitBusinessVerification,
        adminVerifyBusiness,
        submitReport,
        adminResolveReport,
        renewJobListing,
        updateUserPreferences,
        markNotificationRead,
        clearAllNotifications,
        showToast,
        toast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
