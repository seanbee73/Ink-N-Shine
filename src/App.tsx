import React, { useState } from 'react';

// Types
interface ServiceModalData {
  title: string;
  image: string;
  description: string;
  duration: string;
  price: string;
  features: string[];
}

interface GalleryItem {
  id: string;
  title: string;
  category: 'salt' | 'interior' | 'ceramic' | 'suv';
  vehicle: string;
  client: string;
  city: string;
  image: string;
  tags: string[];
  summary: string;
  highlight: string;
}

const GTA_AREAS = [
  'Toronto',
  'Mississauga',
  'Scarborough',
  'North York',
  'Markham',
  'Brampton',
  'Hamilton',
  'Oshawa',
  'Vaughan',
  'Richmond Hill',
  'Oakville',
  'Burlington',
  'Pickering',
  'Etobicoke'
];

const REAL_REVIEWS = [
  {
    name: 'Andre Carl Batalla',
    vehicle: '2015 Toyota RAV4',
    rating: 5,
    date: '3 months ago',
    text: "I had a Great experience from the moment I inquired about their Home Service Auto Detailing. They were On-time, Polite, Professional, Humble and Precise on what my car needed most without insisting on any add-ons. They got rid of all the stubborn salt patches and tough interior odors in my 2015 RAV4 that hadn't been detailed in years. It literally feels and smells like a brand new car again! I highly recommend their shampoo, steaming, engine bay cleaning, and headlight restoration.",
    badge: 'Verified Google Review'
  },
  {
    name: 'Mama Joy',
    vehicle: 'Family SUV (Winter Salt Reset)',
    rating: 5,
    date: '2 months ago',
    text: "I also love that it's a women-owned business! They really put in the work to give my husband's car its life back. There were years of salt built up in there! We appreciated that they were able to come right to us with their fully equipped setup. It smelt sooooo amazing and they are so thoughtful with their mat covers and little gifts. ❤️",
    badge: 'Local Guide • 17 Reviews'
  },
  {
    name: 'Mercy',
    vehicle: '2022 Kia Soul',
    rating: 5,
    date: '2 months ago',
    text: "Just got my 2022 Soul detailed yesterday. Omg!!! Ty, ty, ty what an amazing job. You have a customer for life. She looks and smells brand new 😍 Nes and Nadine truly care about their craft!",
    badge: 'Local Guide • 66 Reviews'
  },
  {
    name: 'Cindy Doughty',
    vehicle: 'Work Truck / F-150',
    rating: 5,
    date: '11 months ago',
    text: "They were fantastic. They were able to get heavy grease stains out of my truck seats, console and seat belts. My truck is literally showroom ready. Thank you so very much, keep up the pride in your work ladies!",
    badge: 'Local Guide • 12 Reviews'
  },
  {
    name: 'KC R',
    vehicle: '2016 Toyota Corolla',
    rating: 5,
    date: '11 months ago',
    text: "Had my 2016 Corolla detailed by this amazing women-owned company and I'm seriously impressed. My car had coffee stains, salt stains, hair, and food crumbs... Nadine and Nes did such a thorough job right in the comfort of my driveway. Women really do it best!!",
    badge: 'Local Guide • 27 Reviews'
  },
  {
    name: 'M A',
    vehicle: 'Tesla Model Y',
    rating: 5,
    date: '1 year ago',
    text: "Got my car detailed for the first time and WOW! I have a Tesla Model Y and they cleaned everything from inside and out in about 2.5 hours. It really is like brand new. Loved the attention to detail!",
    badge: 'Local Guide • 122 Reviews'
  },
  {
    name: 'Jason Joseph',
    vehicle: '2005 Toyota Camry',
    rating: 5,
    date: '2 months ago',
    text: "Nadine and her team restored my 2005 Toyota Camry to like-new condition. She is a true professional and more than satisfied with the end result. Would recommend her team for any detailing job!",
    badge: 'Local Guide • 73 Reviews'
  },
  {
    name: 'Abi Sampson',
    vehicle: 'Kia Soul',
    rating: 5,
    date: '5 months ago',
    text: "My Kia Soul was a messss when I brought it in for detailing, and it literally looked like a brand new car when I got it back. Ink N Shine left my car immaculate, and they were so easy to deal with every step of the way.",
    badge: 'Verified Google Review'
  }
];

