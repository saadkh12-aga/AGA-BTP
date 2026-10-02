import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, CheckCircle2, UploadCloud } from 'lucide-react';

export const SellPropertyPage: React.FC = () => {
  const { addPropertySubmission, formatPrice, t, lang } = useApp();

  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Marrakech');
  const [district, setDistrict] = useState('Palmeraie');
  const [propertyType, setPropertyType] = useState('Villa de prestige');
  const [surfaceTotalM2, setSurfaceTotalM2] = useState<number>(3000);
  const [surfaceBuiltM2, setSurfaceBuiltM2] = useState<number>(650);
  const [priceExpectedMAD, setPriceExpectedMAD] = useState<number>(18500000);
  const [legalStatus, setLegalStatus] = useState('Titre Foncier Pur');
  const [titleDeedNumber, setTitleDeedNumber] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !phone || !email || !city || !description) {
      alert('Veuillez remplir l\'ensemble des informations requises.');
      return;
    }

    addPropertySubmission({
      ownerName,
      phone,
      email,
      city,
      district,
      propertyType,
      surfaceTotalM2,
      surfaceBuiltM2,
      priceExpectedMAD,
      legalStatus,
      titleDeedNumber,
      description,
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold">
          MANDAT DE VENTE & COMMERCIALISATION SUR-MESURE
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white">
          CONFIER UN BIEN À LA VENTE
        </h1>
        <p className="text-sm text-neutral-400">
          Vous êtes propriétaire d'un terrain, d'une villa, d'un immeuble ou d'un hôtel au Maroc ? Notre cabinet valorise votre actif auprès d'une clientèle qualifiée avec discrétion et professionnalisme.
        </p>
      </div>

      <div className="bg-[#121419] border border-[#2a2d36] rounded-2xl p-6 sm:p-10 gold-glow">
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 bg-[#c5a059]/20 text-[#c5a059] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif-luxury text-white">Mandat Transmis à l'Étude</h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Nous vous remercions pour votre confiance. Votre bien situé à <strong>{city} ({district})</strong> a été enregistré au tableau de bord des nouveaux mandats.
            </p>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Un associé du cabinet entrera en relation sous 24h ouvrées pour convenir d'une visite d'estimation et définir la stratégie de diffusion (confidentielle off-market ou publique).
            </p>
            <div className="pt-4">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-[#c5a059] text-black font-semibold text-xs rounded-xl"
              >
                Confier un autre bien
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Propriétaire */}
            <div className="border-b border-[#252830] pb-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c5a059]">
                1. Coordonnées du Propriétaire
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Nom Complet *</label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
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

            {/* Informations du bien */}
            <div className="border-b border-[#252830] pb-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c5a059]">
                2. Informations du Bien
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Type de Bien *</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Villa de prestige">Villa de prestige / Domaine</option>
                    <option value="Terrain foncier">Terrain foncier / Lotissement</option>
                    <option value="Hôtel / Établissement touristique">Hôtel / Établissement touristique</option>
                    <option value="Immeuble entier">Immeuble entier</option>
                    <option value="Appartement de standing">Appartement de grand standing</option>
                    <option value="Local commercial">Local commercial / Pied d'immeuble</option>
                    <option value="Bureau / Immeuble de bureaux">Bureau / Immeuble de bureaux</option>
                    <option value="Entrepôt / Industriel">Entrepôt / Plateforme industrielle</option>
                    <option value="Projet immobilier">Projet immobilier à développer</option>
                    <option value="Autre actif">Autre actif</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Ville *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Casablanca, Marrakech..."
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Quartier / Zone *</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Ex: Palmeraie, Anfa, Souissi..."
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Superficie Foncier (m²)</label>
                  <input
                    type="number"
                    value={surfaceTotalM2}
                    onChange={(e) => setSurfaceTotalM2(Number(e.target.value))}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Surface Bâtie (m²)</label>
                  <input
                    type="number"
                    value={surfaceBuiltM2}
                    onChange={(e) => setSurfaceBuiltM2(Number(e.target.value))}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Prix Souhaité (MAD)</label>
                  <input
                    type="number"
                    value={priceExpectedMAD}
                    onChange={(e) => setPriceExpectedMAD(Number(e.target.value))}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                  <div className="text-[11px] text-neutral-500 mt-1 font-mono">{formatPrice(priceExpectedMAD)}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Situation Juridique *</label>
                  <select
                    value={legalStatus}
                    onChange={(e) => setLegalStatus(e.target.value)}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Titre Foncier Pur">Titre Foncier Définitif (Pur & Sans charge)</option>
                    <option value="En cours d'immatriculation (Réquisition)">En cours d'immatriculation (Réquisition foncière)</option>
                    <option value="Zone Urbaine Homologuée">Zone Urbaine Homologuée (Permis accordé)</option>
                    <option value="Détenu par Société (SAS/SARL)">Détenu par Société dédiée (SAS / SARL)</option>
                    <option value="Moulkiya / Acte Adoulaire">Moulkiya / Acte Adoulaire</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">N° de Titre Foncier (Optionnel / Confidentiel)</label>
                  <input
                    type="text"
                    value={titleDeedNumber}
                    onChange={(e) => setTitleDeedNumber(e.target.value)}
                    placeholder="Ex: TF 189422/C"
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Description du Bien, Prestations & Atouts *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez l'état général, les finitions, l'exposition, les équipements techniques et vos impératifs de délais..."
                  className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl p-3.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg hover:shadow-[#c5a059]/20"
            >
              {t.btnSellProperty}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
