import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, CheckCircle2, ShieldCheck, User, Building, Globe, Phone, Mail, FileText } from 'lucide-react';

export const ConfidentialDossierModal: React.FC = () => {
  const { dossierModalOpportunity, setDossierModalOpportunity, addConfidentialRequest } = useApp();

  const [clientName, setClientName] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('Maroc');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [profileType, setProfileType] = useState<'Investisseur Privé' | 'Fonds / Institutionnel' | 'Promoteur' | 'Family Office' | 'Autre'>('Investisseur Privé');
  const [reason, setReason] = useState('');
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!dossierModalOpportunity) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !phone || !email || !ndaAccepted) {
      alert('Veuillez remplir les champs obligatoires et accepter les termes de confidentialité.');
      return;
    }

    addConfidentialRequest({
      opportunityId: dossierModalOpportunity.id,
      opportunityTitle: dossierModalOpportunity.title,
      clientName,
      company,
      country,
      phone,
      email,
      profileType,
      reason,
      ndaAccepted,
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    setDossierModalOpportunity(null);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#111317] border border-[#2d3039] rounded-2xl w-full max-w-xl p-6 sm:p-8 shadow-2xl gold-glow">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-[#c5a059]/20 text-[#c5a059] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif-luxury text-white">Demande d'Accès Transmise</h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Votre demande de communication du dossier d'investissement pour l'actif <strong>{dossierModalOpportunity.title}</strong> a bien été enregistrée sous protocole de confidentialité.
            </p>
            <div className="p-4 bg-[#171920] border border-[#292c36] rounded-xl text-left text-xs text-neutral-400 space-y-1">
              <div className="text-[#f5dfa5] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                <span>Statut du protocole : En cours d'agrément</span>
              </div>
              <p>L'associé gérant du cabinet AGA Projects procède à la revue de conformité et vous notifiera par email sous 4 heures avec le lien d'accès chiffré aux pièces comptables, juridiques et techniques.</p>
            </div>
            <div className="pt-2">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-[#c5a059] text-black font-semibold text-xs rounded-xl"
              >
                Compris
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs text-[#c5a059] uppercase tracking-wider font-semibold mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Dossier d'Investissement & Mémorandum</span>
            </div>
            <h3 className="text-xl font-serif-luxury text-white font-semibold mb-1">
              Demande d'Accès au Dossier Complet
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              {dossierModalOpportunity.title}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Nom et Prénom *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="M. / Mme ..."
                      className="w-full bg-[#181a20] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Société / Institution
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Nom du fonds ou société"
                      className="w-full bg-[#181a20] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Profil Acquéreur *
                  </label>
                  <select
                    value={profileType}
                    onChange={(e) => setProfileType(e.target.value as any)}
                    className="w-full bg-[#181a20] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl px-3 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Investisseur Privé">Investisseur Privé</option>
                    <option value="Family Office">Family Office</option>
                    <option value="Fonds / Institutionnel">Fonds / Institutionnel</option>
                    <option value="Promoteur">Promoteur Immobilier</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Pays de Résidence *
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Maroc, France, EAU..."
                      className="w-full bg-[#181a20] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Téléphone Direct *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+..."
                      className="w-full bg-[#181a20] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Email Professionnel *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@fonds.com"
                    className="w-full bg-[#181a20] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Motif de la consultation / Objectifs de la thèse d'acquisition
                </label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Ex: Analyse d'acquisition pour compte propre, intégration portefeuille hôtelier, recherche de foncier avec partenaire..."
                  className="w-full bg-[#181a20] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl p-3 text-sm text-white placeholder:text-neutral-500 outline-none"
                />
              </div>

              {/* NDA Checkbox */}
              <div className="p-3 bg-[#16181f] border border-[#272b35] rounded-xl">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={ndaAccepted}
                    onChange={(e) => setNdaAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#c5a059] bg-[#101216] border-[#373b47] focus:ring-[#c5a059]"
                  />
                  <span className="text-xs text-neutral-300 leading-snug">
                    Je m'engage formellement au respect de la stricte <strong>confidentialité (Non-Disclosure Agreement)</strong> concernant l'ensemble des éléments financiers, juridiques et nominatifs qui me seront transmis par le cabinet AGA Projects.
                  </span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!ndaAccepted}
                  className="w-full py-3 bg-[#c5a059] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#d4af37] text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg hover:shadow-[#c5a059]/20"
                >
                  Valider et Demander l'Accès Confidentiel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
