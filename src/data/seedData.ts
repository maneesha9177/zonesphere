import type { 
  Zone, Business, JobListing, LocalOffer, DiscussionRoom, 
  ChatMessage, ContentReport, AuditLogItem, GeographicHierarchy 
} from '../types';

export const GEOGRAPHIC_HIERARCHY: GeographicHierarchy = {
  country: 'India',
  countryCode: 'IN',
  states: [
    {
      name: 'Telangana',
      code: 'TS',
      districts: [
        {
          name: 'Mancherial',
          code: 'TS-MCL',
          cities: [
            {
              name: 'Mancherial Town',
              code: 'MCL-TWN',
              localities: [
                { name: 'Station Road & Railway Station Area', zoneId: 'zone-mancherial' },
                { name: 'IB Chowk & Central Commercial Bazaar', zoneId: 'zone-mancherial' },
                { name: 'Bellampalli Road Commercial Street', zoneId: 'zone-mancherial' },
                { name: 'Gouthami Nagar / Collectorate Road', zoneId: 'zone-mancherial' },
                { name: 'Mancherial Rythu Bazaar Yard', zoneId: 'zone-mancherial' }
              ],
              zoneIds: ['zone-mancherial']
            },
            {
              name: 'Mandamarri & Bellampalli',
              code: 'MCL-MND',
              localities: [
                { name: 'Bellampalli Main Road Bazaar', zoneId: 'zone-mandamarri' },
                { name: 'Mandamarri Bus Stand Junction', zoneId: 'zone-mandamarri' },
                { name: 'Singareni Area Workshop Bay', zoneId: 'zone-mandamarri' },
                { name: 'Somagudem Industrial Junction', zoneId: 'zone-mandamarri' }
              ],
              zoneIds: ['zone-mandamarri']
            }
          ]
        },
        {
          name: 'Hyderabad',
          code: 'TS-HYD',
          cities: [
            {
              name: 'Hyderabad (Cyberabad & West)',
              code: 'HYD-WST',
              localities: [
                { name: 'Cyber Towers & Madhapur Junction', zoneId: 'zone-hitec-city' },
                { name: 'Mindspace IT Park & Raheja Circle', zoneId: 'zone-hitec-city' },
                { name: 'Inorbit Mall & Knowledge City Road', zoneId: 'zone-hitec-city' },
                { name: 'Kondapur Botanical Garden Road', zoneId: 'zone-hitec-city' }
              ],
              zoneIds: ['zone-hitec-city']
            },
            {
              name: 'Hyderabad (Central & Education Hub)',
              code: 'HYD-CTR',
              localities: [
                { name: 'Ameerpet Metro Junction & Maitrivanam', zoneId: 'zone-ameerpet' },
                { name: 'SR Nagar Main Road & Coaching Street', zoneId: 'zone-ameerpet' },
                { name: 'Aditya Enclave Tech Arcade', zoneId: 'zone-ameerpet' },
                { name: 'Panjagutta Central Mall Road', zoneId: 'zone-ameerpet' }
              ],
              zoneIds: ['zone-ameerpet']
            }
          ]
        }
      ]
    },
    {
      name: 'Andhra Pradesh',
      code: 'AP',
      districts: [
        {
          name: 'Visakhapatnam',
          code: 'AP-VSP',
          cities: [
            {
              name: 'Visakhapatnam (South & Industrial)',
              code: 'VSP-STH',
              localities: [
                { name: 'Old Gajuwaka Junction (Opp. Police Station)', zoneId: 'zone-gajuwaka' },
                { name: 'Auto Nagar Phase-1 & Logistics Belt', zoneId: 'zone-gajuwaka' },
                { name: 'Kurmannapalem & Steel Plant Main Gate', zoneId: 'zone-gajuwaka' },
                { name: 'High School Road NH-16 Junction', zoneId: 'zone-gajuwaka' },
                { name: 'Kanithi Road & Chaitanya Nagar', zoneId: 'zone-gajuwaka' },
                { name: 'New Gajuwaka BC Road Market', zoneId: 'zone-gajuwaka' }
              ],
              zoneIds: ['zone-gajuwaka']
            },
            {
              name: 'Visakhapatnam (Central & Commercial)',
              code: 'VSP-CTR',
              localities: [
                { name: 'Dwaraka Nagar Diamond Park & 2nd Lane', zoneId: 'zone-dwarakanagar' },
                { name: 'RTC Complex Central Bus Stand', zoneId: 'zone-dwarakanagar' },
                { name: 'Daba Gardens & Allipuram Market', zoneId: 'zone-dwarakanagar' },
                { name: 'Siripuram Circle & AU Outgate', zoneId: 'zone-siripuram' },
                { name: 'VIP Road & Dutt Island', zoneId: 'zone-siripuram' },
                { name: 'Jagadamba Cinema Junction', zoneId: 'zone-jagadamba' },
                { name: 'Beach Road Opp Submarine Museum', zoneId: 'zone-jagadamba' }
              ],
              zoneIds: ['zone-dwarakanagar', 'zone-siripuram', 'zone-jagadamba']
            },
            {
              name: 'Visakhapatnam (North & IT Corridor)',
              code: 'VSP-NRTH',
              localities: [
                { name: 'Rushikonda IT SEZ Hill No. 2 & 3', zoneId: 'zone-madhurawada' },
                { name: 'Madhurawada Car Shed Junction', zoneId: 'zone-madhurawada' },
                { name: 'Kommadi Junction & Gayatri College Road', zoneId: 'zone-madhurawada' },
                { name: 'PM Palem Stadium Road', zoneId: 'zone-madhurawada' }
              ],
              zoneIds: ['zone-madhurawada']
            }
          ]
        }
      ]
    },
    {
      name: 'Karnataka',
      code: 'KA',
      districts: [
        {
          name: 'Bengaluru Urban',
          code: 'KA-BLR',
          cities: [
            {
              name: 'Bengaluru (South & Startups)',
              code: 'BLR-STH',
              localities: [
                { name: 'Koramangala 5th Block Food Street', zoneId: 'zone-koramangala' },
                { name: 'Sony World Signal & 80 Feet Road', zoneId: 'zone-koramangala' },
                { name: 'HSR Layout BDA Complex & 27th Main', zoneId: 'zone-koramangala' }
              ],
              zoneIds: ['zone-koramangala']
            },
            {
              name: 'Bengaluru (East & Tech Parks)',
              code: 'BLR-EST',
              localities: [
                { name: 'ITPL Main Gate & Pattandur Agrahara', zoneId: 'zone-whitefield' },
                { name: 'Hope Farm Junction & Channasandra', zoneId: 'zone-whitefield' },
                { name: 'ECC Road & Nallurahalli', zoneId: 'zone-whitefield' }
              ],
              zoneIds: ['zone-whitefield']
            }
          ]
        }
      ]
    }
  ]
};

