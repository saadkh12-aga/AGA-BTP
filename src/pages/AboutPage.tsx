import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Compass, Users, Award, FileText, CheckCircle2, Phone, Mail, MessageSquare } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#171920] rounded-full border border-[#c5a059]/40 text-xs font-semibold text-[#f5dfa5] uppercase">
          <Compass className="w-4 h-4 text-[#c5a059]" />
          <span>CABINET IMMOBILIER & CONSEIL EN INVESTISSEMENT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-tight">
          À Propos de AGA Projects
        </h1>
        <p className="text-base text-neutral-300 leading-relaxed">
          Un cabinet indépendant spécialisé dans l'intermédiation à haute valeur ajoutée, l'acquisition d'actifs d'exception et la structuration de partenariats fonciers et hôteliers au Maroc.
        </p>
      </div>

      {/* Main positioning pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#121419] border border-[#2a2d36] rounded-3xl p-8 lg:p-12 gold-glow">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
            Un Intermédiaire de Confiance sur l'Ensemble du Territoire Marocain
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Fondé sur des principes de rigueur déontologique, de discrétion absolue et d'expertise terrain pointue, notre cabinet se positionne au carrefour des propriétaires fonciers, des investisseurs institutionnels, des promoteurs et des opérateurs hôteliers.
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Nous n'agissons pas comme un simple portail d'annonces, mais comme un conseil en investissement stratégique, capable d'analyser la faisabilité juridique, urbanistique et financière de chaque transaction.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="flex items-center gap-2 text-xs text-neutral-200">
              <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Expertise Immobilière & Foncier</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-200">
              <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Connaissance Fine du Marché</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-200">
              <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Réseau d'Investisseurs Qualifiés</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-200">
              <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>Confidentialité & Accords NDA</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#2e313b]">
          <img
            src="/src/assets/images/casablanca_finance_city_tower_1790689611498.jpg"
            alt="Casablanca Finance City"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
            <div className="text-xs text-neutral-300">
              Siège opérationnel à Casablanca · Présence active à Marrakech, Rabat, Agadir et Tanger.
            </div>
          </div>
        </div>
      </div>

      {/* 6-step Process Detailed */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold">
            MÉTHODE ÉPROUVÉE
          </div>
          <h2 className="text-3xl font-serif-luxury font-bold text-white">
            Notre Processus en 6 Étapes
          </h2>
          <p className="text-xs text-neutral-400">
            Une démarche méthodique assurant transparence, sécurité juridique et optimisation des délais.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-[#14161c] border border-[#272a33] rounded-2xl space-y-3">
            <div className="text-xl font-bold font-serif-luxury text-[#c5a059]">01 — ÉCOUTE</div>
            <h3 className="text-base font-semibold text-white">Cadrage des Objectifs</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Comprendre les besoins de l'investisseur, les contraintes de liquidité, la fiscalité applicable et le profil d'actif recherché.
            </p>
          </div>

          <div className="p-6 bg-[#14161c] border border-[#272a33] rounded-2xl space-y-3">
            <div className="text-xl font-bold font-serif-luxury text-[#c5a059]">02 — RECHERCHE</div>
            <h3 className="text-base font-semibold text-white">Sourcing Ciblé</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Identification des biens et opportunités correspondant rigoureusement aux critères grâce à nos mandats en cours et notre réseau off-market.
            </p>
          </div>

          <div className="p-6 bg-[#14161c] border border-[#272a33] rounded-2xl space-y-3">
            <div className="text-xl font-bold font-serif-luxury text-[#c5a059]">03 — ANALYSE</div>
            <h3 className="text-base font-semibold text-white">Due Diligence Préalable</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Réunir l'ensemble des informations disponibles : titres fonciers, plans de masse, notes de renseignements urbanistiques et éléments comptables.
            </p>
          </div>

          <div className="p-6 bg-[#14161c] border border-[#272a33] rounded-2xl space-y-3">
            <div className="text-xl font-bold font-serif-luxury text-[#c5a059]">04 — PRÉSENTATION</div>
            <h3 className="text-base font-semibold text-white">Dossier d'Investissement</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Présentation synthétique des opportunités sélectionnées et organisation de visites privées sécurisées avec les mandataires.
            </p>
          </div>

          <div className="p-6 bg-[#14161c] border border-[#272a33] rounded-2xl space-y-3">
            <div className="text-xl font-bold font-serif-luxury text-[#c5a059]">05 — MISE EN RELATION</div>
            <h3 className="text-base font-semibold text-white">Négociation & Accord</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Organisation des échanges directs entre les parties, cadrage de la lettre d'intention (LOI) et alignement des conditions suspensives.
            </p>
          </div>

          <div className="p-6 bg-[#14161c] border border-[#272a33] rounded-2xl space-y-3">
            <div className="text-xl font-bold font-serif-luxury text-[#c5a059]">06 — ACCOMPAGNEMENT</div>
            <h3 className="text-base font-semibold text-white">Closing Sécurisé</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Accompagner les parties dans le processus complet de transaction avec l'étude notariale jusqu'à l'inscription définitive à la Conservation Foncière.
            </p>
          </div>
        </div>
      </div>

      {/* Direct Contact Card */}
      <div className="bg-[#121419] border border-[#2a2d36] rounded-2xl p-8 text-center space-y-6">
        <h3 className="text-2xl font-serif-luxury text-white">
          Échanger avec un Associé Référent
        </h3>
        <p className="text-xs text-neutral-400 max-w-lg mx-auto">
          Nos consultants et associés interviennent sur l'ensemble des métropoles et zones touristiques du Royaume du Maroc.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/212762387255"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp : +212 762 387 255</span>
          </a>
          <a
            href="https://wa.me/212602494435"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp : +212 602 494 435</span>
          </a>
          <a
            href="tel:+212762387255"
            className="px-5 py-3 bg-[#181a21] hover:bg-[#22252f] text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-[#2e313d]"
          >
            <Phone className="w-4 h-4 text-[#c5a059]" />
            <span>+212 762 387 255</span>
          </a>
          <a
            href="tel:+212602494435"
            className="px-5 py-3 bg-[#181a21] hover:bg-[#22252f] text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-[#2e313d]"
          >
            <Phone className="w-4 h-4 text-[#c5a059]" />
            <span>+212 602 494 435</span>
          </a>
          <a
            href="mailto:aga.projects@yahoo.com"
            className="px-5 py-3 bg-[#181a21] hover:bg-[#22252f] text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-[#2e313d]"
          >
            <Mail className="w-4 h-4 text-[#c5a059]" />
            <span className="font-mono text-xs">aga.projects@yahoo.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};
