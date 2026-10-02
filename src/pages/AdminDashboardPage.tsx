import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Opportunity } from '../types';
import { AgaEmblem } from '../components/AgaLogo';
import { AdminOpportunityEditorModal } from '../components/AdminOpportunityEditorModal';
import { 
  BarChart3, 
  Building2, 
  Layers, 
  Users, 
  Calendar, 
  Lock, 
  FileText, 
  Plus, 
  Check, 
  X, 
  Eye, 
  Trash2, 
  Edit3,
  Sparkles, 
  ShieldCheck, 
  Phone, 
  Mail,
  Download,
  KeyRound,
  LogOut,
  Search,
  Filter,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { 
    opportunities, 
    setOpportunities,
    deleteOpportunity,
    investorProfiles, 
    projectProposals, 
    propertySubmissions, 
    acquisitionBriefs, 
    visitRequests, 
    updateVisitRequestStatus,
    confidentialRequests, 
    updateConfidentialRequestStatus,
    findMatchingOpportunities,
    findMatchingInvestors,
    formatPrice,
    setSelectedOpportunity,
    isAdmin,
    adminEmail,
    loginAdmin,
    logoutAdmin,
    changeAdminPassword,
    resetOpportunitiesToDefault
  } = useApp();

  // Admin Login Screen States
  const [loginInputEmail, setLoginInputEmail] = useState('aga.projects@yahoo.com');
  const [loginInputPassword, setLoginInputPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Change Password Modal
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changePassFeedback, setChangePassFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Active Tab
  const [activeAdminTab, setActiveAdminTab] = useState<'properties' | 'overview' | 'visits' | 'confidential' | 'proposals' | 'submissions' | 'matching'>('properties');
  
  // Publication Editor Modal State (For BOTH Adding and Modifying ANY publication)
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [targetOpportunityToEdit, setTargetOpportunityToEdit] = useState<Opportunity | null>(null);

  // Property Table Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Matching tool selection state
  const [selectedMatchingInvestorId, setSelectedMatchingInvestorId] = useState<string>(investorProfiles[0]?.id || '');
  const [selectedMatchingOppId, setSelectedMatchingOppId] = useState<string>(opportunities[0]?.id || '');

  // Handle Admin Login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginAdmin(loginInputPassword, loginInputEmail);
    if (!success) {
      setLoginError('Identifiants administrateur incorrects. Veuillez vérifier le mot de passe.');
    } else {
      setLoginInputPassword('');
    }
  };

  // Open Editor for Creating New
  const handleOpenAddModal = () => {
    setTargetOpportunityToEdit(null);
    setShowEditorModal(true);
  };

  // Open Editor for Modifying existing
  const handleOpenEditModal = (opp: Opportunity) => {
    setTargetOpportunityToEdit(opp);
    setShowEditorModal(true);
  };

  // Handle Quick Status Toggle
  const handleToggleStatus = (id: string) => {
    setOpportunities(prev => prev.map(o => {
      if (o.id === id) {
        const nextStatus: Opportunity['status'] = 
          o.status === 'Disponible' ? 'Mandat Exclusif' : 
          (o.status === 'Mandat Exclusif' ? 'Sous Offre' : 'Disponible');
        return { ...o, status: nextStatus };
      }
      return o;
    }));
  };

  // Handle Delete with Confirmation
  const handleDelete = (opp: Opportunity) => {
    if (confirm(`Confirmez-vous la suppression définitive de la publication :\n"${opp.title}" ?`)) {
      deleteOpportunity(opp.id);
    }
  };

  // Filtered publications
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.subTypeLabel.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = categoryFilter === 'all' || opp.category === categoryFilter;
    const matchesStat = statusFilter === 'all' || opp.status === statusFilter;

    return matchesSearch && matchesCat && matchesStat;
  });

  // Total metrics
  const totalProperties = opportunities.filter(o => o.category === 'property').length;
  const totalProjects = opportunities.filter(o => o.category === 'project').length;
  const totalHotels = opportunities.filter(o => o.category === 'hotel' || o.subType.includes('hotel') || o.subType === 'resort').length;
  const totalLands = opportunities.filter(o => o.category === 'land').length;
  const totalConfidential = opportunities.filter(o => o.isConfidential).length;

  const currentMatchingInvestor = investorProfiles.find(i => i.id === selectedMatchingInvestorId) || investorProfiles[0];
  const investorMatches = currentMatchingInvestor ? findMatchingOpportunities(currentMatchingInvestor) : [];

  const currentMatchingOpp = opportunities.find(o => o.id === selectedMatchingOppId) || opportunities[0];
  const oppMatches = currentMatchingOpp ? findMatchingInvestors(currentMatchingOpp) : [];

  // ==========================================
  // VIEW 1: AUTHENTICATION GATE (IF NOT ADMIN)
  // ==========================================
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-[#121419] border border-[#2d303b] rounded-2xl p-8 shadow-2xl gold-glow relative">
          {/* Logo & Lock Badge */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex p-3 bg-[#181b24] rounded-2xl border border-[#303342] mx-auto shadow-inner">
              <AgaEmblem size={48} />
            </div>

            <div>
              <div className="text-xs uppercase font-mono tracking-widest text-[#c5a059] font-bold">
                AGA PROJECTS
              </div>
              <h1 className="text-2xl font-serif-luxury font-bold text-white mt-1">
                Accès Unique Administrateur
              </h1>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                Console exclusive de gestion des mandats, création et modification de toutes les publications.
              </p>
            </div>
          </div>

          {loginError && (
            <div className="mb-6 p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-neutral-300 font-medium mb-1.5">
                Identifiant Administrateur (Email)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={loginInputEmail}
                  onChange={(e) => setLoginInputEmail(e.target.value)}
                  placeholder="aga.projects@yahoo.com"
                  className="w-full bg-[#181b22] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-neutral-300 font-medium">
                  Code d'Accès Sécurisé
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] text-neutral-400 hover:text-[#c5a059] transition-colors"
                >
                  {showPassword ? 'Masquer' : 'Afficher'}
                </button>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginInputPassword}
                  onChange={(e) => setLoginInputPassword(e.target.value)}
                  placeholder="Mot de passe administrateur"
                  className="w-full bg-[#181b22] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg hover:shadow-[#c5a059]/25 flex items-center justify-center gap-2 mt-2"
            >
              <Lock className="w-4 h-4" />
              <span>Ouvrir la Console d'Administration</span>
            </button>
          </form>

          {/* Quick Helper Badge */}
          <div className="mt-6 pt-5 border-t border-[#232630] text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#171a22] rounded-lg border border-[#2b2e3b] text-[11px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Mot de passe initial : <strong className="text-[#f5dfa5] font-mono">admin2026</strong></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===============================================
  // VIEW 2: FULL ADMINISTRATOR DASHBOARD (LOGGED IN)
  // ===============================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Session Header Bar */}
      <div className="bg-[#12141a] border border-[#292c37] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 gold-glow">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#171922] border border-[#353946] flex items-center justify-center p-2 shrink-0">
            <AgaEmblem size={34} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase font-mono tracking-wider text-[#c5a059] font-bold">
                SESSION UNIQUE ADMINISTRATEUR ACTIVE
              </span>
            </div>
            <h1 className="text-2xl font-serif-luxury font-bold text-white mt-0.5">
              Console de Gestion & Publications
            </h1>
            <div className="text-xs text-neutral-400 font-mono mt-0.5">
              Connecté : <strong className="text-neutral-200">{adminEmail}</strong>
            </div>
          </div>
        </div>

        {/* Global Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-[#c5a059]/25"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter une Publication</span>
          </button>

          <button
            onClick={() => setShowChangePassModal(true)}
            className="px-3.5 py-2.5 bg-[#1a1d25] hover:bg-[#222631] border border-[#303340] text-xs font-semibold text-neutral-300 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Sécurité</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3.5 py-2.5 bg-[#1e1517] hover:bg-[#2b1b1f] border border-rose-900/40 text-xs font-semibold text-rose-300 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 bg-[#14161c] border border-[#272a33] rounded-xl">
          <div className="text-[11px] text-neutral-400 font-mono">TOTAL PUBLICATIONS</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">{opportunities.length}</div>
          <div className="text-[10px] text-[#c5a059] mt-0.5">{totalConfidential} sous NDA</div>
        </div>

        <div className="p-4 bg-[#14161c] border border-[#272a33] rounded-xl">
          <div className="text-[11px] text-neutral-400 font-mono">BIENS DE PRESTIGE</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">{totalProperties}</div>
          <div className="text-[10px] text-neutral-400 mt-0.5">Villas & Résidences</div>
        </div>

        <div className="p-4 bg-[#14161c] border border-[#272a33] rounded-xl">
          <div className="text-[11px] text-neutral-400 font-mono">HÔTELS & RESORTS</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">{totalHotels}</div>
          <div className="text-[10px] text-neutral-400 mt-0.5">Actifs touristiques</div>
        </div>

        <div className="p-4 bg-[#14161c] border border-[#272a33] rounded-xl">
          <div className="text-[11px] text-neutral-400 font-mono">RÉSERVES FONCIÈRES</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">{totalLands}</div>
          <div className="text-[10px] text-neutral-400 mt-0.5">Terrains titrés</div>
        </div>

        <div className="p-4 bg-[#14161c] border border-[#272a33] rounded-xl">
          <div className="text-[11px] text-neutral-400 font-mono">DEMANDES VISITE</div>
          <div className="text-2xl font-bold text-[#f5dfa5] font-mono mt-1">{visitRequests.length}</div>
          <div className="text-[10px] text-neutral-400 mt-0.5">{visitRequests.filter(v => v.status === 'En attente').length} en attente</div>
        </div>

        <div className="p-4 bg-[#14161c] border border-[#272a33] rounded-xl">
          <div className="text-[11px] text-neutral-400 font-mono">DOSSIERS SOUS NDA</div>
          <div className="text-2xl font-bold text-[#c5a059] font-mono mt-1">{confidentialRequests.length}</div>
          <div className="text-[10px] text-neutral-400 mt-0.5">Demandes d'accès</div>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#131519] rounded-xl border border-[#23262e]">
        <button
          onClick={() => setActiveAdminTab('properties')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeAdminTab === 'properties' ? 'bg-[#c5a059] text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Gestion & Édition des Publications ({opportunities.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeAdminTab === 'overview' ? 'bg-[#c5a059] text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Vue d'Ensemble
        </button>

        <button
          onClick={() => setActiveAdminTab('visits')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeAdminTab === 'visits' ? 'bg-[#c5a059] text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Demandes de Visite ({visitRequests.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('confidential')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeAdminTab === 'confidential' ? 'bg-[#c5a059] text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Accords NDA ({confidentialRequests.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('proposals')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeAdminTab === 'proposals' ? 'bg-[#c5a059] text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Projets Soumis ({projectProposals.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('submissions')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeAdminTab === 'submissions' ? 'bg-[#c5a059] text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Mandats Vente Reçus ({propertySubmissions.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('matching')}
          className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeAdminTab === 'matching' ? 'bg-[#c5a059] text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Matching Investisseurs
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB: PROPERTIES & PUBLICATIONS MANAGEMENT (PRIMARY FOCUS) */}
      {/* ========================================================= */}
      {activeAdminTab === 'properties' && (
        <div className="space-y-6">
          {/* Action & Filter Bar */}
          <div className="bg-[#14161c] border border-[#272a33] rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par titre, ville, typologie..."
                  className="w-full bg-[#181b22] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none"
                />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-[#181b22] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2.5 text-xs text-neutral-300 outline-none"
              >
                <option value="all">Toutes Catégories</option>
                <option value="property">Biens Immobiliers</option>
                <option value="hotel">Hôtellerie & Tourisme</option>
                <option value="land">Terrains & Foncier</option>
                <option value="project">Projets</option>
                <option value="confidential">Confidentiel / NDA</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#181b22] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-2.5 text-xs text-neutral-300 outline-none"
              >
                <option value="all">Tous Statuts</option>
                <option value="Disponible">Disponible</option>
                <option value="Mandat Exclusif">Mandat Exclusif</option>
                <option value="Sous Offre">Sous Offre</option>
              </select>
            </div>

            {/* Quick Action */}
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-md shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Créer une Publication</span>
            </button>
          </div>

          {/* Publications Table */}
          <div className="bg-[#14161c] border border-[#272a33] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-[#242730] flex items-center justify-between">
              <div className="text-xs text-neutral-400 font-mono">
                Affichage de <strong className="text-white">{filteredOpportunities.length}</strong> sur <strong>{opportunities.length}</strong> publication(s)
              </div>
              <button
                onClick={resetOpportunitiesToDefault}
                className="text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors flex items-center gap-1"
                title="Rétablir les données par défaut en cas de test"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Réinitialiser les données témoins</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-[#171920] text-neutral-400 font-mono uppercase text-[11px] border-b border-[#272a33]">
                  <tr>
                    <th className="p-3.5">Visuel & Titre</th>
                    <th className="p-3.5">Typologie</th>
                    <th className="p-3.5">Ville & Région</th>
                    <th className="p-3.5">Surface</th>
                    <th className="p-3.5">Prix (MAD)</th>
                    <th className="p-3.5">Statut</th>
                    <th className="p-3.5">Accès</th>
                    <th className="p-3.5 text-right">Actions Administrateur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#20232c]">
                  {filteredOpportunities.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-neutral-500">
                        Aucune publication ne correspond aux critères de filtre.
                      </td>
                    </tr>
                  ) : (
                    filteredOpportunities.map(opp => (
                      <tr key={opp.id} className="hover:bg-[#181a23] transition-colors">
                        {/* Title & Thumbnail */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-3 max-w-sm">
                            <img 
                              src={opp.mainImage} 
                              alt={opp.title} 
                              className="w-12 h-10 rounded-lg object-cover border border-[#2d303b] shrink-0" 
                            />
                            <div className="min-w-0">
                              <div className="font-semibold text-white truncate hover:text-[#c5a059] transition-colors">
                                {opp.title}
                              </div>
                              <div className="text-[10px] text-neutral-500 font-mono mt-0.5">
                                ID: #{opp.id} · Publié le {opp.publishedAt}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Typology */}
                        <td className="p-3.5">
                          <span className="px-2 py-1 bg-[#1a1d25] rounded-md text-[11px] border border-[#2d303c] text-neutral-200">
                            {opp.subTypeLabel || opp.subType}
                          </span>
                        </td>

                        {/* City */}
                        <td className="p-3.5">
                          <div className="font-medium text-white">{opp.city}</div>
                          <div className="text-[10px] text-neutral-500">{opp.region}</div>
                        </td>

                        {/* Surface */}
                        <td className="p-3.5 font-mono">
                          {opp.surfaceM2.toLocaleString('fr-FR')} m²
                        </td>

                        {/* Price */}
                        <td className="p-3.5 font-mono font-semibold text-[#f5dfa5]">
                          {formatPrice(opp.priceMAD, opp.priceDisplay, opp.priceMaxMAD)}
                        </td>

                        {/* Quick Status toggle */}
                        <td className="p-3.5">
                          <button
                            onClick={() => handleToggleStatus(opp.id)}
                            title="Cliquer pour faire défiler le statut"
                            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-colors ${
                              opp.status === 'Mandat Exclusif' ? 'bg-[#c5a059]/20 text-[#f5dfa5] border-[#c5a059]/40' :
                              opp.status === 'Disponible' ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800' :
                              'bg-amber-950/70 text-amber-300 border-amber-800'
                            }`}
                          >
                            {opp.status} ⟳
                          </button>
                        </td>

                        {/* Confidential */}
                        <td className="p-3.5">
                          {opp.isConfidential ? (
                            <span className="text-amber-400 font-semibold flex items-center gap-1 text-[11px]">
                              <Lock className="w-3 h-3" /> NDA
                            </span>
                          ) : (
                            <span className="text-neutral-500 text-[11px]">Public</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                          {/* EDIT BUTTON (CRUCIAL USER REQUEST) */}
                          <button
                            onClick={() => handleOpenEditModal(opp)}
                            title="Modifier cette publication"
                            className="px-3 py-1.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold rounded-lg text-xs transition-colors inline-flex items-center gap-1 shadow-sm"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Modifier</span>
                          </button>

                          {/* VIEW DETAIL */}
                          <button
                            onClick={() => setSelectedOpportunity(opp)}
                            title="Aperçu fiche publique"
                            className="p-1.5 text-neutral-300 hover:text-white bg-[#1e2029] hover:bg-[#282a36] rounded-lg transition-colors inline-flex items-center"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(opp)}
                            title="Supprimer la publication"
                            className="p-1.5 text-rose-400 hover:text-rose-200 bg-[#25181a] hover:bg-[#381f23] rounded-lg transition-colors inline-flex items-center"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================= */}
      {/* TAB: OVERVIEW & ALERTS  */}
      {/* ======================= */}
      {activeAdminTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Visit Requests */}
          <div className="bg-[#14161c] border border-[#272a33] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif-luxury font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#c5a059]" />
                <span>Dernières Demandes de Visite</span>
              </h3>
              <button onClick={() => setActiveAdminTab('visits')} className="text-xs text-[#c5a059] hover:underline">
                Voir tout
              </button>
            </div>

            <div className="space-y-2.5">
              {visitRequests.slice(0, 4).map(req => (
                <div key={req.id} className="p-3 bg-[#181b22] rounded-xl border border-[#262932] flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-semibold text-white">{req.clientName}</div>
                    <div className="text-neutral-400 truncate max-w-xs">{req.opportunityTitle}</div>
                    <div className="text-[11px] text-[#c5a059] font-mono mt-0.5">{req.desiredDate} à {req.desiredTime}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold shrink-0 ${
                    req.status === 'Confirmée' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                  }`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Confidential NDA Requests */}
          <div className="bg-[#14161c] border border-[#272a33] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif-luxury font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#c5a059]" />
                <span>Demandes d'Accès Confidentialité (NDA)</span>
              </h3>
              <button onClick={() => setActiveAdminTab('confidential')} className="text-xs text-[#c5a059] hover:underline">
                Voir tout
              </button>
            </div>

            <div className="space-y-2.5">
              {confidentialRequests.slice(0, 4).map(req => (
                <div key={req.id} className="p-3 bg-[#181b22] rounded-xl border border-[#262932] flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-semibold text-white">{req.clientName} ({req.profileType})</div>
                    <div className="text-neutral-400 truncate max-w-xs">{req.opportunityTitle}</div>
                    <div className="text-[10px] text-neutral-500 font-mono mt-0.5">NDA Accepté · {req.email}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold shrink-0 ${
                    req.status === 'Approuvé' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                  }`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================== */}
      {/* TAB: VISITS REQUESTS  */}
      {/* ===================== */}
      {activeAdminTab === 'visits' && (
        <div className="space-y-4">
          <h2 className="text-lg font-serif-luxury text-white">
            Demandes de Visite Enregistrées ({visitRequests.length})
          </h2>

          <div className="space-y-3">
            {visitRequests.map(v => (
              <div key={v.id} className="p-4 bg-[#14161c] border border-[#272a33] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[#c5a059] font-mono">DEMANDE #{v.id} · Reçu le {v.createdAt}</div>
                  <div className="text-base font-semibold text-white mt-1">{v.clientName}</div>
                  <div className="text-xs text-neutral-300">
                    Actif visé : <strong className="text-white">{v.opportunityTitle}</strong>
                  </div>
                  <div className="text-xs text-neutral-400 mt-1 flex flex-wrap gap-4">
                    <span>Date souhaitée : <strong className="text-[#f5dfa5] font-mono">{v.desiredDate} à {v.desiredTime}</strong></span>
                    <span>Tél : <a href={`tel:${v.phone}`} className="text-[#c5a059] underline">{v.phone}</a></span>
                    <span>Email : <a href={`mailto:${v.email}`} className="text-[#c5a059] underline">{v.email}</a></span>
                  </div>
                  {v.message && (
                    <div className="text-xs text-neutral-400 mt-2 p-2 bg-[#191b22] rounded-lg">
                      « {v.message} »
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateVisitRequestStatus(v.id, 'Confirmée')}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirmer Visite</span>
                  </button>
                  <button
                    onClick={() => updateVisitRequestStatus(v.id, 'Annulée')}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs"
                  >
                    Classer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================= */}
      {/* TAB: CONFIDENTIAL DOSSIERS    */}
      {/* ============================= */}
      {activeAdminTab === 'confidential' && (
        <div className="space-y-4">
          <h2 className="text-lg font-serif-luxury text-white">
            Demandes de Dossiers Confidentiels sous Accord NDA ({confidentialRequests.length})
          </h2>

          <div className="space-y-3">
            {confidentialRequests.map(c => (
              <div key={c.id} className="p-4 bg-[#14161c] border border-[#272a33] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[#c5a059] font-mono">PROTOCOLE NDA #{c.id} · {c.createdAt}</div>
                  <div className="text-base font-semibold text-white mt-1">
                    {c.clientName} {c.company && `— ${c.company}`}
                  </div>
                  <div className="text-xs text-neutral-300">
                    Actif confidentiel visé : <strong className="text-[#f5dfa5]">{c.opportunityTitle}</strong>
                  </div>
                  <div className="text-xs text-neutral-400 mt-1 flex flex-wrap gap-4">
                    <span>Profil : <strong className="text-white">{c.profileType}</strong></span>
                    <span>Pays : <strong className="text-white">{c.country}</strong></span>
                    <span>Email : <a href={`mailto:${c.email}`} className="text-[#c5a059] underline">{c.email}</a></span>
                    <span>Tél : <a href={`tel:${c.phone}`} className="text-[#c5a059] underline">{c.phone}</a></span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-2 p-2 bg-[#191b22] rounded-lg border border-[#262832]">
                    <strong className="text-neutral-300">Motif & Thèse :</strong> {c.reason}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateConfidentialRequestStatus(c.id, 'Approuvé')}
                    className="px-3.5 py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Délivrer Accès Chiffré</span>
                  </button>
                  <button
                    onClick={() => updateConfidentialRequestStatus(c.id, 'Refusé')}
                    className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs"
                  >
                    Refuser
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== */}
      {/* TAB: PROJECT PROPOSALS */}
      {/* ===================== */}
      {activeAdminTab === 'proposals' && (
        <div className="space-y-4">
          <h2 className="text-lg font-serif-luxury text-white">
            Projets Immobiliers & Hôteliers Soumis pour Recherche d'Investisseurs ({projectProposals.length})
          </h2>

          <div className="space-y-3">
            {projectProposals.map(p => (
              <div key={p.id} className="p-4 bg-[#14161c] border border-[#272a33] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[#c5a059] font-mono">PROJET #{p.id} · Soumis le {p.createdAt}</div>
                  <div className="text-base font-semibold text-white mt-1">{p.projectType} à {p.city}</div>
                  <div className="text-xs text-neutral-400 mt-1 flex flex-wrap gap-4">
                    <span>Porteur : <strong className="text-white">{p.ownerName}</strong> ({p.company || 'Indépendant'})</span>
                    <span>Ville : <strong className="text-white">{p.city}</strong></span>
                    <span>Budget Global : <strong className="text-[#f5dfa5] font-mono">{formatPrice(p.projectBudgetMAD)}</strong></span>
                    <span>Recherche : <strong className="text-[#c5a059] font-mono">{formatPrice(p.investmentSoughtMAD)}</strong></span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-2 p-2 bg-[#191b22] rounded-lg">
                    {p.description}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${p.email}?subject=AGA Projects - Revue de votre projet: ${p.projectType}`}
                    className="px-3 py-1.5 bg-[#c5a059] text-black font-semibold rounded-lg text-xs flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contacter le Promoteur</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* TAB: SUBMISSIONS FOR SALE */}
      {/* ========================= */}
      {activeAdminTab === 'submissions' && (
        <div className="space-y-4">
          <h2 className="text-lg font-serif-luxury text-white">
            Mandats de Vente Soumis par des Propriétaires ({propertySubmissions.length})
          </h2>

          <div className="space-y-3">
            {propertySubmissions.map(s => (
              <div key={s.id} className="p-4 bg-[#14161c] border border-[#272a33] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[#c5a059] font-mono">MANDAT #{s.id} · {s.createdAt}</div>
                  <div className="text-base font-semibold text-white mt-1">
                    {s.propertyType} à {s.city} ({s.surfaceTotalM2} m²)
                  </div>
                  <div className="text-xs text-neutral-400 mt-1 flex flex-wrap gap-4">
                    <span>Propriétaire : <strong className="text-white">{s.ownerName}</strong></span>
                    <span>Prix souhaité : <strong className="text-[#f5dfa5] font-mono">{formatPrice(s.priceExpectedMAD)}</strong></span>
                    <span>Tél : <a href={`tel:${s.phone}`} className="text-[#c5a059] underline">{s.phone}</a></span>
                    <span>Email : <a href={`mailto:${s.email}`} className="text-[#c5a059] underline">{s.email}</a></span>
                  </div>
                  {s.description && (
                    <div className="text-xs text-neutral-400 mt-2 p-2 bg-[#191b22] rounded-lg">
                      « {s.description} »
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      // Pre-fill editor modal with this submission data!
                      const draftOpp: Opportunity = {
                        id: `opp-${Date.now()}`,
                        title: `${s.propertyType} - ${s.city}`,
                        titleEn: `${s.propertyType} - ${s.city}`,
                        titleAr: `${s.propertyType} - ${s.city}`,
                        slug: `${s.propertyType}-${s.city}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        category: s.propertyType.toLowerCase().includes('terrain') ? 'land' : 'property',
                        subType: 'villa',
                        subTypeLabel: s.propertyType,
                        city: s.city,
                        region: 'Marrakech-Safi',
                        priceMAD: s.priceExpectedMAD,
                        priceDisplay: 'fixed',
                        surfaceM2: s.surfaceTotalM2,
                        legalStatus: s.legalStatus || 'Titre Foncier',
                        status: 'Mandat Exclusif',
                        isConfidential: false,
                        featured: true,
                        mainImage: '/src/assets/images/villa_palmeraie_marrakech_1790689596187.jpg',
                        gallery: ['/src/assets/images/villa_palmeraie_marrakech_1790689596187.jpg'],
                        shortDescription: s.description || 'Bien proposé à la vente par propriétaire qualifié.',
                        shortDescriptionEn: s.description || 'Property offered for sale.',
                        shortDescriptionAr: s.description || 'عقار معروض للبيع.',
                        fullDescription: s.description || 'Dossier disponible auprès du cabinet.',
                        investmentPotential: 'Actif à fort potentiel d\'exploitation.',
                        documentsAvailable: [{ title: 'Fiche descriptive', type: 'PDF', isConfidential: false }],
                        publishedAt: new Date().toISOString().split('T')[0]
                      };
                      setTargetOpportunityToEdit(draftOpp);
                      setShowEditorModal(true);
                    }}
                    className="px-3.5 py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold rounded-lg text-xs flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Créer Fiche Publication</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================= */}
      {/* TAB: MATCHING INVESTORS       */}
      {/* ============================= */}
      {activeAdminTab === 'matching' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tool 1 */}
          <div className="bg-[#14161c] border border-[#272a33] rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-serif-luxury font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <span>Matching : Trouver des Opportunités pour un Investisseur</span>
            </h3>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Sélectionner un Profil Investisseur :</label>
              <select
                value={selectedMatchingInvestorId}
                onChange={(e) => setSelectedMatchingInvestorId(e.target.value)}
                className="w-full bg-[#181b22] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl p-2.5 text-xs text-white outline-none"
              >
                {investorProfiles.map(inv => (
                  <option key={inv.id} value={inv.id}>
                    {inv.fullName} ({inv.company || inv.country}) — Budget : {formatPrice(inv.budgetMaxMAD)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-neutral-400 uppercase font-mono">
                {investorMatches.length} Opportunités Compatibles Trouvées :
              </div>

              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                {investorMatches.length === 0 ? (
                  <div className="text-xs text-neutral-500 italic p-3">Aucun actif ne correspond exactement aux critères stricts.</div>
                ) : (
                  investorMatches.map(opp => (
                    <div key={opp.id} className="p-3 bg-[#181a22] rounded-lg border border-[#242732] flex items-center justify-between text-xs">
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold text-white truncate">{opp.title}</div>
                        <div className="text-[11px] text-[#c5a059] font-mono">{formatPrice(opp.priceMAD)} · {opp.city}</div>
                      </div>
                      <button
                        onClick={() => setSelectedOpportunity(opp)}
                        className="px-2.5 py-1 bg-[#232630] hover:bg-[#c5a059] hover:text-black text-neutral-300 rounded text-[11px] font-semibold shrink-0 transition-colors"
                      >
                        Voir Fiche
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Tool 2 */}
          <div className="bg-[#14161c] border border-[#272a33] rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-serif-luxury font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <span>Matching : Trouver des Investisseurs pour un Actif</span>
            </h3>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Sélectionner une Opportunité :</label>
              <select
                value={selectedMatchingOppId}
                onChange={(e) => setSelectedMatchingOppId(e.target.value)}
                className="w-full bg-[#181b22] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl p-2.5 text-xs text-white outline-none"
              >
                {opportunities.map(opp => (
                  <option key={opp.id} value={opp.id}>
                    {opp.title} ({formatPrice(opp.priceMAD)})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-neutral-400 uppercase font-mono">
                {oppMatches.length} Investisseurs Qualifiés Prêts à Étudier le Dossier :
              </div>

              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                {oppMatches.length === 0 ? (
                  <div className="text-xs text-neutral-500 italic p-3">Aucun investisseur en base ne correspond exactement à ce montant.</div>
                ) : (
                  oppMatches.map(inv => (
                    <div key={inv.id} className="p-3 bg-[#181a22] rounded-lg border border-[#242732] flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-white">{inv.fullName} {inv.company && `(${inv.company})`}</div>
                        <div className="text-[11px] text-neutral-400">Budget max : {formatPrice(inv.budgetMaxMAD)}</div>
                      </div>
                      <a
                        href={`mailto:${inv.email}?subject=Opportunité Confidentielle: ${currentMatchingOpp.title}`}
                        className="px-2.5 py-1 bg-[#c5a059] text-black font-semibold rounded text-[11px]"
                      >
                        Contacter
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* COMPREHENSIVE PUBLICATION EDITOR MODAL (ADD & EDIT EVERY FIELD) */}
      {/* ============================================================== */}
      <AdminOpportunityEditorModal
        isOpen={showEditorModal}
        onClose={() => {
          setShowEditorModal(false);
          setTargetOpportunityToEdit(null);
        }}
        opportunityToEdit={targetOpportunityToEdit}
      />

      {/* ============================================================== */}
      {/* MODAL: CHANGE ADMIN PASSWORD                                   */}
      {/* ============================================================== */}
      {showChangePassModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-[#13151b] border border-[#2e313d] rounded-2xl w-full max-w-md p-6 shadow-2xl gold-glow">
            <button
              onClick={() => {
                setShowChangePassModal(false);
                setChangePassFeedback(null);
              }}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-serif-luxury font-bold text-white mb-2 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#c5a059]" />
              <span>Changer le Mot de Passe Administrateur</span>
            </h3>

            <p className="text-xs text-neutral-400 mb-4">
              Ce mot de passe protège l'accès unique à la console de publication AGA.
            </p>

            {changePassFeedback && (
              <div className={`mb-4 p-3 rounded-xl text-xs font-semibold ${
                changePassFeedback.success ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}>
                {changePassFeedback.message}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const res = changeAdminPassword(oldPassword, newPassword);
                setChangePassFeedback(res);
                if (res.success) {
                  setOldPassword('');
                  setNewPassword('');
                  setTimeout(() => {
                    setShowChangePassModal(false);
                    setChangePassFeedback(null);
                  }, 1500);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Mot de Passe Actuel *
                </label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Mot de passe actuel"
                  className="w-full bg-[#181b22] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3.5 py-2 text-xs text-white outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Nouveau Mot de Passe (min. 6 caractères) *
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                  className="w-full bg-[#181b22] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3.5 py-2 text-xs text-white outline-none font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowChangePassModal(false)}
                  className="px-4 py-2 bg-[#191b22] text-neutral-400 hover:text-white rounded-lg text-xs"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs rounded-lg transition-colors"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