export const SEED_ZONES: Zone[] = [
  // 1. Mancherial (Telangana)
  {
    id: 'zone-mancherial',
    name: 'Mancherial Commercial & Market Hub',
    code: 'MCL-01',
    countryCode: 'IN',
    countryName: 'India',
    state: 'Telangana',
    district: 'Mancherial',
    city: 'Mancherial Town',
    locality: 'Station Road & IB Chowk',
    administrativeLevel: 'locality',
    centerCoordinates: { lat: 18.8711, lng: 79.4637 },
    radiusKm: 5,
    description: 'Retail supermarkets, electronics showrooms, railway station logistics, restaurants, and wholesale produce centers.',
    color: '#E98BB5', // Baby Pink & Rose tone
    activeStatus: true,
    popularLandmarks: [
      'Station Road & Railway Station Area',
      'IB Chowk & Central Commercial Bazaar',
      'Bellampalli Road Commercial Street',
      'Gouthami Nagar / Collectorate Road',
      'Mancherial Rythu Bazaar Yard'
    ]
  },
  // 2. Mandamarri & Bellampalli (Telangana)
  {
    id: 'zone-mandamarri',
    name: 'Mandamarri & Bellampalli Industrial Belt',
    code: 'MCL-02',
    countryCode: 'IN',
    countryName: 'India',
    state: 'Telangana',
    district: 'Mancherial',
    city: 'Mandamarri / Bellampalli',
    locality: 'Singareni Area Workshop',
    administrativeLevel: 'locality',
    centerCoordinates: { lat: 18.9833, lng: 79.4833 },
    radiusKm: 8,
    description: 'Mining engineering workshops, heavy vehicle logistics, fuel bunks, local trade stores, and delivery routes.',
    color: '#28658A', // Deep Blue tone
    activeStatus: true,
    popularLandmarks: [
      'Bellampalli Main Road Bazaar',
      'Mandamarri Bus Stand Junction',
      'Singareni Area Workshop Bay',
      'Somagudem Industrial Junction'
    ]
  },
  // 3. Hyderabad HITEC City (Telangana)
  {
    id: 'zone-hitec-city',
    name: 'HITEC City & Madhapur IT Corridor',
    code: 'HYD-01',
    countryCode: 'IN',
    countryName: 'India',
    state: 'Telangana',
    district: 'Hyderabad',
    city: 'Hyderabad',
    locality: 'HITEC City / Madhapur',
    administrativeLevel: 'locality',
    centerCoordinates: { lat: 17.4435, lng: 78.3772 },
    radiusKm: 6,
    description: 'Cyber towers, technology parks, software development centers, rooftop cafes, executive transport, and co-working hubs.',
    color: '#87CEEB', // Sky Blue tone
    activeStatus: true,
    popularLandmarks: [
      'Cyber Towers & Madhapur Junction',
      'Mindspace IT Park & Raheja Circle',
      'Inorbit Mall & Knowledge City Road',
      'Kondapur Botanical Garden Road'
    ]
  },
  // 4. Hyderabad Ameerpet (Telangana)
  {
    id: 'zone-ameerpet',
    name: 'Ameerpet & SR Nagar Education Hub',
    code: 'HYD-02',
    countryCode: 'IN',
    countryName: 'India',
    state: 'Telangana',
    district: 'Hyderabad',
    city: 'Hyderabad',
    locality: 'Ameerpet / SR Nagar',
    administrativeLevel: 'locality',
    centerCoordinates: { lat: 17.4375, lng: 78.4482 },
    radiusKm: 4,
    description: 'Software training institutes, coaching classrooms, book distributors, electronics hardware stores, and student dining.',
    color: '#E98BB5',
    activeStatus: true,
    popularLandmarks: [
      'Ameerpet Metro Junction & Maitrivanam',
      'SR Nagar Main Road & Coaching Street',
      'Aditya Enclave Tech Arcade',
      'Panjagutta Central Mall Road'
    ]
  },
  // 5. Gajuwaka (Visakhapatnam, AP)
  {
    id: 'zone-gajuwaka',
    name: 'Gajuwaka & Auto Nagar Industrial Belt',
    code: 'GWK-01',
    countryCode: 'IN',
    countryName: 'India',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Visakhapatnam',
    locality: 'Gajuwaka Industrial Corridor',
    administrativeLevel: 'locality',
    centerCoordinates: { lat: 17.6868, lng: 83.2185 },
    radiusKm: 6,
    description: 'Major industrial hubs, steel plant gate, auto workshops, petrol bunks, supermarkets & logistics warehouses.',
    color: '#28658A',
    activeStatus: true,
    popularLandmarks: [
      'Old Gajuwaka Junction (Opp. Police Station)',
      'Auto Nagar Phase-1 & Logistics Belt',
      'Kurmannapalem & Steel Plant Main Gate',
      'High School Road NH-16 Junction',
      'Kanithi Road & Chaitanya Nagar',
      'New Gajuwaka BC Road Market'
    ]
  },
  // 6. Dwaraka Nagar (Visakhapatnam, AP)
  {
    id: 'zone-dwarakanagar',
    name: 'Dwaraka Nagar & RTC Complex Central',
    code: 'DWK-02',
    countryCode: 'IN',
    countryName: 'India',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Visakhapatnam',
    locality: 'Dwaraka Nagar Central',
    administrativeLevel: 'locality',
    centerCoordinates: { lat: 17.7266, lng: 83.3082 },
    radiusKm: 4,
    description: 'Commercial center, shopping malls, electronics showrooms, coaching academies, restaurants & supermarkets.',
    color: '#87CEEB',
    activeStatus: true,
    popularLandmarks: [
      'Dwaraka Nagar Diamond Park & 2nd Lane',
      'RTC Complex Central Bus Stand',
      'Daba Gardens & Allipuram Market',
      'Suryabagh & Jagadamba Road'
    ]
  },
  // 7. Madhurawada (Visakhapatnam, AP)
  {
    id: 'zone-madhurawada',
    name: 'Madhurawada & Rushikonda IT Corridor',
    code: 'MDW-03',
    countryCode: 'IN',
    countryName: 'India',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Visakhapatnam',
    locality: 'Rushikonda IT SEZ',
    administrativeLevel: 'locality',
    centerCoordinates: { lat: 17.8228, lng: 83.3444 },
    radiusKm: 8,
    description: 'Tech parks, IT SEZ, start-up offices, beach cafes, college campuses & residential townships.',
    color: '#E98BB5',
    activeStatus: true,
    popularLandmarks: [
      'Rushikonda IT SEZ Hill No. 2 & 3',
      'Madhurawada Car Shed Junction',
      'Kommadi Junction & Gayatri College Road',
      'PM Palem Stadium Road'
    ]
  },
  // 8. Siripuram (Visakhapatnam, AP)
  {
    id: 'zone-siripuram',
    name: 'Siripuram & Andhra University Quarter',
    code: 'SRP-04',
    countryCode: 'IN',
    countryName: 'India',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Visakhapatnam',
    locality: 'Siripuram Circle',
    administrativeLevel: 'locality',
    centerCoordinates: { lat: 17.7208, lng: 83.3211 },
    radiusKm: 4,
    description: 'University campus, libraries, student hangout cafes, tutorial centres & bookstores.',
    color: '#28658A',
    activeStatus: true,
    popularLandmarks: [
      'Siripuram Circle & AU Outgate',
      'VIP Road & Dutt Island',
      'Waltair Uplands & Asilmetta'
    ]
  },
  // 9. Jagadamba & Beach Road (Visakhapatnam, AP)
  {
    id: 'zone-jagadamba',
    name: 'Jagadamba Junction & Beach Road Area',
    code: 'JGD-05',
    countryCode: 'IN',
    countryName: 'India',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    city: 'Visakhapatnam',
    locality: 'Beach Road & Jagadamba',
    administrativeLevel: 'locality',
    centerCoordinates: { lat: 17.7107, lng: 83.3015 },
    radiusKm: 5,
    description: 'Boutique hotels, seafood bistros, cinema halls, wholesale textile bazaars & port logistics.',
    color: '#87CEEB',
    activeStatus: true,
    popularLandmarks: [
      'Jagadamba Cinema Junction',
      'Beach Road Opp Submarine Museum',
      'Poorva Market & One Town Heritage Bazaar'
    ]
  },
  // 10. Koramangala (Bengaluru, KA)
  {
    id: 'zone-koramangala',
    name: 'Koramangala & HSR Layout Startup Hub',
    code: 'BLR-01',
    countryCode: 'IN',
    countryName: 'India',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    locality: 'Koramangala 5th Block',
    administrativeLevel: 'locality',
    centerCoordinates: { lat: 12.9352, lng: 77.6245 },
    radiusKm: 5,
    description: 'Vibrant tech startups, artisan cafes, boutique retailers, fitness clubs, and marketing agencies.',
    color: '#E98BB5',
    activeStatus: true,
    popularLandmarks: [
      'Koramangala 5th Block Food Street',
      'Sony World Signal & 80 Feet Road',
      'HSR Layout BDA Complex & 27th Main'
    ]
  },
  // 11. Whitefield (Bengaluru, KA)
  {
    id: 'zone-whitefield',
    name: 'Whitefield & ITPL Tech Belt',
    code: 'BLR-02',
    countryCode: 'IN',
    countryName: 'India',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    locality: 'Whitefield ITPL',
    administrativeLevel: 'locality',
    centerCoordinates: { lat: 12.9698, lng: 77.7499 },
    radiusKm: 7,
    description: 'Major software tech parks, corporate campuses, luxury retail malls, and metro stations.',
    color: '#28658A',
    activeStatus: true,
    popularLandmarks: [
      'ITPL Main Gate & Pattandur Agrahara',
      'Hope Farm Junction & Channasandra',
      'ECC Road & Nallurahalli'
    ]
  }
];

