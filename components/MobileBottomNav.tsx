import { 
  Home, 
  MapPin, 
  Backpack, 
  Bot,
  User,
  Map,
  Users
} from "lucide-react";
import { useApp } from "./AppContext";

export function MobileBottomNav() {
  const { state, navigateTo } = useApp();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'trails', icon: MapPin, label: 'Trails' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'ai-guide', icon: Bot, label: 'AI Guide' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50 md:hidden shadow-nature-lg">
      <div className="grid grid-cols-5 gap-1 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = state.currentPage === item.id;
          
          return (
            <button
              key={item.id}
              className={`flex flex-col items-center space-y-1 p-2 h-auto rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                isActive 
                  ? 'text-primary bg-primary/10 shadow-sm' 
                  : 'text-muted-foreground hover:text-primary hover:bg-accent/50'
              }`}
              onClick={() => navigateTo(item.id as any)}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'fill-current' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}