import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, ShieldCheck, Compass } from 'lucide-react';

export const AcquirePropertyPage: React.FC = () => {
  const { addAcquisitionBrief, formatPrice, t } = useApp();

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [categoryWanted, setCategoryWanted] = useState('Villa de prestige');
  const [city, setCity] = useState('Marrakech');
  const [region, setRegion] = useState('Marrakech-Safi');
  const [budgetMAD, setBudgetMAD] = useState<number>(25000000);
  const [surfaceM2, setSurfaceM2] = useState<number>(2500);
  const [usageType, setUsageType] = useState<any>('Usage personnel');
  const [targetHorizon, setTargetHorizon] = useState('Moins de 3 mois');
  const [financingStatus, setFinancingStatus] = useState<any>('Fonds propres disponibles');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !phone || !email || !city) {
      alert('Veuillez renseigner vos coordonnées et vos critères essentiels.');
      return;
    }

    addAcquisitionBrief({
      clientName,
      phone,
      email,
      categoryWanted,
      city,
      region,
      budgetMAD,
      surfaceM2,
      usageType,
      targetHorizon,
      financingStatus,
      description,
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold">
          MANDAT DE RECHERCHE PERSONNALISÉ & EXCLUSIF
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white">
          ACQUÉRIR UN BIEN AU MAROC
        </h1>
        <p className="text-sm text-neutral-400">
          Vous cherchez une propriété d'exception ou un actif d'investissement ? Déposez votre cahier des charges. Notre équipe active l'ensemble de son réseau pour vous présenter une sélection ciblée on-market et off-market.
        </p>
      </div>

      <div className="bg-[#121419] border border-[#2a2d36] rounded-2xl p-6 sm:p-10 gold-glow">
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 bg-[#c5a059]/20 text-[#c5a059] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif-luxury text-white">Cahier des Charges Enregistré</h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Votre mandat de recherche pour <strong>{categoryWanted}</strong> à <strong>{city}</strong> avec un budget de <strong>{formatPrice(budgetMAD)}</strong> a été transmis à notre cellule d'acquisition.
            </p>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Un associé dédié vous contactera avec les premiers dossiers correspondants sous 24 heures.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-[#c5a059] text-black font-semibold text-xs rounded-xl"
              >
                Déposer un autre besoin
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Identity */}
            <div className="border-b border-[#252830] pb-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c5a059]">
                1. Vos Coordonnées
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Nom et Prénom *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="M. / Mme ..."
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Téléphone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6... ou +33 6..."
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@domaine.com"
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Criteria */}
            <div className="border-b border-[#252830] pb-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c5a059]">
                2. Critères de Recherche
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Type de Bien Recherché *</label>
                  <select
                    value={categoryWanted}
                    onChange={(e) => setCategoryWanted(e.target.value)}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Villa de prestige">Villa de prestige</option>
                    <option value="Terrain foncier">Terrain foncier / Lotissement</option>
                    <option value="Hôtel / Établissement touristique">Hôtel / Établissement touristique</option>
                    <option value="Appartement de standing">Appartement haut standing</option>
                    <option value="Immeuble entier">Immeuble entier</option>
                    <option value="Bureaux / Tertiaire">Bureaux / Plateaux tertiaires</option>
                    <option value="Local commercial">Local commercial</option>
                    <option value="Projet immobilier">Projet immobilier à développer</option>
                    <option value="Autre actif">Autre actif</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Ville Cible *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Marrakech, Casablanca..."
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Région</label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Marrakech-Safi, Casablanca-Settat..."
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Budget Envisagé (MAD)</label>
                  <input
                    type="number"
                    value={budgetMAD}
                    onChange={(e) => setBudgetMAD(Number(e.target.value))}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                  <div className="text-[11px] text-neutral-500 mt-1 font-mono">{formatPrice(budgetMAD)}</div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Surface Souhaitée (m²)</label>
                  <input
                    type="number"
                    value={surfaceM2}
                    onChange={(e) => setSurfaceM2(Number(e.target.value))}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Usage Prévu</label>
                  <select
                    value={usageType}
                    onChange={(e) => setUsageType(e.target.value as any)}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Usage personnel">Usage personnel / Résidence</option>
                    <option value="Investissement locatif">Investissement locatif / Rendement</option>
                    <option value="Développement / Revente">Développement / Promotion / Revente</option>
                    <option value="Exploitation touristique">Exploitation hôtelière / Touristique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Délai / Horizon</label>
                  <select
                    value={targetHorizon}
                    onChange={(e) => setTargetHorizon(e.target.value)}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Moins de 3 mois">Moins de 3 mois (Immédiat)</option>
                    <option value="3 à 6 mois">3 à 6 mois</option>
                    <option value="6 à 12 mois">6 à 12 mois</option>
                    <option value="Veille stratégique">Veille stratégique continue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Financement</label>
                  <select
                    value={financingStatus}
                    onChange={(e) => setFinancingStatus(e.target.value as any)}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Fonds propres disponibles">Fonds propres disponibles</option>
                    <option value="Crédit bancaire pré-accordé">Crédit bancaire pré-accordé</option>
                    <option value="En cours de structuration">En cours de structuration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Description Précise de la Recherche / Critères Spécifiques
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Précisez vos attentes : style architectural (contemporain, mauresque), nombre de suites, vue mer ou golf, calme, potentiel de valorisation..."
                  className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl p-3.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg hover:shadow-[#c5a059]/20"
            >
              {t.btnRegisterSearch}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