export const SEED_BUSINESSES: Business[] = [
  // Mancherial Businesses
  {
    id: 'biz-mcl-101',
    name: 'Sri Venkateshwara Supermarket & Retail Mart',
    category: 'Retail & Shops',
    address: 'Station Road, Near IB Chowk, Mancherial',
    locality: 'Station Road & Railway Station Area',
    zoneId: 'zone-mancherial',
    officialPhone: '+91 94401 55667',
    officialEmail: 'hiring@svsmart.in',
    registrationNumber: '36AABCS9912K1Z9',
    registrationType: 'GSTIN',
    documentName: 'GST_Certificate_Mancherial_SVS.pdf',
    documentUploadedAt: '2026-03-01T10:00:00Z',
    verificationStatus: 'Approved',
    verifiedAt: '2026-03-02T14:30:00Z',
    verifiedBy: 'Safety Admin',
    rating: 4.8
  },
  {
    id: 'biz-mcl-102',
    name: 'Godavari Grand Hotel & Family Restaurant',
    category: 'Restaurants & Cafés',
    address: 'Bellampalli Road Commercial Junction, Mancherial',
    locality: 'Bellampalli Road Commercial Street',
    zoneId: 'zone-mancherial',
    officialPhone: '+91 98480 77123',
    officialEmail: 'info@godavarigrand.com',
    registrationNumber: 'TL-MCL-2024-5102',
    registrationType: 'Trade License',
    documentName: 'TradeLicense_GodavariGrand.pdf',
    documentUploadedAt: '2026-02-18T09:12:00Z',
    verificationStatus: 'Approved',
    verifiedAt: '2026-02-19T11:00:00Z',
    verifiedBy: 'Safety Moderator',
    rating: 4.7
  },
  {
    id: 'biz-mcl-103',
    name: 'Kakatiya Highway Fuel Station & Express Care',
    category: 'Petrol Bunks & Transport',
    address: 'Opp Collectorate Road, Gouthami Nagar, Mancherial',
    locality: 'Gouthami Nagar / Collectorate Road',
    zoneId: 'zone-mancherial',
    officialPhone: '+91 94900 88221',
    officialEmail: 'kakatiyafuels@gmail.com',
    registrationNumber: 'PESO-TS-88412',
    registrationType: 'Shop & Establishment',
    documentName: 'Petroleum_License_Mancherial.pdf',
    documentUploadedAt: '2026-03-11T15:20:00Z',
    verificationStatus: 'Approved',
    verifiedAt: '2026-03-12T16:00:00Z',
    verifiedBy: 'Safety Admin',
    rating: 4.9
  },
  {
    id: 'biz-mcl-104',
    name: 'Singareni Logistics & Mining Equipment Spares',
    category: 'Warehouses & Factories',
    address: 'Near Singareni Area Workshop Bay, Mandamarri',
    locality: 'Singareni Area Workshop Bay',
    zoneId: 'zone-mandamarri',
    officialPhone: '+91 97010 33445',
    officialEmail: 'admin@mandamarrilogistics.in',
    registrationNumber: '36AABCS4411C1Z4',
    registrationType: 'GSTIN',
    documentName: 'Singareni_Vendor_Registration.pdf',
    documentUploadedAt: '2026-03-15T08:00:00Z',
    verificationStatus: 'Approved',
    verifiedAt: '2026-03-16T10:15:00Z',
    verifiedBy: 'Safety Moderator',
    rating: 4.6
  },
  // Hyderabad Businesses
  {
    id: 'biz-hyd-101',
    name: 'NexGen Cloud Systems & Digital Labs',
    category: 'IT & Professional',
    address: 'Level 4, Cyber Towers, Madhapur, Hyderabad',
    locality: 'Cyber Towers & Madhapur Junction',
    zoneId: 'zone-hitec-city',
    officialPhone: '+91 40 4855 9000',
    officialEmail: 'careers@nexgencloud.io',
    registrationNumber: 'U72200TG2020PTC123',
    registrationType: 'Corporate CIN',
    documentName: 'MCA_Cert_NexGen_Hyderabad.pdf',
    documentUploadedAt: '2026-03-05T11:30:00Z',
    verificationStatus: 'Approved',
    verifiedAt: '2026-03-06T15:00:00Z',
    verifiedBy: 'Chief Safety Admin',
    rating: 4.9
  },
  {
    id: 'biz-hyd-102',
    name: 'Pratibha Tech Institute & Coaching Center',
    category: 'Education & Tutoring',
    address: 'Maitrivanam Complex, 3rd Floor, Ameerpet, Hyderabad',
    locality: 'Ameerpet Metro Junction & Maitrivanam',
    zoneId: 'zone-ameerpet',
    officialPhone: '+91 99081 77221',
    officialEmail: 'contact@pratibhatech.edu',
    registrationNumber: 'EDU-TG-2022-81',
    registrationType: 'Shop & Establishment',
    documentName: 'Ameerpet_Institute_Registration.pdf',
    documentUploadedAt: '2026-03-18T10:00:00Z',
    verificationStatus: 'Approved',
    verifiedAt: '2026-03-19T11:20:00Z',
    verifiedBy: 'Safety Moderator',
    rating: 4.8
  },
  // Visakhapatnam Businesses
  {
    id: 'biz-101',
    name: 'Sri Krishna Supermarket & Daily Needs',
    category: 'Retail & Shops',
    address: 'Main Road, Opp Old Gajuwaka Police Station, Gajuwaka',
    locality: 'Old Gajuwaka Junction (Opp. Police Station)',
    zoneId: 'zone-gajuwaka',
    officialPhone: '+91 98480 12345',
    officialEmail: 'hiring@srikrishnamart.in',
    registrationNumber: '37ABCDE1234F1Z5',
    registrationType: 'GSTIN',
    documentName: 'GST_Certificate_SriKrishna_Gajuwaka.pdf',
    documentUploadedAt: '2026-03-01T10:00:00Z',
    verificationStatus: 'Approved',
    verifiedAt: '2026-03-02T14:30:00Z',
    verifiedBy: 'Chief Safety Admin',
    rating: 4.8
  },
  {
    id: 'biz-102',
    name: 'Coastal Spice Restaurant & Biryani Point',
    category: 'Restaurants & Cafés',
    address: 'Near Diamond Park, 2nd Lane, Dwaraka Nagar',
    locality: 'Dwaraka Nagar Diamond Park & 2nd Lane',
    zoneId: 'zone-dwarakanagar',
    officialPhone: '+91 98850 98765',
    officialEmail: 'contact@coastalspicevizag.com',
    registrationNumber: 'TL-VZP-2024-8841',
    registrationType: 'Trade License',
    documentName: 'TradeLicense_CoastalSpice.pdf',
    documentUploadedAt: '2026-02-15T09:12:00Z',
    verificationStatus: 'Approved',
    verifiedAt: '2026-02-16T11:00:00Z',
    verifiedBy: 'Safety Moderator',
    rating: 4.7
  },
  {
    id: 'biz-103',
    name: 'Highway Express Petrol Bunk & CNG Station',
    category: 'Petrol Bunks & Transport',
    address: 'NH-16 Highway Junction, Near High School Road, Gajuwaka',
    locality: 'High School Road NH-16 Junction',
    zoneId: 'zone-gajuwaka',
    officialPhone: '+91 94400 33211',
    officialEmail: 'manager@highwayexpressfuels.com',
    registrationNumber: 'PESO-AP-98212',
    registrationType: 'Shop & Establishment',
    documentName: 'Petroleum_License_Gajuwaka.pdf',
    documentUploadedAt: '2026-03-10T15:20:00Z',
    verificationStatus: 'Approved',
    verifiedAt: '2026-03-11T16:00:00Z',
    verifiedBy: 'Chief Safety Admin',
    rating: 4.9
  },
  {
    id: 'biz-106',
    name: 'CyberWave Tech Labs & Software Services',
    category: 'IT & Professional',
    address: 'Tower 2, IT SEZ Hill No. 2, Rushikonda, Madhurawada',
    locality: 'Rushikonda IT SEZ Hill No. 2 & 3',
    zoneId: 'zone-madhurawada',
    officialPhone: '+91 891 270 9000',
    officialEmail: 'careers@cyberwavetech.in',
    registrationNumber: 'U72200AP2021PTC148',
    registrationType: 'Corporate CIN',
    documentName: 'MCA_Incorporation_CyberWave.pdf',
    documentUploadedAt: '2026-03-05T11:30:00Z',
    verificationStatus: 'Approved',
    verifiedAt: '2026-03-06T15:00:00Z',
    verifiedBy: 'Chief Safety Admin',
    rating: 4.9
  }
];

