import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { 
  Search, 
  Menu, 
  MapPin, 
  Mountain, 
  Backpack, 
  Navigation,
  Bot,
  User,
  ArrowLeft,
  Heart,
  Bell
} from "lucide-react";
import { useApp } from "./AppContext";

export function MobileHeader() {
  const { state, navigateTo, setSearchQuery } = useApp();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      navigateTo('search-results');
    }
  };

  const showBackButton = state.currentPage !== 'home';

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-nature">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Back button or Menu */}
          <div className="flex items-center space-x-3">
            {showBackButton ? (
              <button 
                onClick={() => navigateTo('home')}
                className="inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:text-primary hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Go back</span>
              </button>
            ) : (
              <Sheet>
                <SheetTrigger asChild>
                  <button className="inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:text-primary hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-2">
                      <Mountain className="h-8 w-8 text-primary" />
                      <span className="text-xl font-semibold text-foreground">Adventuro</span>
                    </SheetTitle>
                    <SheetDescription>
                      Navigate through your trekking adventure
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="flex flex-col h-full">
                    <nav className="flex-1 py-6">
                      <div className="space-y-2">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => navigateTo('home')}
                        >
                          <MapPin className="h-5 w-5 mr-3" />
                          Discover Trails
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => navigateTo('parks')}
                        >
                          <Navigation className="h-5 w-5 mr-3" />
                          National Parks
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => navigateTo('gear')}
                        >
                          <Backpack className="h-5 w-5 mr-3" />
                          Gear Rentals
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start"
                          onClick={() => navigateTo('ai-guide')}
                        >
                          <Bot className="h-5 w-5 mr-3" />
                          AI Guide
                        </Button>
                      </div>
                    </nav>

                    <div className="border-t pt-4">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => navigateTo('profile')}
                      >
                        <User className="h-5 w-5 mr-3" />
                        Profile
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
            
            {!showBackButton && (
              <div className="flex items-center space-x-2">
                <Mountain className="h-7 w-7 text-primary" />
                <span className="text-lg font-semibold text-foreground">Adventuro</span>
              </div>
            )}
          </div>

          {/* Right side - Search and profile */}
          <div className="flex items-center space-x-2">
            {state.currentPage === 'home' && (
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Find adventures..." 
                  className="pl-10 w-48"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            )}
            
            <button className="inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:text-primary hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </button>
            
            <button 
              onClick={() => navigateTo('profile')}
              className="inline-flex items-center justify-center p-2 rounded-lg text-foreground hover:text-primary hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </button>
          </div>
        </div>

        {/* Mobile search bar - shown on home page */}
        {state.currentPage === 'home' && (
          <div className="mt-3 sm:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Discover your next adventure..." 
                className="pl-10"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}