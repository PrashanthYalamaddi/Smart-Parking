export const INITIAL_SLOTS = [
  // Zone A: Mumbai BKC Hub (EV Fast Charging - Tata Power & Jio-bp)
  { id: 'A-01', zone: 'Zone A (Mumbai BKC)', type: 'EV Fast Charge (50kW)', status: 'occupied', vehicle: 'MH-02-EV-9210', driver: 'Arun Verma', entryTime: '2026-10-09T08:15:00', rate: 50, powerKW: 50, city: 'Mumbai' },
  { id: 'A-02', zone: 'Zone A (Mumbai BKC)', type: 'EV Fast Charge (50kW)', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 50, powerKW: 50, city: 'Mumbai' },
  { id: 'A-03', zone: 'Zone A (Mumbai BKC)', type: 'EV Fast Charge (50kW)', status: 'reserved', vehicle: 'MH-01-EQ-4421', driver: 'Neha Sharma', entryTime: '2026-10-09T10:00:00', rate: 50, powerKW: 50, city: 'Mumbai' },
  { id: 'A-04', zone: 'Zone A (Mumbai BKC)', type: 'EV Fast Charge (50kW)', status: 'occupied', vehicle: 'MH-04-TS-8812', driver: 'Karan Mehta', entryTime: '2026-10-09T07:45:00', rate: 50, powerKW: 50, city: 'Mumbai' },
  { id: 'A-05', zone: 'Zone A (Mumbai BKC)', type: 'EV Standard (22kW)', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 40, powerKW: 22, city: 'Mumbai' },
  { id: 'A-06', zone: 'Zone A (Mumbai BKC)', type: 'EV Standard (22kW)', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 40, powerKW: 22, city: 'Mumbai' },
  { id: 'A-07', zone: 'Zone A (Mumbai BKC)', type: 'EV Standard (22kW)', status: 'maintenance', vehicle: null, driver: null, entryTime: null, rate: 40, powerKW: 22, city: 'Mumbai' },
  { id: 'A-08', zone: 'Zone A (Mumbai BKC)', type: 'EV Standard (22kW)', status: 'occupied', vehicle: 'MH-12-PQ-3301', driver: 'Vikram Rane', entryTime: '2026-10-09T08:50:00', rate: 40, powerKW: 22, city: 'Mumbai' },
  { id: 'A-09', zone: 'Zone A (Mumbai BKC)', type: 'EV Standard (22kW)', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 40, powerKW: 22, city: 'Mumbai' },
  { id: 'A-10', zone: 'Zone A (Mumbai BKC)', type: 'EV Standard (22kW)', status: 'reserved', vehicle: 'GJ-01-ET-1920', driver: 'Pooja Trivedi', entryTime: '2026-10-09T09:30:00', rate: 40, powerKW: 22, city: 'Mumbai' },
  { id: 'A-11', zone: 'Zone A (Mumbai BKC)', type: 'EV Standard (22kW)', status: 'occupied', vehicle: 'MH-47-EE-5002', driver: 'Aditya Kulkarni', entryTime: '2026-10-09T08:05:00', rate: 40, powerKW: 22, city: 'Mumbai' },
  { id: 'A-12', zone: 'Zone A (Mumbai BKC)', type: 'EV Standard (22kW)', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 40, powerKW: 22, city: 'Mumbai' },

  // Zone B: Bengaluru Indiranagar Deck (Standard Sedans)
  { id: 'B-01', zone: 'Zone B (Bengaluru)', type: 'Standard Sedan', status: 'occupied', vehicle: 'KA-01-BN-7721', driver: 'Rohit Gowda', entryTime: '2026-10-09T08:30:00', rate: 30, city: 'Bengaluru' },
  { id: 'B-02', zone: 'Zone B (Bengaluru)', type: 'Standard Sedan', status: 'occupied', vehicle: 'KA-03-MF-1029', driver: 'Siddharth Prasad', entryTime: '2026-10-09T07:20:00', rate: 30, city: 'Bengaluru' },
  { id: 'B-03', zone: 'Zone B (Bengaluru)', type: 'Standard Sedan', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 30, city: 'Bengaluru' },
  { id: 'B-04', zone: 'Zone B (Bengaluru)', type: 'Standard Sedan', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 30, city: 'Bengaluru' },
  { id: 'B-05', zone: 'Zone B (Bengaluru)', type: 'Standard Sedan', status: 'occupied', vehicle: 'KA-05-CP-4911', driver: 'Tanvi Murthy', entryTime: '2026-10-09T09:10:00', rate: 30, city: 'Bengaluru' },
  { id: 'B-06', zone: 'Zone B (Bengaluru)', type: 'Standard Sedan', status: 'reserved', vehicle: 'TN-09-AK-8182', driver: 'Ravi Narayanan', entryTime: '2026-10-09T10:15:00', rate: 30, city: 'Bengaluru' },
  { id: 'B-07', zone: 'Zone B (Bengaluru)', type: 'Standard Sedan', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 30, city: 'Bengaluru' },
  { id: 'B-08', zone: 'Zone B (Bengaluru)', type: 'Standard Sedan', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 30, city: 'Bengaluru' },
  { id: 'B-09', zone: 'Zone B (Bengaluru)', type: 'Standard Sedan', status: 'occupied', vehicle: 'KA-51-DD-6019', driver: 'Ananya Deshpande', entryTime: '2026-10-09T08:40:00', rate: 30, city: 'Bengaluru' },
  { id: 'B-10', zone: 'Zone B (Bengaluru)', type: 'Standard Sedan', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 30, city: 'Bengaluru' },
  { id: 'B-11', zone: 'Zone B (Bengaluru)', type: 'Standard Sedan', status: 'maintenance', vehicle: null, driver: null, entryTime: null, rate: 30, city: 'Bengaluru' },
  { id: 'B-12', zone: 'Zone B (Bengaluru)', type: 'Standard Sedan', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 30, city: 'Bengaluru' },

  // Zone C: Pune Shivaji Nagar Hub (SUV & Commercial)
  { id: 'C-01', zone: 'Zone C (Pune Hub)', type: 'SUV Large Bay', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 40, city: 'Pune' },
  { id: 'C-02', zone: 'Zone C (Pune Hub)', type: 'SUV Large Bay', status: 'occupied', vehicle: 'MH-12-XX-2900', driver: 'Deepak Joshi', entryTime: '2026-10-09T07:10:00', rate: 40, city: 'Pune' },
  { id: 'C-03', zone: 'Zone C (Pune Hub)', type: 'SUV Large Bay', status: 'occupied', vehicle: 'MH-14-ZZ-9911', driver: 'Meera Bhave', entryTime: '2026-10-09T08:00:00', rate: 40, city: 'Pune' },
  { id: 'C-04', zone: 'Zone C (Pune Hub)', type: 'SUV Large Bay', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 40, city: 'Pune' },
  { id: 'C-05', zone: 'Zone C (Pune Hub)', type: 'SUV Large Bay', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 40, city: 'Pune' },
  { id: 'C-06', zone: 'Zone C (Pune Hub)', type: 'SUV Large Bay', status: 'reserved', vehicle: 'TS-07-JK-3044', driver: 'Suresh Lokhande', entryTime: '2026-10-09T09:45:00', rate: 40, city: 'Pune' },
  { id: 'C-07', zone: 'Zone C (Pune Hub)', type: 'SUV Large Bay', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 40, city: 'Pune' },
  { id: 'C-08', zone: 'Zone C (Pune Hub)', type: 'SUV Large Bay', status: 'occupied', vehicle: 'MH-12-WW-1188', driver: 'Kavita Ranade', entryTime: '2026-10-09T08:25:00', rate: 40, city: 'Pune' },
  { id: 'C-09', zone: 'Zone C (Pune Hub)', type: 'SUV Large Bay', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 40, city: 'Pune' },
  { id: 'C-10', zone: 'Zone C (Pune Hub)', type: 'SUV Large Bay', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 40, city: 'Pune' },
  { id: 'C-11', zone: 'Zone C (Pune Hub)', type: 'SUV Large Bay', status: 'occupied', vehicle: 'MH-12-RR-4209', driver: 'Farhan Ansari', entryTime: '2026-10-09T09:05:00', rate: 40, city: 'Pune' },
  { id: 'C-12', zone: 'Zone C (Pune Hub)', type: 'SUV Large Bay', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 40, city: 'Pune' },

  // Zone D: Delhi NCR Connaught Place (Rapid Transit & Accessible)
  { id: 'D-01', zone: 'Zone D (Delhi CP)', type: 'Accessible Bay', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 20, city: 'Delhi' },
  { id: 'D-02', zone: 'Zone D (Delhi CP)', type: 'Accessible Bay', status: 'occupied', vehicle: 'DL-01-AC-1002', driver: 'Devendra Kapoor', entryTime: '2026-10-09T08:10:00', rate: 20, city: 'Delhi' },
  { id: 'D-03', zone: 'Zone D (Delhi CP)', type: 'Accessible Bay', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 20, city: 'Delhi' },
  { id: 'D-04', zone: 'Zone D (Delhi CP)', type: 'Rapid Bay (30m)', status: 'occupied', vehicle: 'DL-03-TA-5151', driver: 'Kunal Grover', entryTime: '2026-10-09T09:15:00', rate: 20, city: 'Delhi' },
  { id: 'D-05', zone: 'Zone D (Delhi CP)', type: 'Rapid Bay (30m)', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 20, city: 'Delhi' },
  { id: 'D-06', zone: 'Zone D (Delhi CP)', type: 'Rapid Bay (30m)', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 20, city: 'Delhi' },
  { id: 'D-07', zone: 'Zone D (Delhi CP)', type: 'Rapid Bay (30m)', status: 'occupied', vehicle: 'HR-26-QQ-7711', driver: 'Pawan Singh', entryTime: '2026-10-09T09:22:00', rate: 20, city: 'Delhi' },
  { id: 'D-08', zone: 'Zone D (Delhi CP)', type: 'Rapid Bay (30m)', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 20, city: 'Delhi' },
  { id: 'D-09', zone: 'Zone D (Delhi CP)', type: 'Standard Bay', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 20, city: 'Delhi' },
  { id: 'D-10', zone: 'Zone D (Delhi CP)', type: 'Standard Bay', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 20, city: 'Delhi' },
  { id: 'D-11', zone: 'Zone D (Delhi CP)', type: 'Standard Bay', status: 'available', vehicle: null, driver: null, entryTime: null, rate: 20, city: 'Delhi' },
  { id: 'D-12', zone: 'Zone D (Delhi CP)', type: 'Standard Bay', status: 'reserved', vehicle: 'UP-16-ST-8822', driver: 'Gita Patel', entryTime: '2026-10-09T10:30:00', rate: 20, city: 'Delhi' }
];