export const SEED_JOBS: JobListing[] = [
  // 1. Mancherial Supermarket Cashier
  {
    id: 'job-mcl-001',
    businessId: 'biz-mcl-101',
    businessName: 'Sri Venkateshwara Supermarket & Retail Mart',
    businessVerified: true,
    title: 'Store Billing Staff & POS Cashier',
    category: 'Retail & Shops',
    vacancies: 3,
    employmentType: 'Full-Time',
    workMode: 'On-site',
    payAmount: 16000,
    payPeriod: 'Monthly',
    payCurrency: '₹',
    shiftTiming: 'Morning: 8:00 AM – 4:00 PM / Evening: 2:00 PM – 10:00 PM',
    weeklyHolidays: '1 Day Weekly Off (Rotational)',
    requiredEducation: '10th / 12th Pass or Basic Computer Knowledge',
    experienceRequired: 'Freshers or 6 months cashier experience',
    requiredSkills: ['Barcode Scanning', 'PhonePe/GPay UPI Billing', 'Cash Handling', 'Polite Communication'],
    requiredLanguages: ['Telugu', 'Basic Hindi'],
    description: 'Immediate openings for 3 store cashiers at our main supermarket near Station Road in Mancherial. Handle barcode billing, print receipts, and reconcile counter cash.',
    responsibilities: [
      'Scan grocery product barcodes swiftly on computerized POS terminal.',
      'Accept UPI QR and cash payments accurately.',
      'Assist customers with packing bags and daily bill queries.'
    ],
    benefits: [
      'Provident Fund (PF) and ESI medical coverage',
      'Daily morning tea and evening snack allowance',
      'Festival bonus on Dasara and Sankranti'
    ],
    workplaceAddress: 'Station Road, Near IB Chowk, Mancherial',
    locality: 'Station Road & Railway Station Area',
    zoneId: 'zone-mancherial',
    lat: 18.8715,
    lng: 79.4640,
    applicationMethod: 'In-App',
    contactPhone: '+91 94401 55667',
    contactEmail: 'hiring@svsmart.in',
    posterTheme: 'purple',
    posterCustomBadge: '⚡ IMMEDIATE HIRING',
    createdAt: '2026-04-10T09:00:00Z',
    expiresAt: '2026-04-25T23:59:59Z',
    isUrgent: true,
    status: 'Active'
  },
  // 2. Mancherial Restaurant Server
  {
    id: 'job-mcl-002',
    businessId: 'biz-mcl-102',
    businessName: 'Godavari Grand Hotel & Family Restaurant',
    businessVerified: true,
    title: 'Restaurant Food Server & Captain Assistant',
    category: 'Restaurants & Cafés',
    vacancies: 4,
    employmentType: 'Shift-Based',
    workMode: 'On-site',
    payAmount: 14500,
    payPeriod: 'Monthly',
    payCurrency: '₹',
    shiftTiming: 'Lunch Shift: 11:30 AM – 4:00 PM / Dinner Shift: 6:30 PM – 11:00 PM',
    weeklyHolidays: '1 Day Weekday Off',
    requiredEducation: 'No formal degree required',
    experienceRequired: 'Freshers welcome (1-day training provided)',
    requiredSkills: ['Table Service', 'Order Noting', 'Customer Politeness', 'Speed'],
    requiredLanguages: ['Telugu', 'Hindi'],
    description: 'Serve delicious meals and biryani to dining families at Godavari Grand on Bellampalli Road in Mancherial.',
    responsibilities: [
      'Welcome dining guests and present food menu cards.',
      'Deliver hot dishes from kitchen to tables with clean manners.',
      'Clear tables and provide digital invoice.'
    ],
    benefits: [
      'Free delicious duty meals provided after every shift',
      'Weekly tips pool (~₹1,800 extra per month)',
      'Staff accommodation available for outstation staff'
    ],
    workplaceAddress: 'Bellampalli Road Commercial Junction, Mancherial',
    locality: 'Bellampalli Road Commercial Street',
    zoneId: 'zone-mancherial',
    lat: 18.8735,
    lng: 79.4670,
    applicationMethod: 'In-App',
    contactPhone: '+91 98480 77123',
    posterTheme: 'teal',
    posterCustomBadge: '💵 DAILY TIPS SHARE',
    createdAt: '2026-04-09T10:00:00Z',
    expiresAt: '2026-04-24T23:59:59Z',
    isUrgent: false,
    status: 'Active'
  },
  // 3. Mancherial Petrol Bunk Attendant
  {
    id: 'job-mcl-003',
    businessId: 'biz-mcl-103',
    businessName: 'Kakatiya Highway Fuel Station & Express Care',
    businessVerified: true,
    title: 'Fuel Station Attendant & Vehicle Helper',
    category: 'Petrol Bunks & Transport',
    vacancies: 3,
    employmentType: 'Daily-Wage',
    workMode: 'On-site',
    payAmount: 650,
    payPeriod: 'Daily',
    payCurrency: '₹',
    shiftTiming: 'Morning: 6:00 AM – 2:00 PM / Night: 10:00 PM – 6:00 AM',
    weeklyHolidays: '1 Paid Day Off every week',
    requiredEducation: 'No degree required (Basic counting ability)',
    experienceRequired: 'Freshers welcome',
    requiredSkills: ['Fuel Dispenser Operation', 'UPI QR Scanner', 'Tire Air Gauge'],
    requiredLanguages: ['Telugu'],
    description: 'Assist cars, trucks, and two-wheelers with petrol, diesel, and air pressure checks on Collectorate Road in Mancherial. Daily cashout available.',
    responsibilities: [
      'Dispense requested fuel accurately as per meter reading.',
      'Accept digital UPI payments and cash receipts.',
      'Maintain clean, safe forecourt premises.'
    ],
    benefits: [
      'Daily cash in hand (₹650/day) or monthly transfer',
      'Free company uniform and safety shoes',
      'Night shift allowance (+₹100 extra per night)'
    ],
    workplaceAddress: 'Opp Collectorate Road, Gouthami Nagar, Mancherial',
    locality: 'Gouthami Nagar / Collectorate Road',
    zoneId: 'zone-mancherial',
    lat: 18.8680,
    lng: 79.4590,
    applicationMethod: 'Direct Call',
    contactPhone: '+91 94900 88221',
    posterTheme: 'amber',
    posterCustomBadge: '💵 DAILY CASH PAY',
    createdAt: '2026-04-09T08:00:00Z',
    expiresAt: '2026-04-20T18:00:00Z',
    isUrgent: true,
    status: 'Active'
  },
  // 4. Mandamarri Warehouse Helper
  {
    id: 'job-mcl-004',
    businessId: 'biz-mcl-104',
    businessName: 'Singareni Logistics & Mining Equipment Spares',
    businessVerified: true,
    title: 'Spares Inventory Packer & Loading Assistant',
    category: 'Warehouses & Factories',
    vacancies: 5,
    employmentType: 'Full-Time',
    workMode: 'On-site',
    payAmount: 17500,
    payPeriod: 'Monthly',
    payCurrency: '₹',
    shiftTiming: 'General Shift: 9:00 AM – 6:00 PM',
    weeklyHolidays: 'Sunday Fixed Holiday',
    requiredEducation: '10th / 8th Pass',
    experienceRequired: 'Freshers welcome',
    requiredSkills: ['Box Packing & Taping', 'Material Stacking', 'Loading Assistance'],
    requiredLanguages: ['Telugu'],
    description: 'Work at Mandamarri industrial spares yard. Pack machine components, tag delivery batches, and help load dispatch vans for regional coal collieries.',
    responsibilities: [
      'Pack spares into protective wooden/carton crates.',
      'Paste shipping invoice tags accurately.',
      'Assist forklift operators in vehicle loading.'
    ],
    benefits: [
      'ESI medical card and Provident Fund (PF)',
      'Subsidized company canteen meal',
      'Annual safety performance bonus'
    ],
    workplaceAddress: 'Near Singareni Area Workshop Bay, Mandamarri',
    locality: 'Singareni Area Workshop Bay',
    zoneId: 'zone-mandamarri',
    lat: 18.9840,
    lng: 79.4845,
    applicationMethod: 'In-App',
    contactPhone: '+91 97010 33445',
    posterTheme: 'dark',
    posterCustomBadge: '🏭 INDUSTRIAL ROLE',
    createdAt: '2026-04-08T11:00:00Z',
    expiresAt: '2026-04-26T23:59:59Z',
    isUrgent: false,
    status: 'Active'
  },
  // 5. Hyderabad IT Developer in HITEC City
  {
    id: 'job-hyd-001',
    businessId: 'biz-hyd-101',
    businessName: 'NexGen Cloud Systems & Digital Labs',
    businessVerified: true,
    title: 'React & TypeScript Frontend Developer',
    category: 'IT & Professional',
    vacancies: 3,
    employmentType: 'Full-Time',
    workMode: 'Hybrid',
    payAmount: 55000,
    payPeriod: 'Monthly',
    payCurrency: '₹',
    shiftTiming: 'Standard: 9:30 AM – 6:30 PM (2 Days WFH)',
    weeklyHolidays: 'Saturday & Sunday Fixed Off',
    requiredEducation: 'B.Tech / B.E / MCA / B.Sc Computers',
    experienceRequired: '1-3 years (Strong portfolio considered)',
    requiredSkills: ['React', 'TypeScript', 'Tailwind/CSS', 'REST APIs', 'Git'],
    requiredLanguages: ['English', 'Telugu / Hindi'],
    description: 'Join our cloud software engineering team at Cyber Towers in Madhapur. Build responsive web apps and modern dashboards for enterprise clients.',
    responsibilities: [
      'Implement reusable UI components in React and TypeScript.',
      'Integrate REST API endpoints with robust error handling.',
      'Write clean, accessible, and performant web code.'
    ],
    benefits: [
      'MacBook Pro laptop provided',
      'Comprehensive health insurance for family (₹5 Lakhs)',
      'Cafeteria meal pass and gym membership'
    ],
    workplaceAddress: 'Level 4, Cyber Towers, Madhapur, Hyderabad',
    locality: 'Cyber Towers & Madhapur Junction',
    zoneId: 'zone-hitec-city',
    lat: 17.4440,
    lng: 78.3780,
    applicationMethod: 'In-App',
    contactEmail: 'careers@nexgencloud.io',
    posterTheme: 'purple',
    posterCustomBadge: '⭐ HYBRID POSITION',
    createdAt: '2026-04-10T11:00:00Z',
    expiresAt: '2026-04-30T23:59:59Z',
    isUrgent: false,
    status: 'Active'
  },
  // 6. Hyderabad Ameerpet Python / Web Tutor
  {
    id: 'job-hyd-002',
    businessId: 'biz-hyd-102',
    businessName: 'Pratibha Tech Institute & Coaching Center',
    businessVerified: true,
    title: 'Python & Web Development Classroom Instructor',
    category: 'Education & Tutoring',
    vacancies: 2,
    employmentType: 'Part-Time',
    workMode: 'On-site',
    payAmount: 600,
    payPeriod: 'Hourly',
    payCurrency: '₹',
    shiftTiming: 'Morning Batches: 7:30 AM – 10:30 AM or Evening: 6:00 PM – 9:00 PM',
    weeklyHolidays: 'Sunday Fixed Holiday',
    requiredEducation: 'Degree in Computer Science / IT or equivalent',
    experienceRequired: '1+ year coaching or good student mentoring experience',
    requiredSkills: ['Python Fundamentals', 'HTML/CSS/JS Basics', 'Lab Guidance', 'Clear Explanation'],
    requiredLanguages: ['Telugu', 'English'],
    description: 'Teach Python programming and web essentials to engineering students and job seekers at our Maitrivanam center in Ameerpet.',
    responsibilities: [
      'Conduct 1-hour conceptual theory lectures and 1-hour hands-on coding labs.',
      'Guide students on mini project assignments.',
      'Clarify student queries with patience.'
    ],
    benefits: [
      'Guaranteed ₹600/hour paid weekly',
      'Air-conditioned smart classroom with projector'
    ],
    workplaceAddress: 'Maitrivanam Complex, 3rd Floor, Ameerpet, Hyderabad',
    locality: 'Ameerpet Metro Junction & Maitrivanam',
    zoneId: 'zone-ameerpet',
    lat: 17.4380,
    lng: 78.4485,
    applicationMethod: 'In-App',
    contactPhone: '+91 99081 77221',
    posterTheme: 'teal',
    posterCustomBadge: '🎓 PART-TIME TUTOR',
    createdAt: '2026-04-09T14:00:00Z',
    expiresAt: '2026-04-28T23:59:59Z',
    isUrgent: false,
    status: 'Active'
  },
  // 7. Visakhapatnam Gajuwaka Supermarket Cashier
  {
    id: 'job-001',
    businessId: 'biz-101',
    businessName: 'Sri Krishna Supermarket & Daily Needs',
    businessVerified: true,
    title: 'Store Cashier & POS Billing Staff',
    category: 'Retail & Shops',
    vacancies: 3,
    employmentType: 'Full-Time',
    workMode: 'On-site',
    payAmount: 16500,
    payPeriod: 'Monthly',
    payCurrency: '₹',
    shiftTiming: 'Morning: 8:00 AM – 4:00 PM / Evening: 2:00 PM – 10:00 PM',
    weeklyHolidays: '1 Day Weekly Off (Rotational)',
    requiredEducation: '10th / 12th Pass or Basic Computer Knowledge',
    experienceRequired: 'Freshers or 6 months billing experience',
    requiredSkills: ['Barcode Scanner', 'Cash & PhonePe/GPay UPI Handling', 'Fast Billing', 'Customer Politeness'],
    requiredLanguages: ['Telugu', 'Basic Hindi / English'],
    description: 'We need 3 friendly cashiers for our grocery supermarket in Old Gajuwaka. Manage billing counter, scan items, print receipts, and accept cash / UPI payments.',
    responsibilities: [
      'Scan barcodes on grocery items quickly using computer POS software.',
      'Accept cash and PhonePe/GPay QR payments and provide print receipt.',
      'Keep the billing counter tidy and hand over shopping bags.'
    ],
    benefits: [
      'PF and ESI health benefits included',
      'Daily morning tea and evening snack allowance',
      'Diwali / Festival bonus and overtime pay'
    ],
    workplaceAddress: 'Main Road, Opp Old Gajuwaka Police Station, Gajuwaka',
    locality: 'Old Gajuwaka Junction (Opp. Police Station)',
    zoneId: 'zone-gajuwaka',
    lat: 17.6872,
    lng: 83.2190,
    applicationMethod: 'In-App',
    contactPhone: '+91 98480 12345',
    contactEmail: 'hiring@srikrishnamart.in',
    posterTheme: 'purple',
    posterCustomBadge: '⚡ IMMEDIATE HIRING',
    createdAt: '2026-04-08T09:00:00Z',
    expiresAt: '2026-04-22T23:59:59Z',
    isUrgent: true,
    status: 'Active'
  },
  // 8. Visakhapatnam Petrol Bunk Attendant
  {
    id: 'job-002',
    businessId: 'biz-103',
    businessName: 'Highway Express Petrol Bunk & CNG Station',
    businessVerified: true,
    category: 'Petrol Bunks & Transport',
    title: 'Fuel Station Attendant & Air Pressure Checker',
    vacancies: 4,
    employmentType: 'Shift-Based',
    workMode: 'On-site',
    payAmount: 700,
    payPeriod: 'Daily',
    payCurrency: '₹',
    shiftTiming: 'Day Shift: 6:00 AM – 2:00 PM / Night Shift: 10:00 PM – 6:00 AM',
    weeklyHolidays: '1 Paid Day Off every week',
    requiredEducation: 'No formal degree required (Basic counting ability)',
    experienceRequired: 'Freshers welcome (On-site 2-day training provided)',
    requiredSkills: ['Fuel Dispenser Machine', 'UPI QR Scanner', 'Tire Pressure Gauge', 'Punctuality'],
    requiredLanguages: ['Telugu', 'Hindi'],
    description: 'Immediate hiring for fuel dispensers and vehicle assistants at our busy NH-16 Gajuwaka petrol bunk near High School Road. Option for daily wage payout in cash or monthly bank transfer.',
    responsibilities: [
      'Fill petrol, diesel, and auto LPG accurately according to customer meter request.',
      'Accept digital UPI payments, cards, or cash.',
      'Check vehicle tire air pressure upon customer request.'
    ],
    benefits: [
      'Daily cash in hand (₹700/day) or monthly bank payment',
      'Free company uniform, safety shoes, and rain jacket',
      'Night shift allowance (+₹100 extra per night)'
    ],
    workplaceAddress: 'NH-16 Highway Junction, Near High School Road, Gajuwaka',
    locality: 'High School Road NH-16 Junction',
    zoneId: 'zone-gajuwaka',
    lat: 17.6850,
    lng: 83.2170,
    applicationMethod: 'Direct Call',
    contactPhone: '+91 94400 33211',
    posterTheme: 'amber',
    posterCustomBadge: '💵 DAILY WAGE CASHOUT',
    createdAt: '2026-04-05T08:00:00Z',
    expiresAt: '2026-04-15T18:00:00Z',
    isUrgent: true,
    status: 'Closing Soon'
  },
  // 9. Visakhapatnam IT Developer in Rushikonda
  {
    id: 'job-010',
    businessId: 'biz-106',
    businessName: 'CyberWave Tech Labs & Software Services',
    businessVerified: true,
    category: 'IT & Professional',
    title: 'Junior React & Web Frontend Developer',
    vacancies: 2,
    employmentType: 'Full-Time',
    workMode: 'Hybrid',
    payAmount: 38000,
    payPeriod: 'Monthly',
    payCurrency: '₹',
    shiftTiming: 'Standard 9:30 AM – 6:30 PM (2 Days WFH / 3 Days In-Office)',
    weeklyHolidays: 'Saturday & Sunday Fixed Weekend Off',
    requiredEducation: 'B.Tech / BCA / MCA / B.Sc Computers',
    experienceRequired: '0-2 years (Freshers with good personal projects welcome)',
    requiredSkills: ['React.js', 'TypeScript / JavaScript', 'HTML/CSS', 'REST APIs', 'Git'],
    requiredLanguages: ['English', 'Telugu'],
    description: 'Build fast, responsive web portals and admin dashboards in our Rushikonda IT SEZ campus. Mentorship from senior team leads.',
    responsibilities: [
      'Develop clean, responsive UI screens using React and CSS components.',
      'Connect frontend web pages with backend REST APIs.',
      'Test web pages on mobile and desktop browsers.'
    ],
    benefits: [
      'High configuration company laptop provided',
      'Health insurance coverage for employee & family',
      'AC office with sea view cafeteria and shuttle bus from RTC Complex'
    ],
    workplaceAddress: 'Tower 2, IT SEZ Hill No. 2, Rushikonda, Madhurawada',
    locality: 'Rushikonda IT SEZ Hill No. 2 & 3',
    zoneId: 'zone-madhurawada',
    lat: 17.8235,
    lng: 83.3450,
    applicationMethod: 'In-App',
    contactEmail: 'careers@cyberwavetech.in',
    posterTheme: 'purple',
    posterCustomBadge: '⭐ HYBRID ROLE',
    createdAt: '2026-04-09T16:00:00Z',
    expiresAt: '2026-04-30T23:59:59Z',
    isUrgent: false,
    status: 'Active'
  }
];

