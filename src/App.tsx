import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { MobileNavigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { HomeFeed } from './components/home/HomeFeed';
import { JobList } from './components/jobs/JobList';
import { JobDetailsModal } from './components/jobs/JobDetailsModal';
import { ApplyJobModal } from './components/jobs/ApplyJobModal';
import { InteractiveMapModal } from './components/jobs/InteractiveMapModal';
import { ReportModal } from './components/jobs/ReportModal';
import { OffersList } from './components/offers/OffersList';
import { OfferDetailsModal } from './components/offers/OfferDetailsModal';
import { PostOfferModal } from './components/offers/PostOfferModal';
import { DiscussionRoomsList } from './components/discussions/DiscussionRoomsList';
import { CreateRoomModal } from './components/discussions/CreateRoomModal';
import { PostJobModal } from './components/employer/PostJobModal';
import { BusinessVerificationModal } from './components/employer/BusinessVerificationModal';
import { NotificationCenter } from './components/notifications/NotificationCenter';
import { ProfileView } from './components/profile/ProfileView';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { PrivacyNoticeModal } from './components/common/PrivacyNoticeModal';
import { ZonePickerModal } from './components/layout/ZonePickerModal';
import { Sparkles, CheckCircle, Info } from 'lucide-react';
import './styles/index.css';
import './styles/components.css';

const MainAppContent: React.FC = () => {
  const { activeTab, toast } = useApp();

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header />

      {/* Dynamic View Router */}
      <main className="main-content">
        {activeTab === 'home' && <HomeFeed />}
        {activeTab === 'jobs' && <JobList />}
        {activeTab === 'offers' && <OffersList />}
        {activeTab === 'discussions' && <DiscussionRoomsList />}
        {activeTab === 'notifications' && <NotificationCenter />}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Rich Footer */}
      <Footer />

      {/* Mobile Navigation Bar */}
      <MobileNavigation />

      {/* Global Modals */}
      <JobDetailsModal />
      <ApplyJobModal />
      <InteractiveMapModal />
      <ReportModal />
      <OfferDetailsModal />
      <PostJobModal />
      <PostOfferModal />
      <CreateRoomModal />
      <BusinessVerificationModal />
      <ZonePickerModal />
      <AdminDashboardModal />
      <PrivacyNoticeModal />

      {/* Floating Interactive Toast */}
      {toast && (
        <div className={`toast-floating toast-${toast.type}`}>
          <Sparkles size={18} color="#FFFFFF" />
          <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
};

export default App;