// Rotating cards for 360-degree hero gallery (Hero 25 block)
export const HERO_ROTATING_CARDS = [
  {
    id: 1,
    label: 'Live Slot Radar',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=700&q=80',
    description: 'Sub-second ultrasonic and LiDAR slot occupancy detection'
  },
  {
    id: 2,
    label: 'MongoDB Store',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=80',
    description: 'Atomic ACID slot state locks and automated indexing'
  },
  {
    id: 3,
    label: 'Express API Hub',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80',
    description: 'High-throughput REST gateway with JWT authentication'
  },
  {
    id: 4,
    label: 'FASTag Toll Gate',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=80',
    description: 'NHAI NETC FASTag automated RFID barrier clearance'
  },
  {
    id: 5,
    label: 'UPI QR Checkout',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=700&q=80',
    description: 'Instant scan via PhonePe, Google Pay, Paytm & BHIM'
  },
  {
    id: 6,
    label: 'Smart Cities Hub',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
    description: 'MoHUA smart transit compliance for Indian metros'
  },
  {
    id: 7,
    label: 'EV Green Slots',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=700&q=80',
    description: 'Dedicated bays with Tata Power & Ather charging telemetry'
  },
  {
    id: 8,
    label: 'HSRP OCR Scanner',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80',
    description: 'Parivahan database validation and optical plate reader'
  },
  {
    id: 9,
    label: 'Role-Based Access',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=700&q=80',
    description: 'Municipal Admin, Station Attendant, and Driver tiers'
  },
  {
    id: 10,
    label: 'Telemetry Stream',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80',
    description: 'Real-time WebSocket event broadcaster and sensor pings'
  },
  {
    id: 11,
    label: 'Audit & GST Ledger',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=700&q=80',
    description: 'Zero revenue leakage with digital GST compliant receipts'
  }
];

