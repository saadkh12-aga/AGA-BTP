import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, RotateCcw } from 'lucide-react';

export const SearchEngine: React.FC = () => {
  const { searchFilter, setSearchFilter, resetSearchFilter, setActiveTab, opportunities, lang, t } = useApp();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('opportunities');
  };

  // Distinct cities list from opportunities
  const uniqueCities = Array.from(new Set(opportunities.map(o => o.city))).sort();

  return (
    <div className="w-full bg-[#121418]/95 backdrop-blur-md border border-[#2a2d35] rounded-2xl p-6 lg:p-8 gold-glow shadow-2xl">
      <form onSubmit={handleSearchSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Je recherche */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              {t.searchLookingFor}
            </label>
            <select
              value={searchFilter.subType}
              onChange={(e) => setSearchFilter(prev => ({ ...prev, subType: e.target.value }))}
              className="w-full bg-[#191b20] border border-[#2e313a] focus:border-[#c5a059] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all cursor-pointer"
            >
              <option value="all">{t.searchAll}</option>
              <option value="villa">{t.searchVilla}</option>
              <option value="apartment">{t.searchApartment}</option>
              <option value="building">{t.searchBuilding}</option>
              <option value="hotel">{t.searchHotel}</option>
              <option value="project">Promotion Immobilière & Projets</option>
              <option value="commercial">{t.searchCommercial}</option>
              <option value="office">{t.searchOffice}</option>
            </select>
          </div>

          {/* 2. Localisation */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              {t.searchLocation}
            </label>
            <select
              value={searchFilter.city}
              onChange={(e) => setSearchFilter(prev => ({ ...prev, city: e.target.value }))}
              className="w-full bg-[#191b20] border border-[#2e313a] focus:border-[#c5a059] rounded-xl px-4 py-3 text-sm text-white outline-none transition-all cursor-pointer"
            >
              <option value="all">{t.searchCityPlaceholder}</option>
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* 3. Budget */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              {t.searchBudget}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder={t.searchMin}
                value={searchFilter.minPrice || ''}
                onChange={(e) => setSearchFilter(prev => ({ ...prev, minPrice: e.target.value ? Number(e.target.value) : null }))}
                className="w-full bg-[#191b20] border border-[#2e313a] focus:border-[#c5a059] rounded-xl px-3 py-3 text-sm text-white placeholder:text-neutral-500 outline-none"
              />
              <input
                type="number"
                placeholder={t.searchMax}
                value={searchFilter.maxPrice || ''}
                onChange={(e) => setSearchFilter(prev => ({ ...prev, maxPrice: e.target.value ? Number(e.target.value) : null }))}
                className="w-full bg-[#191b20] border border-[#2e313a] focus:border-[#c5a059] rounded-xl px-3 py-3 text-sm text-white placeholder:text-neutral-500 outline-none"
              />
            </div>
          </div>

          {/* 4. Surface */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              {t.searchSurface}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder={`${t.searchMin} m²`}
                value={searchFilter.minSurface || ''}
                onChange={(e) => setSearchFilter(prev => ({ ...prev, minSurface: e.target.value ? Number(e.target.value) : null }))}
                className="w-full bg-[#191b20] border border-[#2e313a] focus:border-[#c5a059] rounded-xl px-3 py-3 text-sm text-white placeholder:text-neutral-500 outline-none"
              />
              <input
                type="number"
                placeholder={`${t.searchMax} m²`}
                value={searchFilter.maxSurface || ''}
                onChange={(e) => setSearchFilter(prev => ({ ...prev, maxSurface: e.target.value ? Number(e.target.value) : null }))}
                className="w-full bg-[#191b20] border border-[#2e313a] focus:border-[#c5a059] rounded-xl px-3 py-3 text-sm text-white placeholder:text-neutral-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#26282e]">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>Filtrer par mot-clé :</span>
            <input 
              type="text"
              placeholder="Ex: Palmeraie, CFC, Mer, Titré..."
              value={searchFilter.searchKeyword}
              onChange={(e) => setSearchFilter(prev => ({ ...prev, searchKeyword: e.target.value }))}
              className="bg-[#191b20] border border-[#2e313a] focus:border-[#c5a059] rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-neutral-500 outline-none w-48"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={resetSearchFilter}
              className="px-4 py-3 bg-[#181a1f] hover:bg-[#20222a] text-neutral-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-[#2e313a]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser</span>
            </button>

            <button
              type="submit"
              className="flex-1 sm:flex-initial px-8 py-3 bg-[#c5a059] hover:bg-[#d4af37] text-black rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#c5a059]/20"
            >
              <Search className="w-4 h-4" />
              <span>{t.searchBtn}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
