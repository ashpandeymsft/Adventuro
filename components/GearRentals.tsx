import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Backpack, 
  Camera, 
  Compass, 
  Tent,
  Star,
  MapPin,
  Calendar,
  Users,
  Shield
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function GearRentals() {
  const categories = [
    { icon: Tent, name: "Camping", count: 45 },
    { icon: Backpack, name: "Hiking", count: 32 },
    { icon: Compass, name: "Navigation", count: 18 },
    { icon: Camera, name: "Photography", count: 24 }
  ];

  const featuredGear = [
    {
      id: 1,
      name: "Professional Hiking Backpack",
      category: "Hiking",
      price: 25,
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1598651302923-a9c501b306f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwZ2VhciUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTU2NDcxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["65L capacity", "Weather resistant", "Ergonomic design"],
      availability: "Available"
    },
    {
      id: 2,
      name: "4-Season Camping Tent",
      category: "Camping",
      price: 45,
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1598651302923-a9c501b306f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwZ2VhciUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTU2NDcxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["2-person", "Waterproof", "Easy setup"],
      availability: "Available"
    },
    {
      id: 3,
      name: "GPS Navigation Device",
      category: "Navigation",
      price: 15,
      rating: 4.8,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1627666260660-812e4684a600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZsaW5lJTIwbWFwJTIwbmF2aWdhdGlvbnxlbnwxfHx8fDE3NTU2NDcxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["Offline maps", "Long battery", "Waterproof"],
      availability: "Limited"
    }
  ];

  const guides = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Mountain Hiking",
      experience: "8 years",
      rating: 5.0,
      reviews: 124,
      rate: 150,
      location: "Colorado Rockies"
    },
    {
      id: 2,
      name: "Mike Chen",
      specialty: "Rock Climbing",
      experience: "12 years",
      rating: 4.9,
      reviews: 89,
      rate: 180,
      location: "Yosemite Valley"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      specialty: "Wildlife Photography",
      experience: "6 years",
      rating: 4.8,
      reviews: 67,
      rate: 120,
      location: "Yellowstone"
    }
  ];

  return (
    <section id="gear" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Gear Rentals & Expert Guides
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book professional outdoor equipment and experienced guides directly through our platform. 
            Everything you need for a safe and memorable adventure.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} items</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Gear */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Featured Equipment</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGear.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={item.availability === "Available" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}>
                      {item.availability}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900 mb-1">{item.name}</h4>
                      <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">${item.price}</div>
                      <div className="text-xs text-gray-500">per day</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{item.rating}</span>
                    <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
                  </div>
                  
                  <div className="space-y-1 mb-4">
                    {item.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Check Dates
                    </Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Expert Guides */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Expert Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xl">
                        {guide.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900">{guide.name}</h4>
                      <p className="text-sm text-gray-600">{guide.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium">{guide.experience}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{guide.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rate:</span>
                      <span className="font-bold text-green-600">${guide.rate}/day</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{guide.rating}</span>
                    <span className="text-sm text-gray-500">({guide.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Users className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      Book Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Browse All Equipment & Guides
          </Button>
        </div>
      </div>
    </section>
  );
}