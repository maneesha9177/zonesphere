export type JobCategory = 
  | 'Retail & Shops'
  | 'Restaurants & Cafés'
  | 'Hotels & Hospitality'
  | 'Petrol Bunks & Transport'
  | 'Warehouses & Factories'
  | 'Daily-Wage & Local Labor'
  | 'Technical & Field Services'
  | 'Office, Support & Admin'
  | 'IT & Professional'
  | 'Education & Tutoring';

export type EmploymentType = 
  | 'Full-Time'
  | 'Part-Time'
  | 'Daily-Wage'
  | 'Weekend-Only'
  | 'Night-Shift'
  | 'Shift-Based'
  | 'Contract / Seasonal'
  | 'Internship';

export type PayPeriod = 'Hourly' | 'Daily' | 'Weekly' | 'Monthly' | 'Per Task';

export type WorkMode = 'On-site' | 'Hybrid' | 'Remote';

export type VerificationStatus = 'Pending Review' | 'Approved' | 'Rejected' | 'Additional Info Required' | 'Suspended';

export interface Zone {
  id: string;
  name: string;
  code: string;
  countryCode: string;
  countryName: string;
  state: string;
  district: string;
  city: string;
  locality?: string;
  parentZoneId?: string;
  administrativeLevel?: 'locality' | 'city' | 'district' | 'state';
  centerCoordinates: {
    lat: number;
    lng: number;
  };
  radiusKm: number;
  description: string;
  color: string;
  popularLandmarks?: string[];
  activeStatus?: boolean;
  boundaryCoordinates?: Array<{ lat: number; lng: number }>;
}

export type SearchRadiusMode = 'zone_only' | 'radius_1km' | 'radius_5km' | 'radius_10km' | 'radius_25km';

export interface GeographicHierarchy {
  country: string;
  countryCode: string;
  states: {
    name: string;
    code: string;
    districts: {
      name: string;
      code: string;
      cities: {
        name: string;
        code: string;
        localities: {
          name: string;
          zoneId: string;
        }[];
        zoneIds: string[];
      }[];
    }[];
  }[];
}

export interface LocationDetectionResult {
  status: 'idle' | 'requesting_permission' | 'detecting' | 'success' | 'denied' | 'timeout' | 'unavailable' | 'unsupported' | 'no_supported_zone';
  coords?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  };
  estimatedZone?: Zone;
  distanceKm?: number;
  resolvedAddress?: string;
  errorMessage?: string;
  timestamp?: number;
}

export interface Business {
  id: string;
  name: string;
  category: JobCategory | string;
  address: string;
  locality: string;
  zoneId: string;
  officialPhone: string;
  officialEmail: string;
  registrationNumber: string; // e.g. GST / Trade License
  registrationType: 'GSTIN' | 'Trade License' | 'Shop & Establishment' | 'Corporate CIN' | 'Local Council ID';
  documentName?: string;
  documentUploadedAt?: string;
  verificationStatus: VerificationStatus;
  verifiedAt?: string;
  verifiedBy?: string;
  adminNotes?: string;
  logoUrl?: string;
  rating?: number;
}

export interface JobListing {
  id: string;
  businessId: string;
  businessName: string;
  businessVerified: boolean;
  title: string;
  category: JobCategory;
  vacancies: number;
  employmentType: EmploymentType;
  workMode: WorkMode;
  payAmount: number;
  payPeriod: PayPeriod;
  payCurrency: string;
  shiftTiming: string; // e.g. "Morning 7:00 AM - 3:00 PM"
  weeklyHolidays: string; // e.g. "Sunday / Rotational"
  requiredEducation: string; // e.g. "10th Pass", "No formal degree required", "Graduate"
  experienceRequired: string; // e.g. "Freshers welcome / 0-1 yr", "1-2 years"
  requiredSkills: string[];
  requiredLanguages: string[];
  description: string;
  responsibilities: string[];
  benefits: string[];
  workplaceAddress: string;
  locality: string;
  zoneId: string;
  lat: number;
  lng: number;
  applicationMethod: 'In-App' | 'Direct Call' | 'WhatsApp' | 'Walk-In' | 'External Link';
  contactPhone?: string;
  contactEmail?: string;
  externalLink?: string;
  posterTheme?: string;
  posterBgColor?: string;
  posterCustomBadge?: string;
  createdAt: string;
  expiresAt: string; // TTL Expiry
  isUrgent?: boolean;
  status: 'Active' | 'Closing Soon' | 'Expired' | 'Suspended';
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  businessName: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  preferredShift: string;
  experienceSummary: string;
  appliedAt: string;
  status: 'Submitted' | 'Under Review' | 'Interview Shortlisted' | 'Accepted' | 'Declined';
}

export interface LocalOffer {
  id: string;
  businessId: string;
  businessName: string;
  businessVerified: boolean;
  title: string;
  description: string;
  discountBadge: string; // e.g., "30% OFF", "BUY 1 GET 1", "FLAT ₹100 CASHBACK"
  category: string;
  zoneId: string;
  locality: string;
  terms: string[];
  code?: string;
  instructions: string;
  bannerImage: string;
  accentColor: string;
  isSponsored: boolean;
  createdAt: string;
  expiresAt: string;
  claimedCount: number;
  maxClaims?: number;
}

export interface DiscussionRoom {
  id: string;
  title: string;
  topic: 
    | 'Jobs & Career Guidance'
    | 'Part-Time & Shift Gigs'
    | 'IT & Technology'
    | 'Education & Study Groups'
    | 'College Communities'
    | 'Local Business & Offers'
    | 'Events & Team Formation'
    | 'General Community Help';
  description: string;
  zoneId: string;
  zoneName: string;
  createdBy: string;
  createdAt: string;
  activeParticipantsCount: number;
  isVoiceActive: boolean;
  voiceParticipantsCount: number;
  tags: string[];
  isPinned?: boolean;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderName: string;
  senderAvatar: string;
  senderRole?: 'Host' | 'Moderator' | 'Local Member' | 'Verified Employer';
  text: string;
  timestamp: string;
  isSelf?: boolean;
  reactions?: Record<string, number>;
}

export interface UserPreferences {
  selectedZoneId: string;
  searchRadiusKm: number;
  preferredCategories: JobCategory[];
  preferredEmploymentTypes: EmploymentType[];
  preferredShifts: string[];
  minimumPayMonthly: number;
  enableJobAlerts: boolean;
  enableOfferAlerts: boolean;
  enableExpiryAlerts: boolean;
  pushNotificationsEnabled: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'job_match' | 'job_expiring' | 'offer_alert' | 'application_update' | 'business_verification' | 'system';
  title: string;
  message: string;
  timeAgo: string;
  timestamp: string;
  read: boolean;
  actionTarget?: {
    tab: 'jobs' | 'offers' | 'discussions' | 'admin' | 'profile';
    targetId?: string;
  };
}

export interface ContentReport {
  id: string;
  contentType: 'job' | 'business' | 'offer' | 'message' | 'room';
  contentId: string;
  contentTitle: string;
  reportedBy: string;
  reason: 
    | 'Fraudulent job or fake employer'
    | 'Asking for upfront security money'
    | 'Misleading pay / terms'
    | 'Spam or abusive content'
    | 'Expired or closed vacancy'
    | 'Inappropriate discussion content';
  additionalDetails: string;
  timestamp: string;
  status: 'Pending Review' | 'Resolved - Removed' | 'Dismissed - Valid';
  moderatorNotes?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
}
