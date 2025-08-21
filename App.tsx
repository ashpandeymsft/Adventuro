import { AppProvider, useApp } from "./components/AppContext";
import { MobileHeader } from "./components/MobileHeader";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { TrailDiscovery } from "./components/TrailDiscovery";
import { GearRentals } from "./components/GearRentals";
import { Footer } from "./components/Footer";
import { TrailDetailPage } from "./components/TrailDetailPage";
import { AIGuidePage } from "./components/AIGuidePage";
import { TrailMapPage } from "./components/TrailMapPage";
import { TrendingHikes } from "./components/TrendingHikes";
import { RecommendedNearYou } from "./components/RecommendedNearYou";
import { CommunityPage } from "./components/CommunityPage";
import { GuideSelectionPage } from "./components/GuideSelectionPage";
import { BookingDatesPage } from "./components/BookingDatesPage";
import { BookingAddonsPage } from "./components/BookingAddonsPage";
import { BookingConfirmationPage } from "./components/BookingConfirmationPage";

function AppContent() {
  const { state } = useApp();

  const renderPage = () => {
    switch (state.currentPage) {
      case 'home':
        return (
          <>
            <HeroSection />
            <TrendingHikes />
            <RecommendedNearYou />
            <FeaturesSection />
            <TrailDiscovery />
            <GearRentals />
            <Footer />
          </>
        );
      
      case 'trail-detail':
        return <TrailDetailPage />;

      case 'trail-map':
        return <TrailMapPage />;
        
      case 'ai-guide':
        return <AIGuidePage />;
        
      case 'community':
        return <CommunityPage />;

      case 'guide-selection':
        return <GuideSelectionPage />;

      case 'booking-dates':
        return <BookingDatesPage />;

      case 'booking-addons':
        return <BookingAddonsPage />;

      case 'booking-confirmation':
        return <BookingConfirmationPage />;
        
      case 'trails':
        return (
          <div className="min-h-screen bg-nature-gradient pb-20 md:pb-0">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-nature-forest mb-4">
                  Discover Nature's Wonders
                </h1>
                <p className="text-nature-sage text-lg">
                  Explore breathtaking trekking destinations across pristine landscapes
                </p>
              </div>
              <TrailDiscovery />
            </div>
          </div>
        );
        
      case 'gear':
        return (
          <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
            <GearRentals />
          </div>
        );
        
      case 'parks':
        return (
          <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
            <div className="container mx-auto px-4 py-6">
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  National Parks & Wildlife
                </h1>
                <p className="text-gray-600">
                  Explore incredible biodiversity and natural heritage
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Jim Corbett National Park",
                    location: "Uttarakhand, India",
                    specialty: "Tigers, Elephants",
                    bestTime: "Nov-Jun"
                  },
                  {
                    name: "Ranthambore National Park", 
                    location: "Rajasthan, India",
                    specialty: "Royal Bengal Tigers",
                    bestTime: "Oct-Apr"
                  },
                  {
                    name: "Kaziranga National Park",
                    location: "Assam, India", 
                    specialty: "One-horned Rhinoceros",
                    bestTime: "Nov-Apr"
                  }
                ].map((park, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{park.name}</h3>
                    <p className="text-gray-600 mb-2">{park.location}</p>
                    <p className="text-sm text-gray-500 mb-3">Famous for: {park.specialty}</p>
                    <p className="text-sm text-orange-600">Best time: {park.bestTime}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'profile':
        return (
          <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
            <div className="container mx-auto px-4 py-6">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">A</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Adventuro Profile</h1>
                <p className="text-gray-600">Adventure Enthusiast</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed Treks</h3>
                  <p className="text-3xl font-bold text-orange-600">12</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Distance</h3>
                  <p className="text-3xl font-bold text-green-600">248 km</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Experience Level</h3>
                  <p className="text-3xl font-bold text-blue-600">Intermediate</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'search-results':
        return (
          <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
            <div className="container mx-auto px-4 py-6">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Search Results
                </h1>
                <p className="text-gray-600">
                  {state.searchQuery ? `Results for "${state.searchQuery}"` : 'Popular treks near you'}
                </p>
              </div>
              <TrailDiscovery />
            </div>
          </div>
        );
        
      default:
        return (
          <>
            <HeroSection />
            <TrendingHikes />
            <RecommendedNearYou />
            <FeaturesSection />
            <TrailDiscovery />
            <GearRentals />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      <main className={state.currentPage !== 'home' ? 'pt-0' : ''}>
        {renderPage()}
      </main>
      <MobileBottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}