// Sonar Radar findings for Features 15 block
export const SONAR_FINDINGS = [
  {
    id: 'ping-1',
    code: 'BAY_A04',
    title: 'EV Overstay Warning (Mumbai BKC)',
    zone: 'Zone A - Mumbai BKC',
    severity: 'warning',
    x: 35,
    y: 28,
    details: 'Tata Nexon EV MH-04-TS-8812 parked for 2h 15m. Fast charger battery level reached 100%. Grace period notification sent.',
    timestamp: 'Just now'
  },
  {
    id: 'ping-2',
    code: 'GATE_NORTH',
    title: 'FASTag RFID Barrier Pass',
    zone: 'Bengaluru Indiranagar Inbound',
    severity: 'success',
    x: 68,
    y: 42,
    details: 'NETC FASTag active. Plate KA-05-CP-4911 validated with Parivahan in 18ms. Gate raised automatically.',
    timestamp: '2s ago'
  },
  {
    id: 'ping-3',
    code: 'BAY_C08',
    title: 'Ultrasonic Telemetry Online (Pune)',
    zone: 'Zone C - Pune Shivaji Nagar',
    severity: 'info',
    x: 48,
    y: 75,
    details: 'Ultrasonic sensor ping 24ms. Slot C-08 status synced with MongoDB Atlas India-West replica set.',
    timestamp: '14s ago'
  },
  {
    id: 'ping-4',
    code: 'BAY_D02',
    title: 'UPI Instant Checkout (Delhi CP)',
    zone: 'Zone D - Delhi CP Metro',
    severity: 'success',
    x: 22,
    y: 62,
    details: 'PhonePe QR transaction verified. Amount ₹40 settled with zero fee slippage. Outbound barrier unlocked.',
    timestamp: '45s ago'
  },
  {
    id: 'ping-5',
    code: 'BAY_A07',
    title: 'Tata Power EV Charger Maintenance',
    zone: 'Zone A - Mumbai BKC',
    severity: 'neutral',
    x: 78,
    y: 20,
    details: '50kW DC fast charger undergoing scheduled firmware calibration. Bay marked unavailable in React dashboard.',
    timestamp: '3m ago'
  }
];