export const SEED_OFFERS: LocalOffer[] = [
  // Mancherial Offer
  {
    id: 'offer-mcl-001',
    businessId: 'biz-mcl-101',
    businessName: 'Sri Venkateshwara Supermarket & Retail Mart',
    businessVerified: true,
    title: 'Mancherial Special: Flat 20% OFF on Cooking Oils & Grains',
    description: 'Avail flat 20% savings on 5L sunflower oil cans and Sona Masoori 25kg rice bags at our Station Road supermarket.',
    discountBadge: 'FLAT 20% OFF',
    category: 'Groceries & Food',
    zoneId: 'zone-mancherial',
    locality: 'Station Road & Railway Station Area',
    terms: [
      'Valid on in-store purchases above ₹500',
      'Show coupon code at cash billing counter',
      'Valid till Sunday evening 9:00 PM'
    ],
    code: 'MCL20OFF',
    instructions: 'Show this code or screenshot to the billing cashier before invoice print.',
    bannerImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    accentColor: '#E98BB5',
    isSponsored: true,
    createdAt: '2026-04-08T10:00:00Z',
    expiresAt: '2026-04-20T23:59:59Z',
    claimedCount: 84,
    maxClaims: 200
  },
  // Mancherial Restaurant Offer
  {
    id: 'offer-mcl-002',
    businessId: 'biz-mcl-102',
    businessName: 'Godavari Grand Hotel & Family Restaurant',
    businessVerified: true,
    title: 'Family Feast: Buy 2 Special Dum Biryani, Get 1 Starter Free',
    description: 'Dine with family in Mancherial. Order any 2 Large Biryanis and get Chicken 65 or Paneer Majestic free.',
    discountBadge: 'FREE STARTER',
    category: 'Dining & Cafés',
    zoneId: 'zone-mancherial',
    locality: 'Bellampalli Road Commercial Street',
    terms: [
      'Valid Mon-Fri between 4:00 PM and 9:00 PM',
      'Dine-in only at Bellampalli Road branch'
    ],
    code: 'GODAVARI65',
    instructions: 'Tell the waiter you have the Zone Sphere voucher when ordering.',
    bannerImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
    accentColor: '#28658A',
    isSponsored: false,
    createdAt: '2026-04-07T12:00:00Z',
    expiresAt: '2026-04-22T19:00:00Z',
    claimedCount: 65,
    maxClaims: 150
  },
  // Gajuwaka Offer
  {
    id: 'offer-001',
    businessId: 'biz-101',
    businessName: 'Sri Krishna Supermarket & Daily Needs',
    businessVerified: true,
    title: 'Weekend Special: Flat 20% OFF on Cooking Oils & Rice Bags',
    description: 'Get flat 20% discount on 5L sunflower oil cans and 25kg Sona Masoori rice bags at our Old Gajuwaka supermarket.',
    discountBadge: 'FLAT 20% OFF',
    category: 'Groceries & Food',
    zoneId: 'zone-gajuwaka',
    locality: 'Old Gajuwaka Junction (Opp. Police Station)',
    terms: [
      'Valid on in-store purchases above ₹500',
      'Show coupon code at cash billing counter',
      'Valid till Sunday evening 9:00 PM'
    ],
    code: 'GAJUWAKA20',
    instructions: 'Show this code or screenshot to the billing cashier before invoice print.',
    bannerImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    accentColor: '#E98BB5',
    isSponsored: true,
    createdAt: '2026-04-08T10:00:00Z',
    expiresAt: '2026-04-24T23:59:59Z',
    claimedCount: 148,
    maxClaims: 300
  },
  // Hyderabad HITEC City Offer
  {
    id: 'offer-hyd-001',
    businessId: 'biz-hyd-101',
    businessName: 'NexGen Cloud Systems & Digital Labs',
    businessVerified: true,
    title: 'Community Tech Meetup: Free Cloud Architecture Workshop Pass',
    description: 'Free attendee ticket to our Saturday microservices and cloud design masterclass in Cyber Towers.',
    discountBadge: 'FREE TICKET',
    category: 'IT & Events',
    zoneId: 'zone-hitec-city',
    locality: 'Cyber Towers & Madhapur Junction',
    terms: [
      'Pre-registration required on Zone Sphere',
      'Saturday 10:00 AM – 1:00 PM'
    ],
    code: 'CYBERCLOUD',
    instructions: 'Present barcode ticket at Cyber Towers security reception.',
    bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80',
    accentColor: '#87CEEB',
    isSponsored: true,
    createdAt: '2026-04-09T08:00:00Z',
    expiresAt: '2026-04-26T12:00:00Z',
    claimedCount: 42,
    maxClaims: 80
  }
];

