import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AgaEmblem } from './AgaLogo';
import { 
  X, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  FileText, 
  Calendar, 
  Lock, 
  Phone, 
  Mail,
  MessageSquare, 
  Download, 
  Share2,
  CheckCircle2,
  Layers,
  ChevronRight,
  Edit3
} from 'lucide-react';

export const OpportunityDetailModal: React.FC = () => {
  const { 
    selectedOpportunity, 
    setSelectedOpportunity, 
    setVisitModalOpportunity, 
    setDossierModalOpportunity,
    formatPrice,
    isAdmin,
    setEditingOpportunity,
    lang,
    t
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  if (!selectedOpportunity) return null;

  const opp = selectedOpportunity;
  const displayTitle = lang === 'ar' ? opp.titleAr : (lang === 'en' ? opp.titleEn : opp.title);
  const displayDesc = lang === 'ar' ? opp.shortDescriptionAr : (lang === 'en' ? opp.shortDescriptionEn : opp.fullDescription);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div className="relative bg-[#111317] border border-[#2d3039] rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden gold-glow">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#22252c] bg-[#14161b]">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="text-[#c5a059] font-semibold">{opp.subTypeLabel}</span>
            <span>·</span>
            <span>{opp.city}</span>
            <span>·</span>
            <span className="font-mono text-neutral-500">RÉF: {opp.slug.slice(0, 14).toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-neutral-400 hover:text-white hover:bg-[#20232b] rounded-lg transition-colors text-xs flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedShare ? 'Lien copié !' : 'Partager'}</span>
            </button>
            <button
              onClick={() => setSelectedOpportunity(null)}
              className="p-2 text-neutral-400 hover:text-white hover:bg-[#20232b] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 lg:p-8 space-y-8 flex-1">
          {/* Header Title & Pricing */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{opp.region} · {opp.zone || opp.city}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif-luxury text-white font-semibold leading-tight">
                {displayTitle}
              </h2>
            </div>

            <div className="bg-[#181a20] border border-[#2b2e38] rounded-xl p-4 shrink-0 min-w-[240px]">
              <div className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">
                VALORISATION PROJET
              </div>
              <div className="text-2xl font-bold text-white font-mono mt-1">
                {formatPrice(opp.priceMAD, opp.priceDisplay, opp.priceMaxMAD)}
              </div>
              <div className="text-xs text-[#c5a059] mt-1 font-medium">
                Statut : {opp.status}
              </div>
            </div>
          </div>

          {/* Photo Gallery Viewer */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden bg-black border border-[#262931]">
              <img
                src={opp.gallery[activeImageIndex] || opp.mainImage}
                alt={displayTitle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {opp.isConfidential && (
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#c5a059]/50 text-xs font-semibold text-[#f5dfa5] flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>DOSSIER CONFIDENTIEL SOUS MANDAT EXCLUSIF</span>
                </div>
              )}
            </div>

            {opp.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {opp.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-[#c5a059]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Aperçu" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#16181f] rounded-xl border border-[#272a33]">
            <div>
              <div className="text-[11px] text-neutral-400 uppercase font-mono">Surface Foncier</div>
              <div className="text-lg font-bold text-white font-mono mt-0.5">
                {opp.surfaceM2.toLocaleString('fr-FR')} m²
              </div>
              {opp.surfaceM2 >= 10000 && (
                <div className="text-xs text-neutral-500">{(opp.surfaceM2 / 10000).toFixed(2)} Hectares</div>
              )}
            </div>

            <div>
              <div className="text-[11px] text-neutral-400 uppercase font-mono">Surface Construite</div>
              <div className="text-lg font-bold text-white font-mono mt-0.5">
                {opp.builtSurfaceM2 ? `${opp.builtSurfaceM2.toLocaleString('fr-FR')} m²` : 'Non bâtie / Foncier'}
              </div>
            </div>

            <div>
              <div className="text-[11px] text-neutral-400 uppercase font-mono">Capacité / Unités</div>
              <div className="text-lg font-bold text-white font-mono mt-0.5">
                {opp.rooms ? `${opp.rooms} Chambres / Suites` : (opp.unitsCount ? `${opp.unitsCount} Unités` : 'Sur plan')}
              </div>
            </div>

            <div>
              <div className="text-[11px] text-neutral-400 uppercase font-mono">Situation Juridique</div>
              <div className="text-sm font-semibold text-[#f5dfa5] mt-1 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span className="truncate">{opp.legalStatus}</span>
              </div>
            </div>
          </div>

          {/* Detailed Presentation & Investment Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-serif-luxury font-semibold text-white mb-3">
                  Présentation du Bien & de l'Actif
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                  {displayDesc}
                </p>
              </div>

              {/* Potentiel & ROI */}
              <div className="p-5 bg-[#181b22] border-l-4 border-[#c5a059] rounded-r-xl space-y-2">
                <div className="text-xs uppercase tracking-wider text-[#c5a059] font-bold">
                  Analyse de Potentiel & Thèse d'Investissement
                </div>
                <p className="text-sm text-neutral-200 leading-relaxed">
                  {opp.investmentPotential}
                </p>
                {opp.roiEstimated && (
                  <div className="pt-2 text-xs font-mono text-[#f5dfa5]">
                    ★ <strong>Indicateur de Performance :</strong> {opp.roiEstimated}
                  </div>
                )}
              </div>

              {/* Teaser confidentiel if applicable */}
              {opp.isConfidential && opp.confidentialTeaser && (
                <div className="p-5 bg-[#1d1b14] border border-[#c5a059]/40 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                    <Lock className="w-4 h-4" />
                    <span>Synthèse Off-Market Préalable</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-neutral-400">Région : </span>
                      <strong className="text-white">{opp.confidentialTeaser.region}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400">Type d'opération : </span>
                      <strong className="text-white">{opp.confidentialTeaser.investmentType}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400">Surface approximative : </span>
                      <strong className="text-white">{opp.confidentialTeaser.approxSurface}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400">Fourchette budgétaire : </span>
                      <strong className="text-white">{opp.confidentialTeaser.approxBudget}</strong>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 italic">
                    Les informations complètes (raison sociale, cadastre, bilans fiscaux) sont délivrées après formalisation du mandat et accord de confidentialité.
                  </p>
                </div>
              )}
            </div>

            {/* Documents & Direct Actions Sidebar */}
            <div className="space-y-6">
              {/* Documents box */}
              <div className="bg-[#16181f] border border-[#272a33] rounded-xl p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#c5a059]" />
                  <span>Dossier Documentaire</span>
                </h4>

                <div className="space-y-2">
                  {opp.documentsAvailable.map((doc, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 bg-[#111317] rounded-lg border border-[#22252c] flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-medium text-white truncate">{doc.title}</div>
                        <div className="text-[11px] text-neutral-500 font-mono uppercase">{doc.type} · {doc.isConfidential ? 'Accès Restreint' : 'Consultable'}</div>
                      </div>

                      {doc.isConfidential ? (
                        <button
                          onClick={() => setDossierModalOpportunity(opp)}
                          className="px-2 py-1 bg-[#252830] hover:bg-[#c5a059] text-neutral-300 hover:text-black rounded text-[11px] font-semibold shrink-0 transition-colors flex items-center gap-1"
                        >
                          <Lock className="w-3 h-3" />
                          <span>NDA</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            alert(`Téléchargement de la brochure : "${doc.title}". Pour le mémorandum d'investissement complet, veuillez soumettre votre demande d'accès.`);
                          }}
                          className="px-2 py-1 bg-[#252830] hover:bg-neutral-700 text-neutral-200 rounded text-[11px] font-semibold shrink-0 transition-colors flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>PDF</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Broker Contact Card */}
              <div className="bg-[#181a20] border border-[#2e313c] rounded-xl p-5 space-y-4">
                <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Cabinet Référent
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#111317] border border-[#30333d] flex items-center justify-center p-1.5 shrink-0">
                    <AgaEmblem size={34} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">AGA Projects</div>
                    <div className="text-xs text-neutral-400">Pôle Transactions & Investissements</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <a
                    href="https://wa.me/212762387255"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 p-2 bg-[#121418] rounded-lg transition-colors font-medium"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>WhatsApp : +212 762 387 255</span>
                  </a>
                  <a
                    href="https://wa.me/212602494435"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 p-2 bg-[#121418] rounded-lg transition-colors font-medium"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>WhatsApp : +212 602 494 435</span>
                  </a>
                  <a
                    href="tel:+212762387255"
                    className="flex items-center gap-2 text-neutral-300 hover:text-white p-2 bg-[#121418] rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    <span>Ligne Dédiée : +212 762 387 255</span>
                  </a>
                  <a
                    href="tel:+212602494435"
                    className="flex items-center gap-2 text-neutral-300 hover:text-white p-2 bg-[#121418] rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    <span>Ligne Dédiée : +212 602 494 435</span>
                  </a>
                  <a
                    href="mailto:aga.projects@yahoo.com"
                    className="flex items-center gap-2 text-neutral-300 hover:text-white p-2 bg-[#121418] rounded-lg transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    <span className="font-mono text-[11px]">aga.projects@yahoo.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Actions */}
        <div className="px-6 py-4 border-t border-[#22252c] bg-[#14161b] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-400">
            Mandat professionnel et confidentiel géré conformément à la déontologie des affaires.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isAdmin && (
              <button
                onClick={() => {
                  setEditingOpportunity(opp);
                }}
                className="px-4 py-2.5 bg-[#1f222c] hover:bg-[#282c38] text-[#c5a059] border border-[#c5a059]/40 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                title="Modifier tous les champs de cette publication en tant qu'administrateur"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Modifier (Admin)</span>
              </button>
            )}

            <button
              onClick={() => {
                setDossierModalOpportunity(opp);
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#20232b] hover:bg-[#2a2d37] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-[#333744]"
            >
              <FileText className="w-4 h-4 text-[#c5a059]" />
              <span>{t.btnRequestDossier}</span>
            </button>

            <button
              onClick={() => {
                setVisitModalOpportunity(opp);
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#c5a059]/20"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.btnRequestVisit}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
