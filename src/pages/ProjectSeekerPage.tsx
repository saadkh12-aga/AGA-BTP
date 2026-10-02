import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UploadCloud, CheckCircle2, ShieldCheck, Briefcase, FileText, ArrowRight } from 'lucide-react';

export const ProjectSeekerPage: React.FC = () => {
  const { addProjectProposal, formatPrice, t, lang } = useApp();

  const [ownerName, setOwnerName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Casablanca');
  const [projectType, setProjectType] = useState('Projet Immobilier Résidentiel');
  const [surfaceM2, setSurfaceM2] = useState<number>(5000);
  const [projectBudgetMAD, setProjectBudgetMAD] = useState<number>(45000000);
  const [progressStage, setProgressStage] = useState<any>('Permis obtenu / En cours');
  const [needType, setNeedType] = useState<any>('Co-investisseur');
  const [investmentSoughtMAD, setInvestmentSoughtMAD] = useState<number>(18000000);
  const [partnershipType, setPartnershipType] = useState('Joint-Venture / Cession de parts de SAS');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !phone || !email || !description) {
      alert('Veuillez compléter l\'ensemble des informations requises.');
      return;
    }

    addProjectProposal({
      ownerName,
      company,
      phone,
      email,
      city,
      projectType,
      surfaceM2,
      projectBudgetMAD,
      progressStage,
      needType,
      investmentSoughtMAD,
      partnershipType,
      description,
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold">
          LEVÉE DE FONDS & PARTENARIATS STRATÉGIQUES
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white">
          VOUS AVEZ UN PROJET ? NOUS RECHERCHONS DES INVESTISSEURS POTENTIELS.
        </h1>
        <p className="text-sm text-neutral-400">
          Notre cabinet présente vos actifs et projets à fort potentiel directement auprès de notre réseau qualifié de fonds souverains, family offices et promoteurs au Maroc et à l'international.
        </p>
      </div>

      <div className="bg-[#121419] border border-[#2a2d36] rounded-2xl p-6 sm:p-10 gold-glow">
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 bg-[#c5a059]/20 text-[#c5a059] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif-luxury text-white">Dossier de Projet Transmis</h3>
            <p className="text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
              Votre projet a été enregistré avec succès au sein de notre pôle partenariats. Nos analystes débutent l'examen de conformité de votre besoin de <strong>{formatPrice(investmentSoughtMAD)}</strong>.
            </p>
            <div className="p-4 bg-[#171921] border border-[#282b34] rounded-xl text-xs text-neutral-400 max-w-md mx-auto text-left space-y-1">
              <div className="text-[#f5dfa5] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                <span>Confidentialité & Mandat Garanti</span>
              </div>
              <p>
                Aucune information nominative ni cadastre ne sera divulgué sans votre accord formel préalable et signature d'un accord de confidentialité par l'investisseur.
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-[#c5a059] text-black font-semibold text-xs rounded-xl"
              >
                Soumettre un autre projet
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Identity & Company */}
            <div className="border-b border-[#252830] pb-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c5a059]">
                1. Porteur de Projet & Coordonnées
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Nom du Porteur / Représentant *</label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Nom et prénom"
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Société / Entité Juridique</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ex: Atlas Promotion S.A."
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Téléphone Direct *</label>
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
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Adresse Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@societe.ma"
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Project Specifications */}
            <div className="border-b border-[#252830] pb-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c5a059]">
                2. Caractéristiques du Projet
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Ville d'Implantation *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Casablanca, Marrakech, Agadir, Tanger..."
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Type de Projet *</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Projet Immobilier Résidentiel">Projet Immobilier Résidentiel</option>
                    <option value="Projet Hôtelier / Resort">Projet Hôtelier / Resort</option>
                    <option value="Projet Touristique / Écolodge">Projet Touristique / Écolodge</option>
                    <option value="Immeuble / Bureaux Tertiaire">Immeuble / Bureaux Tertiaire</option>
                    <option value="Terrain Stratégique à Développer">Terrain Stratégique à Développer</option>
                    <option value="Projet Commercial / Retail">Projet Commercial / Retail</option>
                    <option value="Actif à Reprendre">Actif ou Hôtel à Reprendre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Superficie Foncier (m²)</label>
                  <input
                    type="number"
                    value={surfaceM2}
                    onChange={(e) => setSurfaceM2(Number(e.target.value))}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Budget Total du Projet (MAD)</label>
                  <input
                    type="number"
                    value={projectBudgetMAD}
                    onChange={(e) => setProjectBudgetMAD(Number(e.target.value))}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                  <div className="text-[11px] text-neutral-500 mt-1 font-mono">{formatPrice(projectBudgetMAD)}</div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">État d'Avancement</label>
                  <select
                    value={progressStage}
                    onChange={(e) => setProgressStage(e.target.value as any)}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Idée / Foncier identifié">Idée / Foncier identifié</option>
                    <option value="Étude de faisabilité">Étude de faisabilité finalisée</option>
                    <option value="Permis obtenu / En cours">Permis de construire délivré</option>
                    <option value="Travaux entamés">Gros œuvre / Travaux entamés</option>
                    <option value="Reprise d'actif">Actif existant à reprendre / repositionner</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Need & Investment Sought */}
            <div className="border-b border-[#252830] pb-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c5a059]">
                3. Besoin d'Investissement & Partenariat
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Nature du Besoin</label>
                  <select
                    value={needType}
                    onChange={(e) => setNeedType(e.target.value as any)}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Co-investisseur">Co-investisseur (Fonds propres)</option>
                    <option value="Financement total">Financement total / Cession</option>
                    <option value="Promoteur / Développeur">Promoteur / Développeur opérationnel</option>
                    <option value="Opérateur gestionnaire">Opérateur / Enseigne hôtelière</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Montant Recherché (MAD)</label>
                  <input
                    type="number"
                    value={investmentSoughtMAD}
                    onChange={(e) => setInvestmentSoughtMAD(Number(e.target.value))}
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                  <div className="text-[11px] text-neutral-500 mt-1 font-mono">{formatPrice(investmentSoughtMAD)}</div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">Structure de Partenariat</label>
                  <input
                    type="text"
                    value={partnershipType}
                    onChange={(e) => setPartnershipType(e.target.value)}
                    placeholder="Joint-venture, cession 49%, apport foncier..."
                    className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 font-medium mb-1">
                  Description Détaillée du Projet & Opportunité pour l'Investisseur *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Présentez le programme, les atouts de localisation, les projections de rentabilité, l'équipe dirigeante..."
                  className="w-full bg-[#181a21] border border-[#2c2f38] focus:border-[#c5a059] rounded-xl p-3.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                />
              </div>

              {/* Document upload teaser */}
              <div className="p-4 bg-[#171922] border border-dashed border-[#343845] rounded-xl text-center space-y-1">
                <UploadCloud className="w-6 h-6 text-[#c5a059] mx-auto" />
                <div className="text-xs text-white font-medium">Plans d'architecte, Business Plan & Documents PDF</div>
                <div className="text-[11px] text-neutral-400">
                  Après validation de ce premier formulaire, un canal de transmission chiffré vous sera ouvert pour déposer vos pièces confidentielles.
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg hover:shadow-[#c5a059]/20"
            >
              {t.btnSubmitProject}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
