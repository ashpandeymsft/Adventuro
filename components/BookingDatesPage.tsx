import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  Star, 
  MapPin, 
  Calendar,
  Users,
  ArrowLeft,
  Plus,
  Minus,
  CloudSun,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useApp } from "./AppContext";

export function BookingDatesPage() {
  const { state, navigateTo, setBookingDates, setGroupSize } = useApp();
  const { booking } = state;
  const [startDate, setStartDate] = useState(booking.startDate || '');
  const [endDate, setEndDate] = useState(booking.endDate || '');
  const [groupSize, setLocalGroupSize] = useState(booking.groupSize);

  if (!booking.trail || !booking.guide) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Booking information not found</p>
        <Button onClick={() => navigateTo('home')}>Go Home</Button>
      </div>
    );
  }

  const handleContinue = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }
    
    setBookingDates(startDate, endDate);
    setGroupSize(groupSize);
    navigateTo('booking-addons');
  };

  const weatherForecast = [
    { date: '2025-01-25', condition: 'Sunny', temp: '12°C - 25°C', status: 'excellent' },
    { date: '2025-01-26', condition: 'Partly Cloudy', temp: '10°C - 22°C', status: 'good' },
    { date: '2025-01-27', condition: 'Clear', temp: '8°C - 20°C', status: 'excellent' },
    { date: '2025-01-28', condition: 'Light Rain', temp: '6°C - 18°C', status: 'moderate' },
  ];

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Tomorrow
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6); // 6 months from now
    return maxDate.toISOString().split('T')[0];
  };

  const calculateDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const calculateGuideTotal = () => {
    const days = calculateDays();
    return booking.guide.pricePerDay * days * groupSize;
  };

  return (
    <div className="min-h-screen bg-nature-gradient">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigateTo('guide-selection')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-nature-forest">Select Dates & Group Size</h1>
            <p className="text-nature-sage">Plan your adventure with {booking.guide.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Date Selection */}
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
                        <MapPin className="h-3 w-3 mr-1" />
                        {booking.trail.location}
                      </span>
                      <span>Guide: {booking.guide.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{booking.guide.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Select Trek Dates
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || getMinDate()}
                      max={getMaxDate()}
                      className="mt-1"
                    />
                  </div>
                </div>

                {calculateDays() > 0 && (
                  <div className="bg-nature-mist rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-nature-forest font-medium">Trek Duration</span>
                      <Badge variant="secondary">{calculateDays()} days</Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Group Size */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Group Size
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-nature-mist rounded-lg">
                  <div>
                    <div className="font-medium text-nature-forest">Number of Trekkers</div>
                    <div className="text-sm text-nature-sage">Including yourself</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLocalGroupSize(Math.max(1, groupSize - 1))}
                      disabled={groupSize <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{groupSize}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLocalGroupSize(Math.min(12, groupSize + 1))}
                      disabled={groupSize >= 12}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-3 text-xs text-nature-sage">
                  Maximum group size: 12 people. For larger groups, please contact us.
                </div>
              </CardContent>
            </Card>

            {/* Weather Forecast */}
            {startDate && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center">
                    <CloudSun className="h-5 w-5 mr-2" />
                    Weather Forecast
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {weatherForecast.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-nature-mist rounded-lg">
                        <div>
                          <div className="font-medium text-nature-forest">
                            {new Date(day.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="text-sm text-nature-sage">{day.condition}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-nature-forest">{day.temp}</div>
                          <Badge 
                            variant={day.status === 'excellent' ? 'default' : day.status === 'good' ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {day.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Pricing Summary */}
          <div className="space-y-6">
            {/* Price Breakdown */}
            <Card className="sticky top-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">Booking Summary</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Guide Info */}
                <div className="flex items-center space-x-3 p-3 bg-nature-mist rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{booking.guide.initials}</span>
                  </div>
                  <div>
                    <div className="font-medium text-nature-forest">{booking.guide.name}</div>
                    <div className="text-sm text-nature-sage">₹{booking.guide.pricePerDay.toLocaleString()}/day</div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                {calculateDays() > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Guide cost ({calculateDays()} days × {groupSize} people)</span>
                      <span>₹{calculateGuideTotal().toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold text-primary">
                        <span>Subtotal</span>
                        <span>₹{calculateGuideTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 mr-2" />
                    <div className="text-xs text-yellow-800">
                      Additional services like accommodation, meals, and gear can be added in the next step.
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleContinue}
                  disabled={!startDate || !endDate}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  Continue to Add-ons
                </Button>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Important Notes
                </h3>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Free cancellation up to 7 days before trek</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Weather conditions may affect trek schedule</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Medical certificate required for high altitude treks</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Guide speaks {booking.guide.languages.join(', ')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}