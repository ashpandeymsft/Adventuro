import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Star, 
  Compass,
  Car,
  Train,
  Plane,
  ArrowRight,
  Heart,
  Info,
  Thermometer,
  CloudRain
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useApp } from "./AppContext";

export function RecommendedNearYou() {
  const { navigateTo, setSelectedTrail, toggleBookmark, state } = useApp();
  const [userLocation, setUserLocation] = useState("Mumbai, Maharashtra");
  const [selectedDistance, setSelectedDistance] = useState<'50' | '100' | '300' | 'all'>('100');

  const nearbyTrails = [
    {
      id: 7,
      name: "Rajmachi Trek",
      location: "Lonavala, Maharashtra",
      difficulty: "Easy",
      duration: "2 days",
      distance: "83 km",
      driveTime: "2.5 hours",
      transportOptions: ['car', 'train'],
      elevation: "1,376m",
      rating: 4.5,
      reviews: 1247,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      features: ["Weekend trek", "Monsoon special", "Historic fort"],
      localTip: "Best during monsoons for lush greenery",
      weather: "Pleasant, 22°C",
      nextAvailable: "This weekend",
      popularWith: "Mumbai trekkers"
    },
    {
      id: 8,
      name: "Harishchandragad Trek",
      location: "Ahmednagar, Maharashtra",
      difficulty: "Moderate",
      duration: "2 days",
      distance: "165 km", 
      driveTime: "4 hours",
      transportOptions: ['car'],
      elevation: "1,424m",
      rating: 4.7,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1464822759844-d150baec7494?w=800&h=600&fit=crop",
      features: ["Konkankada cliff", "Ancient caves", "Sunrise views"],
      localTip: "Carry extra water, limited sources on route",
      weather: "Cool, 18°C",
      nextAvailable: "Jan 18",
      popularWith: "Adventure enthusiasts"
    },
    {
      id: 9,
      name: "Kalsubai Peak Trek",
      location: "Ahmednagar, Maharashtra",
      difficulty: "Moderate",
      duration: "1 day",
      distance: "140 km",
      driveTime: "3.5 hours", 
      transportOptions: ['car', 'train'],
      elevation: "1,646m",
      rating: 4.6,
      reviews: 1534,
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop",
      features: ["Highest peak in Maharashtra", "Day trek", "360° views"],
      localTip: "Start early to avoid afternoon heat",
      weather: "Sunny, 25°C",
      nextAvailable: "Tomorrow",
      popularWith: "Peak baggers"
    },
    {
      id: 10,
      name: "Sandhan Valley Trek",
      location: "Pune, Maharashtra",
      difficulty: "Moderate-Challenging",
      duration: "2 days",
      distance: "120 km",
      driveTime: "3 hours",
      transportOptions: ['car'],
      elevation: "1,234m",
      rating: 4.8,
      reviews: 756,
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      features: ["Valley of shadows", "Rappelling", "Canyon trek"],
      localTip: "Technical sections require good fitness",
      weather: "Cool, 20°C",
      nextAvailable: "Jan 22",
      popularWith: "Technical trekkers"
    }
  ];

  const getFilteredTrails = () => {
    if (selectedDistance === 'all') return nearbyTrails;
    const maxDistance = parseInt(selectedDistance);
    return nearbyTrails.filter(trail => parseInt(trail.distance) <= maxDistance);
  };

  const getTransportIcon = (transport: string) => {
    switch (transport) {
      case 'car': return <Car className="h-3 w-3" />;
      case 'train': return <Train className="h-3 w-3" />;
      case 'plane': return <Plane className="h-3 w-3" />;
      default: return <Car className="h-3 w-3" />;
    }
  };

  const handleTrailClick = (trail: any) => {
    setSelectedTrail(trail);
    navigateTo('trail-detail');
  };

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Compass className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Recommended Near You</h2>
          </div>
          <div className="flex items-center justify-center mb-4">
            <MapPin className="h-4 w-4 text-gray-600 mr-2" />
            <span className="text-gray-600">{userLocation}</span>
            <Button variant="ghost" size="sm" className="ml-2 text-blue-600">
              Change location
            </Button>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing treks within driving distance, curated based on your location and local insights.
          </p>
        </div>

        {/* Distance Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            {(['50', '100', '300', 'all'] as const).map((distance) => (
              <button
                key={distance}
                onClick={() => setSelectedDistance(distance)}
                className={`px-4 py-2 rounded-md transition-all text-sm ${
                  selectedDistance === distance 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {distance === 'all' ? 'All distances' : `Within ${distance} km`}
              </button>
            ))}
          </div>
        </div>

        {/* Trails Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {getFilteredTrails().map((trail, index) => (
            <Card key={trail.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="flex">
                {/* Image */}
                <div className="relative w-1/3">
                  <ImageWithFallback
                    src={trail.image}
                    alt={trail.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Distance Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-blue-600 text-white text-xs">
                      {trail.distance}
                    </Badge>
                  </div>

                  {/* Bookmark */}
                  <button
                    className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(trail.id);
                    }}
                  >
                    <Heart 
                      className={`h-3 w-3 ${
                        state.bookmarks.includes(trail.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </button>
                </div>

                {/* Content */}
                <CardContent className="flex-1 p-4">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {trail.name}
                    </h3>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{trail.location}</span>
                    </div>

                    <div className="flex items-center mb-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{trail.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({trail.reviews})</span>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {trail.difficulty}
                      </Badge>
                    </div>
                  </div>

                  {/* Travel Info */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center">
                        <Navigation className="h-4 w-4 text-blue-600 mr-1" />
                        <span className="text-gray-700">{trail.driveTime} drive</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {trail.transportOptions.map((transport, idx) => (
                          <div key={idx} className="text-blue-600">
                            {getTransportIcon(transport)}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 text-gray-600 mr-1" />
                        <span>{trail.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Thermometer className="h-3 w-3 text-gray-600 mr-1" />
                        <span>{trail.weather}</span>
                      </div>
                    </div>
                  </div>

                  {/* Local Insight */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mb-3">
                    <div className="flex items-start">
                      <Info className="h-3 w-3 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-amber-800">{trail.localTip}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {trail.features.slice(0, 2).map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Elevation and Action */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-600">Peak: </span>
                      <span className="text-lg font-bold text-blue-600">{trail.elevation}</span>
                      <div className="text-xs text-gray-500">Available {trail.nextAvailable}</div>
                    </div>
                    <Button 
                      onClick={() => handleTrailClick(trail)}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Explore
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {getFilteredTrails().length === 0 && (
          <div className="text-center py-12">
            <Compass className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No treks within {selectedDistance} km</h3>
            <p className="text-gray-600 mb-4">Try expanding your search distance or explore other regions</p>
            <Button onClick={() => setSelectedDistance('all')} variant="outline">
              Show all treks
            </Button>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigateTo('trails')}
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Explore All Nearby Adventures
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}