export const SEED_ROOMS: DiscussionRoom[] = [
  // Mancherial Discussion Room
  {
    id: 'room-mcl-001',
    title: 'Mancherial Local Jobs, Shops & Daily Gigs',
    topic: 'Jobs & Career Guidance',
    description: 'Connect with local business owners, supermarket job opportunities, transport openings, and local news across Mancherial and Mandamarri.',
    zoneId: 'zone-mancherial',
    zoneName: 'Mancherial Commercial Hub',
    createdBy: 'Srinivas_MCLAdmin',
    createdAt: '2026-04-06T10:00:00Z',
    activeParticipantsCount: 52,
    isVoiceActive: true,
    voiceParticipantsCount: 5,
    tags: ['Mancherial', 'StationRoad', 'IBChowk', 'LocalJobs', 'BazaarNews'],
    isPinned: true
  },
  // Mandamarri Discussion Room
  {
    id: 'room-mcl-002',
    title: 'Mandamarri & Singareni Belt Employment Room',
    topic: 'Part-Time & Shift Gigs',
    description: 'Discuss technical workshops, logistics fleets, mining contractor helpers, and transport work in Mandamarri & Bellampalli.',
    zoneId: 'zone-mandamarri',
    zoneName: 'Mandamarri Industrial Belt',
    createdBy: 'Raju_SingareniHub',
    createdAt: '2026-04-07T11:00:00Z',
    activeParticipantsCount: 34,
    isVoiceActive: false,
    voiceParticipantsCount: 0,
    tags: ['Mandamarri', 'Bellampalli', 'Singareni', 'ShiftWork'],
    isPinned: false
  },
  // Hyderabad HITEC City Room
  {
    id: 'room-hyd-001',
    title: 'Cyberabad Techies & Frontend Developers',
    topic: 'IT & Technology',
    description: 'React/Node devs sharing tech openings in Madhapur, Mindspace, and Kondapur startups.',
    zoneId: 'zone-hitec-city',
    zoneName: 'HITEC City & Madhapur',
    createdBy: 'Kiran_TechLead',
    createdAt: '2026-04-06T14:00:00Z',
    activeParticipantsCount: 68,
    isVoiceActive: true,
    voiceParticipantsCount: 9,
    tags: ['HITEC', 'React', 'Startups', 'CyberTowers'],
    isPinned: true
  },
  // Gajuwaka Room
  {
    id: 'room-001',
    title: 'Gajuwaka Shift Jobs & Industrial Openings',
    topic: 'Part-Time & Shift Gigs',
    description: 'Discuss petrol bunk vacancies, supermarket shifts, Auto Nagar warehouse helpers, Steel plant gate contractor work, and bike delivery gigs in Gajuwaka.',
    zoneId: 'zone-gajuwaka',
    zoneName: 'Gajuwaka & Auto Nagar',
    createdBy: 'Ramesh_GajuwakaMod',
    createdAt: '2026-04-05T10:00:00Z',
    activeParticipantsCount: 42,
    isVoiceActive: true,
    voiceParticipantsCount: 6,
    tags: ['Gajuwaka', 'AutoNagar', 'Kurmannapalem', 'PetrolBunk', 'DeliveryRider'],
    isPinned: true
  }
];

