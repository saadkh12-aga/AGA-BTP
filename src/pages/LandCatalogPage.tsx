import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from '../components/OpportunityCard';
import { Trees, Compass, ShieldCheck } from 'lucide-react';

export const LandCatalogPage: React.FC = () => {
  const { opportunities, setActiveTab } = useApp();
  const [landFilter, setLandFilter] = useState<string>('all');

  const landOpps = opportunities.filter(opp => {
    const isLand = opp.category === 'land' || opp.subType.includes('land');
    if (!isLand) return false;
    if (landFilter === 'all') return true;
    return opp.subType === landFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#171920] rounded-full border border-[#c5a059]/40 text-xs font-semibold text-[#f5dfa5] uppercase">
          <Trees className="w-4 h-4 text-[#c5a059]" />
          <span>FONCIER STRATÉGIQUE & TERRAINS AU MAROC</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-tight">
          Catalogue Professionnel des Terrains
        </h1>
        <p className="text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Sélection exclusive de parcelles titrées, vérifiées auprès de la Conservation Foncière et adaptées aux aménagements résidentiels, hôteliers, commerciaux ou industriels.
        </p>
      </div>

      {/* Categories Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#242730] pb-6">
        <button
          onClick={() => setLandFilter('all')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
            landFilter === 'all'
              ? 'bg-[#c5a059] text-black border-[#c5a059]'
              : 'bg-[#15171d] text-neutral-300 border-[#2a2d36] hover:border-neutral-500'
          }`}
        >
          Tous les Terrains ({landOpps.length})
        </button>
        <button
          onClick={() => setLandFilter('land_tourist')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
            landFilter === 'land_tourist'
              ? 'bg-[#c5a059] text-black border-[#c5a059]'
              : 'bg-[#15171d] text-neutral-300 border-[#2a2d36] hover:border-neutral-500'
          }`}
        >
          Terrain Touristique & Côtier
        </button>
        <button
          onClick={() => setLandFilter('land_industrial')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
            landFilter === 'land_industrial'
              ? 'bg-[#c5a059] text-black border-[#c5a059]'
              : 'bg-[#15171d] text-neutral-300 border-[#2a2d36] hover:border-neutral-500'
          }`}
        >
          Terrain Industriel & Logistique
        </button>
        <button
          onClick={() => setLandFilter('land_agricultural')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
            landFilter === 'land_agricultural'
              ? 'bg-[#c5a059] text-black border-[#c5a059]'
              : 'bg-[#15171d] text-neutral-300 border-[#2a2d36] hover:border-neutral-500'
          }`}
        >
          Domaine Rural & Agricole (VNA)
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {landOpps.map(opp => (
          <OpportunityCard key={opp.id} opportunity={opp} />
        ))}
      </div>

      {/* Land Sourcing Box */}
      <div className="bg-[#14161c] border border-[#2b2e38] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 gold-glow">
        <div>
          <h3 className="text-xl font-serif-luxury font-bold text-white mb-1">
            Vous détenez une assiette foncière ou cherchez un terrain spécifique ?
          </h3>
          <p className="text-xs text-neutral-400 max-w-xl">
            Notre cabinet procède à l'étude d'urbanisme (CUS, COS, hauteur sous plafond) et met votre terrain en relation directe avec les promoteurs les plus solides du marché.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('sell')}
            className="px-6 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            Proposer un Terrain
          </button>
        </div>
      </div>
    </div>
  );
};
