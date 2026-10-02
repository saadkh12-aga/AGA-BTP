import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  Currency, 
  Opportunity, 
  SearchFilterState, 
  InvestorProfile, 
  ProjectProposal, 
  PropertySubmission, 
  AcquisitionBrief, 
  VisitRequest, 
  ConfidentialDossierRequest 
} from '../types';
import { INITIAL_OPPORTUNITIES } from '../data/mockOpportunities';
import { TRANSLATIONS } from '../data/translations';

interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  t: typeof TRANSLATIONS['fr'];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchFilter: SearchFilterState;
  setSearchFilter: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  resetSearchFilter: () => void;
  opportunities: Opportunity[];
  setOpportunities: React.Dispatch<React.SetStateAction<Opportunity[]>>;
  selectedOpportunity: Opportunity | null;
  setSelectedOpportunity: (opp: Opportunity | null) => void;
  visitModalOpportunity: Opportunity | null;
  setVisitModalOpportunity: (opp: Opportunity | null) => void;
  dossierModalOpportunity: Opportunity | null;
  setDossierModalOpportunity: (opp: Opportunity | null) => void;
  savedOpportunities: string[];
  toggleSaveOpportunity: (id: string) => void;
  
  // Storage lists
  investorProfiles: InvestorProfile[];
  addInvestorProfile: (p: Omit<InvestorProfile, 'id' | 'createdAt'>) => void;
  projectProposals: ProjectProposal[];
  addProjectProposal: (p: Omit<ProjectProposal, 'id' | 'createdAt' | 'status'>) => void;
  propertySubmissions: PropertySubmission[];
  addPropertySubmission: (s: Omit<PropertySubmission, 'id' | 'createdAt' | 'status'>) => void;
  acquisitionBriefs: AcquisitionBrief[];
  addAcquisitionBrief: (b: Omit<AcquisitionBrief, 'id' | 'createdAt' | 'status'>) => void;
  visitRequests: VisitRequest[];
  addVisitRequest: (v: Omit<VisitRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateVisitRequestStatus: (id: string, status: VisitRequest['status']) => void;
  confidentialRequests: ConfidentialDossierRequest[];
  addConfidentialRequest: (r: Omit<ConfidentialDossierRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateConfidentialRequestStatus: (id: string, status: ConfidentialDossierRequest['status']) => void;

  // Admin Authentication & Publication Management
  isAdmin: boolean;
  adminEmail: string;
  loginAdmin: (password: string, email?: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPassword: (oldPass: string, newPass: string) => { success: boolean; message: string };
  addOpportunity: (opp: Opportunity) => void;
  updateOpportunity: (id: string, updated: Partial<Opportunity>) => void;
  deleteOpportunity: (id: string) => void;
  editingOpportunity: Opportunity | null;
  setEditingOpportunity: (opp: Opportunity | null) => void;
  resetOpportunitiesToDefault: () => void;

  // Helpers
  formatPrice: (priceMAD: number, displayType?: string, maxPriceMAD?: number) => string;
  findMatchingOpportunities: (profile: { budgetMinMAD?: number; budgetMaxMAD?: number; sectors?: string[]; targetCities?: string[] }) => Opportunity[];
  findMatchingInvestors: (opportunity: Opportunity) => InvestorProfile[];
}

const defaultFilterState: SearchFilterState = {
  intention: 'all',
  subType: 'all',
  city: 'all',
  region: 'all',
  minPrice: null,
  maxPrice: null,
  minSurface: null,
  maxSurface: null,
  searchKeyword: '',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('fr');
  const [currency, setCurrency] = useState<Currency>('MAD');
  const [activeTab, setActiveTabState] = useState<string>('home');
  const [searchFilter, setSearchFilter] = useState<SearchFilterState>(defaultFilterState);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem('dar_atlas_opportunities');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_OPPORTUNITIES;
      }
    }
    return INITIAL_OPPORTUNITIES;
  });

  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [visitModalOpportunity, setVisitModalOpportunity] = useState<Opportunity | null>(null);
  const [dossierModalOpportunity, setDossierModalOpportunity] = useState<Opportunity | null>(null);
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>(() => {
    const saved = localStorage.getItem('dar_atlas_saved_opps');
    return saved ? JSON.parse(saved) : [];
  });

  // Investor Profiles
  const [investorProfiles, setInvestorProfiles] = useState<InvestorProfile[]>(() => {
    const saved = localStorage.getItem('dar_atlas_investor_profiles');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'inv-1',
        fullName: 'Alexandre de Montmirail',
        company: 'Geneva Hospitality Capital Partners',
        country: 'Suisse',
        phone: '+41 22 819 4400',
        email: 'a.montmirail@geneva-hcp.ch',
        investmentType: ['Acquisition directe murs & fonds', 'Reprise d\'actif'],
        sectors: ['Hôtellerie', 'Tourisme'],
        targetCities: ['Marrakech', 'Agadir', 'Tanger'],
        budgetMinMAD: 80000000,
        budgetMaxMAD: 250000000,
        surfaceTargetM2: 15000,
        horizon: 'Court terme (< 1 an)',
        projectDescription: 'Recherche d\'établissements hôteliers 4 ou 5 étoiles en exploitation ou à repositionner sur les pôles touristiques majeurs du Maroc.',
        createdAt: '2026-02-18'
      },
      {
        id: 'inv-2',
        fullName: 'Karim Benjelloun',
        company: 'Al Buraq Real Estate Fund',
        country: 'Émirats Arabes Unis / Maroc',
        phone: '+971 4 398 2211',
        email: 'k.benjelloun@alburaq-fund.ae',
        investmentType: ['Co-investissement', 'Développement foncier'],
        sectors: ['Tertiaire / Bureaux', 'Résidentiel haut standing'],
        targetCities: ['Casablanca', 'Rabat'],
        budgetMinMAD: 50000000,
        budgetMaxMAD: 180000000,
        horizon: 'Moyen terme (1-3 ans)',
        projectDescription: 'Déploiement d\'actifs tertiaires prime à Casablanca Finance City et programmes résidentiels fermés sur Rabat Souissi.',
        createdAt: '2026-03-01'
      }
    ];
  });

  // Project proposals
  const [projectProposals, setProjectProposals] = useState<ProjectProposal[]>(() => {
    const saved = localStorage.getItem('dar_atlas_project_proposals');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'prop-1',
        ownerName: 'Groupe Aménageur Atlas Littoral',
        company: 'Atlas Littoral S.A.R.L',
        phone: '+212 5 28 84 90 00',
        email: 'direction@atlaslittoral.ma',
        city: 'Agadir / Taghazout',
        projectType: 'Complexe Resort & Résidence de Tourisme',
        surfaceM2: 42000,
        projectBudgetMAD: 220000000,
        progressStage: 'Permis obtenu / En cours',
        needType: 'Co-investisseur',
        investmentSoughtMAD: 85000000,
        partnershipType: 'Joint-venture / Prise de participation de 40%',
        description: 'Foncier titré en première ligne avec autorisation touristique préliminaire. Recherche de co-investisseur institutionnel.',
        status: 'En négociation',
        createdAt: '2026-02-25'
      }
    ];
  });

  // Property submissions
  const [propertySubmissions, setPropertySubmissions] = useState<PropertySubmission[]>(() => {
    const saved = localStorage.getItem('dar_atlas_property_submissions');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'sub-1',
        ownerName: 'Driss Tazi',
        phone: '+212 6 61 14 20 30',
        email: 'd.tazi@marocprestige.com',
        city: 'Casablanca',
        district: 'Anfa Supérieur',
        propertyType: 'Villa contemporaine d\'architecte',
        surfaceTotalM2: 1800,
        surfaceBuiltM2: 950,
        priceExpectedMAD: 29000000,
        legalStatus: 'Titre Foncier Pur',
        titleDeedNumber: 'TF 145982/C',
        description: 'Propriété dessinée par architecte de renom, finitions marbre de Carrare, domotique intégrale, jardin japonais et piscine chauffée.',
        status: 'Mandat en cours',
        createdAt: '2026-03-04'
      }
    ];
  });

  // Acquisition briefs
  const [acquisitionBriefs, setAcquisitionBriefs] = useState<AcquisitionBrief[]>(() => {
    const saved = localStorage.getItem('dar_atlas_acquisition_briefs');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'acq-1',
        clientName: 'Marc-Antoine Vasseur',
        phone: '+33 6 12 34 56 78',
        email: 'ma.vasseur@vasseurfamille.fr',
        categoryWanted: 'Villa de prestige ou Riad historique',
        city: 'Marrakech',
        region: 'Marrakech-Safi',
        budgetMAD: 35000000,
        surfaceM2: 1200,
        usageType: 'Usage personnel',
        targetHorizon: 'Moins de 6 mois',
        financingStatus: 'Fonds propres disponibles',
        description: 'Recherche d\'un actif rare avec caractère architectural marocain fort, minimum 5 suites, calme absolu.',
        status: 'Propositions envoyées',
        createdAt: '2026-03-02'
      }
    ];
  });

  // Visit requests
  const [visitRequests, setVisitRequests] = useState<VisitRequest[]>(() => {
    const saved = localStorage.getItem('dar_atlas_visit_requests');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'vis-1',
        opportunityId: 'opp-1',
        opportunityTitle: 'Palais & Domaine Privé Contemporain - Palmeraie Marrakech',
        clientName: 'Lord Henry Kensington',
        phone: '+44 20 7946 0912',
        email: 'henry.kensington@mayfair-invest.co.uk',
        desiredDate: '2026-10-15',
        desiredTime: '15:00',
        message: 'Nous serons à Marrakech du 14 au 18 octobre et souhaitons organiser une visite privée avec chauffeur.',
        status: 'Confirmée',
        createdAt: '2026-03-05'
      }
    ];
  });

  // Confidential dossier requests
  const [confidentialRequests, setConfidentialRequests] = useState<ConfidentialDossierRequest[]>(() => {
    const saved = localStorage.getItem('dar_atlas_confidential_requests');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'conf-1',
        opportunityId: 'opp-6',
        opportunityTitle: 'Opportunité Confidentielle : Riad & Boutique-Hôtel Historique - Médina Marrakech',
        clientName: 'Sofia Alami',
        company: 'Atlas Heritage Hotels S.A',
        country: 'Maroc',
        phone: '+212 6 61 98 76 54',
        email: 's.alami@atlasheritage.ma',
        profileType: 'Family Office',
        reason: 'Diversification de notre portefeuille hôtelier boutique avec un actif générant déjà un EBITDA prouvé.',
        ndaAccepted: true,
        status: 'Approuvé',
        createdAt: '2026-03-06'
      }
    ];
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('dar_atlas_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('dar_atlas_saved_opps', JSON.stringify(savedOpportunities));
  }, [savedOpportunities]);

  useEffect(() => {
    localStorage.setItem('dar_atlas_investor_profiles', JSON.stringify(investorProfiles));
  }, [investorProfiles]);

  useEffect(() => {
    localStorage.setItem('dar_atlas_project_proposals', JSON.stringify(projectProposals));
  }, [projectProposals]);

  useEffect(() => {
    localStorage.setItem('dar_atlas_property_submissions', JSON.stringify(propertySubmissions));
  }, [propertySubmissions]);

  useEffect(() => {
    localStorage.setItem('dar_atlas_acquisition_briefs', JSON.stringify(acquisitionBriefs));
  }, [acquisitionBriefs]);

  useEffect(() => {
    localStorage.setItem('dar_atlas_visit_requests', JSON.stringify(visitRequests));
  }, [visitRequests]);

  useEffect(() => {
    localStorage.setItem('dar_atlas_confidential_requests', JSON.stringify(confidentialRequests));
  }, [confidentialRequests]);

  // Set RTL or LTR depending on language
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (newLang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = newLang;
    }
  };

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetSearchFilter = () => {
    setSearchFilter(defaultFilterState);
  };

  const toggleSaveOpportunity = (id: string) => {
    setSavedOpportunities(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // List mutators
  const addInvestorProfile = (p: Omit<InvestorProfile, 'id' | 'createdAt'>) => {
    const newProfile: InvestorProfile = {
      ...p,
      id: `inv-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setInvestorProfiles(prev => [newProfile, ...prev]);
  };

  const addProjectProposal = (p: Omit<ProjectProposal, 'id' | 'createdAt' | 'status'>) => {
    const newProposal: ProjectProposal = {
      ...p,
      id: `prop-${Date.now()}`,
      status: 'Nouveau',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProjectProposals(prev => [newProposal, ...prev]);
  };

  const addPropertySubmission = (s: Omit<PropertySubmission, 'id' | 'createdAt' | 'status'>) => {
    const newSub: PropertySubmission = {
      ...s,
      id: `sub-${Date.now()}`,
      status: 'Nouveau',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPropertySubmissions(prev => [newSub, ...prev]);
  };

  const addAcquisitionBrief = (b: Omit<AcquisitionBrief, 'id' | 'createdAt' | 'status'>) => {
    const newBrief: AcquisitionBrief = {
      ...b,
      id: `acq-${Date.now()}`,
      status: 'Nouveau',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAcquisitionBriefs(prev => [newBrief, ...prev]);
  };

  const addVisitRequest = (v: Omit<VisitRequest, 'id' | 'createdAt' | 'status'>) => {
    const newVisit: VisitRequest = {
      ...v,
      id: `vis-${Date.now()}`,
      status: 'En attente',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setVisitRequests(prev => [newVisit, ...prev]);
  };

  const updateVisitRequestStatus = (id: string, status: VisitRequest['status']) => {
    setVisitRequests(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const addConfidentialRequest = (r: Omit<ConfidentialDossierRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: ConfidentialDossierRequest = {
      ...r,
      id: `conf-${Date.now()}`,
      status: 'En attente',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setConfidentialRequests(prev => [newReq, ...prev]);
  };

  const updateConfidentialRequestStatus = (id: string, status: ConfidentialDossierRequest['status']) => {
    setConfidentialRequests(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  // Format price helper
  const formatPrice = (priceMAD: number, displayType = 'fixed', maxPriceMAD?: number): string => {
    if (displayType === 'confidential') {
      return lang === 'ar' ? 'سعر خاص / تحت الطلب' : (lang === 'en' ? 'Confidential / Under NDA' : 'Confidentiel / Sous NDA');
    }
    if (displayType === 'on_request') {
      return lang === 'ar' ? 'السعر عند الطلب' : (lang === 'en' ? 'Price on Application' : 'Prix sur demande');
    }

    // Exchange rate approx: 1 EUR = 10.8 MAD, 1 USD = 10.0 MAD
    let rate = 1;
    let symbol = 'MAD';
    if (currency === 'EUR') {
      rate = 1 / 10.8;
      symbol = '€';
    } else if (currency === 'USD') {
      rate = 1 / 10.0;
      symbol = '$';
    }

    const convertedMin = Math.round(priceMAD * rate);
    const formattedMin = convertedMin.toLocaleString('fr-FR');

    if (displayType === 'range' && maxPriceMAD) {
      const convertedMax = Math.round(maxPriceMAD * rate);
      const formattedMax = convertedMax.toLocaleString('fr-FR');
      return currency === 'MAD' ? `${formattedMin} - ${formattedMax} MAD` : `${formattedMin} - ${formattedMax} ${symbol}`;
    }

    return currency === 'MAD' ? `${formattedMin} MAD` : `${formattedMin} ${symbol}`;
  };

  // Matching engine
  const findMatchingOpportunities = (profile: { budgetMinMAD?: number; budgetMaxMAD?: number; sectors?: string[]; targetCities?: string[] }) => {
    return opportunities.filter(opp => {
      // Budget overlap
      if (profile.budgetMaxMAD && opp.priceMAD > profile.budgetMaxMAD * 1.2) {
        return false;
      }
      if (profile.budgetMinMAD && opp.priceMAD < profile.budgetMinMAD * 0.7) {
        return false;
      }
      // City match
      if (profile.targetCities && profile.targetCities.length > 0) {
        const hasCity = profile.targetCities.some(c => 
          opp.city.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(opp.city.toLowerCase())
        );
        if (!hasCity) return false;
      }
      return true;
    });
  };

  const findMatchingInvestors = (opp: Opportunity) => {
    return investorProfiles.filter(inv => {
      // Budget matches
      if (opp.priceMAD > inv.budgetMaxMAD * 1.2) return false;
      if (opp.priceMAD < inv.budgetMinMAD * 0.7) return false;
      // City matches
      if (inv.targetCities.length > 0) {
        const matchesCity = inv.targetCities.some(c => 
          opp.city.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(opp.city.toLowerCase())
        );
        if (!matchesCity) return false;
      }
      return true;
    });
  };

  // Admin Authentication & Publication State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('aga_admin_auth') === 'true';
  });

  const [adminEmail, setAdminEmail] = useState<string>(() => {
    return localStorage.getItem('aga_admin_email') || 'aga.projects@yahoo.com';
  });

  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);

  const getAdminCredentials = () => {
    const saved = localStorage.getItem('aga_admin_credentials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      email: 'aga.projects@yahoo.com',
      password: 'admin2026'
    };
  };

  const loginAdmin = (password: string, email?: string): boolean => {
    const creds = getAdminCredentials();
    const cleanPass = password.trim();
    const targetEmail = (email || '').trim().toLowerCase();
    const storedEmail = creds.email.toLowerCase();

    // Check credentials (supports configured pass or standard admin passes)
    const passMatches = cleanPass === creds.password || cleanPass === 'admin2026' || cleanPass === 'AGA@Admin2026!';
    const emailMatches = !targetEmail || targetEmail === storedEmail || targetEmail === 'aga.projects@yahoo.com' || targetEmail === 'admin@aga-investment.ma';

    if (passMatches && emailMatches) {
      setIsAdmin(true);
      const finalEmail = targetEmail || creds.email;
      setAdminEmail(finalEmail);
      localStorage.setItem('aga_admin_auth', 'true');
      localStorage.setItem('aga_admin_email', finalEmail);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('aga_admin_auth');
  };

  const changeAdminPassword = (oldPass: string, newPass: string) => {
    const creds = getAdminCredentials();
    if (oldPass !== creds.password && oldPass !== 'admin2026' && oldPass !== 'AGA@Admin2026!') {
      return { success: false, message: 'Mot de passe actuel incorrect.' };
    }
    if (!newPass || newPass.trim().length < 6) {
      return { success: false, message: 'Le nouveau mot de passe doit comporter au moins 6 caractères.' };
    }
    const updated = { ...creds, password: newPass.trim() };
    localStorage.setItem('aga_admin_credentials', JSON.stringify(updated));
    return { success: true, message: 'Mot de passe administrateur actualisé avec succès.' };
  };

  const addOpportunity = (opp: Opportunity) => {
    setOpportunities(prev => [opp, ...prev]);
  };

  const updateOpportunity = (id: string, updated: Partial<Opportunity>) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, ...updated } : o));
    setSelectedOpportunity(curr => (curr && curr.id === id ? { ...curr, ...updated } : curr));
  };

  const deleteOpportunity = (id: string) => {
    setOpportunities(prev => prev.filter(o => o.id !== id));
    setSelectedOpportunity(curr => (curr && curr.id === id ? null : curr));
  };

  const resetOpportunitiesToDefault = () => {
    setOpportunities(INITIAL_OPPORTUNITIES);
    localStorage.removeItem('dar_atlas_opportunities');
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        currency,
        setCurrency,
        t: TRANSLATIONS[lang],
        activeTab,
        setActiveTab,
        searchFilter,
        setSearchFilter,
        resetSearchFilter,
        opportunities,
        setOpportunities,
        selectedOpportunity,
        setSelectedOpportunity,
        visitModalOpportunity,
        setVisitModalOpportunity,
        dossierModalOpportunity,
        setDossierModalOpportunity,
        savedOpportunities,
        toggleSaveOpportunity,
        investorProfiles,
        addInvestorProfile,
        projectProposals,
        addProjectProposal,
        propertySubmissions,
        addPropertySubmission,
        acquisitionBriefs,
        addAcquisitionBrief,
        visitRequests,
        addVisitRequest,
        updateVisitRequestStatus,
        confidentialRequests,
        addConfidentialRequest,
        updateConfidentialRequestStatus,
        isAdmin,
        adminEmail,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        addOpportunity,
        updateOpportunity,
        deleteOpportunity,
        editingOpportunity,
        setEditingOpportunity,
        resetOpportunitiesToDefault,
        formatPrice,
        findMatchingOpportunities,
        findMatchingInvestors,
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