export const SEED_MESSAGES: Record<string, ChatMessage[]> = {
  'room-mcl-001': [
    {
      id: 'msg-mcl-101',
      roomId: 'room-mcl-001',
      senderName: 'Srinivas Rao (Host)',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      senderRole: 'Host',
      text: 'Namaste Mancherial friends! Sri Venkateshwara Supermarket on Station Road is hiring 3 cashiers (₹16,000/mo) and Kakatiya Fuel station on Collectorate Road has 3 openings (₹650/day).',
      timestamp: '10:30 AM',
      isSelf: false,
      reactions: { '👍': 14, '🔥': 8 }
    },
    {
      id: 'msg-mcl-102',
      roomId: 'room-mcl-001',
      senderName: 'Anil Reddy',
      senderAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
      senderRole: 'Local Member',
      text: 'I live near IB Chowk. Can I do the morning 8 AM to 4 PM shift at the supermarket?',
      timestamp: '10:35 AM',
      isSelf: false,
      reactions: { '🙌': 5 }
    },
    {
      id: 'msg-mcl-103',
      roomId: 'room-mcl-001',
      senderName: 'SV Supermarket Manager',
      senderAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80',
      senderRole: 'Verified Employer',
      text: 'Yes Anil! Morning shift is open. You can apply directly through the Jobs tab on Zone Sphere or walk in today.',
      timestamp: '10:40 AM',
      isSelf: false,
      reactions: { '❤️': 11, '👏': 7 }
    }
  ],
  'room-001': [
    {
      id: 'msg-101',
      roomId: 'room-001',
      senderName: 'Ramesh Kumar',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      senderRole: 'Moderator',
      text: 'Namaste Gajuwaka friends! Sri Krishna Supermarket in Old Gajuwaka is hiring 3 cashiers (₹16,500/mo) and Highway Express Petrol Bunk near High School Road has 4 attendant openings (₹700/day).',
      timestamp: '11:15 AM',
      isSelf: false,
      reactions: { '👍': 12, '🔥': 8 }
    }
  ]
};

