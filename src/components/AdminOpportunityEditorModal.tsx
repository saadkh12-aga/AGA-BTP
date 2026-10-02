import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Opportunity, OpportunityCategory, PropertySubType } from '../types';
import { X, Save, Image, ShieldCheck, Lock, Sparkles, AlertCircle, Check } from 'lucide-react';

interface AdminOpportunityEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunityToEdit?: Opportunity | null;
}

const STOCK_IMAGES = [
  { label: 'Architecture Prestige & Riads', url: '/src/assets/images/hero_morocco_luxury_architecture_1790689581342.jpg' },
  { label: 'Villa Palmeraie Marrakech', url: '/src/assets/images/villa_palmeraie_marrakech_1790689596187.jpg' },
  { label: 'Tour CFC & Affaires Casablanca', url: '/src/assets/images/casablanca_finance_city_tower_1790689611498.jpg' },
  { label: 'Resort Côtier & Hôtellerie Agadir/Taghazout', url: '/src/assets/images/resort_hotel_agadir_coast_1790689622395.jpg' },
  { label: 'Foncier & Littoral Tanger/Nord', url: '/src/assets/images/prime_land_tangier_coast_1790689635157.jpg' },
];

export const AdminOpportunityEditorModal: React.FC<AdminOpportunityEditorModalProps> = ({
  isOpen,
  onClose,
  opportunityToEdit
}) => {
  const { addOpportunity, updateOpportunity } = useApp();

  const isEditing = !!opportunityToEdit;

  // Form states
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [category, setCategory] = useState<OpportunityCategory>('property');
  const [subType, setSubType] = useState<PropertySubType>('villa');
  const [subTypeLabel, setSubTypeLabel] = useState('');
  const [city, setCity] = useState('Marrakech');
  const [region, setRegion] = useState('Marrakech-Safi');
  const [zone, setZone] = useState('');
  const [priceMAD, setPriceMAD] = useState<number>(25000000);
  const [priceDisplay, setPriceDisplay] = useState<'fixed' | 'on_request' | 'confidential' | 'range'>('fixed');
  const [priceMaxMAD, setPriceMaxMAD] = useState<number | undefined>(undefined);
  const [surfaceM2, setSurfaceM2] = useState<number>(1500);
  const [builtSurfaceM2, setBuiltSurfaceM2] = useState<number | undefined>(650);
  const [rooms, setRooms] = useState<number | undefined>(6);
  const [legalStatus, setLegalStatus] = useState('Titre Foncier Définitif');
  const [status, setStatus] = useState<Opportunity['status']>('Disponible');
  const [isConfidential, setIsConfidential] = useState(false);
  const [featured, setFeatured] = useState(true);
  const [mainImage, setMainImage] = useState(STOCK_IMAGES[0].url);
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [investmentPotential, setInvestmentPotential] = useState('');
  const [roiEstimated, setRoiEstimated] = useState('9.5% net');

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (opportunityToEdit) {
      setTitle(opportunityToEdit.title || '');
      setTitleEn(opportunityToEdit.titleEn || opportunityToEdit.title || '');
      setTitleAr(opportunityToEdit.titleAr || opportunityToEdit.title || '');
      setCategory(opportunityToEdit.category || 'property');
      setSubType(opportunityToEdit.subType || 'villa');
      setSubTypeLabel(opportunityToEdit.subTypeLabel || '');
      setCity(opportunityToEdit.city || 'Marrakech');
      setRegion(opportunityToEdit.region || 'Marrakech-Safi');
      setZone(opportunityToEdit.zone || '');
      setPriceMAD(opportunityToEdit.priceMAD || 0);
      setPriceDisplay(opportunityToEdit.priceDisplay || 'fixed');
      setPriceMaxMAD(opportunityToEdit.priceMaxMAD);
      setSurfaceM2(opportunityToEdit.surfaceM2 || 0);
      setBuiltSurfaceM2(opportunityToEdit.builtSurfaceM2);
      setRooms(opportunityToEdit.rooms);
      setLegalStatus(opportunityToEdit.legalStatus || 'Titre Foncier');
      setStatus(opportunityToEdit.status || 'Disponible');
      setIsConfidential(opportunityToEdit.isConfidential || false);
      setFeatured(opportunityToEdit.featured ?? true);
      setMainImage(opportunityToEdit.mainImage || STOCK_IMAGES[0].url);
      setShortDescription(opportunityToEdit.shortDescription || '');
      setFullDescription(opportunityToEdit.fullDescription || '');
      setInvestmentPotential(opportunityToEdit.investmentPotential || '');
      setRoiEstimated(opportunityToEdit.roiEstimated || '');
    } else {
      // Default empty form
      setTitle('');
      setTitleEn('');
      setTitleAr('');
      setCategory('property');
      setSubType('villa');
      setSubTypeLabel('Villa de Prestige');
      setCity('Marrakech');
      setRegion('Marrakech-Safi');
      setZone('Palmeraie');
      setPriceMAD(25000000);
      setPriceDisplay('fixed');
      setPriceMaxMAD(undefined);
      setSurfaceM2(1200);
      setBuiltSurfaceM2(550);
      setRooms(5);
      setLegalStatus('Titre Foncier Définitif');
      setStatus('Disponible');
      setIsConfidential(false);
      setFeatured(true);
      setMainImage(STOCK_IMAGES[1].url);
      setShortDescription('Propriété d’exception idéalement située avec finitions haut de gamme.');
      setFullDescription('Dossier technique, situation cadastrale et état des lieux certifiés disponibles pour tout acquéreur qualifié.');
      setInvestmentPotential('Excellente valeur patrimoniale et forte rentabilité locative saisonnière.');
      setRoiEstimated('10.2% net');
    }
  }, [opportunityToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setNotification({ type: 'error', message: 'Veuillez saisir un titre valide.' });
      return;
    }

    const payload: Opportunity = {
      id: isEditing && opportunityToEdit ? opportunityToEdit.id : `opp-${Date.now()}`,
      title: title.trim(),
      titleEn: titleEn.trim() || title.trim(),
      titleAr: titleAr.trim() || title.trim(),
      slug: title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      subType,
      subTypeLabel: subTypeLabel.trim() || subType.toUpperCase(),
      city: city.trim(),
      region: region.trim(),
      zone: zone.trim() || undefined,
      priceMAD: Number(priceMAD) || 0,
      priceDisplay,
      priceMaxMAD: priceMaxMAD ? Number(priceMaxMAD) : undefined,
      surfaceM2: Number(surfaceM2) || 0,
      builtSurfaceM2: builtSurfaceM2 ? Number(builtSurfaceM2) : undefined,
      rooms: rooms ? Number(rooms) : undefined,
      legalStatus: legalStatus.trim() || 'Titre Foncier Définitif',
      status,
      isConfidential,
      featured,
      mainImage: mainImage.trim() || STOCK_IMAGES[0].url,
      gallery: [mainImage.trim() || STOCK_IMAGES[0].url],
      shortDescription: shortDescription.trim() || 'Actif d’exception sélectionné par AGA Projects.',
      shortDescriptionEn: titleEn.trim() || shortDescription.trim(),
      shortDescriptionAr: titleAr.trim() || shortDescription.trim(),
      fullDescription: fullDescription.trim() || 'Dossier complet communicable sous accord de confidentialité.',
      investmentPotential: investmentPotential.trim() || 'Fort potentiel de valorisation patrimoniale.',
      roiEstimated: roiEstimated.trim() || undefined,
      confidentialTeaser: isConfidential ? {
        region,
        type: subTypeLabel || category,
        approxSurface: `${surfaceM2} m²`,
        approxBudget: `${priceMAD.toLocaleString('fr-FR')} MAD`,
        investmentType: status
      } : undefined,
      documentsAvailable: [
        { title: 'Note d’Opportunité & Synthèse Fiscale', type: 'PDF', isConfidential: false },
        { title: 'Audit Juridique & Titre Foncier (Sous NDA)', type: 'PDF', isConfidential: true },
        { title: 'Modèle Financier & Historique d’Exploitation (Sous NDA)', type: 'PDF', isConfidential: true }
      ],
      publishedAt: isEditing && opportunityToEdit?.publishedAt ? opportunityToEdit.publishedAt : new Date().toISOString().split('T')[0]
    };

    if (isEditing && opportunityToEdit) {
      updateOpportunity(opportunityToEdit.id, payload);
      setNotification({ type: 'success', message: 'Publication modifiée avec succès.' });
    } else {
      addOpportunity(payload);
      setNotification({ type: 'success', message: 'Nouvelle publication enregistrée avec succès.' });
    }

    setTimeout(() => {
      setNotification(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-[#111317] border border-[#2e313c] rounded-2xl w-full max-w-4xl shadow-2xl gold-glow max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#252833] flex items-center justify-between bg-[#15171f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-[#c5a059] font-mono font-bold">
                CONSOLE ADMINISTRATEUR AGA
              </div>
              <h2 className="text-xl font-serif-luxury font-bold text-white">
                {isEditing ? `Modifier la Publication : ${opportunityToEdit?.title}` : 'Créer une Nouvelle Publication'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg transition-colors hover:bg-[#20232d]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className={`mx-6 mt-4 p-3 rounded-xl flex items-center gap-2 text-xs font-semibold ${
            notification.type === 'success' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
          }`}>
            {notification.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section 1: Titres & Langues */}
          <div className="space-y-4 bg-[#161821] p-5 rounded-xl border border-[#272a36]">
            <div className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
              1. Titres & Dénominations de la Publication
            </div>

            <div>
              <label className="block text-xs text-neutral-300 font-medium mb-1">
                Titre Principal (Français) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Villa Contemporaine Palmeraie - Marrakech"
                className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 font-medium mb-1">
                  Titre en Anglais (Optionnel)
                </label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="Ex: Contemporary Luxury Villa - Marrakech Palmeraie"
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 font-medium mb-1">
                  Titre en Arabe (Optionnel)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  placeholder="مثال: فيلا عصرية فاخرة - النخيل مراكش"
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Catégorie, Typologie & Localisation */}
          <div className="space-y-4 bg-[#161821] p-5 rounded-xl border border-[#272a36]">
            <div className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
              2. Typologie & Implantation Géographique au Maroc
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Catégorie d'Actif *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as OpportunityCategory)}
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="property">Bien Immobilier de Prestige</option>
                  <option value="hotel">Hôtellerie, Riad & Tourisme</option>
                  <option value="land">Terrain & Réserve Foncière</option>
                  <option value="project">Projet de Développement & Co-Investissement</option>
                  <option value="confidential">Opportunité Off-Market Confidentielle</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Sous-Type Spécifique *</label>
                <select
                  value={subType}
                  onChange={(e) => setSubType(e.target.value as PropertySubType)}
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="villa">Villa de Luxe / Palais</option>
                  <option value="hotel_operating">Hôtel en Exploitation</option>
                  <option value="hotel_renovation">Hôtel à Rénover / Repositionner</option>
                  <option value="hotel_project">Projet Hôtelier Clé en Main</option>
                  <option value="resort">Resort Balnéaire</option>
                  <option value="building">Immeuble de Rapport / Rendement</option>
                  <option value="office">Bureaux / Siège Tertiaire (CFC)</option>
                  <option value="land_tourist">Terrain à Vocation Touristique</option>
                  <option value="land_residential">Foncier Résidentiel & Lotissement</option>
                  <option value="land_commercial">Terrain Commercial</option>
                  <option value="land_industrial">Terrain Industriel / Logistique</option>
                  <option value="land_agricultural">Domaine Agricole</option>
                  <option value="mixed_use">Programme Mixte</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Libellé Badge</label>
                <input
                  type="text"
                  value={subTypeLabel}
                  onChange={(e) => setSubTypeLabel(e.target.value)}
                  placeholder="Ex: Villa d'Architecte"
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Ville *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Marrakech, Casablanca, Tanger, Dakhla..."
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Région Administrative *</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="Tanger-Tétouan-Al Hoceïma">Tanger-Tétouan-Al Hoceïma</option>
                  <option value="Casablanca-Settat">Casablanca-Settat</option>
                  <option value="Marrakech-Safi">Marrakech-Safi</option>
                  <option value="Rabat-Salé-Kénitra">Rabat-Salé-Kénitra</option>
                  <option value="Souss-Massa">Souss-Massa (Agadir)</option>
                  <option value="Dakhla-Oued Ed-Dahab">Dakhla-Oued Ed-Dahab</option>
                  <option value="Laâyoune-Sakia El Hamra">Laâyoune-Sakia El Hamra</option>
                  <option value="Fès-Meknès">Fès-Meknès</option>
                  <option value="L'Oriental">L'Oriental (Oujda / Saïdia)</option>
                  <option value="Béni Mellal-Khénifra">Béni Mellal-Khénifra</option>
                  <option value="Drâa-Tafilalet">Drâa-Tafilalet (Ouarzazate)</option>
                  <option value="Guelmim-Oued Noun">Guelmim-Oued Noun</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Zone / Quartier Précis</label>
                <input
                  type="text"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  placeholder="Palmeraie, CFC, Souissi, Tamuda Bay..."
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Prix, Surfaces & Statuts */}
          <div className="space-y-4 bg-[#161821] p-5 rounded-xl border border-[#272a36]">
            <div className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
              3. Conditions Financières, Surfaces & Statut Légal
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Prix en MAD *</label>
                <input
                  type="number"
                  required
                  value={priceMAD}
                  onChange={(e) => setPriceMAD(Number(e.target.value))}
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
                />
                <div className="text-[10px] text-neutral-400 mt-1 font-mono">
                  ~ {(priceMAD / 1000000).toFixed(2)} Millions MAD (~ {(priceMAD / 10.8 / 1000000).toFixed(2)} M€)
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Mode d'Affichage du Prix</label>
                <select
                  value={priceDisplay}
                  onChange={(e) => setPriceDisplay(e.target.value as any)}
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="fixed">Prix Fixe Affiché</option>
                  <option value="on_request">Prix sur Demande Qualifiée</option>
                  <option value="confidential">Strictement Confidentiel (Sous NDA)</option>
                  <option value="range">Fourchette de Négociation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Statut Commercial *</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="Disponible">Disponible</option>
                  <option value="Mandat Exclusif">Mandat Exclusif AGA</option>
                  <option value="Sous Offre">Sous Offre / En Négociation</option>
                  <option value="Projet en Développement">Projet en Développement</option>
                  <option value="Recherche Investisseur">Recherche d'Investisseurs</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Surface Totale (m²) *</label>
                <input
                  type="number"
                  required
                  value={surfaceM2}
                  onChange={(e) => setSurfaceM2(Number(e.target.value))}
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Surface Bâtie (m²)</label>
                <input
                  type="number"
                  value={builtSurfaceM2 || ''}
                  onChange={(e) => setBuiltSurfaceM2(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Optionnel"
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Chambres / Suites / Unités</label>
                <input
                  type="number"
                  value={rooms || ''}
                  onChange={(e) => setRooms(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Optionnel"
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Statut Juridique Foncier</label>
                <input
                  type="text"
                  value={legalStatus}
                  onChange={(e) => setLegalStatus(e.target.value)}
                  placeholder="Titre Foncier, VNA..."
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Visuel & Photothèque */}
          <div className="space-y-4 bg-[#161821] p-5 rounded-xl border border-[#272a36]">
            <div className="text-xs font-bold text-[#c5a059] uppercase tracking-wider flex items-center gap-2">
              <Image className="w-3.5 h-3.5" />
              <span>4. Photographie Principale & Visuels</span>
            </div>

            <div>
              <label className="block text-xs text-neutral-300 font-medium mb-1">
                URL de l'image principale
              </label>
              <input
                type="text"
                required
                value={mainImage}
                onChange={(e) => setMainImage(e.target.value)}
                placeholder="https://... ou chemin interne"
                className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3.5 py-2 text-xs text-white outline-none font-mono"
              />
            </div>

            {/* Quick stock selector */}
            <div>
              <div className="text-[11px] text-neutral-400 mb-2">
                Sélection rapide parmi les visuels professionnels enregistrés :
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {STOCK_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMainImage(img.url)}
                    className={`relative rounded-lg overflow-hidden border aspect-[16/10] text-left transition-all ${
                      mainImage === img.url ? 'border-[#c5a059] ring-2 ring-[#c5a059]' : 'border-[#2d303b] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 p-1 flex items-end">
                      <span className="text-[9px] text-white font-medium line-clamp-1">{img.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Descriptions & Rentabilité */}
          <div className="space-y-4 bg-[#161821] p-5 rounded-xl border border-[#272a36]">
            <div className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
              5. Argumentaire d'Investissement & Potentiel Financier
            </div>

            <div>
              <label className="block text-xs text-neutral-300 font-medium mb-1">Description Synthétique (Accroche)</label>
              <textarea
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Résumé des atouts clés pour les cartes et la vue catalogue..."
                className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl p-3 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-300 font-medium mb-1">Description Détaillée du Dossier</label>
              <textarea
                rows={3}
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="Spécifications techniques, situation urbaine, diagnostics, cadre légal..."
                className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl p-3 text-xs text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Potentiel d'Investissement & Thèse</label>
                <input
                  type="text"
                  value={investmentPotential}
                  onChange={(e) => setInvestmentPotential(e.target.value)}
                  placeholder="Ex: Taux d'occupation 82%, valorisation patrimoniale..."
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">Rendement Net Estimé (ROI / TRI)</label>
                <input
                  type="text"
                  value={roiEstimated}
                  onChange={(e) => setRoiEstimated(e.target.value)}
                  placeholder="Ex: 9.8% net annuel"
                  className="w-full bg-[#111317] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                />
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-2.5 p-3 bg-[#111317] rounded-xl border border-[#2b2e3a] flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isConfidential}
                  onChange={(e) => setIsConfidential(e.target.checked)}
                  className="w-4 h-4 rounded text-[#c5a059] bg-[#1a1d24] border-[#383b48]"
                />
                <div>
                  <span className="text-xs text-white font-semibold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Actif Off-Market Confidentiel (Sous NDA)</span>
                  </span>
                  <div className="text-[10px] text-neutral-400">
                    Masque l'adresse exacte et exige la signature du protocole d'agrément
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-2.5 p-3 bg-[#111317] rounded-xl border border-[#2b2e3a] flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#c5a059] bg-[#1a1d24] border-[#383b48]"
                />
                <div>
                  <span className="text-xs text-white font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Mettre en Avant (Sélection Prestige)</span>
                  </span>
                  <div className="text-[10px] text-neutral-400">
                    Affiche l'actif en priorité sur la page d'accueil
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Sticky Bottom Actions inside form */}
          <div className="pt-4 border-t border-[#272a36] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-[#181a22] hover:bg-[#222530] text-neutral-300 rounded-xl text-xs font-semibold transition-colors"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-7 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-xl hover:shadow-[#c5a059]/25 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Enregistrer les Modifications' : 'Publier l\'Opportunité'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
