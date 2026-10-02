import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SearchEngine } from '../components/SearchEngine';
import { OpportunityCard } from '../components/OpportunityCard';
import { MoroccoInteractiveMap } from '../components/MoroccoInteractiveMap';
import { AgaEmblem } from '../components/AgaLogo';
import { 
  Building2, 
  Trees, 
  Hotel, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Compass, 
  TrendingUp, 
  Layers, 
  Users, 
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { opportunities, setActiveTab, setSelectedOpportunity, setSearchFilter, t, lang } = useApp();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'property' | 'land' | 'project' | 'hotel'>('all');

  const filteredOpportunities = opportunities.filter(opp => {
    if (activeCategoryFilter === 'all') return true;
    return opp.category === activeCategoryFilter;
  });

  const confidentialOpps = opportunities.filter(o => o.isConfidential);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-12 overflow-hidden rounded-b-3xl">
        {/* Background Image with Layered Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_morocco_luxury_architecture_1790689581342.jpg"
            alt="Immobilier et Investissement au Maroc"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-[#0c0d0e]/75 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d0e]/60 via-transparent to-[#0c0d0e]/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto space-y-8 pt-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#171920]/90 backdrop-blur-md rounded-full border border-[#c5a059]/40 text-xs font-semibold tracking-widest text-[#f5dfa5] uppercase">
            <AgaEmblem size={22} className="-my-1" />
            <span>AGA PROJECTS · MAROC</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-luxury font-bold text-white tracking-tight leading-[1.1] text-balance">
            {t.heroHeadline}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto font-light leading-relaxed text-balance">
            {t.heroSubhead}
          </p>

          {/* 4 Primary Hero CTAs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4">
            <button
              onClick={() => setActiveTab('opportunities')}
              className="py-3.5 px-4 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-[#c5a059]/30"
            >
              {t.heroCtaBuy}
            </button>

            <button
              onClick={() => setActiveTab('sell')}
              className="py-3.5 px-4 bg-[#1a1c22]/90 hover:bg-[#252830] text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 hover:border-[#c5a059] transition-all backdrop-blur-md"
            >
              {t.heroCtaSell}
            </button>

            <button
              onClick={() => setActiveTab('investors')}
              className="py-3.5 px-4 bg-[#1a1c22]/90 hover:bg-[#252830] text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 hover:border-[#c5a059] transition-all backdrop-blur-md"
            >
              {t.heroCtaInvest}
            </button>

            <button
              onClick={() => setActiveTab('submit-project')}
              className="py-3.5 px-4 bg-[#1a1c22]/90 hover:bg-[#252830] text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 hover:border-[#c5a059] transition-all backdrop-blur-md"
            >
              {t.heroCtaProject}
            </button>
          </div>
        </div>

        {/* Floating Quick Trust Bar at bottom of Hero */}
        <div className="relative z-10 w-full max-w-5xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#121418]/80 backdrop-blur-md border border-[#272a33] rounded-2xl text-left">
          <div className="border-r border-[#22252c] last:border-none pr-3">
            <div className="text-xs text-neutral-400 font-mono">COUVERTURE</div>
            <div className="text-sm font-semibold text-white mt-0.5">12 Régions du Maroc</div>
          </div>
          <div className="border-r border-[#22252c] last:border-none pr-3">
            <div className="text-xs text-neutral-400 font-mono">FONCIER & HÔTELLERIE</div>
            <div className="text-sm font-semibold text-white mt-0.5">Titré & Vérifié</div>
          </div>
          <div className="border-r border-[#22252c] last:border-none pr-3">
            <div className="text-xs text-neutral-400 font-mono">CONFIDENTIALITÉ</div>
            <div className="text-sm font-semibold text-white mt-0.5">Accords NDA stricts</div>
          </div>
          <div>
            <div className="text-xs text-neutral-400 font-mono">CLIENTÈLE</div>
            <div className="text-sm font-semibold text-white mt-0.5">Nationale & Internationale</div>
          </div>
        </div>
      </section>

      {/* 2. MOTEUR DE RECHERCHE IMMOBILIER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <SearchEngine />
      </section>

      {/* 3. SECTION "NOS OPPORTUNITÉS" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#22252c] pb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#c5a059] font-medium mb-1">
              PORTFOLIO SÉLECTIONNÉ
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white">
              {t.secOpportunities}
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-xl">
              {t.secOpportunitiesSub}
            </p>
          </div>

          {/* Interactive Filter Segmented Buttons (Anti-Slop Clean Controls) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#14161b] rounded-xl border border-[#242730]">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'all'
                  ? 'bg-[#c5a059] text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Tous ({opportunities.length})
            </button>
            <button
              onClick={() => setActiveCategoryFilter('property')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'property'
                  ? 'bg-[#c5a059] text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Biens Immobiliers
            </button>
            <button
              onClick={() => setActiveCategoryFilter('land')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'land'
                  ? 'bg-[#c5a059] text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Terrains
            </button>
            <button
              onClick={() => setActiveCategoryFilter('project')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'project'
                  ? 'bg-[#c5a059] text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Projets Immobiliers
            </button>
            <button
              onClick={() => setActiveCategoryFilter('hotel')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeCategoryFilter === 'hotel'
                  ? 'bg-[#c5a059] text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Projets Hôteliers
            </button>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.slice(0, 6).map(opp => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setActiveTab('opportunities')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#16181f] hover:bg-[#1e212b] border border-[#2e313c] hover:border-[#c5a059] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all"
          >
            <span>Voir Toutes les Opportunités ({opportunities.length})</span>
            <ArrowRight className="w-4 h-4 text-[#c5a059]" />
          </button>
        </div>
      </section>

      {/* 4. SECTION SPÉCIALE "INVESTIR AU MAROC" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-b from-[#14161c] to-[#0f1013] border border-[#272a33] rounded-3xl p-8 lg:p-14 overflow-hidden gold-glow">
          <div className="max-w-3xl mb-12">
            <div className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold mb-2">
              VISION & CLIMAT D'AFFAIRES
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white mb-4">
              {t.secInvestInMorocco}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {t.secInvestInMoroccoSub}
            </p>
          </div>

          {/* 4 Pillars Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* 1. Résidentiel */}
            <div className="bg-[#181a22] border border-[#2a2d37] rounded-2xl p-6 hover:border-[#c5a059]/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#232631] text-[#c5a059] flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif-luxury font-semibold text-white mb-2">
                Immobilier Résidentiel
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Villas d'architecte, résidences fermées sécurisées, appartements de grand standing et immeubles locatifs en cœur de métropole.
              </p>
              <div className="text-xs text-neutral-400 space-y-1">
                <div>· Résidences privées d'exception</div>
                <div>· Immeubles de rapport urbains</div>
                <div>· Domaines en villégiature</div>
              </div>
            </div>

            {/* 2. Professionnel */}
            <div className="bg-[#181a22] border border-[#2a2d37] rounded-2xl p-6 hover:border-[#c5a059]/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#232631] text-[#c5a059] flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif-luxury font-semibold text-white mb-2">
                Immobilier Professionnel
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Bureaux éligibles Casablanca Finance City, commerces prime sur artères piétonnes, centres d'affaires et plateformes logistiques.
              </p>
              <div className="text-xs text-neutral-400 space-y-1">
                <div>· Tours tertiaires HQE & BREEAM</div>
                <div>· Locaux commerciaux premium</div>
                <div>· Entrepôts & Hubs logistiques</div>
              </div>
            </div>

            {/* 3. Touristique */}
            <div className="bg-[#181a22] border border-[#2a2d37] rounded-2xl p-6 hover:border-[#c5a059]/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#232631] text-[#c5a059] flex items-center justify-center mb-4">
                <Hotel className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif-luxury font-semibold text-white mb-2">
                Immobilier Touristique
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Hôtels en exploitation, resorts balnéaires, riads de collection en médina et résidences hôtelières sous enseigne internationale.
              </p>
              <div className="text-xs text-neutral-400 space-y-1">
                <div>· Hôtels 4 & 5 étoiles en murs et fonds</div>
                <div>· Resorts pieds dans l'eau</div>
                <div>· Hôtels à repositionner & rénover</div>
              </div>
            </div>

            {/* 4. Foncier */}
            <div className="bg-[#181a22] border border-[#2a2d37] rounded-2xl p-6 hover:border-[#c5a059]/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#232631] text-[#c5a059] flex items-center justify-center mb-4">
                <Trees className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif-luxury font-semibold text-white mb-2">
                Foncier Stratégique
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Grandes parcelles urbaines prêtes à bâtir, réserves foncières touristiques côtières et terrains industriels en zones franches.
              </p>
              <div className="text-xs text-neutral-400 space-y-1">
                <div>· Terrains urbains à fort COS/CUS</div>
                <div>· Foncier balnéaire & touristique</div>
                <div>· Terrains d'aménagement mixtes</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#262832]">
            <div className="text-xs text-neutral-400">
              Accompagnement éligible aux dispositifs de la <strong>Nouvelle Charte de l'Investissement</strong> du Maroc.
            </div>

            <button
              onClick={() => setActiveTab('investors')}
              className="px-6 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              {t.secDiscoverOpportunities}
            </button>
          </div>
        </div>
      </section>

      {/* 5. CARTE INTERACTIVE DU MAROC */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MoroccoInteractiveMap />
      </section>

      {/* 6. NOTRE PROCESSUS EN 6 ÉTAPES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-[#c5a059] font-medium mb-2">
            MÉTHODOLOGIE CABINET
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white">
            {t.secProcessTitle}
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            {t.secProcessSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-[#131519] border border-[#242730] rounded-2xl p-6 relative group hover:border-[#c5a059]/40 transition-colors">
            <div className="text-2xl font-serif-luxury font-bold text-[#c5a059] mb-3">01</div>
            <h3 className="text-lg font-serif-luxury font-semibold text-white mb-2">Écoute & Cadrage</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Comprendre en profondeur les critères d'investissement, le cahier des charges patrimonial, les impératifs fiscaux et le profil de risque du client.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#131519] border border-[#242730] rounded-2xl p-6 relative group hover:border-[#c5a059]/40 transition-colors">
            <div className="text-2xl font-serif-luxury font-bold text-[#c5a059] mb-3">02</div>
            <h3 className="text-lg font-serif-luxury font-semibold text-white mb-2">Recherche & Sourcing</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Mobilisation de notre réseau direct de propriétaires fonciers, promoteurs et mandataires pour identifier des opportunités on-market et off-market.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#131519] border border-[#242730] rounded-2xl p-6 relative group hover:border-[#c5a059]/40 transition-colors">
            <div className="text-2xl font-serif-luxury font-bold text-[#c5a059] mb-3">03</div>
            <h3 className="text-lg font-serif-luxury font-semibold text-white mb-2">Analyse & Due Diligence</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Audit préalable de la situation juridique (conservation foncière), vérification urbanistique, analyse financière et projection des flux de trésorerie.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#131519] border border-[#242730] rounded-2xl p-6 relative group hover:border-[#c5a059]/40 transition-colors">
            <div className="text-2xl font-serif-luxury font-bold text-[#c5a059] mb-3">04</div>
            <h3 className="text-lg font-serif-luxury font-semibold text-white mb-2">Présentation Ciblée</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Remise d'un mémorandum d'investissement structuré et organisation de visites privées sécurisées avec nos associés spécialisés.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-[#131519] border border-[#242730] rounded-2xl p-6 relative group hover:border-[#c5a059]/40 transition-colors">
            <div className="text-2xl font-serif-luxury font-bold text-[#c5a059] mb-3">05</div>
            <h3 className="text-lg font-serif-luxury font-semibold text-white mb-2">Mise en Relation</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Facilitation des échanges directs entre décideurs, négociation des conditions suspensives et alignement des intérêts des parties prenantes.
            </p>
          </div>

          {/* Step 6 */}
          <div className="bg-[#131519] border border-[#242730] rounded-2xl p-6 relative group hover:border-[#c5a059]/40 transition-colors">
            <div className="text-2xl font-serif-luxury font-bold text-[#c5a059] mb-3">06</div>
            <h3 className="text-lg font-serif-luxury font-semibold text-white mb-2">Accompagnement Transactionnel</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Coordination avec les études notariales, les autorités administratives et les banques jusqu'à la signature de l'acte authentique et la prise de possession.
            </p>
          </div>
        </div>
      </section>

      {/* 7. ESPACE "OPPORTUNITÉS CONFIDENTIELLES" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#16140e] border border-[#c5a059]/30 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 rounded-full text-xs text-[#f5dfa5] border border-[#c5a059]/40 font-semibold">
                <Lock className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>OFF-MARKET & PROTOCOLE NDA</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
                Accès aux Dossiers d'Investissement Confidentiels
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Certains actifs de très grande valeur (hôtels en exploitation, participations hôtelières, fonciers diplomatiques) ne font l'objet d'aucune publication publique. Notre cabinet organise leur transmission sous stricte confidentialité.
              </p>
              <div className="text-xs text-neutral-400">
                Actuellement <strong>{confidentialOpps.length} dossiers confidentiels</strong> qualifiés disponibles à l'étude.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => setActiveTab('confidential')}
                className="px-6 py-3.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg"
              >
                Consulter les Teasers Off-Market
              </button>
              <button
                onClick={() => setActiveTab('investor-space')}
                className="px-6 py-3.5 bg-[#201d16] hover:bg-[#2b271d] text-white border border-[#c5a059]/50 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
              >
                Mon Espace Investisseur
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION FINAL */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-6 pt-10">
        <h3 className="text-2xl sm:text-3xl font-serif-luxury text-white">
          Vous Détenez un Actif ou Souhaitez Investir au Maroc ?
        </h3>
        <p className="text-sm text-neutral-400 max-w-xl mx-auto">
          Nos associés sont à votre entière disposition pour un échange confidentiel et sans engagement sur vos projets d'acquisition ou de cession.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="tel:+212762387255"
            className="px-5 py-3 bg-[#171920] hover:bg-[#22252f] text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-[#2d313d] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#c5a059]" />
            <span>Tél : +212 762 387 255</span>
          </a>
          <a
            href="tel:+212602494435"
            className="px-5 py-3 bg-[#171920] hover:bg-[#22252f] text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-[#2d313d] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#c5a059]" />
            <span>Tél : +212 602 494 435</span>
          </a>
          <a
            href="https://wa.me/212762387255"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-lg"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Dédié : +212 762 387 255</span>
          </a>
          <a
            href="mailto:aga.projects@yahoo.com"
            className="px-5 py-3 bg-[#171920] hover:bg-[#22252f] text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-[#2d313d] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#c5a059]" />
            <span className="font-mono text-xs">aga.projects@yahoo.com</span>
          </a>
        </div>
      </section>
    </div>
  );
};
