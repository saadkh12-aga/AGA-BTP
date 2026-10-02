import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from '../components/OpportunityCard';
import { Hotel, Sparkles, Compass, ShieldCheck, ArrowRight } from 'lucide-react';

export const HotelsTourismPage: React.FC = () => {
  const { opportunities, setActiveTab, t } = useApp();
  const [tourismFilter, setTourismFilter] = useState<'all' | 'resort' | 'hotel_operating' | 'hotel_renovation' | 'tourist_residence'>('all');

  // Filter hospitality assets
  const hotelOpps = opportunities.filter(opp => {
    const isTourism = opp.category === 'hotel' || opp.subType.includes('hotel') || opp.subType === 'resort' || opp.subType === 'tourist_residence';
    if (!isTourism) return false;
    if (tourismFilter === 'all') return true;
    return opp.subType === tourismFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#171920] rounded-full border border-[#c5a059]/40 text-xs font-semibold text-[#f5dfa5] uppercase">
          <Hotel className="w-4 h-4 text-[#c5a059]" />
          <span>DÉPARTEMENT HÔTELLERIE & TOURISME MAROC</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-tight">
          Hôtels & Projets Touristiques
        </h1>
        <p className="text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Le Maroc bénéficie d'une dynamique touristique d'envergure mondiale soutenue par la Coupe du Monde 2030. Notre cabinet accompagne les groupes hôteliers et investisseurs dans l'acquisition de murs, fonds et projets en développement.
        </p>
      </div>

      {/* Sub-categories pill tabs (Clean functional buttons) */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#242730] pb-6">
        <button
          onClick={() => setTourismFilter('all')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
            tourismFilter === 'all'
              ? 'bg-[#c5a059] text-black border-[#c5a059]'
              : 'bg-[#15171d] text-neutral-300 border-[#2a2d36] hover:border-neutral-500'
          }`}
        >
          Tous les Actifs Hôteliers ({hotelOpps.length})
        </button>
        <button
          onClick={() => setTourismFilter('resort')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
            tourismFilter === 'resort'
              ? 'bg-[#c5a059] text-black border-[#c5a059]'
              : 'bg-[#15171d] text-neutral-300 border-[#2a2d36] hover:border-neutral-500'
          }`}
        >
          Resorts & Hôtels en Exploitation
        </button>
        <button
          onClick={() => setTourismFilter('hotel_renovation')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
            tourismFilter === 'hotel_renovation'
              ? 'bg-[#c5a059] text-black border-[#c5a059]'
              : 'bg-[#15171d] text-neutral-300 border-[#2a2d36] hover:border-neutral-500'
          }`}
        >
          Hôtels à Rénover & Repositionner
        </button>
        <button
          onClick={() => setTourismFilter('tourist_residence')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
            tourismFilter === 'tourist_residence'
              ? 'bg-[#c5a059] text-black border-[#c5a059]'
              : 'bg-[#15171d] text-neutral-300 border-[#2a2d36] hover:border-neutral-500'
          }`}
        >
          Éco-Resorts & Résidences de Tourisme
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotelOpps.map(opp => (
          <OpportunityCard key={opp.id} opportunity={opp} />
        ))}
      </div>

      {/* Specialized hospitality advisory block */}
      <div className="bg-gradient-to-r from-[#171922] via-[#1a1c25] to-[#171922] border border-[#2f3340] rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 gold-glow">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs uppercase tracking-wider text-[#c5a059] font-bold">
            Conseil en Transactions Hôtelières
          </div>
          <h3 className="text-2xl font-serif-luxury font-bold text-white">
            Vous souhaitez acquérir ou céder un établissement hôtelier au Maroc ?
          </h3>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Nous intervenons sur l'ensemble de la chaîne de valeur : valorisation DCF, négociation de contrats de management avec enseignes internationales, audit des licences d'exploitation et montage de partenariats en murs et fonds.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('investors')}
            className="px-6 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            Déposer Mandat Hôtelier
          </button>
          <button
            onClick={() => setActiveTab('submit-project')}
            className="px-6 py-3 bg-[#242732] hover:bg-[#2e313f] text-white border border-[#3b4050] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
          >
            Proposer un Projet Hôtelier
          </button>
        </div>
      </div>
    </div>
  );
};