const REAL_PROJECTS: GalleryItem[] = [
  {
    id: 'rav4',
    title: 'Multi-Year Salt Extraction & Full Interior Revival',
    category: 'salt',
    vehicle: '2015 Toyota RAV4',
    client: 'Andre Carl Batalla',
    city: 'Mississauga / GTA',
    image: '/assets/recent-rav4.jpg',
    tags: ['Tough Salt Dissolved', 'High-Temp Steam', 'Headlight Restore', 'Engine Bay'],
    summary: 'Dissolved years of rock-hard Ontario winter road salt embedded deep into the carpet and footwells, combined with high-temp antimicrobial steam and crystal clear headlight restoration.',
    highlight: 'Full Salt & Odor Elimination'
  },
  {
    id: 'f150',
    title: 'Complete Full Detail, Paint Correction & 5-Year Ceramic',
    category: 'ceramic',
    vehicle: 'Ford F-150 SuperCrew',
    client: 'Cindy (Hamilton)',
    city: 'Hamilton, ON',
    image: '/assets/recent-f150.jpg',
    tags: ['Heavy Grease Removal', 'Seat Belt Cleaning', 'Multi-Stage Polish', '5-Yr Ceramic'],
    summary: 'Restored heavy industrial grease from the console, seatbelts, and upholstery, then machine-corrected the paint and applied a 5-year ceramic coating for ultra-gloss reflection.',
    highlight: 'Heavy Duty Interior & 5-Year 9H Ceramic'
  },
  {
    id: 'tesla',
    title: 'Tesla Model Y & Model 3 Showroom Mobile Detail',
    category: 'interior',
    vehicle: 'Tesla Model Y / Model 3',
    client: 'M A & Raygee',
    city: 'Toronto, ON',
    image: '/assets/recent-tesla.jpg',
    tags: ['White Seat Protection', 'Car Wash Mode', 'Vent Sanitization', 'Mint Fragrance'],
    summary: 'Meticulous interior cleaning with delicate vegan leather safe cleaner, touchscreen glass polishing, and complete exterior snow foam wash directly in client driveway.',
    highlight: 'Specialized EV Detail'
  },
  {
    id: 'kia-soul',
    title: 'Kia Soul Signature Shine & Stubborn Salt Removal',
    category: 'salt',
    vehicle: '2022 Kia Soul ("Lexi")',
    client: 'Mercy & Abi',
    city: 'Oshawa / Toronto',
    image: '/assets/recent-kiasoul.jpg',
    tags: ['Salt Crust Dissolved', 'Fabric Shampoo', 'Odor Neutralized', 'Mat Covers'],
    summary: 'Full floor carpet deep extraction removing dark stains and winter salt crusted into the footwells, restoring clean fabric and fresh scent.',
    highlight: 'Salt & Stain Zero Trace'
  },
  {
    id: 'hyundai-tucson',
    title: 'Hyundai Tucson & Santa Fe Signature Shine Package',
    category: 'suv',
    vehicle: 'Hyundai Tucson / Santa Fe',
    client: 'North York & Markham Clients',
    city: 'North York & Markham',
    image: '/assets/recent-hyundai.jpg',
    tags: ['1-Step Paint Polish', 'Roofline Cleaning', 'Clay Bar Treatment', 'Tire Dressing'],
    summary: 'Full exterior decontamination and 1-step gloss enhancement polish paired with interior steam extraction and leather UV conditioning.',
    highlight: 'Signature Exterior & Interior Combo'
  },
  {
    id: 'lexus-camry',
    title: '2005 Toyota Camry & Lexus SC 430 Classic Restoration',
    category: 'interior',
    vehicle: '2005 Toyota Camry & Lexus SC',
    client: 'Jason Joseph & James',
    city: 'Scarborough / Toronto',
    image: '/assets/recent-camry-lexus.jpg',
    tags: ['20-Yr Vehicle Revival', 'Headliner Clean', 'Pet Hair Extraction', 'Trim Restored'],
    summary: 'Turned older beloved daily drivers from tired condition to like-new freshness with deep interior extraction, seat scrub, and crystal clear windows.',
    highlight: 'Complete Classic Revival'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'all' | 'salt' | 'interior' | 'ceramic' | 'suv'>('all');
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceModalData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ink_theme');
      if (saved) return saved === 'dark';
    }
    return true;
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('ink_theme', next ? 'dark' : 'light');
      }
      return next;
    });
  };

  // Quote Calculator State (Grounded in real Ink N Shine GTA pricing)
  const [calcVehicle, setCalcVehicle] = useState<'sedan' | 'suv' | 'truck'>('suv');
  const [calcPackage, setCalcPackage] = useState<'signature' | 'interior' | 'paint' | 'ceramic'>('signature');
  const [calcAddons, setCalcAddons] = useState<{ [key: string]: boolean }>({
    saltRemoval: true,
    engineBay: false,
    headlights: false,
    petHair: false,
    ceilingPurify: false,
  });

  // Contact Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    cityGTA: 'Toronto',
    vehicleInfo: '',
    serviceType: 'signature_shine',
    preferredDate: '',
    notes: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // GTA Pricing structure matching real Ink N Shine rates
  const basePrices: Record<string, Record<string, number>> = {
    sedan: { interior: 350, signature: 475, paint: 650, ceramic: 1800 },
    suv: { interior: 390, signature: 525, paint: 750, ceramic: 2200 },
    truck: { interior: 440, signature: 590, paint: 850, ceramic: 2600 }
  };

  const calculatedTotal = () => {
    let base = basePrices[calcVehicle][calcPackage];
    if (calcAddons.saltRemoval) base += 50;
    if (calcAddons.engineBay) base += 60;
    if (calcAddons.headlights) base += 75;
    if (calcAddons.petHair) base += 50;
    if (calcAddons.ceilingPurify) base += 60;
    return base;
  };

  const filteredGallery = activeGalleryTab === 'all' 
    ? REAL_PROJECTS 
    : REAL_PROJECTS.filter(item => item.category === activeGalleryTab);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.phone.trim() || !formData.vehicleInfo.trim()) {
      setFormError('Please fill in your name, phone number, vehicle, and city.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  const handleQuoteToBooking = () => {
    const serviceMap: Record<string, string> = {
      interior: 'interior_deep',
      signature: 'signature_shine',
      paint: 'paint_enhancement',
      ceramic: 'ceramic_coating'
    };
    setFormData(prev => ({
      ...prev,
      serviceType: serviceMap[calcPackage] || 'signature_shine',
      notes: `Vehicle type: ${calcVehicle.toUpperCase()}. Add-ons selected: ${Object.keys(calcAddons).filter(k => calcAddons[k]).join(', ') || 'None'}. Estimated estimate: $${calculatedTotal()} CAD`
    }));
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-zinc-950 text-zinc-300' : 'theme-light bg-slate-50 text-slate-800'} font-sans antialiased selection:bg-pink-500 selection:text-white flex flex-col min-h-screen transition-colors duration-300`}>
      
      {/* Top Banner: Real Trust Signals */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-500 text-white text-xs font-semibold py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2 relative z-50">
        <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse"></span>
        <span>TORONTO & GTA'S FIRST FILIPINA WOMEN-OWNED MOBILE AUTO DETAILER • SERVING GTA SINCE 2017</span>
        <span className="hidden md:inline">• WE COME DIRECTLY TO YOUR DRIVEWAY!</span>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 w-full z-40 backdrop-blur-lg bg-zinc-950/90 border-b border-zinc-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Identity */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-zinc-900 border border-pink-500/40 p-1 overflow-hidden flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-105 group-hover:border-pink-400 transition-all">
              <img 
                src="/assets/ink-n-shine-logo.png" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczMjHq80dE8XbHnsswjCQYcUm1qYQ6g-k4I4sAjXlLD0k8BPzxCUL591Vz0UX7_SdXU295_tPbB_xmzh0FcsDXH_htxoT-24LqDhAeiBTBQ1hAAVLhY=w500';
                }}
                alt="Ink N Shine Detailing Official Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-white text-base sm:text-lg font-bold tracking-tight uppercase flex items-center gap-1.5 leading-none">
                <span>Ink N Shine</span>
                <span className="text-pink-400 font-normal text-[10px] sm:text-xs tracking-normal uppercase bg-pink-500/10 border border-pink-500/30 px-1.5 py-0.5 rounded">Detailing</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 font-medium hidden md:block">
                Nes & Nadine • Mobile Detail Restoration
              </p>
            </div>
          </a>
          
          {/* Navigation Tabs (Visible on Desktop / Tablets) */}
          <nav className="desktop-nav items-center gap-3 sm:gap-4 md:gap-5 xl:gap-7">
            <a href="#about" className="text-xs sm:text-sm font-semibold text-zinc-300 hover:text-pink-400 transition-colors whitespace-nowrap">Our Story</a>
            <a href="#services" className="text-xs sm:text-sm font-semibold text-zinc-300 hover:text-pink-400 transition-colors whitespace-nowrap">Packages</a>
            <a href="#impact" className="text-xs sm:text-sm font-semibold text-zinc-300 hover:text-pink-400 transition-colors whitespace-nowrap">Before & After</a>
            <a href="#gallery" className="text-xs sm:text-sm font-semibold text-zinc-300 hover:text-pink-400 transition-colors whitespace-nowrap">Showcase</a>
            <a href="#reviews" className="text-xs sm:text-sm font-semibold text-zinc-300 hover:text-pink-400 transition-colors whitespace-nowrap">5.0★ Reviews</a>
            <a href="#calculator" className="text-xs sm:text-sm font-semibold text-zinc-300 hover:text-pink-400 transition-colors whitespace-nowrap">Estimator</a>
          </nav>
          
          {/* Right Header Actions: Phone + Light/Dark Toggle + Book Slot + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Phone numbers (Desktop) */}
            <div className="hidden 2xl:flex flex-col items-end text-right mr-1">
              <a 
                href="tel:4169198421" 
                className="text-xs text-white hover:text-pink-400 flex items-center gap-1 font-semibold transition-colors"
              >
                <iconify-icon icon="solar:phone-calling-bold" class="text-pink-400" width="14"></iconify-icon>
                <span>(416) 919-8421</span>
              </a>
              <a 
                href="tel:4169088435" 
                className="text-[11px] text-zinc-400 hover:text-pink-400 transition-colors"
              >
                Alt: (416) 908-8435
              </a>
            </div>

            {/* Light / Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm cursor-pointer shrink-0 ${
                isDarkMode 
                  ? 'bg-zinc-900 border-zinc-700 text-yellow-400 hover:text-yellow-300 hover:border-yellow-400/60 hover:bg-zinc-800' 
                  : 'bg-white border-slate-300 text-amber-600 hover:text-pink-600 hover:border-pink-300 hover:bg-slate-100 shadow-md'
              }`}
            >
              {isDarkMode ? (
                /* Crisp Sun SVG */
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2"/>
                  <path d="M12 20v2"/>
                  <path d="m4.93 4.93 1.41 1.41"/>
                  <path d="m17.66 17.66 1.41 1.41"/>
                  <path d="M2 12h2"/>
                  <path d="M20 12h2"/>
                  <path d="m6.34 17.66-1.41 1.41"/>
                  <path d="m19.07 4.93-1.41 1.41"/>
                </svg>
              ) : (
                /* Crisp Moon SVG */
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              )}
            </button>

            {/* Book Your Slot CTA button */}
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-500 rounded-full hover:from-pink-500 hover:to-rose-400 transition-all duration-200 shadow-md shadow-pink-500/20 hover:scale-105 shrink-0 whitespace-nowrap"
            >
              Book Your Slot
            </a>

            {/* Mobile / Tablet Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn text-white p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-pink-400 transition-colors focus:outline-none items-center justify-center shrink-0 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12"/>
                  <line x1="4" x2="20" y1="6" y2="6"/>
                  <line x1="4" x2="20" y1="18" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="bg-zinc-950/95 border-b border-zinc-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 backdrop-blur-xl">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block text-base font-medium text-zinc-300 hover:text-pink-400"
            >
              About Nes & Nadine (Our Story)
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block text-base font-medium text-zinc-300 hover:text-pink-400"
            >
              Services & Signature Packages
            </a>
            <a 
              href="#impact" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block text-base font-medium text-zinc-300 hover:text-pink-400"
            >
              Before & After Salt Restoration
            </a>
            <a 
              href="#gallery" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block text-base font-medium text-zinc-300 hover:text-pink-400"
            >
              GTA Projects & Vehicle Showcase
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block text-base font-medium text-zinc-300 hover:text-pink-400"
            >
              Google Reviews (5.0★ Rating)
            </a>
            <a 
              href="#calculator" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block text-base font-medium text-zinc-300 hover:text-pink-400"
            >
              Pricing & Instant Estimator
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block text-base font-medium text-zinc-300 hover:text-pink-400"
            >
              Book Home Service Appointment
            </a>

            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
              <a 
                href="tel:4169198421" 
                className="w-full text-center py-3 text-sm font-semibold text-white bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center gap-2"
              >
                <iconify-icon icon="solar:phone-calling-bold" class="text-pink-400" width="18"></iconify-icon>
                Call: (416) 919-8421
              </a>
              <a 
                href="https://wa.me/14169198421?text=Hello%20Ink%20N%20Shine%20Detailing,%20I'd%20like%20to%20inquire%20about%20booking%20a%20mobile%20detailing%20session." 
                target="_blank" 
                rel="noreferrer"
                className="w-full text-center py-3 text-sm font-semibold text-white bg-[#25D366] rounded-full flex items-center justify-center gap-2"
              >
                <iconify-icon icon="solar:chat-round-dots-bold" width="18"></iconify-icon>
                WhatsApp Us Directly
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden flex items-center min-h-[85vh]">
        {/* Subtle Atmospheric Ambient Lighting */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/40 bg-zinc-950/80 backdrop-blur-md shadow-lg shadow-pink-500/10">
                  <div className="flex text-pink-400">
                    <iconify-icon icon="solar:star-bold" width="14" height="14"></iconify-icon>
                    <iconify-icon icon="solar:star-bold" width="14" height="14"></iconify-icon>
                    <iconify-icon icon="solar:star-bold" width="14" height="14"></iconify-icon>
                    <iconify-icon icon="solar:star-bold" width="14" height="14"></iconify-icon>
                    <iconify-icon icon="solar:star-bold" width="14" height="14"></iconify-icon>
                  </div>
                  <span className="text-xs font-semibold text-pink-200 tracking-tight">5.0 Rating • 19 Google Reviews</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-zinc-700/80 bg-zinc-950/80 backdrop-blur-md text-xs font-medium text-zinc-200 shadow-md">
                  <iconify-icon icon="solar:shield-check-bold" class="text-pink-400" width="14"></iconify-icon>
                  100% Women-Owned & Operated
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                Toronto's Premier <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 dark:from-pink-400 dark:via-rose-300 dark:to-pink-400 font-black">Women-Owned</span> Mobile Detailing
              </h1>
              
              <p className="text-base sm:text-lg text-zinc-300 mb-8 max-w-2xl font-normal leading-relaxed">
                We bring the shine directly to your driveway. Founded by <strong className="text-white font-semibold">Nes & Nadine</strong>, we specialize in high-pressure steam sanitization, stubborn Canadian winter salt extraction, deep interior restoration, engine bays, and 5-year ceramic coatings across the entire Greater Toronto Area.
              </p>

              {/* Quality Statement from Owner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 mb-8 max-w-2xl flex items-start gap-3.5 shadow-xl">
                <div className="w-9 h-9 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
                  <iconify-icon icon="solar:heart-bold" width="20"></iconify-icon>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <strong className="text-white font-semibold">"Quality over quantity always."</strong> We only take <strong className="text-pink-300 font-semibold">2 vehicles per day</strong> so we never rush your car and never cut corners. Every crevice gets meticulous care!
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-8 py-4 text-sm lg:text-base font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-500 rounded-full hover:from-pink-500 hover:to-rose-400 transition-all duration-200 hover:scale-105 shadow-lg shadow-pink-500/25"
                >
                  Book Your Mobile Detail
                  <iconify-icon icon="solar:arrow-right-linear" width="20" height="20" class="ml-2"></iconify-icon>
                </a>
                <a 
                  href="https://wa.me/14169198421?text=Hi%20Nes%20and%20Nadine!%20I'd%20like%20to%20get%20a%20quote%20for%20detailing%20my%20car." 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 text-sm lg:text-base font-medium text-white bg-zinc-900 border border-zinc-700 rounded-full hover:border-pink-400 hover:text-pink-300 transition-all duration-200"
                >
                  <iconify-icon icon="solar:chat-round-dots-linear" width="20" height="20" class="mr-2 text-green-400"></iconify-icon>
                  WhatsApp Quick Chat
                </a>
              </div>
              
              <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-400 font-medium">
                <span className="flex items-center gap-1.5 text-pink-300 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
                  Now Booking for This & Next Month
                </span>
                <span className="flex items-center gap-1.5">
                  <iconify-icon icon="solar:map-point-bold" class="text-pink-400" width="14"></iconify-icon>
                  Toronto, Mississauga, Scarborough, Brampton & All GTA
                </span>
              </div>
            </div>

            {/* Right Column: Hero Shot in a Balanced Frame */}
            <div className="lg:col-span-5 relative">
              {/* Outer Decorative Ambient Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500"></div>
              
              <div className="relative rounded-3xl bg-zinc-900/90 border border-zinc-800/90 p-2 sm:p-3 shadow-2xl overflow-hidden backdrop-blur-xl">
                <div className="aspect-[4/3] sm:aspect-[14/11] rounded-2xl overflow-hidden relative bg-zinc-950">
                  <img 
                    src="/assets/hero-bg.jpg" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczNQFdc3yQwz6VxjXJWBdHXweQw2o6yl1VDTX_KbFv3CK6ORmUGWMnxdf9XlYQ0TZUAmPVtB3sVOAfSq85oQ5kUIOvTHFxFVbYR68oxTgV4kHKqukqY=w2000';
                    }}
                    alt="Ink N Shine Detailing Mobile Restoration" 
                    className="w-full h-full object-cover object-center filter brightness-105 contrast-105 hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Image Bottom Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none"></div>

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 bg-zinc-950/85 backdrop-blur-md border border-pink-500/30 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[11px] font-semibold text-zinc-200">Mobile Unit On-Duty</span>
                  </div>

                  {/* Bottom Highlight Label */}
                  <div className="absolute bottom-3 inset-x-3 bg-zinc-950/90 backdrop-blur-md border border-zinc-800/80 p-2.5 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Driveway Service</span>
                        <span className="text-pink-400">•</span>
                        <span className="text-pink-300 font-normal">Direct To You</span>
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">Water & power fully equipped mobile setup</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                      <iconify-icon icon="solar:sparkler-bold" width="16"></iconify-icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Specialty Highlights / The "Crevice & Salt Nemesis" Grid */}
      <section className="py-20 border-t border-zinc-900 bg-zinc-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-2 block">Our Signature Specializations</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              "Our nemesis is in your crevices!"
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
              Ontario road salt, spilled coffee, pet hair, and food crumbs don't stand a chance against our commercial steam extractors, drill brushes, and precision detailing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Item 1: Stubborn Winter Salt */}
            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/60 hover:border-pink-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-pink-950/40 border border-pink-500/30 rounded-xl flex items-center justify-center mb-5 text-pink-400 group-hover:scale-110 transition-transform">
                <iconify-icon icon="solar:snowflake-bold" width="24" height="24"></iconify-icon>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">Stubborn Salt Extraction</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Years of crusted Canadian winter road salt and calcium deposits dissolved and steam-extracted from your carpet fibers and pedal wells.
              </p>
            </div>

            {/* Item 2: Pressurized Hot Steam */}
            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/60 hover:border-pink-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-pink-950/40 border border-pink-500/30 rounded-xl flex items-center justify-center mb-5 text-pink-400 group-hover:scale-110 transition-transform">
                <iconify-icon icon="solar:fire-bold" width="24" height="24"></iconify-icon>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">Pressurized Steam Sanitization</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                220°F pressurized steam eliminates bacteria, deep grease, sticky residues in cup holders, A/C vents, and tight console seams.
              </p>
            </div>

            {/* Item 3: Pet Hair & Stain Removal */}
            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/60 hover:border-pink-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-pink-950/40 border border-pink-500/30 rounded-xl flex items-center justify-center mb-5 text-pink-400 group-hover:scale-110 transition-transform">
                <iconify-icon icon="solar:paw-bold" width="24" height="24"></iconify-icon>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">Pet Hair & Stain Removal</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Specialized rubber blades, drill brushes, and pH-neutral fabric shampoos lift stubborn dog hair, coffee spills, and heavy seat grime.
              </p>
            </div>

            {/* Item 4: 100% Mobile to Your Driveway */}
            <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800/60 hover:border-pink-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-pink-950/40 border border-pink-500/30 rounded-xl flex items-center justify-center mb-5 text-pink-400 group-hover:scale-110 transition-transform">
                <iconify-icon icon="solar:delivery-bold" width="24" height="24"></iconify-icon>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">100% Mobile Convenience</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                No waiting in greasy waiting rooms. We arrive fully equipped at your home or workplace anywhere across the Greater Toronto Area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section: The Story of Nes & Nadine */}
      <section id="about" className="py-24 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <span className="text-xs font-semibold text-pink-400 tracking-wider uppercase mb-2 block">
                Meet Nes & Nadine
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                The First Filipina Women-Owned Detailing Company in the GTA
              </h2>
              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed mb-8">
                <p>
                  Started in 2017 with a tireless work ethic and a commitment to perfection, <strong className="text-white">Ink N Shine Detailing</strong> has grown into Toronto's most loved women-owned mobile detail restoration service.
                </p>
                <p>
                  From reviving 20-year-old family commuter cars to prepping luxury exotics and fleet work trucks, we believe that <span className="text-pink-300 font-medium">"Your vehicle deserves more than just a quick car wash — it deserves a full restoration."</span>
                </p>
                <p className="text-xs text-zinc-400 italic bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                  "We take our time to properly clean, restore, and protect your vehicle. We take no shortcuts, we love our clients, and we leave every car smelling like brand new." — Nes & Nadine
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-zinc-800">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">5.0 ★</p>
                  <p className="text-xs text-zinc-400 font-medium">100% 5-Star Reviews</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">2017</p>
                  <p className="text-xs text-zinc-400 font-medium">Serving GTA Since</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-pink-400 tracking-tight mb-1">2 / day</p>
                  <p className="text-xs text-zinc-400 font-medium">Daily Quality Limit</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">100%</p>
                  <p className="text-xs text-zinc-400 font-medium">Mobile Home Service</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden relative border border-zinc-800 shadow-2xl">
                <img 
                  src="/assets/nes-and-nadine.jpg" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczNBxUYVIRnSSTp9aMEmvyJDheKMtb12R0ZfdBusmqFhFU3vM4u6gDOyiGF9mownDEmOSeUa52yZKugHL2AIyRZFSUUDCJzpzdQHX5dgAcBbg40RPd4=w1600';
                  }}
                  alt="N3S and Nadine - Founders & Master Detailers of Ink N Shine Detailing" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent"></div>
                
                {/* Authentic Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-zinc-900/90 backdrop-blur-md border border-zinc-700/60 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-sm">
                      N&N
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">N3S & NADINE</p>
                      <p className="text-[11px] text-pink-300">Founders & Master Detailers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-zinc-400 block">GTA Mobile Unit</span>
                    <span className="text-xs font-semibold text-white">(416) 919-8421</span>
                  </div>
                </div>
              </div>

              {/* Decorative pink glow */}
              <div className="absolute -bottom-8 -left-8 w-60 h-60 bg-pink-600/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section (Direct from their Real Package Menus) */}
      <section id="services" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-semibold text-pink-400 tracking-wider uppercase mb-2 block">
                Tailored Detailing Packages
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                Full Restoration & Protection Services
              </h2>
              <p className="text-zinc-400 text-base max-w-xl">
                Every vehicle is treated individually. Choose our famous Signature Shine, deep interior restoration, or multi-year ceramic shields.
              </p>
            </div>

            <a 
              href="#calculator" 
              className="inline-flex items-center text-xs sm:text-sm font-semibold text-pink-400 hover:text-pink-300 transition-colors"
            >
              Open Instant Quote Calculator <iconify-icon icon="solar:arrow-right-linear" width="16" class="ml-1"></iconify-icon>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service 1: Signature Shine (Their Most Popular Combo) */}
            <div className="group bg-zinc-900/70 rounded-3xl border-2 border-pink-500/60 overflow-hidden hover:border-pink-400 transition-all duration-300 flex flex-col justify-between relative shadow-xl shadow-pink-500/10">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] font-bold px-3 py-1 rounded-full z-10 shadow-md">
                MOST POPULAR
              </div>

              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src="/assets/signature-shine.jpg" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczPRmmU5XhhckWLfKqs37fUQfMO2kwFmITJtMRhR9wYl-nGr3edazBHoZToN7XQ3ZYHN54V682cQKbAZ7tXq68H_-lCpI_zqI-OL6-d-lvjnpZr-pR0=w1600';
                    }}
                    alt="Signature Shine Package" 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                </div>

                <div className="p-7">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">Signature Shine Package</h3>
                  </div>
                  <p className="text-xs text-pink-300 font-semibold mb-4">
                    Full Interior Deep Clean + Exterior Hand Polish & Wax
                  </p>
                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    Our flagship complete restoration. Combines deep interior shampoo extraction and pressurized steaming with clay bar decontamination and rich hand wax protection.
                  </p>

                  <div className="p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-800 mb-6 flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-zinc-400 block font-medium">Estimated Pricing</span>
                      <span className="text-lg font-bold text-white">$475 – $575</span>
                    </div>
                    <span className="text-[11px] text-zinc-500">Approx. 3.5 – 5.0 hrs</span>
                  </div>

                  <ul className="space-y-2.5 mb-6 text-xs text-zinc-300">
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="solar:check-circle-bold" class="text-pink-400 mt-0.5" width="14"></iconify-icon>
                      Full interior shampoo & hot water extraction
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="solar:check-circle-bold" class="text-pink-400 mt-0.5" width="14"></iconify-icon>
                      Pressurized steam cleaning on all vinyl, vents & crevices
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="solar:check-circle-bold" class="text-pink-400 mt-0.5" width="14"></iconify-icon>
                      Stubborn salt stain removal & neutralization
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="solar:check-circle-bold" class="text-pink-400 mt-0.5" width="14"></iconify-icon>
                      Clay bar exterior prep & hand polish gloss boost
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="solar:check-circle-bold" class="text-pink-400 mt-0.5" width="14"></iconify-icon>
                      Complimentary mat covers & signature fresh scent
                    </li>
                  </ul>
                </div>
              </div>

              <div className="px-7 pb-7 pt-0">
                <button 
                  onClick={() => setActiveServiceModal({
                    title: 'Signature Shine Package',
                    image: '/assets/signature-shine.jpg',
                    description: 'Our most requested home service treatment. We restore the interior freshness while giving the exterior a rich, glossy hand polish.',
                    duration: '3.5 - 5.0 Hours',
                    price: '$475 - $575 (Depends on vehicle size & condition)',
                    features: [
                      'Full interior deep shampoo extraction on all seats and carpets',
                      'High-pressure steam sanitization of vents, door cards, and cup holders',
                      'Stubborn Canadian road salt dissolving & extraction',
                      'Leather scrub, conditioning, and UV matte barrier application',
                      'Foam hand wash with two-bucket scratch-free method',
                      'Clay bar paint decontamination to remove fallout and tar',
                      'Hand polish for glossy, head-turning paint reflection',
                      'Tire dressing, wheel face clean, and streak-free glass inside & out'
                    ]
                  })}
                  className="w-full text-center text-xs font-semibold py-3 px-4 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition-colors shadow-md"
                >
                  View Package Inclusions & Book
                </button>
              </div>
            </div>

            {/* Service 2: Interior Deep Salt & Steam Restoration */}
            <div className="group bg-zinc-900/60 rounded-3xl border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src="/assets/interior-deep.jpg" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczNq7tOTM9TbfLKvBNYNeFXdnlDzCoMRiRQxnGV9mwWGlcUwQnZs_8WIsU6pbCImpwjc6xXxAJGMrLUkdng3yxFbVLMcw8W_V_7PanIrLQjwBXTGAgI=w1600';
                    }}
                    alt="Interior Deep Detail" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                </div>

                <div className="p-7">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">Interior Deep Restoration</h3>
                  </div>
                  <p className="text-xs text-pink-300 font-semibold mb-4">
                    Extreme Salt, Stain & Odor Elimination
                  </p>
                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    Designed for family cars, work trucks, and used vehicle resets. We tackle embedded pet hair, coffee stains, winter salt crust, and lingering smells.
                  </p>

                  <div className="p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-800 mb-6 flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-zinc-400 block font-medium">Estimated Pricing</span>
                      <span className="text-lg font-bold text-white">$350 – $450</span>
                    </div>
                    <span className="text-[11px] text-zinc-500">Approx. 3.0 – 4.0 hrs</span>
                  </div>

                  <ul className="space-y-2.5 mb-6 text-xs text-zinc-300">
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="solar:check-circle-bold" class="text-pink-400 mt-0.5" width="14"></iconify-icon>
                      Intensive salt patch dissolving & vacuum extraction
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="solar:check-circle-bold" class="text-pink-400 mt-0.5" width="14"></iconify-icon>
                      Compressed air crevice blowout (under seats & seams)
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="solar:check-circle-bold" class="text-pink-400 mt-0.5" width="14"></iconify-icon>
                      Hot steam extraction for seat fabric & floor carpets
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="solar:check-circle-bold" class="text-pink-400 mt-0.5" width="14"></iconify-icon>
                      Leather deep conditioning & matte UV protection
                    </li>
                  </ul>
                </div>
              </div>

              <div className="px-7 pb-7 pt-0">
                <button 
                  onClick={() => setActiveServiceModal({
                    title: 'Interior Deep Restoration',
                    image: '/assets/interior-deep.jpg',
                    description: 'A complete indoor reset. We purge years of trapped dirt, salt, and spills to make your cabin smell and feel fresh as a showroom.',
                    duration: '3.0 - 4.0 Hours',
                    price: '$350 - $450',
                    features: [
                      'High-power vacuuming reaching under seat rails & crevices',
                      'Targeted salt dissolving chemistry on floorboards',
                      'Deep hot water extraction shampoo on seats and mats',
                      'Steam treatment of dashboard, vents, steering wheel, and console',
                      'Streak-free interior crystal glass clean',
                      'Odor neutralizing treatment'
                    ]
                  })}
                  className="w-full text-center text-xs font-semibold py-3 px-4 rounded-xl bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors"
                >
                  View Package Inclusions
                </button>
              </div>
            </div>

            {/* Service 3: Paint Correction & 5-Year Ceramic */}
            <div className="group bg-zinc-900/60 rounded-3xl border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src="/assets/paint-ceramic.jpg" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczPEED7fuC4llsgnFgsDmN-teN8X6SnSDkCwNC9Ead3SJ63dETjp-jNJ6vlbYHyj1ojvKVkW-N-qfe3Zx2aX5gyk6mIPmNCmSLPv1FEZg1Cmkkopw_Q=w1600';
                    }}
                    alt="Paint Correction & Ceramic Coating" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                </div>

                <div className="p-7">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">Paint Correction & Ceramic</h3>
                  </div>
                  <p className="text-xs text-pink-300 font-semibold mb-4">
                    Machine Polishing + 5-Year Ceramic Shield
                  </p>
                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                    Permanent removal of swirl marks, light scratches, and haze followed by 5-year 9H ceramic coating for long-lasting gloss and hydrophobic water beading.
                  </p>

                  <div className="p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-800 mb-6 flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-zinc-400 block font-medium">Estimated Pricing</span>
                      <span className="text-lg font-bold text-white">$720 – $820+ / $3.4k</span>
                    </div>
                    <span className="text-[11px] text-zinc-500">Full 1-2 Day Service</span>
                  </div>

                  <ul className="space-y-2.5 mb-6 text-xs text-zinc-300">
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="solar:check-circle-bold" class="text-pink-400 mt-0.5" width="14"></iconify-icon>
                      Multi-stage chemical iron decon & clay bar
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="solar:check-circle-bold" class="text-pink-400 mt-0.5" width="14"></iconify-icon>
                      1-Step or 2-Step machine cut & jeweling polish
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="solar:check-circle-bold" class="text-pink-400 mt-0.5" width="14"></iconify-icon>
                      5-Year 9H ceramic coating (Paint, Glass & Wheel Faces)
                    </li>
                    <li className="flex items-start gap-2">
                      <iconify-icon icon="solar:check-circle-bold" class="text-pink-400 mt-0.5" width="14"></iconify-icon>
                      Extreme hydrophobic self-cleaning water beading
                    </li>
                  </ul>
                </div>
              </div>

              <div className="px-7 pb-7 pt-0">
                <button 
                  onClick={() => setActiveServiceModal({
                    title: 'Paint Correction & Ceramic Protection',
                    image: '/assets/paint-ceramic.jpg',
                    description: 'Our top-tier exterior enhancement. We measure your clear coat thickness and use precision dual-action polishers to remove swirl marks before locking in a 5-year ceramic shell.',
                    duration: 'Full Day Service',
                    price: '$720 - $820 for 1-Step Polish Combo / $3,400 - $4,000 for Full 5-Year Ceramic Restoration (e.g. Ford F-150 / Trucks)',
                    features: [
                      'Deep foam wash, iron remover & clay bar treatment',
                      'Paint depth gauge audit and trim protection taping',
                      'Dual-action machine correction to remove 80-90%+ of swirl marks',
                      'IPA panel wipe to ensure sterile bonding surface',
                      'Application of premium 5-year 9H ceramic coating',
                      'Wheel faces and glass coated for extreme water repellency'
                    ]
                  })}
                  className="w-full text-center text-xs font-semibold py-3 px-4 rounded-xl bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors"
                >
                  View Package Inclusions
                </button>
              </div>
            </div>

          </div>

          {/* Specialized Add-ons Bar */}
          <div className="mt-16 bg-zinc-900/80 p-8 rounded-3xl border border-zinc-800">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <iconify-icon icon="solar:stars-minimalistic-bold" class="text-pink-400" width="20"></iconify-icon>
              Popular Specialized Add-Ons
            </h3>
            <p className="text-xs text-zinc-400 mb-6">Customize any package with our targeted detailing treatments:</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800/80">
                <p className="text-xs font-semibold text-white mb-1">Engine Bay Fresh-Up</p>
                <p className="text-[11px] text-zinc-500 mb-2">Degrease & satin dressing</p>
                <span className="text-xs text-pink-400 font-bold">+$60</span>
              </div>
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800/80">
                <p className="text-xs font-semibold text-white mb-1">Headlight Restoration</p>
                <p className="text-[11px] text-zinc-500 mb-2">Wet sand & UV sealant</p>
                <span className="text-xs text-pink-400 font-bold">+$75</span>
              </div>
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800/80">
                <p className="text-xs font-semibold text-white mb-1">Heavy Pet Hair</p>
                <p className="text-[11px] text-zinc-500 mb-2">Rubber blade & drill brush</p>
                <span className="text-xs text-pink-400 font-bold">+$50</span>
              </div>
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800/80">
                <p className="text-xs font-semibold text-white mb-1">Ceiling / Headliner</p>
                <p className="text-[11px] text-zinc-500 mb-2">Gentle smoke/stain purify</p>
                <span className="text-xs text-pink-400 font-bold">+$60</span>
              </div>
              <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800/80 col-span-2 sm:col-span-1">
                <p className="text-xs font-semibold text-white mb-1">Severe Salt Crust</p>
                <p className="text-[11px] text-zinc-500 mb-2">Multi-layer calcium dissolve</p>
                <span className="text-xs text-pink-400 font-bold">+$50</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Before / After Impact Section: Ontario Winter Salt & Transformation */}
      <section id="impact" className="py-24 bg-zinc-900 border-y border-zinc-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden border border-zinc-800 aspect-[4/3] shadow-2xl">
                {/* 50/50 static side-by-side split */}
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 relative overflow-hidden bg-zinc-800">
                    <img 
                      src="/assets/before-after.jpg" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczOqp61vtmhcWDPFhhVBI1yVH4gFXlwwe0qKfMUVwyhPXRLr46xuc0EANYnlvAtlasgsYbCRknnz5RFtEG0Df5MIw1-h-No1Loq68-FJaAwYJ9fL_bc=w1600';
                      }}
                      alt="Before detailing salt crust" 
                      className="absolute w-[200%] max-w-none h-full object-cover filter brightness-75 contrast-75 sepia-[.2]"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full font-bold border border-white/10">
                      BEFORE (SALT & DULL)
                    </div>
                  </div>
                  <div className="w-1/2 relative overflow-hidden border-l-2 border-pink-500">
                    <img 
                      src="/assets/before-after.jpg" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczOqp61vtmhcWDPFhhVBI1yVH4gFXlwwe0qKfMUVwyhPXRLr46xuc0EANYnlvAtlasgsYbCRknnz5RFtEG0Df5MIw1-h-No1Loq68-FJaAwYJ9fL_bc=w1600';
                      }}
                      alt="After Ink N Shine detailing" 
                      className="absolute right-0 w-[200%] max-w-none h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] px-3 py-1 rounded-full font-bold shadow-md">
                      AFTER (INK N SHINE)
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-zinc-400 mt-4 font-medium">
                Actual results: Salt crusted footwells and swirled paint brought back to pristine showroom glory.
              </p>
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="text-xs font-semibold text-pink-400 tracking-wider uppercase mb-2 block">
                The Ink N Shine Result
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                From salt-crusted mess to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400">showroom fresh.</span>
              </h2>
              <p className="text-zinc-300 text-base sm:text-lg mb-8 leading-relaxed">
                Canadian winters are brutal on carpets, footwells, and paint clear coats. Our specialized enzymatic cleaners and pressurized steam break down salt crystals without degrading your car's underlying materials.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                    <iconify-icon icon="solar:check-circle-bold" width="20"></iconify-icon>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Permanent Salt Crystal Extraction</h4>
                    <p className="text-xs text-zinc-400">No white crust returning three days later — we dissolve the calcium at the base.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                    <iconify-icon icon="solar:shield-check-bold" width="20"></iconify-icon>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Non-Toxic & Safe for Kids & Pets</h4>
                    <p className="text-xs text-zinc-400">We sanitize using natural high-temperature steam and premium eco-friendly conditioners.</p>
                  </div>
                </div>
              </div>

              <a 
                href="#gallery" 
                className="inline-flex items-center text-sm font-semibold text-pink-400 hover:text-pink-300 transition-colors"
              >
                Browse our real client vehicle transformations <iconify-icon icon="solar:arrow-right-linear" width="16" class="ml-1"></iconify-icon>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Gallery Section: Real Projects from the PDF */}
      <section id="gallery" className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-2 block">
                Verified GTA Client Transformations
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
                Recent Projects Showcase
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
                Real vehicles detailed right in driveways and studios across Toronto, Mississauga, Scarborough, and Hamilton.
              </p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-zinc-900 rounded-2xl border border-zinc-800">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'salt', label: 'Salt & Carpet Extraction' },
                { id: 'interior', label: 'Interior Steaming' },
                { id: 'ceramic', label: 'Paint & Ceramic' },
                { id: 'suv', label: 'SUVs & Trucks' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveGalleryTab(tab.id as any)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                    activeGalleryTab === tab.id
                      ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                className="group bg-zinc-900/60 rounded-3xl border border-zinc-800 overflow-hidden hover:border-pink-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative bg-zinc-950 flex items-center justify-center">
                    {item.id === 'tesla' || item.id === 'kia-soul' || item.id === 'lexus-camry' || item.id === 'hyundai-tucson' ? (
                      <>
                        <img 
                          src={item.image} 
                          alt="" 
                          aria-hidden="true" 
                          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110"
                        />
                        <img 
                          src={item.image} 
                          onError={(e) => {
                            if (item.id === 'tesla') {
                              (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczPrHSNLHOpg6J1fwMihkCCDH4HchXhLFXLOuj95fqy8CKsOD5ixxuoHeXCwR11q5odMB_CQjQ_QXagsOn3kAC-z9ttjc9orCxo3CDUOBea_HnRfGFI=w1600';
                            } else if (item.id === 'kia-soul') {
                              (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczNtCPuqRFCNktUnGDwN8ETcdmpIjDHpdRikyNoAEEShUwYd_buoDcrj9W6j7mF-9abEyJQFqNmxt2p77nM89EM3Wp-tnjHjioB_TgmBi3yO3jc7yaM=w1600';
                            } else if (item.id === 'lexus-camry') {
                              (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczPCzyH-8Zu6FFiYCdODrnh8onOgGWPnXBpFgkyQuqi-F3f6zclTdvdAzyzfrm98p6UDzfrPsJmN6ujO-Xuc06Yzj57GW4xCnUjmm8h2na5JaYf-egw=w1600';
                            } else if (item.id === 'hyundai-tucson') {
                              (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczOs1F79JyWtWO30iWZ0YJ0k3Ool8pJAUA3M46zRMQc8M0fYQFw29BYDhng_Ky9uJ5fPOVrvX2D5f3ItFZ6lQ_02tpMPMT2CUmVT128q-jPM9oepuAc=w1600';
                            }
                          }}
                          alt={item.title} 
                          className="relative z-10 w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                        />
                      </>
                    ) : (
                      <img 
                        src={item.image} 
                        onError={(e) => {
                          if (item.id === 'rav4') {
                            (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczNOWH_0yVf1-9IfQF9HqEik3oE9W6gNT56XZYiHfSn2r5qqc9_wIMDJzx6rvO7eHU5bLOZAvPuD42kToFXsjkNJaIB2JaCsLPcono3oaIKHUf8BgWk=w1600';
                          } else if (item.id === 'f150') {
                            (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczOrZB3-OqBzMjI0VBgO4mGHW0cVumJ31vAd4PSX8Su0WpgzQH385YhM9POpJgOI_8b_gLd5SlJvmLG4emdAfQXwkcw4Xh7qPzMWV7A75ACD1OFiz5I=w1600';
                          }
                        }}
                        alt={item.title} 
                        className={`w-full h-full object-cover ${item.id === 'rav4' ? 'object-[center_22%]' : item.id === 'f150' ? 'object-[center_35%]' : 'object-center'} group-hover:scale-105 transition-transform duration-500`}
                      />
                    )}
                    <div className="absolute top-3 left-3 z-20 bg-zinc-950/80 backdrop-blur-md text-pink-300 border border-pink-500/30 text-[11px] font-bold px-2.5 py-1 rounded-full">
                      {item.city}
                    </div>
                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                      <span className="text-xs font-semibold text-pink-300 flex items-center gap-1.5">
                        Inspect transformation details <iconify-icon icon="solar:magnifer-linear" width="16"></iconify-icon>
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-2 font-medium">
                      <span className="text-pink-400 font-semibold">{item.vehicle}</span>
                      <span className="text-zinc-400">Client: {item.client}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-4">
                      {item.summary}
                    </p>
                  </div>
                </div>
                
                <div className="px-6 pb-6 pt-0 flex flex-wrap gap-1.5">
                  {item.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="text-[11px] font-semibold bg-zinc-800 text-zinc-200 px-2.5 py-1 rounded-lg border border-zinc-700/60 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Process Section: How It Works */}
      <section id="process" className="py-24 bg-zinc-900/60 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-2 block">Simple 3-Step Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              How Our Home Service Detailing Works
            </h2>
            <p className="text-zinc-400 text-base max-w-xl mx-auto">
              You stay in the comfort of your home while we transform your vehicle right outside in your driveway.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-px bg-zinc-800 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-zinc-950 border-2 border-zinc-800 rounded-full flex items-center justify-center mb-6 text-lg font-bold text-white">
                  1
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Book Your Slot</h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-xs mx-auto">
                  Call, WhatsApp, or fill out our online form. Send photos of your car for a fast, honest, and exact estimate.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-zinc-950 border-2 border-pink-500 rounded-full flex items-center justify-center mb-6 text-lg font-bold text-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                  2
                </div>
                <h3 className="text-lg font-bold text-white mb-2">We Arrive at Your Driveway</h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-xs mx-auto">
                  Nes & Nadine arrive with commercial steam extractors, fresh water tanks, and top-shelf pH safe chemicals.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-zinc-950 border-2 border-zinc-800 rounded-full flex items-center justify-center mb-6 text-lg font-bold text-white">
                  3
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Enjoy Your Brand New Car</h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-xs mx-auto">
                  Step into a fresh, sanitized interior with protective paper mat covers and our signature fresh scent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Reviews Section (Direct from Google Maps) */}
      <section id="reviews" className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-2 block">Real GTA Client Feedback</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                100% 5.0 Star Google Rating
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex text-pink-400">
                  <iconify-icon icon="solar:star-bold" width="20"></iconify-icon>
                  <iconify-icon icon="solar:star-bold" width="20"></iconify-icon>
                  <iconify-icon icon="solar:star-bold" width="20"></iconify-icon>
                  <iconify-icon icon="solar:star-bold" width="20"></iconify-icon>
                  <iconify-icon icon="solar:star-bold" width="20"></iconify-icon>
                </div>
                <span className="text-sm font-semibold text-white">5.0 Average based on 19+ Verified Google Reviews</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REAL_REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-pink-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <iconify-icon key={i} icon="solar:star-bold" width="16"></iconify-icon>
                      ))}
                    </div>
                    <span className="text-[11px] text-zinc-500">{review.date}</span>
                  </div>

                  <p className="text-xs text-zinc-300 italic mb-6 leading-relaxed">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80">
                  <p className="text-xs font-bold text-white">{review.name}</p>
                  <p className="text-[11px] text-pink-300">{review.vehicle}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{review.badge}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Pricing Estimator (Direct from GTA Market Rates) */}
      <section id="calculator" className="py-24 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-2 block">GTA Pricing Estimator</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Transparent Pricing & Custom Estimate
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
              Choose your vehicle size and service package to get an instant realistic estimate for our mobile home service.
            </p>
          </div>
          
          <div className="bg-zinc-950 p-8 sm:p-10 rounded-3xl border border-zinc-800 shadow-2xl mb-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-zinc-800">
              
              {/* Step 1: Vehicle Size */}
              <div>
                <label className="text-xs font-bold uppercase text-pink-400 tracking-wider mb-3 block">
                  1. Vehicle Category
                </label>
                <div className="space-y-2.5">
                  {[
                    { id: 'sedan', label: 'Coupe / Sedan / Hatch', desc: 'Civic, Corolla, Tesla 3, Camry' },
                    { id: 'suv', label: 'Mid-Size SUV / Crossover', desc: 'RAV4, CR-V, Tucson, Model Y, Soul' },
                    { id: 'truck', label: 'Full SUV / Truck / Van', desc: 'F-150, Tahoe, Odyssey, Range Rover' },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setCalcVehicle(v.id as any)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-sm transition-all ${
                        calcVehicle === v.id
                          ? 'border-pink-500 bg-pink-950/20 text-white shadow-sm'
                          : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 text-zinc-400'
                      }`}
                    >
                      <span className="font-semibold text-white block text-xs sm:text-sm">{v.label}</span>
                      <span className="text-[11px] text-zinc-500">{v.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Primary Package */}
              <div>
                <label className="text-xs font-bold uppercase text-pink-400 tracking-wider mb-3 block">
                  2. Primary Package
                </label>
                <div className="space-y-2.5">
                  {[
                    { id: 'signature', label: 'Signature Shine Combo', desc: 'Full interior + hand polish & wax' },
                    { id: 'interior', label: 'Interior Deep Reset', desc: 'Salt, steam & stain extraction' },
                    { id: 'paint', label: 'Paint Enhancement Combo', desc: '1-Step machine polish + detail' },
                    { id: 'ceramic', label: 'Full 5-Yr Ceramic Shield', desc: 'Multi-stage paint cut & 9H coat' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCalcPackage(s.id as any)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-sm transition-all ${
                        calcPackage === s.id
                          ? 'border-pink-500 bg-pink-950/20 text-white shadow-sm'
                          : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 text-zinc-400'
                      }`}
                    >
                      <span className="font-semibold text-white block text-xs sm:text-sm">{s.label}</span>
                      <span className="text-[11px] text-zinc-500">{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Add-on Treatments */}
              <div>
                <label className="text-xs font-bold uppercase text-pink-400 tracking-wider mb-3 block">
                  3. Specialty Add-ons
                </label>
                <div className="space-y-2.5">
                  <label className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    calcAddons.saltRemoval ? 'border-pink-500/80 bg-pink-950/20' : 'border-zinc-800 bg-zinc-900/40'
                  }`}>
                    <input 
                      type="checkbox"
                      checked={calcAddons.saltRemoval}
                      onChange={(e) => setCalcAddons(p => ({ ...p, saltRemoval: e.target.checked }))}
                      className="mt-1 accent-pink-500"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block">Heavy Salt Crust Dissolve</span>
                      <span className="text-[11px] text-zinc-400">+$50 • Deep floorboard extraction</span>
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    calcAddons.engineBay ? 'border-pink-500/80 bg-pink-950/20' : 'border-zinc-800 bg-zinc-900/40'
                  }`}>
                    <input 
                      type="checkbox"
                      checked={calcAddons.engineBay}
                      onChange={(e) => setCalcAddons(p => ({ ...p, engineBay: e.target.checked }))}
                      className="mt-1 accent-pink-500"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block">Engine Bay Steam Clean</span>
                      <span className="text-[11px] text-zinc-400">+$60 • Degrease & satin coat</span>
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    calcAddons.headlights ? 'border-pink-500/80 bg-pink-950/20' : 'border-zinc-800 bg-zinc-900/40'
                  }`}>
                    <input 
                      type="checkbox"
                      checked={calcAddons.headlights}
                      onChange={(e) => setCalcAddons(p => ({ ...p, headlights: e.target.checked }))}
                      className="mt-1 accent-pink-500"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block">Headlight Restoration</span>
                      <span className="text-[11px] text-zinc-400">+$75 • Yellowing removed & sealed</span>
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    calcAddons.petHair ? 'border-pink-500/80 bg-pink-950/20' : 'border-zinc-800 bg-zinc-900/40'
                  }`}>
                    <input 
                      type="checkbox"
                      checked={calcAddons.petHair}
                      onChange={(e) => setCalcAddons(p => ({ ...p, petHair: e.target.checked }))}
                      className="mt-1 accent-pink-500"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block">Heavy Pet Hair Extraction</span>
                      <span className="text-[11px] text-zinc-400">+$50 • Intensive rubber blade brush</span>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Total Estimate Calculation */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-zinc-900/90 p-6 sm:p-7 rounded-2xl border border-zinc-800">
              <div>
                <span className="text-xs text-pink-400 uppercase tracking-widest font-bold mb-1 block">
                  Estimated Mobile Package
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight tabular-nums">
                    ${calculatedTotal()}
                  </span>
                  <span className="text-zinc-400 text-sm font-semibold">CAD (Mobile Home Service)</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1.5">
                  Exact quote finalized based on in-person vehicle inspection and driveway accessibility.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button 
                  onClick={handleQuoteToBooking}
                  className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-pink-600 to-rose-500 rounded-full hover:from-pink-500 hover:to-rose-400 transition-all duration-200 shadow-lg shadow-pink-500/20 hover:scale-105"
                >
                  Apply to Booking Form <iconify-icon icon="solar:arrow-right-linear" width="18" class="ml-2"></iconify-icon>
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-pink-300 bg-pink-500/10 border border-pink-500/20 py-3 px-6 rounded-full mx-auto max-w-fit text-center">
            <iconify-icon icon="solar:clock-circle-bold" class="text-pink-400" width="18"></iconify-icon>
            We strictly limit our schedule to 2 vehicles per day for showroom quality.
          </div>
        </div>
      </section>

      {/* GTA Service Coverage Cities */}
      <section className="py-16 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold mb-2 block">100% Mobile Coverage</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
            Serving the Greater Toronto Area (GTA)
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mb-8">
            We bring our mobile detailing unit directly to your home or office in:
          </p>

          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {GTA_AREAS.map((city, idx) => (
              <span key={idx} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <iconify-icon icon="solar:map-point-bold" class="text-pink-400" width="14"></iconify-icon>
                {city}, ON
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Footer */}
      <footer id="contact" className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            
            {/* Contact Info & Socials */}
            <div>
              <span className="text-xs font-semibold text-pink-400 tracking-wider uppercase mb-2 block">Direct Contact</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mb-6">
                Book Your Mobile Detail with Nes & Nadine
              </h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-950/40 border border-pink-500/30 flex items-center justify-center shrink-0 text-pink-400">
                    <iconify-icon icon="solar:phone-calling-bold" width="22"></iconify-icon>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 font-medium mb-1">Call / Text Directly</p>
                    <a href="tel:4169198421" className="text-lg text-white hover:text-pink-400 transition-colors font-bold block">
                      (416) 919-8421
                    </a>
                    <a href="tel:4169088435" className="text-sm text-zinc-400 hover:text-pink-400 transition-colors font-medium">
                      Secondary: (416) 908-8435
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-950/40 border border-pink-500/30 flex items-center justify-center shrink-0 text-pink-400">
                    <iconify-icon icon="solar:letter-bold" width="22"></iconify-icon>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 font-medium mb-1">Email Inquiries</p>
                    <a href="mailto:inknshinedetailing@gmail.com" className="text-base text-white hover:text-pink-400 transition-colors font-semibold">
                      inknshinedetailing@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-950/40 border border-pink-500/30 flex items-center justify-center shrink-0 text-pink-400">
                    <iconify-icon icon="solar:clock-circle-bold" width="22"></iconify-icon>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 font-medium mb-1">Operating Hours</p>
                    <p className="text-sm text-zinc-200">Mon - Sat: 9:00 AM - 6:00 PM<br />Sun: By Advance Appointment</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="p-6 bg-zinc-900/60 rounded-3xl border border-zinc-800">
                <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-3 flex items-center gap-2">
                  <iconify-icon icon="solar:camera-bold" class="text-pink-400" width="16"></iconify-icon>
                  Follow Our Viral Detail Videos
                </h4>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://www.instagram.com/inknshinedetailing" 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-700/80 text-xs font-semibold text-zinc-200 hover:text-pink-400 hover:border-pink-400 transition-colors flex items-center gap-2"
                  >
                    <iconify-icon icon="solar:camera-linear" width="16"></iconify-icon>
                    Instagram @inknshinedetailing
                  </a>
                  <a 
                    href="https://www.facebook.com/inknshinedetailing" 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-700/80 text-xs font-semibold text-zinc-200 hover:text-pink-400 hover:border-pink-400 transition-colors flex items-center gap-2"
                  >
                    <iconify-icon icon="solar:share-circle-bold" width="16"></iconify-icon>
                    Facebook @inknshinedetailing
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-zinc-900/60 p-8 sm:p-10 rounded-3xl border border-zinc-800 relative">
              <h3 className="text-xl font-bold text-white mb-2">Request Mobile Appointment</h3>
              <p className="text-xs text-zinc-400 mb-6">
                Fill in your details below and Nes & Nadine will confirm slot availability within 30 minutes.
              </p>
              
              {formSubmitted ? (
                <div className="bg-zinc-950 p-8 rounded-2xl border border-pink-500/40 text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto mb-4">
                    <iconify-icon icon="solar:check-circle-bold" width="36"></iconify-icon>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Appointment Request Sent!</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto mb-6 leading-relaxed">
                    Salamat, <strong className="text-white">{formData.firstName}</strong>! Nes & Nadine have received your inquiry for your <span className="text-pink-300 font-semibold">{formData.vehicleInfo}</span> in <strong className="text-white">{formData.cityGTA}</strong>. We will text or call you at <strong className="text-white">{formData.phone}</strong> shortly!
                  </p>
                  <button 
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        firstName: '',
                        lastName: '',
                        phone: '',
                        email: '',
                        cityGTA: 'Toronto',
                        vehicleInfo: '',
                        serviceType: 'signature_shine',
                        preferredDate: '',
                        notes: '',
                      });
                    }}
                    className="px-6 py-2.5 bg-zinc-800 text-xs font-semibold text-white rounded-full hover:bg-zinc-700"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 bg-red-950/50 border border-red-800 text-red-300 text-xs rounded-xl">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-2">First Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-zinc-600" 
                        placeholder="e.g. Andre" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-2">Last Name</label>
                      <input 
                        type="text" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-zinc-600" 
                        placeholder="Batalla" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-2">Phone Number (Cell) *</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-zinc-600" 
                        placeholder="(416) 000-0000" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-2">City / Location in GTA *</label>
                      <div className="relative">
                        <select 
                          value={formData.cityGTA}
                          onChange={(e) => setFormData({ ...formData, cityGTA: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all appearance-none cursor-pointer"
                        >
                          {GTA_AREAS.map((city, idx) => (
                            <option key={idx} value={city}>{city}, ON</option>
                          ))}
                          <option value="Other GTA Area">Other GTA Location</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-500">
                          <iconify-icon icon="solar:alt-arrow-down-linear" width="16"></iconify-icon>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-2">Vehicle (Year, Make & Model) *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.vehicleInfo}
                        onChange={(e) => setFormData({ ...formData, vehicleInfo: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-zinc-600" 
                        placeholder="e.g. 2015 Toyota RAV4" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-2">Preferred Service Package</label>
                      <div className="relative">
                        <select 
                          value={formData.serviceType}
                          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all appearance-none cursor-pointer"
                        >
                          <option value="signature_shine">Signature Shine Combo ($475 - $575)</option>
                          <option value="interior_deep">Interior Deep Salt & Steam ($350 - $450)</option>
                          <option value="paint_enhancement">Paint Enhancement Polish & Detail ($720+)</option>
                          <option value="ceramic_coating">5-Year Ceramic Coating Package</option>
                          <option value="custom_inquiry">Custom Inquiry / Add-ons</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-500">
                          <iconify-icon icon="solar:alt-arrow-down-linear" width="16"></iconify-icon>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-2">Notes or Vehicle Condition (Salt, Pet Hair, Stains, etc.)</label>
                    <textarea 
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Describe heavy salt build up, grease on seats, pet hair, or requested date..."
                      className="w-full bg-zinc-950 border border-zinc-800 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-zinc-600 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full mt-4 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 text-white text-sm font-bold py-3.5 rounded-xl hover:from-pink-500 hover:to-rose-400 transition-all duration-200 cursor-pointer shadow-lg shadow-pink-500/20"
                  >
                    Send Mobile Detail Booking Request
                  </button>
                  <p className="text-[11px] text-zinc-500 text-center mt-3">
                    Fast response guaranteed. We will text/call to confirm time and driveway details.
                  </p>
                </form>
              )}
            </div>
          </div>
          
          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-pink-500/40 p-1 overflow-hidden flex items-center justify-center">
                <img 
                  src="/assets/ink-n-shine-logo.png" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczMjHq80dE8XbHnsswjCQYcUm1qYQ6g-k4I4sAjXlLD0k8BPzxCUL591Vz0UX7_SdXU295_tPbB_xmzh0FcsDXH_htxoT-24LqDhAeiBTBQ1hAAVLhY=w500';
                  }}
                  alt="Ink N Shine Detailing Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-white text-sm font-bold tracking-tight uppercase">
                INK N SHINE DETAILING • TORONTO, ON
              </div>
            </div>
            <p className="text-xs text-zinc-500">© 2026 Ink N Shine Detailing. All rights reserved. Women-Owned GTA Mobile Detailers.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a 
        href="https://wa.me/14169198421?text=Hello%20Ink%20N%20Shine%20Detailing!%20I'd%20like%20to%20inquire%20about%20a%20mobile%20detailing%20quote." 
        target="_blank" 
        rel="noreferrer"
        aria-label="Chat with Nes & Nadine on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group cursor-pointer"
      >
        <iconify-icon icon="solar:chat-round-dots-bold" width="28"></iconify-icon>
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-xs font-semibold text-white rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block shadow-lg">
          Chat with Nes & Nadine
        </span>
      </a>

      {/* Service Details Modal */}
      {activeServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="aspect-[16/9] relative overflow-hidden">
              <img src={activeServiceModal.image} alt={activeServiceModal.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setActiveServiceModal(null)}
                className="absolute top-4 right-4 bg-zinc-950/80 text-white rounded-full p-1.5 hover:bg-zinc-950 transition-colors"
                aria-label="Close modal"
              >
                <iconify-icon icon="solar:close-circle-linear" width="22"></iconify-icon>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">{activeServiceModal.title}</h3>
                <span className="text-xs font-bold text-pink-300 bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full">
                  {activeServiceModal.price}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mb-4 flex items-center gap-1.5">
                <iconify-icon icon="solar:clock-circle-bold" class="text-pink-400" width="14"></iconify-icon>
                Estimated Duration: {activeServiceModal.duration}
              </p>
              <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed">
                {activeServiceModal.description}
              </p>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Included in this service:</h4>
              <ul className="space-y-2 mb-6 text-xs text-zinc-300">
                {activeServiceModal.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <iconify-icon icon="solar:check-circle-bold" class="text-pink-400 mt-0.5" width="14"></iconify-icon>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <a
                  href="#contact"
                  onClick={() => setActiveServiceModal(null)}
                  className="w-full text-center py-3 text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-rose-500 rounded-xl hover:from-pink-500 hover:to-rose-400 transition-colors"
                >
                  Book This Package
                </a>
                <button
                  onClick={() => setActiveServiceModal(null)}
                  className="px-5 py-3 text-xs font-semibold text-zinc-300 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Lightbox Modal */}
      {selectedGalleryItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="relative overflow-hidden bg-black flex items-center justify-center p-2 min-h-[340px] max-h-[70vh]">
              {selectedGalleryItem.id === 'tesla' || selectedGalleryItem.id === 'kia-soul' || selectedGalleryItem.id === 'lexus-camry' || selectedGalleryItem.id === 'hyundai-tucson' ? (
                <div className="relative w-full h-[60vh] max-h-[500px] flex items-center justify-center">
                  <img 
                    src={selectedGalleryItem.image} 
                    alt="" 
                    aria-hidden="true" 
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110"
                  />
                  <img 
                    src={selectedGalleryItem.image} 
                    onError={(e) => {
                      if (selectedGalleryItem.id === 'tesla') {
                        (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczPrHSNLHOpg6J1fwMihkCCDH4HchXhLFXLOuj95fqy8CKsOD5ixxuoHeXCwR11q5odMB_CQjQ_QXagsOn3kAC-z9ttjc9orCxo3CDUOBea_HnRfGFI=w1600';
                      } else if (selectedGalleryItem.id === 'kia-soul') {
                        (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczNtCPuqRFCNktUnGDwN8ETcdmpIjDHpdRikyNoAEEShUwYd_buoDcrj9W6j7mF-9abEyJQFqNmxt2p77nM89EM3Wp-tnjHjioB_TgmBi3yO3jc7yaM=w1600';
                      } else if (selectedGalleryItem.id === 'lexus-camry') {
                        (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczPCzyH-8Zu6FFiYCdODrnh8onOgGWPnXBpFgkyQuqi-F3f6zclTdvdAzyzfrm98p6UDzfrPsJmN6ujO-Xuc06Yzj57GW4xCnUjmm8h2na5JaYf-egw=w1600';
                      } else if (selectedGalleryItem.id === 'hyundai-tucson') {
                        (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczOs1F79JyWtWO30iWZ0YJ0k3Ool8pJAUA3M46zRMQc8M0fYQFw29BYDhng_Ky9uJ5fPOVrvX2D5f3ItFZ6lQ_02tpMPMT2CUmVT128q-jPM9oepuAc=w1600';
                      }
                    }}
                    alt={selectedGalleryItem.title} 
                    className="relative z-10 max-h-full w-auto max-w-full object-contain mx-auto rounded-xl shadow-2xl" 
                  />
                </div>
              ) : (
                <img 
                  src={selectedGalleryItem.image} 
                  onError={(e) => {
                    if (selectedGalleryItem.id === 'rav4') {
                      (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczNOWH_0yVf1-9IfQF9HqEik3oE9W6gNT56XZYiHfSn2r5qqc9_wIMDJzx6rvO7eHU5bLOZAvPuD42kToFXsjkNJaIB2JaCsLPcono3oaIKHUf8BgWk=w1600';
                    } else if (selectedGalleryItem.id === 'f150') {
                      (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/pw/AP1GczOrZB3-OqBzMjI0VBgO4mGHW0cVumJ31vAd4PSX8Su0WpgzQH385YhM9POpJgOI_8b_gLd5SlJvmLG4emdAfQXwkcw4Xh7qPzMWV7A75ACD1OFiz5I=w1600';
                    }
                  }}
                  alt={selectedGalleryItem.title} 
                  className={`w-full aspect-[16/10] object-cover ${selectedGalleryItem.id === 'rav4' ? 'object-[center_22%]' : selectedGalleryItem.id === 'f150' ? 'object-[center_35%]' : 'object-center'}`} 
                />
              )}
              <button 
                onClick={() => setSelectedGalleryItem(null)}
                className="absolute top-4 right-4 z-30 bg-zinc-950/80 text-white rounded-full p-2 hover:bg-zinc-950 transition-colors"
                aria-label="Close details"
              >
                <iconify-icon icon="solar:close-circle-linear" width="22"></iconify-icon>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span className="text-pink-400 font-bold">{selectedGalleryItem.vehicle} • {selectedGalleryItem.city}</span>
                <span className="text-zinc-500">Client: {selectedGalleryItem.client}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{selectedGalleryItem.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed">{selectedGalleryItem.summary}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedGalleryItem.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs font-semibold bg-zinc-800 text-pink-400 px-3 py-1 rounded-full border border-zinc-700/80 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-zinc-800">
                <a
                  href="#contact"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      notes: `Inquiry inspired by showcase: ${selectedGalleryItem.title} (${selectedGalleryItem.vehicle})`
                    }));
                    setSelectedGalleryItem(null);
                  }}
                  className="w-full text-center py-3 text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-rose-500 rounded-xl hover:from-pink-500 hover:to-rose-400 transition-colors"
                >
                  Book Similar Service
                </a>
                <button
                  onClick={() => setSelectedGalleryItem(null)}
                  className="px-6 py-3 text-xs font-semibold text-zinc-300 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
