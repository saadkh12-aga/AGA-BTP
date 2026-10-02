import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from '../components/OpportunityCard';
import { Building2, Layers, ArrowRight } from 'lucide-react';

export const RealEstateProjectsPage: React.FC = () => {
  const { opportunities, setActiveTab } = useApp();
  const [projectFilter, setProjectFilter] = useState<'all' | 'mixed_use' | 'villa'>('all');

  const projectOpps = opportunities.filter(opp => {
    if (opp.category !== 'project') return false;
    if (projectFilter === 'all') return true;
    return opp.subType === projectFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#171920] rounded-full border border-[#c5a059]/40 text-xs font-semibold text-[#f5dfa5] uppercase">
          <Layers className="w-4 h-4 text-[#c5a059]" />
          <span>PROMOTIONS, CO-DÉVELOPPEMENT & PROGRAMMES MIXTES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-tight">
          Projets Immobiliers & Co-Développement
        </h1>
        <p className="text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Programmes résidentiels de grand standing, complexes mixtes et lotissements autorisés en recherche de financements, de co-promoteurs ou d'investisseurs de premier rang.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectOpps.map(opp => (
          <OpportunityCard key={opp.id} opportunity={opp} />
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-[#121419] border border-[#2a2d36] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 gold-glow">
        <div>
          <h3 className="text-xl font-serif-luxury font-bold text-white mb-1">
            Vous êtes promoteur immobilier au Maroc ?
          </h3>
          <p className="text-xs text-neutral-400 max-w-xl">
            Présentez vos programmes en quête de co-financement ou confiez la commercialisation globale de vos programmes neufs en VEFA auprès de notre réseau international.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('submit-project')}
          className="px-6 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0"
        >
          Présenter Mon Programme
        </button>
      </div>
    </div>
  );
};