// Sparklines data for Stats 14 block
export const STATS_SPARKLINES = [
  {
    title: 'Slot Detection Accuracy',
    value: '99.8%',
    delta: '+2.4%',
    deltaType: 'positive',
    timeframe: 'audited across Indian metro hubs',
    trendPoints: [88, 91, 93, 92, 95, 97, 99.8]
  },
  {
    title: 'Average Search Duration',
    value: '3.2 min',
    delta: '-72.4%',
    deltaType: 'positive',
    timeframe: 'down from 22 mins in peak traffic',
    trendPoints: [22.0, 18.2, 14.5, 9.8, 6.1, 4.2, 3.2]
  },
  {
    title: 'Daily Vehicles Managed',
    value: '42,500+',
    delta: '+24.6%',
    deltaType: 'positive',
    timeframe: 'across Pune, Mumbai, Bangalore & Delhi',
    trendPoints: [18000, 22500, 28900, 34200, 38100, 40800, 42500]
  },
  {
    title: 'Uncollected Fee Slippage',
    value: '₹0.00',
    delta: '-100%',
    deltaType: 'positive',
    timeframe: 'guaranteed by FASTag & UPI ledger',
    trendPoints: [8500, 5200, 2400, 950, 200, 40, 0]
  }
];

// Comparison chart data for Comparison 3 block
export const COMPARISON_METRICS = [
  { label: 'Indian Urban Cruising Time', legacy: 21.4, mern: 3.2, unit: 'min', lowerIsBetter: true },
  { label: 'FASTag / Barrier Gate Latency', legacy: 55, mern: 3, unit: 'sec', lowerIsBetter: true },
  { label: 'Municipal Slot Utilization', legacy: 48, mern: 95, unit: '%', lowerIsBetter: false },
  { label: 'Cash Leakage & Slip Margin', legacy: 14.8, mern: 0.0, unit: '%', lowerIsBetter: true },
  { label: 'Driver Satisfaction Index', legacy: 42, mern: 99, unit: '%', lowerIsBetter: false }
];

