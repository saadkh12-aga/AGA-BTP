import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from '../components/OpportunityCard';
import { AgaEmblem } from '../components/AgaLogo';
import { 
  User, 
  Bookmark, 
  Calendar, 
  FileText, 
  Lock, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export const ClientPortalPage: React.FC = () => {
  const { 
    opportunities, 
    savedOpportunities, 
    investorProfiles, 
    visitRequests, 
    confidentialRequests, 
    findMatchingOpportunities,
    formatPrice,
    setActiveTab,
    setSelectedOpportunity
  } = useApp();

  const [activePortalTab, setActivePortalTab] = useState<'matching' | 'saved' | 'visits' | 'dossiers' | 'profile'>('matching');
  const activeProfile = investorProfiles[0] || {
    fullName: 'Investisseur Invité',
    company: 'Capital Partners',
    country: 'Maroc',
    budgetMinMAD: 30000000,
    budgetMaxMAD: 120000000,
    targetCities: ['Marrakech', 'Casablanca'],
    sectors: ['Hôtellerie', 'Résidentiel'],
  };

  const matchingOpps = findMatchingOpportunities(activeProfile);
  const bookmarkedOpps = opportunities.filter(o => savedOpportunities.includes(o.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Profile Summary */}
      <div className="bg-[#121419] border border-[#272a33] rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 gold-glow">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#171922] border border-[#313542] flex items-center justify-center p-2 shrink-0">
            <AgaEmblem size={38} />
          </div>
          <div>
            <div className="text-xs text-[#c5a059] uppercase font-semibold tracking-wider font-mono">
              PORTAIL INVESTISSEUR PRIVILÉGIÉ
            </div>
            <h1 className="text-2xl font-serif-luxury font-bold text-white">
              {activeProfile.fullName}
            </h1>
            <div className="text-xs text-neutral-400 mt-0.5">
              {activeProfile.company || 'Investisseur Privé'} · Résidence : {activeProfile.country}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('investors')}
            className="px-4 py-2 bg-[#1b1d24] hover:bg-[#232630] border border-[#30333d] text-xs font-semibold text-neutral-200 rounded-xl transition-colors"
          >
            Mettre à jour mes critères
          </button>
          <a
            href="https://wa.me/212762387255"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contacter mon Associé Dédié</span>
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#242730] pb-4">
        <button
          onClick={() => setActivePortalTab('matching')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-2 ${
            activePortalTab === 'matching'
              ? 'bg-[#c5a059] text-black border-[#c5a059]'
              : 'bg-[#15171d] text-neutral-300 border-[#2a2d36] hover:border-neutral-500'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Opportunités Correspondantes ({matchingOpps.length})</span>
        </button>

        <button
          onClick={() => setActivePortalTab('saved')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-2 ${
            activePortalTab === 'saved'
              ? 'bg-[#c5a059] text-black border-[#c5a059]'
              : 'bg-[#15171d] text-neutral-300 border-[#2a2d36] hover:border-neutral-500'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Biens Sauvegardés ({bookmarkedOpps.length})</span>
        </button>

        <button
          onClick={() => setActivePortalTab('visits')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-2 ${
            activePortalTab === 'visits'
              ? 'bg-[#c5a059] text-black border-[#c5a059]'
              : 'bg-[#15171d] text-neutral-300 border-[#2a2d36] hover:border-neutral-500'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Demandes de Visite ({visitRequests.length})</span>
        </button>

        <button
          onClick={() => setActivePortalTab('dossiers')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-2 ${
            activePortalTab === 'dossiers'
              ? 'bg-[#c5a059] text-black border-[#c5a059]'
              : 'bg-[#15171d] text-neutral-300 border-[#2a2d36] hover:border-neutral-500'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Dossiers Confidentiels & NDA ({confidentialRequests.length})</span>
        </button>

        <button
          onClick={() => setActivePortalTab('profile')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-2 ${
            activePortalTab === 'profile'
              ? 'bg-[#c5a059] text-black border-[#c5a059]'
              : 'bg-[#15171d] text-neutral-300 border-[#2a2d36] hover:border-neutral-500'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Mon Profil & Critères</span>
        </button>
      </div>

      {/* Content depending on selected portal tab */}
      {activePortalTab === 'matching' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif-luxury text-white">
              Actifs Filtrés par l'Algorithme de Matching
            </h2>
            <div className="text-xs text-neutral-400">
              Ciblage : Tranche {formatPrice(activeProfile.budgetMinMAD || 20000000)} — {formatPrice(activeProfile.budgetMaxMAD || 100000000)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingOpps.map(opp => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        </div>
      )}

      {activePortalTab === 'saved' && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif-luxury text-white">
            Vos Biens et Projets Mis en Favoris
          </h2>

          {bookmarkedOpps.length === 0 ? (
            <div className="p-12 text-center bg-[#131519] border border-[#242730] rounded-2xl space-y-3">
              <Bookmark className="w-8 h-8 text-neutral-500 mx-auto" />
              <div className="text-base text-white font-medium">Aucun bien enregistré pour l'instant</div>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Cliquez sur l'icône de signet en haut à droite des fiches d'opportunités pour conserver une sélection.
              </p>
              <button
                onClick={() => setActiveTab('opportunities')}
                className="px-5 py-2 bg-[#c5a059] text-black text-xs font-semibold rounded-xl"
              >
                Explorer le Catalogue
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedOpps.map(opp => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>
          )}
        </div>
      )}

      {activePortalTab === 'visits' && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif-luxury text-white">
            Historique & Suivi des Demandes de Visite
          </h2>

          <div className="space-y-3">
            {visitRequests.map(req => (
              <div
                key={req.id}
                className="p-5 bg-[#14161c] border border-[#282b35] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="text-xs font-semibold text-[#c5a059]">{req.opportunityTitle}</div>
                  <div className="text-sm font-medium text-white mt-1">
                    Visite demandée pour le <strong className="text-[#f5dfa5] font-mono">{req.desiredDate} à {req.desiredTime}</strong>
                  </div>
                  {req.message && (
                    <div className="text-xs text-neutral-400 mt-1 italic">« {req.message} »</div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-md text-xs font-semibold ${
                    req.status === 'Confirmée' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activePortalTab === 'dossiers' && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif-luxury text-white">
            Dossiers d'Investissement & Accords NDA Signés
          </h2>

          <div className="space-y-3">
            {confidentialRequests.map(req => (
              <div
                key={req.id}
                className="p-5 bg-[#14161c] border border-[#282b35] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="text-xs font-semibold text-[#c5a059] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>{req.opportunityTitle}</span>
                  </div>
                  <div className="text-xs text-neutral-300 mt-1">
                    Demandé sous le profil : <strong>{req.profileType}</strong> ({req.country})
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5 font-mono">
                    Protocole NDA paraphé le {req.createdAt}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-md text-xs font-semibold ${
                    req.status === 'Approuvé' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {req.status}
                  </span>

                  {req.status === 'Approuvé' && (
                    <button
                      onClick={() => alert(`Accès chiffré déverrouillé pour ${req.opportunityTitle}. Le dossier technique complet est consultable.`)}
                      className="px-3.5 py-1.5 bg-[#c5a059] text-black text-xs font-bold rounded-lg"
                    >
                      Consulter les Pièces
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activePortalTab === 'profile' && (
        <div className="bg-[#14161c] border border-[#282b35] rounded-2xl p-6 lg:p-8 max-w-3xl space-y-6">
          <h2 className="text-xl font-serif-luxury text-white">
            Paramètres du Profil Investisseur
          </h2>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#181a22] rounded-xl border border-[#282b35]">
              <span className="text-neutral-500 font-mono block mb-1">Nom du Titulaire</span>
              <strong className="text-white text-sm">{activeProfile.fullName}</strong>
            </div>

            <div className="p-4 bg-[#181a22] rounded-xl border border-[#282b35]">
              <span className="text-neutral-500 font-mono block mb-1">Entité</span>
              <strong className="text-white text-sm">{activeProfile.company || 'Privé'}</strong>
            </div>

            <div className="p-4 bg-[#181a22] rounded-xl border border-[#282b35]">
              <span className="text-neutral-500 font-mono block mb-1">Fourchette Budgétaire</span>
              <strong className="text-[#f5dfa5] font-mono text-sm">
                {formatPrice(activeProfile.budgetMinMAD || 20000000)} — {formatPrice(activeProfile.budgetMaxMAD || 100000000)}
              </strong>
            </div>

            <div className="p-4 bg-[#181a22] rounded-xl border border-[#282b35]">
              <span className="text-neutral-500 font-mono block mb-1">Zones d'Intérêt</span>
              <strong className="text-white text-sm">
                {(activeProfile.targetCities || ['Marrakech', 'Casablanca']).join(', ')}
              </strong>
            </div>
          </div>

          <div className="pt-4 border-t border-[#262832]">
            <button
              onClick={() => setActiveTab('investors')}
              className="px-6 py-2.5 bg-[#c5a059] text-black font-semibold text-xs rounded-xl"
            >
              Éditer les Paramètres Mandat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
