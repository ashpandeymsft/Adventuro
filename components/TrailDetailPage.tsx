import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Star, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Heart,
  Share2,
  Navigation,
  Calendar,
  Users,
  Thermometer,
  Camera,
  AlertTriangle,
  MessageCircle,
  CheckCircle,
  Map,
  Plus,
  Home,
  UtensilsCrossed,
  Backpack
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useApp } from "./AppContext";

export function TrailDetailPage() {
  const { state, navigateTo, toggleBookmark, startBooking } = useApp();
  const trail = state.selectedTrail;

  if (!trail) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Trail not found</p>
        <Button onClick={() => navigateTo('home')}>Go Home</Button>
      </div>
    );
  }

  const itinerary = [
    {
      day: 1,
      title: "Base Camp to First Stop",
      description: "Trek through pine forests and meadows",
      distance: "8 km",
      time: "4-5 hours",
      elevation: "+800m"
    },
    {
      day: 2,
      title: "Acclimatization Day",
      description: "Rest day with local exploration",
      distance: "3 km",
      time: "2-3 hours", 
      elevation: "+200m"
    },
    {
      day: 3,
      title: "Summit Day",
      description: "Early morning summit push",
      distance: "6 km",
      time: "6-8 hours",
      elevation: "+1200m"
    }
  ];

  const baseInclusions = [
    "Professional trek leader and local guide",
    "First aid medical kit and safety equipment",
    "Forest permits and entry fees",
    "Transportation from designated meeting point"
  ];

  const exclusions = [
    "Personal trekking equipment (available for rent)",
    "Travel insurance",
    "Personal expenses and tips",
    "Emergency evacuation costs"
  ];

  const upsellOptions = [
    {
      id: 'accommodation',
      name: 'Accommodation Package',
      description: 'Comfortable stays before and after trek',
      price: '₹2,500/night',
      icon: Home,
      color: 'purple',
      included: false
    },
    {
      id: 'meals',
      name: 'Complete Meal Package',
      description: 'All meals during trek (breakfast, lunch, dinner)',
      price: '₹800/day',
      icon: UtensilsCrossed,
      color: 'yellow',
      included: false
    },
    {
      id: 'gear',
      name: 'Gear Rental Package',
      description: 'Professional trekking equipment and gear',
      price: '₹1,200/package',
      icon: Backpack,
      color: 'red',
      included: false
    }
  ];

  const getRecommendedGear = () => {
    return [
      "Trekking boots (waterproof)",
      "Weather-appropriate clothing layers",
      "Rain gear and warm jacket",
      "Sleeping bag rated for temperature",
      "Trekking poles",
      "Headlamp with extra batteries",
      "Personal water bottle",
      "Sunglasses and sunscreen"
    ];
  };

  const handleBookNow = () => {
    startBooking(trail);
    navigateTo('guide-selection');
  };

  const handleGuideSelect = (guideId: string) => {
    // Mock guide selection for quick booking
    const guides = [
      {
        id: 'rajesh-kumar',
        name: 'Rajesh Kumar',
        initials: 'RK',
        experience: '15+ years experience',
        rating: 4.9,
        reviews: 127,
        languages: ['English', 'Hindi', 'Local Dialect'],
        specialties: ['Certified Mountaineer', 'High Altitude Expert', 'Safety Specialist'],
        pricePerDay: 3500
      }
    ];
    
    const selectedGuide = guides.find(g => g.id === guideId) || guides[0];
    startBooking(trail);
    navigateTo('guide-selection');
  };

  const handleAIChat = () => {
    navigateTo('ai-guide');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: trail.name,
        text: `Check out this amazing trek: ${trail.name} in ${trail.location}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-64 sm:h-80 lg:h-96">
        <ImageWithFallback
          src={trail.image}
          alt={trail.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{trail.name}</h1>
              <div className="flex items-center space-x-2 text-sm sm:text-base">
                <MapPin className="h-4 w-4" />
                <span>{trail.location}</span>
                <Star className="h-4 w-4 text-yellow-400 fill-current ml-4" />
                <span>{trail.rating} ({trail.reviews} reviews)</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                onClick={() => toggleBookmark(trail.id)}
              >
                <Heart 
                  className={`h-5 w-5 ${
                    state.bookmarks.includes(trail.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-white'
                  }`} 
                />
                <span className="sr-only">
                  {state.bookmarks.includes(trail.id) ? 'Remove from bookmarks' : 'Add to bookmarks'}
                </span>
              </button>
              <button 
                className="inline-flex items-center justify-center p-2 rounded-md bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share this trail</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <Navigation className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                <div className="text-lg font-semibold">{trail.distance}</div>
                <div className="text-sm text-gray-500">Distance</div>
              </div>
              <div className="text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-lg font-semibold">{trail.time}</div>
                <div className="text-sm text-gray-500">Duration</div>
              </div>
              <div className="text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="text-lg font-semibold">{trail.elevation}</div>
                <div className="text-sm text-gray-500">Max Elevation</div>
              </div>
              <div className="text-center">
                <Badge className="mx-auto mb-2" variant={trail.difficulty === 'Easy' ? 'default' : 'secondary'}>
                  {trail.difficulty}
                </Badge>
                <div className="text-sm text-gray-500">Difficulty</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* For This Hike, You'll Need Section */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold">For This Hike, You'll Need</h3>
            <p className="text-sm text-gray-600">Essential items and recommended add-ons for this trek</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {upsellOptions.map((option) => {
                const IconComponent = option.icon;
                const colorClasses = {
                  purple: 'bg-purple-100 text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white',
                  yellow: 'bg-yellow-100 text-yellow-600 border-yellow-600 hover:bg-yellow-600 hover:text-white',
                  red: 'bg-red-100 text-red-600 border-red-600 hover:bg-red-600 hover:text-white'
                };
                
                return (
                  <div key={option.id} className="border rounded-lg p-4 text-center">
                    <div className={`w-16 h-16 ${colorClasses[option.color].split(' ')[0]} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className={`h-8 w-8 ${colorClasses[option.color].split(' ')[1]}`} />
                    </div>
                    <h4 className="font-semibold mb-2">{option.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                    <p className={`font-semibold ${colorClasses[option.color].split(' ')[1]} mb-3`}>{option.price}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className={`w-full ${colorClasses[option.color]}`}
                      onClick={handleBookNow}
                    >
                      Add to Package
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center">
                <Backpack className="h-4 w-4 mr-2" />
                Recommended Gear for This Trek
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {getRecommendedGear().map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trail Map Section - Always visible */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold flex items-center">
              <Map className="h-5 w-5 mr-2" />
              Trail Map & Route
            </h3>
            <p className="text-sm text-gray-600">Detailed trail route and navigation points</p>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <Map className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600">Interactive trail map</p>
                <p className="text-sm text-gray-500">GPS coordinates, waypoints & elevation profile</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <strong>Starting Point</strong><br />
                Base Camp Parking
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <strong>Key Waypoints</strong><br />
                3 major checkpoints
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <strong>GPS Available</strong><br />
                Offline download
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guide Booking Section */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold">Book a Local Guide</h3>
            <p className="text-sm text-gray-600">Enhance your experience with expert local guides</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Guide 1 */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">RK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Rajesh Kumar</h4>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm">4.9 (127 reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>15+ years experience</p>
                  <p>Certified mountaineer</p>
                  <p>Speaks English, Hindi, Local</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-semibold text-blue-600">₹3,500/day</span>
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleGuideSelect('rajesh-kumar')}
                  >
                    Book Guide
                  </Button>
                </div>
              </div>

              {/* Guide 2 */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">AS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Anil Sharma</h4>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm">4.8 (89 reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>12+ years experience</p>
                  <p>Wildlife expert</p>
                  <p>Photography guide</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-semibold text-green-600">₹3,000/day</span>
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleGuideSelect('anil-sharma')}
                  >
                    Book Guide
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigateTo('guide-selection')}
              >
                View All Available Guides
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="w-full" 
                size="lg"
                onClick={handleAIChat}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                AI Chat for Details
              </Button>
              <Button 
                className="w-full bg-orange-600 hover:bg-orange-700" 
                size="lg"
                onClick={() => navigateTo('community')}
              >
                <Users className="h-4 w-4 mr-2" />
                Join Community
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                size="lg"
                onClick={handleBookNow}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="itinerary" className="text-xs sm:text-sm">Itinerary</TabsTrigger>
            <TabsTrigger value="inclusions" className="text-xs sm:text-sm">Inclusions</TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs sm:text-sm">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">About This Trek</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  {trail.name} is one of the world's most popular treks, offering breathtaking views and an unforgettable experience. 
                  This trek takes you through diverse landscapes, from lush forests to snow-capped peaks.
                </p>
                
                <div>
                  <h4 className="font-semibold mb-2">Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {trail.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
                    Important Notes
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Medical certificate required for high altitude treks</li>
                    <li>• Weather conditions can change rapidly</li>
                    <li>• Physical fitness assessment recommended</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="itinerary" className="mt-6">
            <div className="space-y-4">
              {itinerary.map((day) => (
                <Card key={day.day}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                        {day.day}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{day.title}</h4>
                        <p className="text-gray-600 mb-3">{day.description}</p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Distance:</span>
                            <div className="font-medium">{day.distance}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Time:</span>
                            <div className="font-medium">{day.time}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Elevation:</span>
                            <div className="font-medium">{day.elevation}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inclusions" className="mt-6">
            <div className="space-y-6">
              {/* Base Package Inclusions */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-green-600">✓ Base Package Includes</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {baseInclusions.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Upsell Add-ons */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-blue-600">➕ Available Add-ons</h3>
                  <p className="text-sm text-gray-600">Enhance your experience with these optional services</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upsellOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <div key={option.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-5 w-5 text-gray-600" />
                            <div>
                              <h4 className="font-medium">{option.name}</h4>
                              <p className="text-sm text-gray-600">{option.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary">{option.price}</p>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="mt-1"
                              onClick={handleBookNow}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Exclusions */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-red-600">✗ Not Included</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {exclusions.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="h-4 w-4 border border-red-600 rounded-full mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Custom Add-on Option */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Need Something Else?</h3>
                  <p className="text-sm text-gray-600">Tell us what you need and we'll help arrange it</p>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Describe what you need (e.g., photography service, special dietary requirements)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button onClick={handleBookNow}>
                      <Plus className="h-4 w-4 mr-2" />
                      Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              {[1, 2, 3].map((review) => (
                <Card key={review}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">A</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Anonymous Trekker</h4>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm">4.8</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Amazing trek with breathtaking views! The guide was knowledgeable and the experience was unforgettable. 
                          Highly recommend for anyone looking for adventure.
                        </p>
                        <div className="text-xs text-gray-500 mt-2">2 weeks ago</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}