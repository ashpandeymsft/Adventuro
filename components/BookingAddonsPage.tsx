import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { 
  Star, 
  MapPin, 
  Calendar,
  Users,
  ArrowLeft,
  Plus,
  Minus,
  Home,
  UtensilsCrossed,
  Backpack,
  Car,
  Camera,
  Gift,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useApp } from "./AppContext";

export function BookingAddonsPage() {
  const { state, navigateTo, toggleAddOn, calculateTotal } = useApp();
  const { booking } = state;

  if (!booking.trail || !booking.guide || !booking.startDate || !booking.endDate) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Booking information not found</p>
        <Button onClick={() => navigateTo('home')}>Go Home</Button>
      </div>
    );
  }

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'accommodation': return Home;
      case 'meals': return UtensilsCrossed;
      case 'gear': return Backpack;
      case 'transport': return Car;
      case 'other': return Camera;
      default: return Gift;
    }
  };

  const getColorForCategory = (category: string) => {
    switch (category) {
      case 'accommodation': return 'purple';
      case 'meals': return 'yellow';
      case 'gear': return 'red';
      case 'transport': return 'blue';
      case 'other': return 'green';
      default: return 'gray';
    }
  };

  const calculateDays = () => {
    const start = new Date(booking.startDate!);
    const end = new Date(booking.endDate!);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateGuideTotal = () => {
    const days = calculateDays();
    return booking.guide!.pricePerDay * days * booking.groupSize;
  };

  const calculateAddonsTotal = () => {
    let total = 0;
    booking.addOns.forEach(addon => {
      if (addon.selected) {
        let addonCost = addon.price * (addon.quantity || 1);
        if (addon.priceUnit.includes('per person')) {
          addonCost *= booking.groupSize;
        }
        total += addonCost;
      }
    });
    return total;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleContinue = () => {
    navigateTo('booking-confirmation');
  };

  const groupedAddons = booking.addOns.reduce((acc: any, addon) => {
    if (!acc[addon.category]) {
      acc[addon.category] = [];
    }
    acc[addon.category].push(addon);
    return acc;
  }, {});

  const categoryNames = {
    accommodation: 'Accommodation',
    meals: 'Meals & Dining',
    gear: 'Equipment & Gear',
    transport: 'Transportation',
    other: 'Additional Services'
  };

  return (
    <div className="min-h-screen bg-nature-gradient">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigateTo('booking-dates')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-nature-forest">Customize Your Package</h1>
            <p className="text-nature-sage">Add services to enhance your trekking experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Add-ons Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={booking.trail.image}
                      alt={booking.trail.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-nature-forest">{booking.trail.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-nature-sage">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(booking.startDate!)} - {formatDate(booking.endDate!)}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {booking.groupSize} people
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline">{calculateDays()} days</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Add-ons by Category */}
            {Object.entries(groupedAddons).map(([category, addons]: [string, any]) => (
              <Card key={category}>
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center">
                    {React.createElement(getIconForCategory(category), {
                      className: "h-5 w-5 mr-2"
                    })}
                    {categoryNames[category as keyof typeof categoryNames]}
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {addons.map((addon: any) => {
                      const IconComponent = getIconForCategory(addon.category);
                      const colorClass = getColorForCategory(addon.category);
                      
                      return (
                        <div 
                          key={addon.id}
                          className={`border rounded-lg p-4 transition-all ${
                            addon.selected ? 'border-primary bg-primary/5' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                addon.selected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                              }`}>
                                <IconComponent className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-nature-forest">{addon.name}</h4>
                                <p className="text-sm text-nature-sage mb-2">{addon.description}</p>
                                <div className="flex items-center space-x-4">
                                  <span className="font-semibold text-primary">
                                    ₹{addon.price.toLocaleString()} {addon.priceUnit}
                                  </span>
                                  {addon.priceUnit.includes('per person') && (
                                    <Badge variant="outline" className="text-xs">
                                      × {booking.groupSize} people
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              {addon.selected && (
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleAddOn(addon.id, Math.max(1, (addon.quantity || 1) - 1))}
                                    disabled={(addon.quantity || 1) <= 1}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center text-sm font-medium">
                                    {addon.quantity || 1}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleAddOn(addon.id, (addon.quantity || 1) + 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                              <Switch
                                checked={addon.selected}
                                onCheckedChange={() => toggleAddOn(addon.id)}
                              />
                            </div>
                          </div>
                          
                          {addon.selected && (
                            <div className="mt-3 pt-3 border-t border-primary/20">
                              <div className="flex justify-between text-sm">
                                <span>Subtotal ({addon.quantity || 1} × ₹{addon.price.toLocaleString()})</span>
                                <span className="font-medium">
                                  ₹{(addon.price * (addon.quantity || 1) * (addon.priceUnit.includes('per person') ? booking.groupSize : 1)).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Custom Requests */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center">
                  <Gift className="h-5 w-5 mr-2" />
                  Special Requests
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="dietary">Dietary Requirements</Label>
                  <Input
                    id="dietary"
                    placeholder="e.g., Vegetarian, Vegan, Gluten-free, Allergies"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="special">Special Requests</Label>
                  <Textarea
                    id="special"
                    placeholder="Any special arrangements, celebrations, or additional services you'd like us to arrange..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Price Summary */}
          <div className="space-y-6">
            {/* Price Breakdown */}
            <Card className="sticky top-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">Package Summary</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Guide Info */}
                <div className="flex items-center space-x-3 p-3 bg-nature-mist rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{booking.guide.initials}</span>
                  </div>
                  <div>
                    <div className="font-medium text-nature-forest">{booking.guide.name}</div>
                    <div className="text-sm text-nature-sage">Expert Guide</div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Guide Service ({calculateDays()} days)</span>
                    <span>₹{calculateGuideTotal().toLocaleString()}</span>
                  </div>
                  
                  {booking.addOns.filter(addon => addon.selected).length > 0 && (
                    <>
                      <div className="border-t pt-2">
                        <div className="text-sm font-medium text-nature-forest mb-2">Add-ons</div>
                        {booking.addOns.filter(addon => addon.selected).map(addon => (
                          <div key={addon.id} className="flex justify-between text-sm mb-1">
                            <span className="text-nature-sage">
                              {addon.name} {addon.quantity && addon.quantity > 1 ? `(×${addon.quantity})` : ''}
                            </span>
                            <span>
                              ₹{(addon.price * (addon.quantity || 1) * (addon.priceUnit.includes('per person') ? booking.groupSize : 1)).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between text-sm">
                          <span>Add-ons Subtotal</span>
                          <span>₹{calculateAddonsTotal().toLocaleString()}</span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg text-primary">
                      <span>Total</span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-nature-sage mt-1">
                      For {booking.groupSize} people
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                    <div className="text-xs text-green-800">
                      <div className="font-medium mb-1">What's Included:</div>
                      <div>Professional guide, safety equipment, permits, and all selected add-ons.</div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleContinue}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  Continue to Booking
                </Button>
              </CardContent>
            </Card>

            {/* Recommended Add-ons */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Recommended
                </h3>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>For {booking.trail.name}, we highly recommend adding <strong>accommodation</strong> and <strong>meal packages</strong> for the best experience.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Gear rental is available if you don't have professional trekking equipment.</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}