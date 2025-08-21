import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Star, 
  MapPin, 
  Calendar,
  Users,
  ArrowLeft,
  CheckCircle,
  Globe,
  Mountain,
  Camera,
  Heart
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useApp } from "./AppContext";

export function GuideSelectionPage() {
  const { state, navigateTo, selectGuide } = useApp();
  const trail = state.booking.trail || state.selectedTrail;

  if (!trail) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Trail not found</p>
        <Button onClick={() => navigateTo('home')}>Go Home</Button>
      </div>
    );
  }

  const availableGuides = [
    {
      id: 'rajesh-kumar',
      name: 'Rajesh Kumar',
      initials: 'RK',
      experience: '15+ years experience',
      rating: 4.9,
      reviews: 127,
      languages: ['English', 'Hindi', 'Local Dialect'],
      specialties: ['Certified Mountaineer', 'High Altitude Expert', 'Safety Specialist'],
      pricePerDay: 3500,
      bio: 'Expert mountaineer with extensive knowledge of Himalayan regions. Certified in wilderness first aid and mountain rescue operations.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'anil-sharma',
      name: 'Anil Sharma',
      initials: 'AS',
      experience: '12+ years experience',
      rating: 4.8,
      reviews: 89,
      languages: ['English', 'Hindi', 'Garhwali'],
      specialties: ['Wildlife Expert', 'Photography Guide', 'Flora & Fauna'],
      pricePerDay: 3000,
      bio: 'Nature enthusiast and wildlife photographer. Specializes in eco-friendly trekking and sustainable tourism practices.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'priya-mehta',
      name: 'Priya Mehta',
      initials: 'PM',
      experience: '10+ years experience',
      rating: 4.9,
      reviews: 156,
      languages: ['English', 'Hindi', 'German', 'French'],
      specialties: ['International Groups', 'Cultural Guide', 'Adventure Photography'],
      pricePerDay: 4000,
      bio: 'Multi-lingual guide with extensive experience leading international trekking groups. Expert in cultural immersion experiences.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b88e8e6f?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'vikram-singh',
      name: 'Vikram Singh',
      initials: 'VS',
      experience: '18+ years experience',
      rating: 4.7,
      reviews: 203,
      languages: ['English', 'Hindi', 'Punjabi'],
      specialties: ['Extreme Weather', 'Technical Climbing', 'Emergency Response'],
      pricePerDay: 4500,
      bio: 'Veteran guide with expertise in extreme weather conditions and technical climbing. Former military with advanced survival training.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const handleGuideSelect = (guide: any) => {
    selectGuide(guide);
    navigateTo('booking-dates');
  };

  return (
    <div className="min-h-screen bg-nature-gradient">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigateTo('trail-detail')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-nature-forest">Choose Your Guide</h1>
            <p className="text-nature-sage">Select an expert guide for {trail.name}</p>
          </div>
        </div>

        {/* Trail Info Summary */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={trail.image}
                  alt={trail.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-nature-forest">{trail.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-nature-sage">
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {trail.location}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {trail.time}
                  </span>
                  <Badge variant="outline">{trail.difficulty}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableGuides.map((guide) => (
            <Card key={guide.id} className="overflow-hidden hover:shadow-nature-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <ImageWithFallback
                        src={guide.avatar}
                        alt={guide.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-nature-forest">{guide.name}</h3>
                    <p className="text-sm text-nature-sage mb-2">{guide.experience}</p>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{guide.rating}</span>
                      <span className="text-sm text-nature-sage">({guide.reviews} reviews)</span>
                    </div>
                    <div className="text-lg font-bold text-primary">₹{guide.pricePerDay.toLocaleString()}/day</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-nature-sage">{guide.bio}</p>
                
                {/* Languages */}
                <div>
                  <div className="flex items-center mb-2">
                    <Globe className="h-4 w-4 mr-2 text-nature-forest" />
                    <span className="font-medium text-sm">Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {guide.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <div className="flex items-center mb-2">
                    <Mountain className="h-4 w-4 mr-2 text-nature-forest" />
                    <span className="font-medium text-sm">Specialties</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {guide.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  <Button 
                    onClick={() => handleGuideSelect(guide)}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Select Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-nature-forest mb-2">Need Help Choosing?</h3>
            <p className="text-nature-sage mb-4">
              Our AI assistant can help you find the perfect guide based on your preferences and experience level.
            </p>
            <Button variant="outline">
              <Camera className="h-4 w-4 mr-2" />
              Get AI Recommendation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}