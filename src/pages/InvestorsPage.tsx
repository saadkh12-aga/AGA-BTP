import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from '../components/OpportunityCard';
import { 
  Building2, 
  Hotel, 
  Trees, 
  Briefcase, 
  ShieldCheck, 
  Users, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  Search,
  ArrowRight
} from 'lucide-react';

export const InvestorsPage: React.FC = () => {
  const { addInvestorProfile, findMatchingOpportunities, formatPrice, t, lang } = useApp();

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('Maroc');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [investmentTypes, setInvestmentTypes] = useState<string[]>(['Acquisition directe']);
  const [selectedSectors, setSelectedSectors] = useState<string[]>(['Hôtellerie', 'Foncier']);
  const [targetCities, setTargetCities] = useState<string[]>(['Marrakech', 'Casablanca']);
  const [budgetMin, setBudgetMin] = useState<number>(20000000);
  const [budgetMax, setBudgetMax] = useState<number>(100000000);
  const [surfaceTarget, setSurfaceTarget] = useState<number>(5000);
  const [horizon, setHorizon] = useState<'Court terme (< 1 an)' | 'Moyen terme (1-3 ans)' | 'Long terme (> 3 ans)'>('Court terme (< 1 an)');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Live Matching Engine Simulation for current criteria
  const matchedOpportunities = findMatchingOpportunities({
    budgetMinMAD: budgetMin,
    budgetMaxMAD: budgetMax,
    targetCities: targetCities,
    sectors: selectedSectors,
  });

  const toggleSector = (sector: string) => {
    setSelectedSectors(prev => 
      prev.includes(sector) ? prev.filter(s => s !== sector) : [...prev, sector]
    );
  };

  const toggleCity = (city: string) => {
    setTargetCities(prev => 
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone || !email) {
      alert('Veuillez renseigner vos coordonnées complètes.');
      return;
    }

    addInvestorProfile({
      fullName: `${firstName} ${lastName}`.trim(),
      company,
      country,
      phone,
      email,
      investmentType: investmentTypes,
      sectors: selectedSectors,
      targetCities,
      budgetMinMAD: budgetMin,
      budgetMaxMAD: budgetMax,
      surfaceTargetM2: surfaceTarget,
      horizon,
      projectDescription: description || 'Mandat investisseur direct enregistré via la plateforme.',
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title & Introduction */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a1c22] rounded-full border border-[#c5a059]/40 text-xs font-semibold text-[#f5dfa5] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>DIRECTION DES INVESTISSEMENTS INSTITUTIONNELS & PRIVÉS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-tight">
          VOUS ÊTES INVESTISSEUR ?
        </h1>
        <p className="text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Notre cabinet structure, identifie et négocie des opportunités d'investissement immobilier, hôtelier et foncier au Maroc adaptées aux thèses des fonds, family offices et investisseurs privés qualifiés.
        </p>
      </div>

      {/* Services Grid (Prompt Section 6) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#131519] border border-[#242730] rounded-2xl hover:border-[#c5a059]/40 transition-colors space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#1d2028] text-[#c5a059] flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif-luxury font-semibold text-white">Recherche & Sourcing Dédié</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Recherche sur mesure de projets, terrains stratégiques, hôtels en exploitation et ensembles tertiaires conformes à votre mandat de gestion.
          </p>
        </div>

        <div className="p-6 bg-[#131519] border border-[#242730] rounded-2xl hover:border-[#c5a059]/40 transition-colors space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#1d2028] text-[#c5a059] flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif-luxury font-semibold text-white">Audit & Présentation des Dossiers</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Élaboration de mémorandums d'information complets (IM), modélisation financière des cash-flows, vérification foncière et urbanistique.
          </p>
        </div>

        <div className="p-6 bg-[#131519] border border-[#242730] rounded-2xl hover:border-[#c5a059]/40 transition-colors space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#1d2028] text-[#c5a059] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif-luxury font-semibold text-white">Mise en Relation & Accompagnement</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Intermédiation directe avec les propriétaires et promoteurs, négociation confidentielle et coordination jusqu'au closing notarié.
          </p>
        </div>
      </div>

      {/* Main Container: Investor Profile Form & Live Matching Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form Container (7 cols) */}
        <div className="lg:col-span-7 bg-[#121419] border border-[#2a2d36] rounded-2xl p-6 sm:p-8 gold-glow">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-[#c5a059]/20 text-[#c5a059] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif-luxury text-white">Profil Investisseur Enregistré</h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                Votre profil et vos critères ont été intégrés à notre moteur de matching d'opportunités.
              </p>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Un associé du cabinet prendra contact sous 24h avec une première sélection de dossiers confidentiels correspondant à votre tranche budgétaire de <strong>{formatPrice(budgetMin)} à {formatPrice(budgetMax)}</strong>.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#c5a059] text-black font-semibold text-xs rounded-xl"
                >
                  Modifier mes critères
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-xs text-[#c5a059] uppercase tracking-wider font-semibold mb-1">
                Formulaire d'Enregistrement Mandat
              </div>
              <h2 className="text-2xl font-serif-luxury text-white font-bold mb-2">
                PROFIL INVESTISSEUR
              </h2>
              <p className="text-xs text-neutral-400 mb-6">
                Renseignez vos critères cibles pour activer le matching algorithmique et recevoir les opportunités confidentielles en avant-première.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Identity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">Prénom *</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Prénom"
                      className="w-full bg-[#181a21] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">Nom *</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Nom"
                      className="w-full bg-[#181a21] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">Société / Fonds</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ex: Al Mada Invest, Family Office..."
                      className="w-full bg-[#181a21] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">Pays de Résidence *</label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Maroc, France, EAU, Suisse..."
                      className="w-full bg-[#181a21] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
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
                      className="w-full bg-[#181a21] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">Email Professionnel *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre.email@fonds.com"
                      className="w-full bg-[#181a21] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
                    />
                  </div>
                </div>

                {/* 2. Secteurs Cibles */}
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-2">
                    Secteurs Recherchés (Sélection multiple)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Hôtellerie', 'Résidentiel Prestige', 'Foncier Stratégique', 'Tertiaire / Bureaux', 'Logistique / Industrie', 'Agrotourisme'].map(sec => {
                      const isSel = selectedSectors.includes(sec);
                      return (
                        <button
                          type="button"
                          key={sec}
                          onClick={() => toggleSector(sec)}
                          className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                            isSel 
                              ? 'bg-[#c5a059] text-black font-semibold border-[#c5a059]' 
                              : 'bg-[#181a21] text-neutral-300 border-[#2d303b] hover:border-neutral-500'
                          }`}
                        >
                          {sec}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Villes Cibles */}
                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-2">
                    Villes ou Régions Préférées
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Casablanca', 'Rabat', 'Marrakech', 'Agadir / Taghazout', 'Tanger', 'Essaouira', 'Dakhla'].map(city => {
                      const isSel = targetCities.includes(city.split('/')[0].trim());
                      return (
                        <button
                          type="button"
                          key={city}
                          onClick={() => toggleCity(city.split('/')[0].trim())}
                          className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                            isSel 
                              ? 'bg-[#c5a059] text-black font-semibold border-[#c5a059]' 
                              : 'bg-[#181a21] text-neutral-300 border-[#2d303b] hover:border-neutral-500'
                          }`}
                        >
                          {city}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Budget & Surface */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Budget Minimum (MAD)
                    </label>
                    <input
                      type="number"
                      value={budgetMin}
                      onChange={(e) => setBudgetMin(Number(e.target.value))}
                      className="w-full bg-[#181a21] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                    />
                    <div className="text-[11px] text-neutral-500 mt-1 font-mono">{formatPrice(budgetMin)}</div>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Budget Maximum (MAD)
                    </label>
                    <input
                      type="number"
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(Number(e.target.value))}
                      className="w-full bg-[#181a21] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                    />
                    <div className="text-[11px] text-neutral-500 mt-1 font-mono">{formatPrice(budgetMax)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Surface Cible Minimum (m²)
                    </label>
                    <input
                      type="number"
                      value={surfaceTarget}
                      onChange={(e) => setSurfaceTarget(Number(e.target.value))}
                      className="w-full bg-[#181a21] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Horizon d'Investissement
                    </label>
                    <select
                      value={horizon}
                      onChange={(e) => setHorizon(e.target.value as any)}
                      className="w-full bg-[#181a21] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                    >
                      <option value="Court terme (< 1 an)">Court terme (&lt; 1 an) - Capital disponible</option>
                      <option value="Moyen terme (1-3 ans)">Moyen terme (1-3 ans) - Structuration en cours</option>
                      <option value="Long terme (> 3 ans)">Long terme (&gt; 3 ans) - Stratégie patrimoniale</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 font-medium mb-1">
                    Description du Projet / Critères Spécifiques
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Précisez votre thèse d'investissement, le TRI attendu, la structure juridique souhaitée (OPCI, SAS, direct)..."
                    className="w-full bg-[#181a21] border border-[#2b2e38] focus:border-[#c5a059] rounded-xl p-3 text-sm text-white placeholder:text-neutral-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg hover:shadow-[#c5a059]/20"
                >
                  {t.btnRegisterSearch}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Live Matching Engine Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#15171d] border border-[#2c2f38] rounded-2xl p-6 gold-glow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Moteur de Matching en Direct
                </h3>
              </div>
              <span className="px-2.5 py-1 bg-[#222530] text-[#c5a059] text-xs font-mono rounded-md font-bold">
                {matchedOpportunities.length} opportunités compatibles
              </span>
            </div>

            <p className="text-xs text-neutral-400 mb-4">
              Voici un aperçu en temps réel des actifs de notre portefeuille répondant à vos critères budgétaires et géographiques actuels :
            </p>

            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
              {matchedOpportunities.length === 0 ? (
                <div className="p-5 bg-[#181a22] rounded-xl border border-[#282b35] text-xs text-neutral-400 text-center">
                  Aucun projet public ne répond exactement à cette combinaison. Notre équipe effectuera une recherche ciblée off-market dès réception de votre profil.
                </div>
              ) : (
                matchedOpportunities.map(opp => (
                  <div 
                    key={opp.id}
                    className="p-3.5 bg-[#191b22] hover:bg-[#20232c] border border-[#282b35] hover:border-[#c5a059]/40 rounded-xl transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="text-[11px] text-[#c5a059] font-medium">{opp.subTypeLabel} · {opp.city}</div>
                      <div className="text-xs font-bold text-white font-mono">{formatPrice(opp.priceMAD, opp.priceDisplay, opp.priceMaxMAD)}</div>
                    </div>
                    <div className="text-xs font-semibold text-white line-clamp-1 mb-1">{opp.title}</div>
                    <div className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed mb-2">
                      {opp.investmentPotential}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#252832]">
                      <span className="text-[10px] text-neutral-500 font-mono">{opp.surfaceM2.toLocaleString('fr-FR')} m²</span>
                      <span className="text-[11px] text-[#f5dfa5] font-semibold">Taux de compatibilité élevé ✓</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
