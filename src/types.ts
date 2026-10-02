export type Language = 'fr' | 'en' | 'ar';
export type Currency = 'MAD' | 'EUR' | 'USD';

export type OpportunityCategory = 
  | 'property'       // Biens immobiliers
  | 'land'           // Terrains
  | 'project'        // Projets immobiliers
  | 'hotel'          // Projets hôteliers / Tourisme
  | 'confidential';  // Opportunités confidentielles

export type PropertySubType =
  | 'villa'
  | 'apartment'
  | 'building'
  | 'commercial'
  | 'office'
  | 'warehouse'
  | 'hotel_operating'
  | 'hotel_renovation'
  | 'hotel_project'
  | 'resort'
  | 'tourist_residence'
  | 'land_residential'
  | 'land_commercial'
  | 'land_tourist'
  | 'land_industrial'
  | 'land_agricultural'
  | 'mixed_use';

export interface Opportunity {
  id: string;
  title: string;
  titleEn: string;
  titleAr: string;
  slug: string;
  category: OpportunityCategory;
  subType: PropertySubType;
  subTypeLabel: string;
  city: string;
  region: string;
  zone?: string;
  priceMAD: number;
  priceDisplay: 'fixed' | 'on_request' | 'confidential' | 'range';
  priceMaxMAD?: number;
  surfaceM2: number;
  builtSurfaceM2?: number;
  rooms?: number;
  unitsCount?: number;
  legalStatus: string;
  status: 'Disponible' | 'Sous Offre' | 'Projet en Développement' | 'Recherche Investisseur' | 'Mandat Exclusif';
  isConfidential: boolean;
  featured: boolean;
  mainImage: string;
  gallery: string[];
  shortDescription: string;
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  fullDescription: string;
  investmentPotential: string;
  developmentNotes?: string;
  roiEstimated?: string;
  confidentialTeaser?: {
    region: string;
    type: string;
    approxSurface: string;
    approxBudget: string;
    investmentType: string;
  };
  documentsAvailable: {
    title: string;
    type: 'PDF' | 'CAD' | 'Brochure';
    isConfidential: boolean;
  }[];
  publishedAt: string;
}

export interface SearchFilterState {
  intention: 'all' | 'buy' | 'invest' | 'project' | 'hotel' | 'land';
  subType: string;
  city: string;
  region: string;
  minPrice: number | null;
  maxPrice: number | null;
  minSurface: number | null;
  maxSurface: number | null;
  searchKeyword: string;
}

export interface InvestorProfile {
  id: string;
  fullName: string;
  company?: string;
  country: string;
  phone: string;
  email: string;
  investmentType: string[]; // e.g. ['Acquisition directe', 'Co-investissement', 'Prise de participation']
  sectors: string[];        // e.g. ['Hôtellerie', 'Résidentiel', 'Foncier', 'Tertiaire']
  targetCities: string[];   // e.g. ['Marrakech', 'Casablanca', 'Agadir']
  budgetMinMAD: number;
  budgetMaxMAD: number;
  surfaceTargetM2?: number;
  horizon: 'Court terme (< 1 an)' | 'Moyen terme (1-3 ans)' | 'Long terme (> 3 ans)';
  projectDescription: string;
  createdAt: string;
}

export interface ProjectProposal {
  id: string;
  ownerName: string;
  company?: string;
  phone: string;
  email: string;
  city: string;
  projectType: string;
  surfaceM2: number;
  projectBudgetMAD: number;
  progressStage: 'Idée / Foncier identifié' | 'Étude de faisabilité' | 'Permis obtenu / En cours' | 'Travaux entamés' | 'Reprise d\'actif';
  needType: 'Financement total' | 'Co-investisseur' | 'Promoteur / Développeur' | 'Opérateur gestionnaire';
  investmentSoughtMAD: number;
  partnershipType: string;
  description: string;
  documentsAttached?: string[];
  status: 'Nouveau' | 'En revue' | 'En négociation' | 'Approuvé' | 'Archivé';
  createdAt: string;
}

export interface PropertySubmission {
  id: string;
  ownerName: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  propertyType: string;
  surfaceTotalM2: number;
  surfaceBuiltM2?: number;
  priceExpectedMAD: number;
  legalStatus: string;
  titleDeedNumber?: string;
  description: string;
  status: 'Nouveau' | 'Mandat en cours' | 'Publié' | 'Refusé';
  createdAt: string;
}

export interface AcquisitionBrief {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  categoryWanted: string;
  city: string;
  region: string;
  budgetMAD: number;
  surfaceM2: number;
  usageType: 'Usage personnel' | 'Investissement locatif' | 'Développement / Revente' | 'Exploitation touristique';
  targetHorizon: string;
  financingStatus: 'Fonds propres disponibles' | 'Crédit bancaire pré-accordé' | 'En cours de structuration';
  description: string;
  status: 'Nouveau' | 'En recherche' | 'Propositions envoyées' | 'Clôturé';
  createdAt: string;
}

export interface VisitRequest {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  clientName: string;
  phone: string;
  email: string;
  desiredDate: string;
  desiredTime: string;
  message?: string;
  status: 'En attente' | 'Confirmée' | 'Effectuée' | 'Annulée';
  createdAt: string;
}

export interface ConfidentialDossierRequest {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  clientName: string;
  company?: string;
  country: string;
  phone: string;
  email: string;
  profileType: 'Investisseur Privé' | 'Fonds / Institutionnel' | 'Promoteur' | 'Family Office' | 'Autre';
  reason: string;
  ndaAccepted: boolean;
  status: 'En attente' | 'Approuvé' | 'Refusé';
  createdAt: string;
}
