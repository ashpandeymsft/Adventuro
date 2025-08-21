import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  Search, 
  Menu, 
  MapPin, 
  Compass, 
  Backpack, 
  Navigation,
  Bot
} from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Compass className="h-8 w-8 text-green-600" />
            <span className="text-xl font-semibold text-gray-900">TrailFinder</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#trails" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <MapPin className="h-4 w-4" />
              <span>Trails</span>
            </a>
            <a href="#parks" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <Navigation className="h-4 w-4" />
              <span>Parks</span>
            </a>
            <a href="#gear" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <Backpack className="h-4 w-4" />
              <span>Gear</span>
            </a>
            <a href="#ai" className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
              <Bot className="h-4 w-4" />
              <span>AI Guide</span>
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search trails..." 
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">Sign In</Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">Get Started</Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}