export const SEED_REPORTS: ContentReport[] = [
  {
    id: 'rep-001',
    contentType: 'job',
    contentId: 'job-flagged-99',
    contentTitle: 'Data Entry from Home ₹4000 Daily (Advance Fee Required)',
    reportedBy: 'Alert_Resident',
    reason: 'Asking for upfront security money',
    additionalDetails: 'Poster asking applicants on WhatsApp to pay ₹399 registration fee before sending work.',
    timestamp: '2026-04-09T17:40:00Z',
    status: 'Pending Review'
  }
];

export const SEED_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'audit-001',
    timestamp: '2026-04-10T10:00:00Z',
    actor: 'Safety Admin',
    action: 'BUSINESS_VERIFIED',
    targetType: 'Business',
    targetId: 'biz-mcl-101',
    details: 'Verified GSTIN 36AABCS9912K1Z9 for Sri Venkateshwara Supermarket Mancherial.'
  },
  {
    id: 'audit-002',
    timestamp: '2026-04-09T18:00:00Z',
    actor: 'Safety Admin',
    action: 'BUSINESS_VERIFIED',
    targetType: 'Business',
    targetId: 'biz-101',
    details: 'Verified GSTIN 37ABCDE1234F1Z5 for Sri Krishna Supermarket Old Gajuwaka.'
  }
];
