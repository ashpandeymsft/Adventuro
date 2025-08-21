import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, MapPin, Star, Thermometer, TrendingUp, Navigation } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useApp } from "./AppContext";

export function IndianHeroSection() {
  const { navigateTo } = useApp();

  const handleSearch = () => {
    navigateTo('search-results');
  };

  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1737523094517-e44d8b34fb64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbWFsYXlhbiUyMHRyZWtraW5nJTIwbW91bnRhaW5zfGVufDF8fHx8MTc1NTY0NzM0N3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Himalayan mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            Find Your Inner Peace
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 leading-relaxed">
            Reconnect with nature through India's most serene trekking destinations. 
            Discover tranquil trails, breathe mountain air, and find your peaceful escape with Adventuro.
          </p>
          
          <div className="bg-card/95 backdrop-blur-lg p-4 sm:p-6 rounded-2xl shadow-nature-lg border border-border/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Your location" 
                  className="pl-10 text-foreground bg-input-background border-border focus:border-primary"
                  defaultValue="Mumbai, Maharashtra"
                />
              </div>
              
              <Select>
                <SelectTrigger className="text-foreground bg-input-background border-border focus:border-primary">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="difficult">Difficult</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="text-foreground bg-input-background border-border focus:border-primary">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="himalayas">Himalayas</SelectItem>
                  <SelectItem value="western-ghats">Western Ghats</SelectItem>
                  <SelectItem value="eastern-ghats">Eastern Ghats</SelectItem>
                  <SelectItem value="nilgiri">Nilgiri Hills</SelectItem>
                  <SelectItem value="aravalli">Aravalli Range</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-nature transition-all duration-300"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Discover</span>
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-nature-sunset" />
                <span>5,000+ peaceful trails</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4 text-primary" />
                <span>All states covered</span>
              </div>
              <div className="flex items-center space-x-1">
                <Thermometer className="h-4 w-4 text-nature-sky" />
                <span>Real-time conditions</span>
              </div>
            </div>
            
            {/* Quick Discovery Preview */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-nature-gradient rounded-lg p-3 border border-nature-sage/20 shadow-sm">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-4 w-4 text-nature-forest mr-2" />
                    <span className="font-medium text-nature-forest">Popular This Week</span>
                  </div>
                  <div className="text-nature-forest/80">
                    <p className="mb-1">🌸 Kedarkantha Trek - Peaceful escape</p>
                    <p>🦋 Valley of Flowers - Blooming season</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-nature-sky/20 to-nature-mist rounded-lg p-3 border border-nature-sky/20 shadow-sm">
                  <div className="flex items-center mb-2">
                    <Navigation className="h-4 w-4 text-nature-forest mr-2" />
                    <span className="font-medium text-nature-forest">Near Mumbai</span>
                  </div>
                  <div className="text-nature-forest/80">
                    <p className="mb-1">🍃 Rajmachi - Serene getaway</p>
                    <p>🏔️ Kalsubai Peak - Mountain tranquility</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}