// Testimonials from Indian Transport Commissioners & Smart City Leaders
export const TESTIMONIALS = [
  {
    quote: 'Implementing this MERN parking system in Mumbai BKC slashed bottleneck cruising by 45%. The FASTag barrier clearance and live MongoDB slot updates have eliminated entry congestion entirely.',
    author: 'Rajesh Nair',
    role: 'Smart Transit Commissioner, Mumbai MMRDA'
  },
  {
    quote: 'The Express REST API pipelines process over 25,000 bay pings every hour with sub-35ms latency. The React frontend is snappy, and UPI QR checkout is effortless for drivers.',
    author: 'Vikramaditya Patil',
    role: 'Director of Urban Mobility, Pune Smart City Development Corp'
  },
  {
    quote: 'The role-based security model allowed us to give parking attendants mobile tablets at indiranagar while keeping municipal tariff controls locked to our central control room.',
    author: 'Sunita Rao',
    role: 'Traffic Operations Lead, Bengaluru Smart Mobility & BTP'
  },
  {
    quote: 'From High Security Registration Plate (HSRP) scanning to instant UPI checkout, this platform represents the pinnacle of modern Indian transit engineering.',
    author: 'Dr. Sneha Reddy',
    role: 'Chief Infrastructure Officer, GHMC Smart Mobility Hyderabad'
  },
  {
    quote: 'The atomic MongoDB transactions prevented dual reservations during peak festival rush in Connaught Place. A world class implementation for Indian smart cities.',
    author: 'Amitav Sengupta',
    role: 'Director of Urban Transport, Delhi NCR Municipal Council'
  }
];

// FAQs for FAQ 9 block
export const FAQS = [
  {
    q: 'How does the system integrate with NETC FASTag electronic toll collection?',
    a: 'The Node.js backend connects with the National Electronic Toll Collection (NETC) NPCI interface. When a vehicle approaches the RFID reader, the FASTag wallet balance is verified in 18ms and the barrier gate triggers automatically with zero paper tickets.'
  },
  {
    q: 'Does the platform support instant UPI payments via PhonePe, GPay, and Paytm?',
    a: 'Yes. Every parking session generates a dynamic Bharat UPI QR code encoded with the vehicle plate, duration tariff, and GST invoice data. Payment confirmation is broadcast via WebSockets directly to the operator interface in real time.'
  },
  {
    q: 'How does the MERN stack manage concurrent slot reservations without collisions?',
    a: 'We leverage MongoDB atomic update operations (such as findOneAndUpdate with slot status condition checks) combined with Express.js transactional middleware. This guarantees that two incoming vehicles cannot claim the same slot simultaneously.'
  },
  {
    q: 'What data fields are stored for each vehicle under Parivahan guidelines?',
    a: 'Every record stores the MongoDB ObjectId, HSRP vehicle registration plate, state code, slot identifier, vehicle classification (EV, Sedan, SUV, Commercial), check-in timestamp, check-out timestamp, calculated tariff in Indian Rupees (₹), and assigned operator.'
  },
  {
    q: 'Can this platform interface with existing municipal barrier gates and ultrasonic sensors?',
    a: 'Absolutely. The Node.js server exposes lightweight HTTP webhooks and WebSocket event emitters that ingest serial, MQTT, or HTTP payloads directly from camera feeds, RFID turnstiles, and ultrasonic hardware.'
  }
];
