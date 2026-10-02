import React from 'react';
import { useApp } from '../context/AppContext';
import { Lock, ShieldCheck, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ConfidentialPage: React.FC = () => {
  const { opportunities, setDossierModalOpportunity, formatPrice, t, lang } = useApp();

  const confidentialOpps = opportunities.filter(opp => opp.isConfidential);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1f1a10] rounded-full border border-[#c5a059]/50 text-xs font-semibold text-[#f5dfa5] uppercase">
          <Lock className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>PORTFOLIO HORS MARCHÉ (OFF-MARKET) SOUS NDA</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-tight">
          Opportunités Confidentielles
        </h1>
        <p className="text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Certains propriétaires, institutions et familles confient leurs actifs à la vente sous mandat strictement privé. Pour préserver leur exploitation et leur réputation, seuls les éléments structurants sont présentés ci-dessous.
        </p>
      </div>

      {/* NDA Notice */}
      <div className="max-w-4xl mx-auto p-5 bg-[#15171d] border border-[#2b2e38] rounded-2xl flex items-center gap-4 text-xs text-neutral-400">
        <ShieldCheck className="w-8 h-8 text-[#c5a059] shrink-0" />
        <div className="leading-relaxed">
          <strong className="text-white font-semibold">Protocole d'Accès Sécurisé :</strong> L'accès aux bilans audités, à l'adresse cadastrale exacte et aux visites sur site requiert la validation préalable de votre profil investisseur et la signature d'un accord bilatéral de confidentialité (NDA).
        </div>
      </div>

      {/* Confidential Cards Grid (As required by Prompt Section 16) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {confidentialOpps.map(opp => {
          const teaser = opp.confidentialTeaser || {
            region: opp.region,
            type: opp.subTypeLabel,
            approxSurface: `${opp.surfaceM2.toLocaleString('fr-FR')} m²`,
            approxBudget: formatPrice(opp.priceMAD, 'range', opp.priceMAD * 1.15),
            investmentType: 'Acquisition Murs & Fonds'
          };

          return (
            <div 
              key={opp.id} 
              className="bg-[#121419] border border-[#2e313b] hover:border-[#c5a059]/60 rounded-2xl p-7 gold-glow transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#f5dfa5] bg-[#1d1b14] px-3 py-1 rounded-md border border-[#c5a059]/30">
                    <Lock className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>OPPORTUNITÉ CONFIDENTIELLE #{opp.id.toUpperCase()}</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">{opp.publishedAt}</span>
                </div>

                <h3 className="text-xl font-serif-luxury font-bold text-white">
                  {teaser.type}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {opp.shortDescription}
                </p>

                {/* Structured Teaser Data (Section 16 Specification) */}
                <div className="grid grid-cols-2 gap-3 p-4 bg-[#181a22] rounded-xl border border-[#272b35] text-xs">
                  <div>
                    <span className="text-neutral-500 font-mono block text-[10px] uppercase">Région</span>
                    <strong className="text-neutral-200">{teaser.region}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono block text-[10px] uppercase">Type d'Investissement</span>
                    <strong className="text-neutral-200">{teaser.investmentType}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono block text-[10px] uppercase">Surface Approximative</span>
                    <strong className="text-neutral-200">{teaser.approxSurface}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-mono block text-[10px] uppercase">Budget Indicatif</span>
                    <strong className="text-[#f5dfa5] font-mono">{teaser.approxBudget}</strong>
                  </div>
                </div>

                {opp.roiEstimated && (
                  <div className="text-xs text-[#c5a059] font-mono">
                    ★ <strong>Indicateur de Rentabilité :</strong> {opp.roiEstimated}
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-[#242730] flex items-center justify-between">
                <div className="text-[11px] text-neutral-500 font-mono">
                  Dossier soumis à clause d'agrément
                </div>

                <button
                  onClick={() => setDossierModalOpportunity(opp)}
                  className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>DEMANDER L'ACCÈS AU DOSSIER</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
