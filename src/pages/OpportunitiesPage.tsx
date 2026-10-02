import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from '../components/OpportunityCard';
import { SearchEngine } from '../components/SearchEngine';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const OpportunitiesPage: React.FC = () => {
  const { opportunities, searchFilter, setSearchFilter, t } = useApp();
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'surfaceDesc'>('featured');

  // Filter opportunities based on searchFilter
  const filtered = opportunities.filter(opp => {
    // SubType filter
    if (searchFilter.subType !== 'all') {
      if (searchFilter.subType === 'villa' && opp.subType !== 'villa') return false;
      if (searchFilter.subType === 'apartment' && opp.subType !== 'apartment') return false;
      if (searchFilter.subType === 'building' && opp.subType !== 'building') return false;
      if (searchFilter.subType === 'hotel' && opp.category !== 'hotel' && !opp.subType.includes('hotel') && opp.subType !== 'resort') return false;
      if (searchFilter.subType === 'land' && opp.category !== 'land' && !opp.subType.includes('land')) return false;
      if (searchFilter.subType === 'project' && opp.category !== 'project') return false;
      if (searchFilter.subType === 'commercial' && opp.subType !== 'commercial') return false;
      if (searchFilter.subType === 'office' && opp.subType !== 'office') return false;
    }

    // City filter
    if (searchFilter.city !== 'all' && !opp.city.toLowerCase().includes(searchFilter.city.toLowerCase())) {
      return false;
    }

    // Min price
    if (searchFilter.minPrice && opp.priceMAD < searchFilter.minPrice) {
      return false;
    }

    // Max price
    if (searchFilter.maxPrice && opp.priceMAD > searchFilter.maxPrice) {
      return false;
    }

    // Min surface
    if (searchFilter.minSurface && opp.surfaceM2 < searchFilter.minSurface) {
      return false;
    }

    // Max surface
    if (searchFilter.maxSurface && opp.surfaceM2 > searchFilter.maxSurface) {
      return false;
    }

    // Search keyword
    if (searchFilter.searchKeyword.trim() !== '') {
      const q = searchFilter.searchKeyword.toLowerCase();
      const match = 
        opp.title.toLowerCase().includes(q) ||
        opp.city.toLowerCase().includes(q) ||
        opp.region.toLowerCase().includes(q) ||
        opp.shortDescription.toLowerCase().includes(q) ||
        opp.legalStatus.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.priceMAD - b.priceMAD;
    if (sortBy === 'priceDesc') return b.priceMAD - a.priceMAD;
    if (sortBy === 'surfaceDesc') return b.surfaceM2 - a.surfaceM2;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold">
          CATALOGUE D'OPPORTUNITÉS IMMOBILIÈRES & PROJETS
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-white">
          Actifs & Projets Sélectionnés au Maroc
        </h1>
        <p className="text-sm text-neutral-400">
          Chaque dossier est validé au regard de sa situation foncière, son potentiel de rentabilité et sa conformité avec les réglementations urbanistiques locales.
        </p>
      </div>

      {/* Search Engine Bar */}
      <SearchEngine />

      {/* Results Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#26282e] pb-4">
        <div className="text-sm text-neutral-300 font-mono">
          <strong className="text-white text-base">{sorted.length}</strong> {t.searchResultsCount}
        </div>

        <div className="flex items-center gap-3">
          <ArrowUpDown className="w-4 h-4 text-neutral-400" />
          <span className="text-xs text-neutral-400">Trier par :</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#181a1f] border border-[#2e313b] text-xs text-white rounded-lg px-3 py-1.5 outline-none cursor-pointer"
          >
            <option value="featured">Sélection en vedette</option>
            <option value="priceDesc">Prix décroissant</option>
            <option value="priceAsc">Prix croissant</option>
            <option value="surfaceDesc">Surface décroissante</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {sorted.length === 0 ? (
        <div className="p-12 text-center bg-[#131519] border border-[#242730] rounded-2xl space-y-4">
          <div className="text-lg font-serif-luxury text-white">Aucun actif ne correspond exactement à vos filtres</div>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Notre réseau dispose de dossiers sous mandat exclusif qui ne sont pas référencés publiquement. Vous pouvez enregistrer votre recherche personnalisée.
          </p>
          <button
            onClick={() => setSearchFilter({ intention: 'all', subType: 'all', city: 'all', region: 'all', minPrice: null, maxPrice: null, minSurface: null, maxSurface: null, searchKeyword: '' })}
            className="px-6 py-2.5 bg-[#c5a059] text-black font-semibold text-xs rounded-xl"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map(opp => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      )}
    </div>
  );
};
