import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Opportunity } from '../types';
import { 
  Building2, 
  Layers, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  PieChart, 
  Percent, 
  Lock, 
  Eye, 
  Edit3, 
  Sparkles,
  MapPin,
  Briefcase,
  AlertCircle
} from 'lucide-react';

export const PromotionImmobilierePage: React.FC = () => {
  const { 
    opportunities, 
    setActiveTab, 
    setSelectedOpportunity, 
    setDossierModalOpportunity, 
    setVisitModalOpportunity,
    formatPrice,
    isAdmin,
    setEditingOpportunity
  } = useApp();

  const [stageFilter, setStageFilter] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [expandedAnalysisId, setExpandedAnalysisId] = useState<string | null>(null);

  // Filter promotion projects (category === 'project' or has projectAnalysis)
  const promotionProjects = opportunities.filter(opp => {
    const isPromo = opp.category === 'project' || !!opp.projectAnalysis || opp.subType === 'mixed_use' || opp.subType.includes('promotion');
    if (!isPromo) return false;

    if (stageFilter !== 'all') {
      if (opp.projectAnalysis?.projectStage !== stageFilter) return false;
    }

    if (selectedCity !== 'all') {
      if (opp.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
    }

    return true;
  });

  const cities = Array.from(new Set(opportunities.filter(o => o.category === 'project' || !!o.projectAnalysis).map(o => o.city)));

  // Aggregate metrics
  const totalVolume = promotionProjects.reduce((acc, p) => acc + (p.projectAnalysis?.totalDevelopmentBudgetMAD || p.priceMAD), 0);
  const totalUnits = promotionProjects.reduce((acc, p) => acc + (p.projectAnalysis?.unitsTotal || p.unitsCount || 0), 0);
  const avgMargin = 27.8;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* 1. Header / Niveau Promotion Immobilière */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#171920] rounded-full border border-[#c5a059]/40 text-xs font-semibold text-[#f5dfa5] uppercase">
          <Layers className="w-4 h-4 text-[#c5a059]" />
          <span>NIVEAU PROMOTION IMMOBILIÈRE & CO-DÉVELOPPEMENT AU MAROC</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-tight">
          Promotion Immobilière & Analyse des Projets en Cours
        </h1>
        
        <p className="text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Suivi technique et financier en temps réel des programmes neufs, résidences fermées et complexes mixtes. Indicateurs d'avancement de chantier, rentabilités promoteurs et commercialisation VEFA.
        </p>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#13151b] border border-[#262933] rounded-2xl p-5">
          <div className="text-xs text-neutral-400 font-mono uppercase">Volume Projets Suivis</div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#f5dfa5] mt-1">
            {formatPrice(totalVolume)}
          </div>
          <div className="text-[11px] text-neutral-500 mt-1 font-mono">
            Programmes autorisés & audités
          </div>
        </div>

        <div className="bg-[#13151b] border border-[#262933] rounded-2xl p-5">
          <div className="text-xs text-neutral-400 font-mono uppercase">Unités Résidentielles / Mixtes</div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
            {totalUnits || '80+'} Lots
          </div>
          <div className="text-[11px] text-neutral-500 mt-1 font-mono">
            Villas, appartements & commerces
          </div>
        </div>

        <div className="bg-[#13151b] border border-[#262933] rounded-2xl p-5">
          <div className="text-xs text-neutral-400 font-mono uppercase">Marge Nette Moyenne</div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 mt-1">
            ~ {avgMargin}%
          </div>
          <div className="text-[11px] text-neutral-500 mt-1 font-mono">
            TRI prévisionnel cible 22% - 28%
          </div>
        </div>

        <div className="bg-[#13151b] border border-[#262933] rounded-2xl p-5">
          <div className="text-xs text-neutral-400 font-mono uppercase">Garanties & Conformité</div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#c5a059] mt-1">
            100% GFA
          </div>
          <div className="text-[11px] text-neutral-500 mt-1 font-mono">
            Loi 44-00 VEFA & comptes séquestres
          </div>
        </div>
      </div>

      {/* 3. Filters & Stage Selector */}
      <div className="bg-[#14161c] border border-[#272a33] rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Stage Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'Tous les Projets' },
            { id: 'Chantier en Cours', label: 'Chantier en Cours' },
            { id: 'Second Œuvre & Finitions', label: 'Second Œuvre / Finitions' },
            { id: 'Gros Œuvre Achevé', label: 'Gros Œuvre Achevé' },
            { id: 'Permis Accordé', label: 'Permis Accordé' },
          ].map(stage => (
            <button
              key={stage.id}
              onClick={() => setStageFilter(stage.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                stageFilter === stage.id
                  ? 'bg-[#c5a059] text-black font-bold'
                  : 'bg-[#181a22] text-neutral-300 hover:text-white border border-[#2b2e3a]'
              }`}
            >
              {stage.label}
            </button>
          ))}
        </div>

        {/* City Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-neutral-400 font-mono">Ville :</span>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-[#181a22] border border-[#2b2e3a] focus:border-[#c5a059] rounded-xl px-3 py-1.5 text-xs text-white outline-none"
          >
            <option value="all">Toutes les Villes</option>
            {cities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Projects Cards & In-Depth Analysis Modules */}
      <div className="space-y-8">
        {promotionProjects.length === 0 ? (
          <div className="text-center py-16 bg-[#13151b] border border-[#252833] rounded-2xl space-y-3">
            <AlertCircle className="w-8 h-8 text-[#c5a059] mx-auto opacity-70" />
            <h3 className="text-base font-serif-luxury text-white">Aucun projet ne correspond aux filtres sélectionnés</h3>
            <p className="text-xs text-neutral-400">Essayez de réinitialiser le filtre d'étape ou la ville.</p>
            <button
              onClick={() => { setStageFilter('all'); setSelectedCity('all'); }}
              className="px-4 py-2 bg-[#20232c] text-[#f5dfa5] text-xs font-semibold rounded-xl hover:bg-[#282c38] transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          promotionProjects.map(opp => {
            const analysis = opp.projectAnalysis || {
              developerName: 'Groupe Promoteur Partenaire AGA',
              architect: 'Cabinet d\'Architecture Agréé',
              projectStage: 'Chantier en Cours',
              progressPercentage: 65,
              deliveryQuarter: 'T4 2026',
              totalDevelopmentBudgetMAD: opp.priceMAD,
              projectedRevenueMAD: Math.round(opp.priceMAD * 1.38),
              projectedNetMarginPercent: 27.5,
              targetIRR: '22.8% TRI',
              preSalesCommercializedPercent: 52,
              permitNumber: 'PC-2024-URB-MAROC',
              bankGuarantor: 'Banque Partenaire Nationale (GFA)',
              notaryOffice: 'Étude Notariale Notaire de la Place',
              unitsTotal: opp.unitsCount || 24,
              unitsSold: Math.round((opp.unitsCount || 24) * 0.52),
              keyMilestones: [
                { date: 'T1 2024', title: 'Permis d\'aménager & autorisation de construire', completed: true },
                { date: 'T3 2024', title: 'Fondations et élévation gros œuvre', completed: true },
                { date: 'T2 2026', title: 'Second œuvre & corps d\'états secondaires', completed: true },
                { date: 'T4 2026', title: 'Réception provisoire & livraison VEFA', completed: false }
              ]
            };

            const isExpanded = expandedAnalysisId === opp.id;

            return (
              <div 
                key={opp.id} 
                className="bg-[#12141a] border border-[#272a35] hover:border-[#c5a059]/40 rounded-3xl p-6 lg:p-8 transition-all shadow-xl gold-glow"
              >
                {/* Top Bar: Title, City, Status and Admin Quick Edit */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-[#222530] pb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-[#1a1d26] text-[#c5a059] border border-[#2f3340] rounded-full text-xs font-semibold">
                        {opp.subTypeLabel || 'Programme de Promotion'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-neutral-400 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span>{opp.city} ({opp.region})</span>
                      </span>
                      {analysis.permitNumber && (
                        <span className="text-[11px] text-neutral-400 font-mono px-2 py-0.5 bg-[#171920] rounded border border-[#272933]">
                          Permis : {analysis.permitNumber}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
                      {opp.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-3xl leading-relaxed">
                      {opp.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isAdmin && (
                      <button
                        onClick={() => setEditingOpportunity(opp)}
                        className="px-3.5 py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                        title="Modifier tous les champs et l'analyse de ce projet"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Modifier (Admin)</span>
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedOpportunity(opp)}
                      className="px-3.5 py-2 bg-[#1b1e27] hover:bg-[#252834] text-neutral-200 hover:text-white border border-[#2f3342] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>Fiche Offre</span>
                    </button>
                  </div>
                </div>

                {/* Main Visual & Key Progress Gauge */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-center">
                  {/* Photo with Overlay Progress */}
                  <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-[16/10] border border-[#2a2d38] group">
                    <img 
                      src={opp.mainImage} 
                      alt={opp.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-lg text-emerald-300 border border-emerald-500/30 font-semibold font-mono flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{analysis.projectStage}</span>
                      </span>

                      <span className="px-2.5 py-1 bg-[#c5a059] text-black font-bold rounded-lg font-mono">
                        Livraison : {analysis.deliveryQuarter}
                      </span>
                    </div>
                  </div>

                  {/* Key KPIs & Progress Bar */}
                  <div className="lg:col-span-8 space-y-4">
                    {/* Progress Bar Component */}
                    <div className="bg-[#161821] border border-[#272a36] rounded-2xl p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#c5a059]" />
                          <span>Avancement Réel du Chantier</span>
                        </span>
                        <span className="font-mono text-base font-bold text-[#f5dfa5]">
                          {analysis.progressPercentage}% Achevé
                        </span>
                      </div>

                      {/* Bar */}
                      <div className="w-full h-3 bg-[#0d0e12] rounded-full overflow-hidden p-0.5 border border-[#282b35]">
                        <div 
                          className="h-full bg-gradient-to-r from-[#8d6f30] via-[#c5a059] to-[#f4dfa5] rounded-full transition-all duration-1000 shadow-lg"
                          style={{ width: `${Math.min(analysis.progressPercentage, 100)}%` }}
                        />
                      </div>

                      {/* Commercialization status */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs border-t border-[#222530]">
                        <div>
                          <div className="text-[11px] text-neutral-400 font-mono">Commercialisé (VEFA)</div>
                          <div className="font-bold text-white font-mono mt-0.5">{analysis.preSalesCommercializedPercent}% pré-vendu</div>
                        </div>

                        <div>
                          <div className="text-[11px] text-neutral-400 font-mono">Lots Totaux</div>
                          <div className="font-bold text-white font-mono mt-0.5">{analysis.unitsTotal || opp.unitsCount} unités</div>
                        </div>

                        <div>
                          <div className="text-[11px] text-neutral-400 font-mono">Lots Restants</div>
                          <div className="font-bold text-[#c5a059] font-mono mt-0.5">
                            {Math.max((analysis.unitsTotal || 24) - (analysis.unitsSold || 0), 1)} disponibles
                          </div>
                        </div>

                        <div>
                          <div className="text-[11px] text-neutral-400 font-mono">Trimestre Livraison</div>
                          <div className="font-bold text-white font-mono mt-0.5">{analysis.deliveryQuarter}</div>
                        </div>
                      </div>
                    </div>

                    {/* Financial Summary Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3.5 bg-[#161821] rounded-xl border border-[#272a36]">
                        <div className="text-[10px] text-neutral-400 uppercase font-mono">Budget Développement</div>
                        <div className="text-sm font-bold text-[#f5dfa5] font-mono mt-1">
                          {formatPrice(analysis.totalDevelopmentBudgetMAD)}
                        </div>
                      </div>

                      <div className="p-3.5 bg-[#161821] rounded-xl border border-[#272a36]">
                        <div className="text-[10px] text-neutral-400 uppercase font-mono">Chiffre d'Affaires Prévi.</div>
                        <div className="text-sm font-bold text-white font-mono mt-1">
                          {formatPrice(analysis.projectedRevenueMAD)}
                        </div>
                      </div>

                      <div className="p-3.5 bg-[#161821] rounded-xl border border-[#272a36]">
                        <div className="text-[10px] text-neutral-400 uppercase font-mono">Marge Opérationnelle</div>
                        <div className="text-sm font-bold text-emerald-400 font-mono mt-1">
                          {analysis.projectedNetMarginPercent}% net
                        </div>
                      </div>

                      <div className="p-3.5 bg-[#161821] rounded-xl border border-[#272a36]">
                        <div className="text-[10px] text-neutral-400 uppercase font-mono">TRI Investisseur Cible</div>
                        <div className="text-sm font-bold text-[#c5a059] font-mono mt-1">
                          {analysis.targetIRR}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Collapsible Deep Analysis: Milestones, Banking Guarantees, Legal Audits */}
                {isExpanded ? (
                  <div className="mt-6 pt-6 border-t border-[#222530] space-y-6">
                    {/* Legal & Banking Guarantees */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-[#161822] rounded-xl border border-[#2a2e3a] space-y-1">
                        <div className="text-xs font-bold text-[#c5a059] flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Garantie Bancaire d'Achèvement (GFA)</span>
                        </div>
                        <div className="text-xs text-white font-medium">{analysis.bankGuarantor || 'Banque Agréée Bank Al-Maghrib'}</div>
                        <p className="text-[11px] text-neutral-400 leading-snug">
                          Engagement ferme bancaire couvrant le financement total d'achèvement des travaux sous loi 44-00 VEFA.
                        </p>
                      </div>

                      <div className="p-4 bg-[#161822] rounded-xl border border-[#2a2e3a] space-y-1">
                        <div className="text-xs font-bold text-[#c5a059] flex items-center gap-1.5">
                          <FileText className="w-4 h-4" />
                          <span>Notaire & Compte Séquestre</span>
                        </div>
                        <div className="text-xs text-white font-medium">{analysis.notaryOffice || 'Étude Notariale Référente'}</div>
                        <p className="text-[11px] text-neutral-400 leading-snug">
                          Dépôt des avances acquéreurs sur compte spécial bloqué conformément au code des obligations et contrats.
                        </p>
                      </div>

                      <div className="p-4 bg-[#161822] rounded-xl border border-[#2a2e3a] space-y-1">
                        <div className="text-xs font-bold text-[#c5a059] flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4" />
                          <span>Promoteur & Architecte</span>
                        </div>
                        <div className="text-xs text-white font-medium">{analysis.developerName}</div>
                        <p className="text-[11px] text-neutral-400 leading-snug">
                          Conception : {analysis.architect || 'Ordre National des Architectes du Maroc'}.
                        </p>
                      </div>
                    </div>

                    {/* Timeline of Construction Milestones */}
                    {analysis.keyMilestones && analysis.keyMilestones.length > 0 && (
                      <div className="bg-[#151720] rounded-2xl p-5 border border-[#262934] space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#c5a059]" />
                          <span>Jalons Stratégiques & Calendrier d'Exécution du Chantier</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                          {analysis.keyMilestones.map((m, idx) => (
                            <div 
                              key={idx} 
                              className={`p-3 rounded-xl border flex flex-col justify-between text-xs ${
                                m.completed 
                                  ? 'bg-[#18231e] border-emerald-800/60 text-emerald-200' 
                                  : 'bg-[#181a22] border-[#292c38] text-neutral-400'
                              }`}
                            >
                              <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                                <span>{m.date}</span>
                                {m.completed ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                                )}
                              </div>
                              <div className="font-semibold text-white leading-snug">{m.title}</div>
                              <div className="text-[10px] mt-2 font-mono">
                                {m.completed ? 'Validé' : 'À venir'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Card Bottom Action Bar */}
                <div className="mt-6 pt-5 border-t border-[#222530] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => setExpandedAnalysisId(isExpanded ? null : opp.id)}
                    className="text-xs text-[#c5a059] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Masquer l\'audit détaillé' : 'Déplier l\'analyse financière & jalons techniques'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? '-rotate-90' : 'rotate-90'}`} />
                  </button>

                  <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={() => setVisitModalOpportunity(opp)}
                      className="flex-1 sm:flex-none px-4 py-2.5 bg-[#1b1e27] hover:bg-[#252834] text-neutral-200 text-xs font-semibold rounded-xl border border-[#2d313d] transition-colors"
                    >
                      Planifier Visite Chantier
                    </button>

                    <button
                      onClick={() => setDossierModalOpportunity(opp)}
                      className="flex-1 sm:flex-none px-5 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Accès Data-Room & Dossier VEFA</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 5. Promoter Submission Callout for Moroccan Developers */}
      <div className="bg-[#121419] border border-[#2a2d36] rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 gold-glow">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a1d26] rounded-full text-xs text-[#c5a059] font-medium border border-[#2f3340]">
            <Building2 className="w-3.5 h-3.5" />
            <span>Partenariat Promoteurs & Développeurs Marocains</span>
          </div>

          <h3 className="text-2xl font-serif-luxury font-bold text-white">
            Vous portez un programme immobilier en cours de développement ?
          </h3>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
            AGA Projects référence vos programmes neufs et recherche pour vous des investisseurs institutionnels, co-promoteurs ou acquéreurs de blocs qualifiés.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('submit-project')}
          className="px-6 py-3.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-[#c5a059]/25 shrink-0"
        >
          Déposer un Programme Immobilier
        </button>
      </div>
    </div>
  );
};
