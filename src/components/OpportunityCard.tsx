import React from 'react';
import { Opportunity } from '../types';
import { useApp } from '../context/AppContext';
import { MapPin, ArrowRight, Bookmark, Lock, FileText, Calendar, Edit3 } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const { 
    setSelectedOpportunity, 
    setVisitModalOpportunity, 
    setDossierModalOpportunity, 
    formatPrice, 
    savedOpportunities, 
    toggleSaveOpportunity,
    isAdmin,
    setEditingOpportunity,
    lang,
    t
  } = useApp();

  const isSaved = savedOpportunities.includes(opportunity.id);

  const displayTitle = lang === 'ar' ? opportunity.titleAr : (lang === 'en' ? opportunity.titleEn : opportunity.title);
  const displayDesc = lang === 'ar' ? opportunity.shortDescriptionAr : (lang === 'en' ? opportunity.shortDescriptionEn : opportunity.shortDescription);

  return (
    <div className="group bg-[#131519] border border-[#242730] hover:border-[#c5a059]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-[#000000]/60">
      {/* Visual Carrier */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0c0d0e]">
        <img
          src={opportunity.mainImage}
          alt={displayTitle}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Top Badges / Indicators */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {opportunity.isConfidential ? (
              <span className="flex items-center gap-1.5 bg-[#000000]/80 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-[#f5dfa5] border border-[#c5a059]/40 rounded-md">
                <Lock className="w-3 h-3 text-[#c5a059]" />
                <span>OFF-MARKET · SOUS NDA</span>
              </span>
            ) : (
              <span className="bg-[#000000]/70 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-neutral-200 border border-[#333742] rounded-md">
                {opportunity.status}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingOpportunity(opportunity);
                }}
                title="Modifier cette publication (Admin)"
                className="px-2 py-1.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-[11px] rounded-lg shadow-md flex items-center gap-1 transition-all"
              >
                <Edit3 className="w-3 h-3" />
                <span>Éditer</span>
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveOpportunity(opportunity.id);
              }}
              aria-label="Enregistrer le bien"
              className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                isSaved 
                  ? 'bg-[#c5a059] text-black' 
                  : 'bg-[#000000]/60 text-white hover:bg-[#000000]/80 border border-white/10'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isSaved ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Bottom Image Overlay: Price */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <div className="text-[11px] text-neutral-300 uppercase tracking-widest font-mono">
              VALORISATION
            </div>
            <div className="text-lg md:text-xl font-bold text-white font-mono drop-shadow-md">
              {formatPrice(opportunity.priceMAD, opportunity.priceDisplay, opportunity.priceMaxMAD)}
            </div>
          </div>

          <div className="text-xs text-neutral-300 font-mono">
            {opportunity.surfaceM2.toLocaleString('fr-FR')} m²
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata unboxed text (anti-slop Zero-Pill) */}
          <div className="flex items-center gap-2 text-xs text-[#c5a059] font-medium mb-1.5">
            <span>{opportunity.subTypeLabel}</span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span className="flex items-center gap-1 text-neutral-400">
              <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
              {opportunity.city} ({opportunity.region.split('-')[0]})
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => setSelectedOpportunity(opportunity)}
            className="text-lg font-serif-luxury font-semibold text-white group-hover:text-[#f7dfa5] transition-colors line-clamp-2 cursor-pointer mb-2"
          >
            {displayTitle}
          </h3>

          {/* Description */}
          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
            {displayDesc}
          </p>

          {/* Key Metric / Investment Potential Highlight */}
          <div className="bg-[#191b22] border border-[#272b35] rounded-xl p-3 mb-4">
            <div className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider mb-1">
              Potentiel & Rendement :
            </div>
            <div className="text-xs text-neutral-200 line-clamp-2">
              {opportunity.investmentPotential}
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-3 border-t border-[#22252c] flex items-center gap-2">
          <button
            onClick={() => setSelectedOpportunity(opportunity)}
            className="flex-1 py-2.5 px-3 bg-[#1d2027] hover:bg-[#252832] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#2e323e]"
          >
            <FileText className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.btnViewDossier}</span>
          </button>

          <button
            onClick={() => {
              if (opportunity.isConfidential) {
                setDossierModalOpportunity(opportunity);
              } else {
                setVisitModalOpportunity(opportunity);
              }
            }}
            className="flex-1 py-2.5 px-3 bg-[#c5a059] hover:bg-[#d4af37] text-black rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            {opportunity.isConfidential ? (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span className="truncate">Accès NDA</span>
              </>
            ) : (
              <>
                <Calendar className="w-3.5 h-3.5" />
                <span className="truncate">Visite / Contact</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
