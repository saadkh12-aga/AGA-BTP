import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, MessageSquare, Shield, Globe } from 'lucide-react';
import { AgaEmblem } from './AgaLogo';

export const Footer: React.FC = () => {
  const { setActiveTab, t, lang } = useApp();

  return (
    <footer className="bg-[#08090a] border-t border-[#1f2128] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <AgaEmblem size={44} />
              <div className="flex flex-col">
                <span className="text-xl font-serif-luxury font-bold text-white tracking-wider">
                  AGA Projects
                </span>
                <span className="text-[10px] text-neutral-400 font-semibold tracking-widest uppercase">
                  INVESTISSEMENT & IMMOBILIER · MAROC
                </span>
              </div>
            </div>
            <div className="text-xs uppercase tracking-widest text-[#c5a059] font-mono">
              INVESTISSEMENT STRATÉGIQUE AU MAROC
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {t.footerAbout}
            </p>
            <div className="pt-2 text-[11px] text-neutral-500 font-mono">
              Siège Social : Boulevard d'Anfa & CFC, Casablanca · Maroc
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Actifs & Projets
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('opportunities')} className="hover:text-white transition-colors">
                  Toutes les opportunités
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('hotels')} className="hover:text-white transition-colors">
                  Hôtellerie & Tourisme
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-white transition-colors">
                  Projets Immobiliers
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('land')} className="hover:text-white transition-colors">
                  Catalogue Terrains
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('confidential')} className="hover:text-[#f5dfa5] transition-colors text-amber-400 font-medium">
                  Actifs Confidentiels (NDA)
                </button>
              </li>
            </ul>
          </div>

          {/* Mandats & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Mandats & Partenariats
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('investors')} className="hover:text-white transition-colors">
                  Profil Investisseur
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sell')} className="hover:text-white transition-colors">
                  Confier un bien à la vente
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('submit-project')} className="hover:text-white transition-colors">
                  Recherche d'investisseurs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('acquire')} className="hover:text-white transition-colors">
                  Mandat de recherche
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">
                  Notre Processus en 6 étapes
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Lignes Directes & WhatsApp
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href="https://wa.me/212762387255"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp : +212 762 387 255</span>
              </a>

              <a
                href="https://wa.me/212602494435"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span>WhatsApp : +212 602 494 435</span>
              </a>

              <a
                href="tel:+212762387255"
                className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span>Tél : +212 762 387 255</span>
              </a>

              <a
                href="tel:+212602494435"
                className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span>Tél : +212 602 494 435</span>
              </a>

              <a
                href="mailto:aga.projects@yahoo.com"
                className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors pt-1"
              >
                <Mail className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span className="font-mono text-[11px]">aga.projects@yahoo.com</span>
              </a>
            </div>

            <div className="pt-3">
              <button
                onClick={() => setActiveTab('client-space')}
                className="w-full py-2 px-3 bg-[#13151b] hover:bg-[#1a1d25] border border-[#272a34] rounded-lg text-neutral-200 text-xs font-semibold text-center transition-colors"
              >
                Espace Investisseur Privilégié
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-[#181a20] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} AGA Projects · Tous droits réservés. Conseil & investissement au Maroc.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => alert('Mentions Légales : AGA Projects & Investment, S.A. au capital de 10.000.000 MAD. Registre de Commerce Casablanca n° 542198. Activité réglementée d\'intermédiation en transactions et investissements immobiliers.')} className="hover:text-neutral-300 transition-colors">
              {t.footerLegal}
            </button>
            <button onClick={() => alert('Politique de Confidentialité : Vos données patrimoniales et professionnelles sont protégées conformément à la loi 09-08 relative à la protection des personnes physiques à l\'égard du traitement des données à caractère personnel (CNDP Maroc).')} className="hover:text-neutral-300 transition-colors">
              {t.footerPrivacy}
            </button>
            <button onClick={() => alert('Conditions d\'Utilisation : Les informations et valorisations publiées sur cette plateforme le sont à titre indicatif sous réserve de confirmation d\'audit foncier et notarié.')} className="hover:text-neutral-300 transition-colors">
              {t.footerTerms}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
