import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Star, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Heart,
  Share2,
  Navigation
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useApp } from "./AppContext";

export function IndianTrailDiscovery() {
  const { state, navigateTo, toggleBookmark } = useApp();

  const indianTrails = [
    {
      id: 'kedarkantha',
      name: "Kedarkantha Trek",
      location: "Uttarakhand",
      difficulty: "Moderate",
      distance: "20 km", 
      elevation: "3,810 m",
      time: "4-5 days",
      rating: 4.8,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1737523094517-e44d8b34fb64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbWFsYXlhbiUyMHRyZWtraW5nJTIwbW91bnRhaW5zfGVufDF8fHx8MTc1NTY0NzM0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["Snow Trek", "360° Views", "Beginner Friendly"],
      condition: "Good",
      price: "₹8,500",
      bestTime: "Dec-Apr"
    },
    {
      id: 'hampta-pass',
      name: "Hampta Pass Trek",
      location: "Himachal Pradesh",
      difficulty: "Moderate",
      distance: "26 km",
      elevation: "4,270 m", 
      time: "5 days",
      rating: 4.7,
      reviews: 654,
      image: "https://images.unsplash.com/photo-1708867817468-9f7a7aaa0d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZXN0ZXJuJTIwZ2hhdHMlMjBpbmRpYSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTU2NDczNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["Valley Views", "River Crossing", "Desert Mountains"],
      condition: "Excellent",
      price: "₹12,000",
      bestTime: "Jun-Sep"
    },
    {
      id: 'rajmachi',
      name: "Rajmachi Fort Trek",
      location: "Maharashtra",
      difficulty: "Easy",
      distance: "15 km",
      elevation: "1,000 m",
      time: "2 days",
      rating: 4.5,
      reviews: 1247,
      image: "https://images.unsplash.com/photo-1705258632838-79362a86a531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjBuYXRpb25hbCUyMHBhcmslMjB3aWxkbGlmZXxlbnwxfHx8fDE3NTU2NDczNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["Historical Fort", "Monsoon Special", "Weekend Trek"],
      condition: "Good",
      price: "₹2,500",
      bestTime: "Oct-Mar"
    },
    {
      id: 'valley-of-flowers',
      name: "Valley of Flowers",
      location: "Uttarakhand",
      difficulty: "Moderate",
      distance: "38 km",
      elevation: "3,658 m",
      time: "6 days", 
      rating: 4.9,
      reviews: 423,
      image: "https://images.unsplash.com/photo-1584525242979-1b96af822fb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHh0cmVra2luZyUyMGdlYXIlMjBiYWNrcGFjayUyMGluZGlhfGVufDF8fHx8MTc1NTY0NzM0OXww&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["UNESCO Site", "Alpine Flowers", "Hemkund Sahib"],
      condition: "Seasonal",
      price: "₹15,000",
      bestTime: "Jul-Sep"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Moderate": return "bg-yellow-100 text-yellow-800";
      case "Difficult": return "bg-red-100 text-red-800";
      case "Expert": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "Good": return "bg-blue-100 text-blue-800";
      case "Seasonal": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleTrailClick = (trail: any) => {
    navigateTo('trail-detail', { trail });
  };

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Popular Indian Treks
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover India's most stunning trekking destinations with detailed guides and local expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {indianTrails.map((trail) => (
            <Card 
              key={trail.id} 
              className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105"
              onClick={() => handleTrailClick(trail)}
            >
              <div className="relative h-40 sm:h-48">
                <ImageWithFallback
                  src={trail.image}
                  alt={trail.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex space-x-2">
                  <Badge className={getConditionColor(trail.condition)} variant="secondary">
                    {trail.condition}
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <button
                    className="inline-flex items-center justify-center p-1 rounded-md bg-white/80 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(trail.id);
                    }}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        state.bookmarks.includes(trail.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600'
                      }`} 
                    />
                    <span className="sr-only">
                      {state.bookmarks.includes(trail.id) ? 'Remove from bookmarks' : 'Add to bookmarks'}
                    </span>
                  </button>
                </div>
              </div>
              
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 line-clamp-1">
                    {trail.name}
                  </h3>
                  <div className="flex items-center space-x-1 ml-2">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm font-medium">{trail.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 mb-3 text-gray-600">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">{trail.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                  <Badge className={getDifficultyColor(trail.difficulty)} variant="secondary">
                    {trail.difficulty}
                  </Badge>
                  {trail.features.slice(0, 2).map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Navigation className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{trail.distance}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{trail.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{trail.elevation}</span>
                  </div>
                  <div className="text-orange-600 font-semibold">
                    {trail.price}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mb-3">
                  Best time: {trail.bestTime}
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle share action
                    }}
                  >
                    <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Share
                  </button>
                  <button 
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-xs sm:text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrailClick(trail);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <button 
            onClick={() => navigateTo('trails')}
            className="inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
          >
            Explore All Treks
          </button>
        </div>
      </div>
    </section>
  );
}