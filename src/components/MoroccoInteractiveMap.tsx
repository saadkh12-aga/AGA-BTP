import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, ArrowRight, Compass, ZoomIn, ZoomOut, RotateCcw, Building2, Trees, Hotel, Sparkles } from 'lucide-react';

interface CityHub {
  id: string;
  name: string;
  nameAr: string;
  nameEn: string;
  region: string;
  regionAr: string;
  regionEn: string;
  x: number; // SVG coordinates
  y: number;
  highlight: string;
  highlightAr: string;
  highlightEn: string;
  keyAssetTypes: string[];
  strategicPoints: string[];
}

export const MOROCCO_HUBS: CityHub[] = [
  {
    id: 'tanger',
    name: 'Tanger & Tétouan',
    nameAr: 'طنجة وتطوان',
    nameEn: 'Tangier & Tetouan',
    region: 'Tanger-Tétouan-Al Hoceïma',
    regionAr: 'طنجة - تطوان - الحسيمة',
    regionEn: 'Tangier-Tetouan-Al Hoceima',
    x: 340,
    y: 40,
    highlight: 'Port Tanger Med, Cité Financière & Tamuda Bay',
    highlightAr: 'ميناء طنجة المتوسط، المنطقة الحرة والواجهة البحرية',
    highlightEn: 'Tanger Med Port, Free Trade Zone & Luxury Coastline',
    keyAssetTypes: ['Promotion Immobilière', 'Industriel & Logistique', 'Tourisme Balnéaire', 'Villas Cap Spartel'],
    strategicPoints: ['1er Port de Méditerranée', 'Connexion TGV Al Boraq', 'Exonérations fiscales d’export']
  },
  {
    id: 'rabat',
    name: 'Rabat',
    nameAr: 'الرباط',
    nameEn: 'Rabat',
    region: 'Rabat-Salé-Kénitra',
    regionAr: 'الرباط - سلا - القنيطرة',
    regionEn: 'Rabat-Sale-Kenitra',
    x: 315,
    y: 72,
    highlight: 'Capitale Diplomatique, Ville Lumière & Vallée du Bouregreg',
    highlightAr: 'عاصمة المملكة، الحي الدبلوماسي السويسي وضفاف أبي رقراق',
    highlightEn: 'Diplomatic Capital, Souissi Palaces & Bouregreg Waterfront',
    keyAssetTypes: ['Palais & Résidences de Prestige', 'Immeubles de Bureaux Tertiaires', 'Hôtellerie Haut Standing'],
    strategicPoints: ['Centre décisionnel et diplomatique', 'Pôle Universitaire d\'Excellence', 'Tour Mohammed VI']
  },
  {
    id: 'casablanca',
    name: 'Casablanca',
    nameAr: 'الدار البيضاء',
    nameEn: 'Casablanca',
    region: 'Casablanca-Settat',
    regionAr: 'الدار البيضاء - سطات',
    regionEn: 'Casablanca-Settat',
    x: 295,
    y: 88,
    highlight: 'Casablanca Finance City (CFC), Anfa & Triangle d\'Or',
    highlightAr: 'القطب المالي الدولي CFC، أنفا والمثلث الذهبي',
    highlightEn: 'Casablanca Finance City (CFC) & Prime Commercial Real Estate',
    keyAssetTypes: ['Tours & Bureaux Institutionnels', 'Immeubles de Rendement', 'Programmes Résidentiels Premium'],
    strategicPoints: ['1ère place financière africaine', 'Hub boursier et bancaire', 'Aéroport International Mohammed V']
  },
  {
    id: 'el-jadida',
    name: 'El Jadida / Mazagan',
    nameAr: 'الجديدة / مازاغان',
    nameEn: 'El Jadida / Mazagan',
    region: 'Casablanca-Settat',
    regionAr: 'الدار البيضاء - سطات',
    regionEn: 'Casablanca-Settat',
    x: 270,
    y: 108,
    highlight: 'Mazagan Beach Resort & Pôle Industriel Jorf Lasfar',
    highlightAr: 'منتجع مازاغان السياحي ومركب الجرف الأصفر',
    highlightEn: 'Mazagan Beach Resort & Industrial Megahub',
    keyAssetTypes: ['Promotion Résidentielle', 'Resorts Touristiques', 'Parcs d\'Activités'],
    strategicPoints: ['1ère zone industrielle de fertilisants au monde', 'Liaison autoroutière directe']
  },
  {
    id: 'fes',
    name: 'Fès & Meknès',
    nameAr: 'فاس ومكناس',
    nameEn: 'Fez & Meknes',
    region: 'Fès-Meknès',
    regionAr: 'فاس - مكناس',
    regionEn: 'Fez-Meknes',
    x: 360,
    y: 104,
    highlight: 'Patrimoine Impérial, Riads Classés & Domaines Agricoles du Saïss',
    highlightAr: 'التراث الإمبراطوري، الرياضات التاريخية والضيعات الفلاحية',
    highlightEn: 'Imperial Heritage, Historic Riads & Saiss Agro-Estates',
    keyAssetTypes: ['Riads & Demeures Historiques', 'Domaines Agricoles (VNA)', 'Hôtellerie Culturelle'],
    strategicPoints: ['Patrimoine Mondial UNESCO', 'Pôle Agro-industriel National']
  },
  {
    id: 'marrakech',
    name: 'Marrakech',
    nameAr: 'مراكش',
    nameEn: 'Marrakech',
    region: 'Marrakech-Safi',
    regionAr: 'مراكش - آسفي',
    regionEn: 'Marrakech-Safi',
    x: 284,
    y: 191,
    highlight: 'La Palmeraie, Hivernage & Resorts Hôteliers Internationaux',
    highlightAr: 'النخيل، الحي الشتوي والمنتجعات الفندقية العالمية',
    highlightEn: 'The Palmeraie, Luxury Villas & 5-Star Hospitality Resorts',
    keyAssetTypes: ['Villas Privées d\'Architecte', 'Palais & Riads Médina', 'Resorts Hôteliers 5*', 'Promotion & Co-Développement'],
    strategicPoints: ['Capitale touristique internationale', 'Rendements locatifs premium (10%+)', 'Aéroport Marrakech Menara']
  },
  {
    id: 'essaouira',
    name: 'Essaouira',
    nameAr: 'الصويرة',
    nameEn: 'Essaouira',
    region: 'Marrakech-Safi',
    regionAr: 'مراكش - آسفي',
    regionEn: 'Marrakech-Safi',
    x: 240,
    y: 170,
    highlight: 'Mogador Golf Resort & Éco-Lodges Côtier',
    highlightAr: 'منتجع موغادور وإيكو لودج الساحلي',
    highlightEn: 'Mogador Golf Resort & Coastal Eco-Villas',
    keyAssetTypes: ['Villas Vue Mer', 'Éco-Resorts Touristiques', 'Maisons d\'Hôtes Arganeraie'],
    strategicPoints: ['Destination culturelle et surf réputée', 'Attractivité européenne continue']
  },
  {
    id: 'agadir',
    name: 'Agadir / Taghazout',
    nameAr: 'أكادير / تغازوت',
    nameEn: 'Agadir / Taghazout Bay',
    region: 'Souss-Massa',
    regionAr: 'سوس - ماسة',
    regionEn: 'Souss-Massa',
    x: 242,
    y: 215,
    highlight: 'Taghazout Bay Resort & 300 Jours d\'Ensoleillement Annuel',
    highlightAr: 'خليج تغازوت البيئي و300 يوم شمس في السنة',
    highlightEn: 'Taghazout Bay Eco-Resort & Year-Round Sunshine',
    keyAssetTypes: ['Hôtels & Resorts Front de Mer', 'Résidences Touristiques', 'Programmes Hôteliers'],
    strategicPoints: ['Station balnéaire n°1', 'Plan d\'accélération industrielle du Souss', 'Golfs internationaux']
  },
  {
    id: 'ouarzazate',
    name: 'Ouarzazate / Drâa',
    nameAr: 'ورزازات / درعة',
    nameEn: 'Ouarzazate / Draa',
    region: 'Drâa-Tafilalet',
    regionAr: 'درعة - تافيلالت',
    regionEn: 'Draa-Tafilalet',
    x: 318,
    y: 218,
    highlight: 'Studios Cinéma Internationaux & Complexe Solaire Noor',
    highlightAr: 'استوديوهات السينما العالمية والمركب الشمسي نور',
    highlightEn: 'World Cinema Studios & Noor Solar Megaproject',
    keyAssetTypes: ['Lodges Éco-Désert', 'Kasbahs Rénovées', 'Complexes Touristiques'],
    strategicPoints: ['Moyenne de tournage de blockbusters mondiaux', 'Hub d\'énergie renouvelable']
  },
  {
    id: 'layoune',
    name: 'Laâyoune',
    nameAr: 'العيون',
    nameEn: 'Laayoune',
    region: 'Laâyoune-Sakia El Hamra',
    regionAr: 'العيون - الساقية الحمراء',
    regionEn: 'Laayoune-Sakia El Hamra',
    x: 138,
    y: 335,
    highlight: 'Pôle Énergies Vertes, Port de Pêche & Voie Express Tiznit-Dakhla',
    highlightAr: 'قطب الطاقات المتجددة، الميناء والطريق السريع تيزنيت - الداخلة',
    highlightEn: 'Green Hydrogen Hub, Port Logistics & Trans-Sahara Highway',
    keyAssetTypes: ['Parcs Industriels & Logistiques', 'Promotion Urbaine', 'Immobilier Tertiaire'],
    strategicPoints: ['Voie Express 1055 km achevée', 'Parcs éoliens majeurs', 'Consulats internationaux']
  },
  {
    id: 'dakhla',
    name: 'Dakhla',
    nameAr: 'الداخلة',
    nameEn: 'Dakhla',
    region: 'Dakhla-Oued Ed-Dahab',
    regionAr: 'الداخلة - وادي الذهب',
    regionEn: 'Dakhla-Oued Ed-Dahab',
    x: 65,
    y: 450,
    highlight: 'Lagune Mondiale de Kitesurf & Futur Port Dakhla Atlantique',
    highlightAr: 'الخليج العالمي لرياضة الشراع، والميناء الأطلسي المستقبلي للداخلة',
    highlightEn: 'World Kitesurfing Lagoon & Megaproject Dakhla Atlantic Port',
    keyAssetTypes: ['Éco-Resorts de Luxe', 'Hôtellerie Sportive & Bien-Être', 'Hub Logistique & Maritime'],
    strategicPoints: ['Nouveau Port Atlantique (12 Mds MAD)', 'Pôle mondial d\'hydrogène vert', 'Consulats généraux']
  },
  {
    id: 'lagouira',
    name: 'Lagouira & Aousserd',
    nameAr: 'لكويرة وأوسرد',
    nameEn: 'Lagouira & Aousserd',
    region: 'Dakhla-Oued Ed-Dahab',
    regionAr: 'الداخلة - وادي الذهب',
    regionEn: 'Dakhla-Oued Ed-Dahab',
    x: 38,
    y: 580,
    highlight: 'Pointe Sud du Royaume, Cap Blanc & Pôle Écotouristique Atlantique',
    highlightAr: 'الطرف الجنوبي للمملكة، الرأس الأبيض والواجهة الأطلسية',
    highlightEn: 'Southernmost Tip of the Kingdom, Cap Blanc & Atlantic Gateway',
    keyAssetTypes: ['Projets de Développement', 'Programmes Touristiques Sahariens', 'Infrastructures Maritimes'],
    strategicPoints: ['Bordure maritime Atlantique stratégique', 'Porte d\'Afrique Subsaharienne']
  }
];

