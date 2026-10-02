import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language, Currency } from '../types';
import { Menu, X, ChevronDown, Lock, User, Globe, DollarSign, ShieldCheck } from 'lucide-react';
import { AgaEmblem } from './AgaLogo';

export const Navbar: React.FC = () => {
  const { lang, setLang, currency, setCurrency, activeTab, setActiveTab, t, isAdmin } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0d0e]/90 backdrop-blur-md border-b border-[#23262e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark with official emblem */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-xl sm:text-2xl font-serif-luxury font-bold tracking-wider text-white hover:text-[#f4dfa5] transition-colors whitespace-nowrap shrink-0 flex items-center gap-3"
        >
          <AgaEmblem size={34} className="-my-1" />
          <span>AGA Projects & Investment</span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links with subtle hover effects */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-neutral-300">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors whitespace-nowrap hover:text-[#c5a059] ${activeTab === 'home' ? 'text-[#c5a059]' : ''}`}
          >
            {t.navHome}
          </button>

          <button
            onClick={() => handleNavClick('opportunities')}
            className={`transition-colors whitespace-nowrap hover:text-[#c5a059] ${activeTab === 'opportunities' ? 'text-[#c5a059]' : ''}`}
          >
            {t.navOpportunities}
          </button>

          <button
            onClick={() => handleNavClick('investors')}
            className={`transition-colors whitespace-nowrap hover:text-[#c5a059] ${activeTab === 'investors' ? 'text-[#c5a059]' : ''}`}
          >
            {t.navInvestors}
          </button>

          <button
            onClick={() => handleNavClick('hotels')}
            className={`transition-colors whitespace-nowrap hover:text-[#c5a059] ${activeTab === 'hotels' ? 'text-[#c5a059]' : ''}`}
          >
            Hôtels
          </button>

          <button
            onClick={() => handleNavClick('land')}
            className={`transition-colors whitespace-nowrap hover:text-[#c5a059] ${activeTab === 'land' ? 'text-[#c5a059]' : ''}`}
          >
            Terrains
          </button>

          {/* Plus Dropdown for other pages */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 transition-colors hover:text-[#c5a059] whitespace-nowrap"
            >
              <span>Cabinet & Mandats</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-[#14161c] border border-[#2d3039] rounded-xl shadow-2xl py-2 z-50">
                <button
                  onClick={() => handleNavClick('projects')}
                  className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-[#1f222b] transition-colors"
                >
                  Projets Immobiliers
                </button>
                <button
                  onClick={() => handleNavClick('confidential')}
                  className="w-full text-left px-4 py-2 text-xs text-[#f5dfa5] hover:bg-[#1f222b] transition-colors flex items-center justify-between"
                >
                  <span>Actifs Confidentiels</span>
                  <Lock className="w-3 h-3 text-[#c5a059]" />
                </button>
                <button
                  onClick={() => handleNavClick('sell')}
                  className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-[#1f222b] transition-colors"
                >
                  Vendre un Bien
                </button>
                <button
                  onClick={() => handleNavClick('submit-project')}
                  className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-[#1f222b] transition-colors"
                >
                  Recherche d'Investisseurs
                </button>
                <button
                  onClick={() => handleNavClick('acquire')}
                  className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-[#1f222b] transition-colors"
                >
                  Acquérir un Bien
                </button>
                <button
                  onClick={() => handleNavClick('about')}
                  className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-[#1f222b] transition-colors border-t border-[#252832] mt-1 pt-2"
                >
                  À Propos du Cabinet
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: 1-2 primary actions (Language & Currency, Investor Portal, Contact) */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Currency Picker */}
          <div className="flex items-center bg-[#15171d] rounded-lg border border-[#262830] p-0.5 text-xs font-mono">
            {(['MAD', 'EUR', 'USD'] as Currency[]).map(curr => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                  currency === curr ? 'bg-[#c5a059] text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          {/* Language Selector */}
          <div className="flex items-center bg-[#15171d] rounded-lg border border-[#262830] p-0.5 text-xs">
            {(['fr', 'en', 'ar'] as Language[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded text-[11px] uppercase font-semibold transition-colors ${
                  lang === l ? 'bg-[#c5a059] text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Client Portal Button */}
          <button
            onClick={() => handleNavClick('client-space')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'client-space' 
                ? 'bg-[#252833] text-white border-[#c5a059]' 
                : 'bg-[#15171d] text-neutral-300 border-[#2b2e38] hover:border-neutral-500'
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Portail</span>
          </button>

          {/* Admin Exclusive Access Link */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'admin' 
                ? 'bg-[#c5a059] text-black font-bold border-[#c5a059]' 
                : (isAdmin 
                  ? 'bg-[#151922] text-[#f5dfa5] border-emerald-500/50 hover:border-emerald-400' 
                  : 'bg-[#15171d] text-neutral-300 border-[#2f323e] hover:border-[#c5a059]/40')
            }`}
          >
            {isAdmin ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Admin Connecté</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Espace Admin</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Quick Language Mobile */}
          <button
            onClick={() => setLang(lang === 'fr' ? 'en' : (lang === 'en' ? 'ar' : 'fr'))}
            className="px-2.5 py-1 bg-[#15171d] rounded-lg border border-[#2b2e38] text-xs font-bold text-[#c5a059] uppercase"
          >
            {lang}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111317] border-b border-[#252830] px-4 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#22252c]">
            {/* Currency */}
            <div className="flex bg-[#191b22] p-1 rounded-lg border border-[#2c2f38] justify-around">
              {(['MAD', 'EUR', 'USD'] as Currency[]).map(curr => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2 py-1 text-xs font-bold rounded ${currency === curr ? 'bg-[#c5a059] text-black' : 'text-neutral-400'}`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* Language */}
            <div className="flex bg-[#191b22] p-1 rounded-lg border border-[#2c2f38] justify-around">
              {(['fr', 'en', 'ar'] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 text-xs font-bold uppercase rounded ${lang === l ? 'bg-[#c5a059] text-black' : 'text-neutral-400'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-white hover:bg-[#1a1d24]"
            >
              {t.navHome}
            </button>
            <button
              onClick={() => handleNavClick('opportunities')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-white hover:bg-[#1a1d24]"
            >
              {t.navOpportunities}
            </button>
            <button
              onClick={() => handleNavClick('investors')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-white hover:bg-[#1a1d24]"
            >
              {t.navInvestors}
            </button>
            <button
              onClick={() => handleNavClick('hotels')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-white hover:bg-[#1a1d24]"
            >
              {t.navHotels}
            </button>
            <button
              onClick={() => handleNavClick('projects')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-white hover:bg-[#1a1d24]"
            >
              {t.navProjects}
            </button>
            <button
              onClick={() => handleNavClick('land')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-white hover:bg-[#1a1d24]"
            >
              {t.navLand}
            </button>
            <button
              onClick={() => handleNavClick('confidential')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#f5dfa5] hover:bg-[#1a1d24] flex items-center justify-between"
            >
              <span>{t.navConfidential}</span>
              <Lock className="w-3.5 h-3.5 text-[#c5a059]" />
            </button>
            <button
              onClick={() => handleNavClick('sell')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-white hover:bg-[#1a1d24]"
            >
              {t.navSell}
            </button>
            <button
              onClick={() => handleNavClick('submit-project')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-white hover:bg-[#1a1d24]"
            >
              {t.navSubmitProject}
            </button>
            <button
              onClick={() => handleNavClick('acquire')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-white hover:bg-[#1a1d24]"
            >
              {t.navAcquire}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-white hover:bg-[#1a1d24]"
            >
              {t.navAbout}
            </button>
          </div>

          <div className="pt-3 border-t border-[#22252c] grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('client-space')}
              className="w-full py-2.5 bg-[#191c24] text-white text-xs font-semibold rounded-xl border border-[#2b2e3a]"
            >
              Espace Client
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full py-2.5 bg-[#c5a059] text-black text-xs font-bold rounded-xl"
            >
              Administration
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
