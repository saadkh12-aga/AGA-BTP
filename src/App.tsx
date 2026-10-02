/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OpportunityDetailModal } from './components/OpportunityDetailModal';
import { VisitRequestModal } from './components/VisitRequestModal';
import { ConfidentialDossierModal } from './components/ConfidentialDossierModal';

// Pages
import { HomePage } from './pages/HomePage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { InvestorsPage } from './pages/InvestorsPage';
import { HotelsTourismPage } from './pages/HotelsTourismPage';
import { PromotionImmobilierePage } from './pages/PromotionImmobilierePage';
import { ConfidentialPage } from './pages/ConfidentialPage';
import { ProjectSeekerPage } from './pages/ProjectSeekerPage';
import { AcquirePropertyPage } from './pages/AcquirePropertyPage';
import { AboutPage } from './pages/AboutPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminOpportunityEditorModal } from './components/AdminOpportunityEditorModal';
import { MessageSquare, Phone } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, editingOpportunity, isEditorModalOpen, closeEditorModal } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'opportunities':
        return <OpportunitiesPage />;
      case 'projects':
      case 'promotion':
        return <PromotionImmobilierePage />;
      case 'hotels':
        return <HotelsTourismPage />;
      case 'investors':
        return <InvestorsPage />;
      case 'confidential':
        return <ConfidentialPage />;
      case 'submit-project':
        return <ProjectSeekerPage />;
      case 'acquire':
        return <AcquirePropertyPage />;
      case 'about':
        return <AboutPage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0d0e] text-[#f4efe8]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <OpportunityDetailModal />
      <VisitRequestModal />
      <ConfidentialDossierModal />
      <AdminOpportunityEditorModal
        isOpen={isEditorModalOpen}
        onClose={closeEditorModal}
        opportunityToEdit={editingOpportunity}
      />

      {/* Floating Quick Action (WhatsApp Direct) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2">
        <a
          href="https://wa.me/212762387255"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Dédié AGA Projects"
          className="p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center border border-emerald-400/30"
        >
          <MessageSquare className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