export const MoroccoInteractiveMap: React.FC = () => {
  const { opportunities, setSearchFilter, setActiveTab, setSelectedOpportunity, lang, formatPrice } = useApp();
  const [selectedHub, setSelectedHub] = useState<CityHub>(MOROCCO_HUBS[5]); // default Marrakech
  const [hoveredHub, setHoveredHub] = useState<CityHub | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const hubOpportunities = opportunities.filter(opp => {
    const hubNameMain = selectedHub.name.split('/')[0].split('&')[0].trim().toLowerCase();
    const city = opp.city.toLowerCase();
    const reg = opp.region.toLowerCase();
    return city.includes(hubNameMain) || reg.includes(selectedHub.region.toLowerCase());
  });

  const handleSelectHub = (hub: CityHub) => {
    setSelectedHub(hub);
  };

  const handleFilterCity = (hub: CityHub) => {
    const mainCity = hub.name.split('/')[0].split('&')[0].trim();
    setSearchFilter(prev => ({
      ...prev,
      city: mainCity,
    }));
    setActiveTab('opportunities');
  };

  return (
    <div className="bg-[#121316] border border-[#26282d] rounded-2xl p-6 lg:p-10 gold-glow">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[#26282d] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171920] rounded-full border border-[#c5a059]/40 text-xs font-semibold text-[#f5dfa5] uppercase mb-2">
            <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>
              {lang === 'ar' ? 'المملكة المغربية الشريفة · من طنجة إلى لكويرة' : (lang === 'en' ? 'Kingdom of Morocco · From Tangier to Lagouira' : 'Royaume du Maroc · De Tanger à Lagouira')}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif-luxury text-white">
            {lang === 'ar' ? 'خريطة الاستثمار العقاري بالمغرب' : (lang === 'en' ? 'Morocco National Investment Map' : 'Carte Territoriale des Pôles d\'Investissement')}
          </h2>
          <p className="text-sm text-neutral-400 mt-1 max-w-xl">
            {lang === 'ar' 
              ? 'تغطية شاملة لكافة الأقاليم الـ 12 للمملكة المغربية مع رصد دقيق للأصول والمشاريع المتاحة.'
              : (lang === 'en' 
                ? 'Full unified national coverage across all 12 regions with curated off-market assets and strategic land.'
                : 'Couverture nationale intégrale et unifiée sur les 12 régions du Royaume avec sélection d\'actifs d\'exception.')}
          </p>
        </div>

        {/* Selected Hub Summary Pill */}
        <div className="flex items-center gap-3 bg-[#181a1f] px-4 py-3 rounded-xl border border-[#2f3239] shrink-0">
          <MapPin className="w-5 h-5 text-[#c5a059] shrink-0" />
          <div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">
              {lang === 'ar' ? 'القطب المختار' : (lang === 'en' ? 'Active Hub' : 'Pôle Actif')}
            </div>
            <div className="text-sm font-semibold text-white">
              {lang === 'ar' ? selectedHub.nameAr : (lang === 'en' ? selectedHub.nameEn : selectedHub.name)}
              <span className="text-[#c5a059] ml-2 text-xs">({hubOpportunities.length} {lang === 'ar' ? 'فرصة' : 'actifs'})</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Authentic & Detailed Interactive SVG Map of Unified Morocco */}
        <div className="lg:col-span-6 relative bg-[#0b0c0e] rounded-2xl p-5 border border-[#22242a] flex flex-col items-center justify-between min-h-[560px] overflow-hidden">
          {/* Top metadata tags */}
          <div className="w-full flex items-center justify-between z-10 text-[11px] text-neutral-400 font-mono mb-2">
            <span className="flex items-center gap-1.5 text-[#c5a059]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ROYAUME DU MAROC</span>
            </span>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-[#15171d] border border-[#282a32] rounded-lg p-1">
              <button 
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.4))}
                aria-label="Zoom in"
                className="p-1 hover:text-white text-neutral-400 transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.85))}
                aria-label="Zoom out"
                className="p-1 hover:text-white text-neutral-400 transition-colors"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setZoomLevel(1)}
                aria-label="Reset zoom"
                className="p-1 hover:text-white text-neutral-400 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full max-w-[440px] aspect-[500/620] flex items-center justify-center">
            <svg 
              viewBox="0 0 500 620" 
              className="w-full h-full select-none drop-shadow-2xl transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Metallic Gold Gradient for Land */}
                <linearGradient id="moroccoLandGradient" x1="150" y1="50" x2="350" y2="580" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#1e2026" />
                  <stop offset="35%" stopColor="#181a20" />
                  <stop offset="70%" stopColor="#14151b" />
                  <stop offset="100%" stopColor="#111216" />
                </linearGradient>

                <linearGradient id="goldBorderGradient" x1="0" y1="0" x2="500" y2="620" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#d4af37" />
                  <stop offset="50%" stopColor="#c5a059" />
                  <stop offset="100%" stopColor="#8d6f30" />
                </linearGradient>

                <pattern id="dotPattern" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.6" fill="#323642" opacity="0.3" />
                </pattern>
              </defs>

              {/* Ocean Subtle Wave Grid */}
              <rect width="500" height="620" fill="url(#dotPattern)" opacity="0.5" />

              {/* Geographic Ocean Labels */}
              <text x="75" y="140" fill="#444a57" fontSize="10" fontWeight="600" letterSpacing="3" className="font-mono uppercase opacity-70">
                OCÉAN ATLANTIQUE
              </text>
              <text x="365" y="22" fill="#444a57" fontSize="9" fontWeight="600" letterSpacing="2" className="font-mono uppercase opacity-70">
                MER MÉDITERRANÉE
              </text>
              <text x="60" y="520" fill="#3a3f4b" fontSize="8" fontWeight="600" letterSpacing="2" className="font-mono uppercase opacity-60">
                CÔTE SAHARIENNE
              </text>

              {/* Accurate & Complete Unified Outline of Morocco (Tangier to Lagouira) */}
              <path 
                d={`
                  M 340 38
                  C 345 36, 350 35, 356 42
                  C 368 45, 380 50, 395 55
                  C 408 58, 420 58, 430 60
                  C 438 62, 444 65, 446 72
                  C 448 85, 444 110, 444 125
                  C 444 140, 458 155, 465 170
                  C 468 178, 462 188, 452 190
                  C 435 194, 410 196, 390 205
                  C 375 212, 360 230, 345 255
                  C 330 260, 300 262, 280 264
                  C 260 280, 248 300, 238 312
                  C 245 320, 255 328, 266 336
                  C 250 350, 210 375, 178 398
                  L 178 570
                  L 48 570
                  C 42 575, 38 580, 38 586
                  C 36 580, 40 565, 44 550
                  C 48 530, 52 515, 56 490
                  C 60 470, 64 455, 68 440
                  C 72 425, 78 400, 85 385
                  C 92 370, 110 348, 128 330
                  C 138 320, 146 305, 154 290
                  C 170 278, 192 268, 208 258
                  C 222 250, 230 240, 234 230
                  C 238 222, 240 216, 242 208
                  C 238 198, 238 185, 240 166
                  C 244 150, 250 138, 254 130
                  C 260 118, 268 108, 274 102
                  C 285 92, 292 88, 302 82
                  C 310 76, 318 68, 324 58
                  C 328 50, 334 44, 340 38
                  Z
                `}
                fill="url(#moroccoLandGradient)" 
                stroke="url(#goldBorderGradient)" 
                strokeWidth="1.6"
                strokeLinejoin="round"
                className="filter drop-shadow-lg"
              />

              {/* Atlas Mountains Ridge (Stylized Topographic Accents) */}
              <path 
                d="M 270 195 Q 315 160 375 110" 
                stroke="#4a422f" 
                strokeWidth="2.5" 
                strokeDasharray="2 3"
                opacity="0.45"
              />
              <path 
                d="M 245 220 Q 285 225 335 210" 
                stroke="#3f3b30" 
                strokeWidth="2" 
                strokeDasharray="2 3"
                opacity="0.35"
              />

              {/* Atlantic & Mediterranean Coastline Highlight Glow */}
              <path 
                d="M 340 38 L 356 42 L 395 55 L 446 72" 
                stroke="#c5a059" 
                strokeWidth="1.2" 
                opacity="0.7"
              />
              <path 
                d="M 340 38 C 328 50, 310 76, 298 84 C 274 102, 254 130, 240 166 C 242 208, 234 230, 208 258 C 154 290, 128 330, 85 385 C 68 440, 56 490, 44 550 C 40 565, 38 586, 38 586" 
                stroke="#c5a059" 
                strokeWidth="1.4" 
                opacity="0.75"
              />

              {/* Compass Rose in Corner */}
              <g transform="translate(440, 550)" className="opacity-80">
                <circle cx="0" cy="0" r="16" stroke="#2d3039" strokeWidth="1" fill="#111317" />
                <path d="M 0 -13 L 3 0 L 0 3 L -3 0 Z" fill="#c5a059" />
                <path d="M 0 13 L 2 0 L 0 -2 L -2 0 Z" fill="#555a68" />
                <text x="0" y="-16" textAnchor="middle" fill="#c5a059" fontSize="8" fontWeight="bold" fontFamily="sans-serif">N</text>
              </g>

              {/* Interactive City Hub Pins */}
              {MOROCCO_HUBS.map(hub => {
                const isSelected = selectedHub.id === hub.id;
                const isHovered = hoveredHub?.id === hub.id;
                const oppCount = opportunities.filter(o => {
                  const hubMain = hub.name.split('/')[0].split('&')[0].trim().toLowerCase();
                  return o.city.toLowerCase().includes(hubMain) || o.region.toLowerCase().includes(hub.region.toLowerCase());
                }).length;

                return (
                  <g 
                    key={hub.id} 
                    className="cursor-pointer transition-all duration-200 group"
                    onClick={() => handleSelectHub(hub)}
                    onMouseEnter={() => setHoveredHub(hub)}
                    onMouseLeave={() => setHoveredHub(null)}
                  >
                    {/* Glowing halo for selected or hovered pin */}
                    {(isSelected || isHovered) && (
                      <circle 
                        cx={hub.x} 
                        cy={hub.y} 
                        r="14" 
                        fill="none" 
                        stroke="#c5a059" 
                        strokeWidth="1.2"
                        className="animate-ping opacity-50 origin-center"
                      />
                    )}

                    {/* Outer ring */}
                    <circle 
                      cx={hub.x} 
                      cy={hub.y} 
                      r={isSelected ? "7" : (isHovered ? "6" : "4.5")} 
                      fill={isSelected ? "#c5a059" : (oppCount > 0 ? "#1e2129" : "#17181f")} 
                      stroke={isSelected ? "#ffffff" : (oppCount > 0 ? "#c5a059" : "#606575")}
                      strokeWidth={isSelected ? "2" : "1.2"}
                      className="transition-all duration-200 shadow-xl"
                    />

                    {/* Inner core */}
                    <circle 
                      cx={hub.x} 
                      cy={hub.y} 
                      r={isSelected ? "3" : "2"} 
                      fill={isSelected ? "#000000" : (oppCount > 0 ? "#c5a059" : "#a1a7b4")} 
                    />

                    {/* Text Label */}
                    <text 
                      x={hub.x + 9} 
                      y={hub.y + 3.5} 
                      fill={isSelected ? "#f5dfa5" : (isHovered ? "#ffffff" : (oppCount > 0 ? "#e2ddcf" : "#8e94a0"))} 
                      fontSize={isSelected ? "11.5" : "10"} 
                      fontWeight={isSelected ? "700" : (oppCount > 0 ? "600" : "400")}
                      className="transition-colors group-hover:fill-white font-sans pointer-events-none drop-shadow"
                    >
                      {lang === 'ar' ? hub.nameAr.split('/')[0].split('&')[0] : hub.name.split('/')[0].split('&')[0]}
                      {oppCount > 0 && ` (${oppCount})`}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Hub Navigation Pills */}
          <div className="w-full mt-4 pt-3 border-t border-[#1d1f27]">
            <div className="flex flex-wrap gap-1.5 justify-center">
              {MOROCCO_HUBS.map(hub => {
                const isSelected = selectedHub.id === hub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => handleSelectHub(hub)}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${
                      isSelected 
                        ? 'bg-[#c5a059] text-black font-bold border-[#c5a059] shadow-sm' 
                        : 'bg-[#14161c] text-neutral-300 border-[#262831] hover:border-[#c5a059]/40 hover:text-white'
                    }`}
                  >
                    {lang === 'ar' ? hub.nameAr.split('/')[0].split('&')[0] : hub.name.split('/')[0].split('&')[0]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Hub Details, Assets and Direct Filter */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Region badge */}
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171922] rounded-full border border-[#2d313d] text-xs text-[#c5a059] font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{lang === 'ar' ? selectedHub.regionAr : (lang === 'en' ? selectedHub.regionEn : selectedHub.region)}</span>
              </div>
              <span className="text-xs text-neutral-400 font-mono">
                {hubOpportunities.length} {lang === 'ar' ? 'أصل مؤهل' : 'actifs disponibles'}
              </span>
            </div>

            {/* City Title */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white">
                {lang === 'ar' ? selectedHub.nameAr : (lang === 'en' ? selectedHub.nameEn : selectedHub.name)}
              </h3>
              <p className="text-xs sm:text-sm text-[#f5dfa5] font-medium mt-1">
                {lang === 'ar' ? selectedHub.highlightAr : (lang === 'en' ? selectedHub.highlightEn : selectedHub.highlight)}
              </p>
            </div>

            {/* Strategic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {selectedHub.strategicPoints.map((point, idx) => (
                <div key={idx} className="p-2.5 bg-[#161820] rounded-xl border border-[#252833] text-[11px] text-neutral-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Asset typology tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {selectedHub.keyAssetTypes.map((type, idx) => (
                <span key={idx} className="text-xs bg-[#171922] text-neutral-300 px-3 py-1.5 rounded-lg border border-[#292c36]">
                  {type}
                </span>
              ))}
            </div>

            {/* Active Opportunities in this Hub */}
            <div className="space-y-3 pt-3">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                <span>{lang === 'ar' ? 'الفرص المتوفرة حالياً بالمنطقة :' : 'Opportunités disponibles dans ce pôle :'}</span>
                <span className="text-[#c5a059] font-mono text-[11px]">{hubOpportunities.length} répertoriée(s)</span>
              </div>

              {hubOpportunities.length === 0 ? (
                <div className="p-5 bg-[#14161d] rounded-xl border border-[#262833] text-center space-y-2">
                  <p className="text-xs text-neutral-300">
                    {lang === 'ar'
                      ? 'يتم حالياً تدقيق ملفات استثمارية جديدة في هذا القطب. فريقنا مستعد لتنفيذ تفويض بحث حصري لمعاييركم.'
                      : 'De nouveaux actifs et dossiers fonciers sont actuellement sous audit confidentiel dans ce pôle.'}
                  </p>
                  <button
                    onClick={() => setActiveTab('acquire')}
                    className="text-xs text-[#c5a059] hover:underline font-semibold"
                  >
                    Déposer un mandat de recherche personnalisé →
                  </button>
                </div>
              ) : (
                hubOpportunities.slice(0, 3).map(opp => (
                  <div 
                    key={opp.id}
                    onClick={() => setSelectedOpportunity(opp)}
                    className="p-3.5 bg-[#15171f] hover:bg-[#1c1e28] border border-[#262833] hover:border-[#c5a059]/40 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-4 group"
                  >
                    <div className="min-w-0">
                      <div className="text-[11px] text-[#c5a059] font-semibold">{opp.subTypeLabel} · {opp.city}</div>
                      <div className="text-sm font-semibold text-white truncate group-hover:text-[#f4dfa5] transition-colors">
                        {opp.title}
                      </div>
                      <div className="text-xs text-neutral-400 font-mono mt-0.5">
                        {opp.surfaceM2.toLocaleString('fr-FR')} m² · <span className="text-white font-medium">{formatPrice(opp.priceMAD, opp.priceDisplay, opp.priceMaxMAD)}</span>
                      </div>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOpportunity(opp);
                      }}
                      className="px-3.5 py-2 bg-[#20222b] group-hover:bg-[#c5a059] text-neutral-200 group-hover:text-black rounded-lg text-xs font-bold whitespace-nowrap transition-all shrink-0"
                    >
                      Dossier
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#23252d] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => handleFilterCity(selectedHub)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-[#c5a059]/20"
            >
              <span>Voir tout à {selectedHub.name.split('/')[0].split('&')[0]} ({hubOpportunities.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('acquire')}
              className="text-xs text-neutral-400 hover:text-white underline transition-colors"
            >
              Confier une recherche sur-mesure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
