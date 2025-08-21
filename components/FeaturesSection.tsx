import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  MapPin, 
  Calendar, 
  Backpack, 
  Download, 
  Bot,
  Mountain,
  Users,
  Shield,
  Thermometer,
  Phone
} from "lucide-react";
import { useApp } from "./AppContext";

export function FeaturesSection() {
  const { navigateTo } = useApp();

  const features = [
    {
      icon: MapPin,
      title: "Indian Trail Discovery",
      description: "Explore trails across India from Himalayas to Western Ghats. Get real-time conditions, detailed maps, and local insights for your perfect trek.",
      highlights: ["5000+ Indian trails", "Live weather updates", "Local expertise"],
      color: "bg-blue-50 text-blue-600",
      onClick: () => navigateTo('trails')
    },
    {
      icon: Calendar,
      title: "National Park Itineraries",
      description: "Discover curated experiences for India's national parks. From Jim Corbett to Ranthambore, plan your wildlife adventures with expert guidance.",
      highlights: ["50+ national parks", "Wildlife spotting", "Conservation tours"],
      color: "bg-green-50 text-green-600", 
      onClick: () => navigateTo('parks')
    },
    {
      icon: Backpack,
      title: "Gear Rentals",
      description: "Rent quality trekking equipment from local vendors across India. From basic gear to high-altitude equipment, we have everything you need.",
      highlights: ["Pan-India delivery", "Quality assured", "Local partners"],
      color: "bg-orange-50 text-orange-600",
      onClick: () => navigateTo('gear')
    },
    {
      icon: Download,
      title: "Offline Navigation",
      description: "Download detailed offline maps for remote Indian locations. Stay safe with GPS tracking, emergency contacts, and offline trail markers.",
      highlights: ["Works offline", "Emergency SOS", "Detailed topography"],
      color: "bg-purple-50 text-purple-600",
      onClick: () => navigateTo('trail-map')
    },
    {
      icon: Bot,
      title: "AI Trekking Assistant",
      description: "Get personalized recommendations from our AI guide trained on Indian trekking conditions. Weather updates, route planning, and safety tips.",
      highlights: ["India-specific AI", "24/7 assistance", "Regional insights"],
      color: "bg-pink-50 text-pink-600",
      onClick: () => navigateTo('ai-guide')
    },
    {
      icon: Phone,
      title: "Emergency Support",
      description: "24/7 emergency assistance with local rescue teams and medical support across major trekking regions in India.",
      highlights: ["24/7 helpline", "Rescue coordination", "Medical assistance"],
      color: "bg-red-50 text-red-600"
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything for Your Indian Adventure
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            From discovering hidden gems in the Himalayas to renting gear in Mumbai, 
            Adventuro is built specifically for Indian trekking enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className={`h-full hover:shadow-lg transition-all duration-200 ${
                  feature.onClick ? 'cursor-pointer hover:scale-105' : ''
                }`}
                onClick={feature.onClick}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {feature.highlights.map((highlight, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
          <div className="text-center">
            <div className="inline-flex p-3 sm:p-4 rounded-full bg-orange-100 text-orange-600 mb-4">
              <Mountain className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">50+ Regions</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Complete coverage from Kashmir to Kanyakumari
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex p-3 sm:p-4 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Users className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">50,000+ Trekkers</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Active community of Indian adventure enthusiasts
            </p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex p-3 sm:p-4 rounded-full bg-green-100 text-green-600 mb-4">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">100% Safe</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Verified guides and emergency support nationwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}