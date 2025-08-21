import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { 
  Star, 
  MapPin, 
  Calendar,
  Users,
  Phone,
  Mail,
  CheckCircle,
  Download,
  Share2,
  MessageCircle,
  Clock,
  Shield,
  CreditCard,
  PartyPopper,
  Navigation,
  TrendingUp
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useApp } from "./AppContext";

export function BookingConfirmationPage() {
  const { state, navigateTo, confirmBooking, calculateTotal } = useApp();
  const { booking, user } = state;
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!booking.trail || !booking.guide || !booking.startDate || !booking.endDate) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Booking information not found</p>
        <Button onClick={() => navigateTo('home')}>Go Home</Button>
      </div>
    );
  }

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
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleConfirmBooking = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    confirmBooking();
    setIsConfirmed(true);
    setIsProcessing(false);
  };

  const selectedAddons = booking.addOns.filter(addon => addon.selected);

  if (isConfirmed || booking.status === 'confirmed') {
    return (
      <div className="min-h-screen bg-nature-gradient">
        <div className="container mx-auto px-4 py-6">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-nature-forest mb-2 flex items-center justify-center">
              <PartyPopper className="h-8 w-8 mr-3" />
              Booking Confirmed!
            </h1>
            <p className="text-nature-sage text-lg">
              Your adventure awaits! We've sent confirmation details to your email.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Confirmation Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Booking ID */}
              <Card>
                <CardContent className="p-6 text-center">
                  <h2 className="text-2xl font-bold text-primary mb-2">
                    Booking ID: {booking.bookingId}
                  </h2>
                  <p className="text-nature-sage">Keep this ID for your records</p>
                </CardContent>
              </Card>

              {/* Trek Details */}
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Your Adventure Details</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={booking.trail.image}
                        alt={booking.trail.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-nature-forest">{booking.trail.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-nature-sage">
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {booking.trail.location}
                        </span>
                        <span className="flex items-center">
                          <Navigation className="h-3 w-3 mr-1" />
                          {booking.trail.distance}
                        </span>
                        <span className="flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {booking.trail.elevation}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-nature-mist rounded-lg">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-medium text-nature-forest">Start Date</div>
                      <div className="text-sm text-nature-sage">{formatTime(booking.startDate!)}</div>
                    </div>
                    <div className="text-center p-3 bg-nature-mist rounded-lg">
                      <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-medium text-nature-forest">Duration</div>
                      <div className="text-sm text-nature-sage">{calculateDays()} days</div>
                    </div>
                    <div className="text-center p-3 bg-nature-mist rounded-lg">
                      <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-medium text-nature-forest">Group Size</div>
                      <div className="text-sm text-nature-sage">{booking.groupSize} people</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide Information */}
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Your Guide</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 p-4 bg-nature-mist rounded-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">{booking.guide.initials}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-nature-forest">{booking.guide.name}</h4>
                      <p className="text-nature-sage mb-2">{booking.guide.experience}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{booking.guide.rating}</span>
                          <span className="text-sm text-nature-sage">({booking.guide.reviews} reviews)</span>
                        </div>
                        <Badge variant="outline">Certified</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-nature-forest mb-2">Guide will contact you</h5>
                    <p className="text-sm text-nature-sage">
                      {booking.guide.name} will reach out 24-48 hours before your trek with detailed instructions, 
                      meeting point, and weather updates.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Add-ons */}
              {selectedAddons.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-semibold">Your Add-ons</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedAddons.map(addon => (
                        <div key={addon.id} className="flex items-center justify-between p-3 bg-nature-mist rounded-lg">
                          <div>
                            <div className="font-medium text-nature-forest">{addon.name}</div>
                            <div className="text-sm text-nature-sage">{addon.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              ₹{(addon.price * (addon.quantity || 1) * (addon.priceUnit.includes('per person') ? booking.groupSize : 1)).toLocaleString()}
                            </div>
                            {addon.quantity && addon.quantity > 1 && (
                              <div className="text-xs text-nature-sage">Qty: {addon.quantity}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Important Information */}
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Important Information
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Confirmation email sent with detailed itinerary and packing list</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Free cancellation up to 7 days before trek start date</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>24/7 emergency support during your trek</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Weather monitoring and safety updates provided</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Summary
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Guide Service</span>
                    <span>₹{calculateGuideTotal().toLocaleString()}</span>
                  </div>
                  {selectedAddons.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Add-ons</span>
                      <span>₹{calculateAddonsTotal().toLocaleString()}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg text-primary">
                    <span>Total Paid</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-nature-sage">
                    Payment processed securely via Razorpay
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Quick Actions</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Booking
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share with Friends
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Add to Calendar
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Need Help?</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-nature-sage mb-3">
                    Our support team is here to help with any questions.
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      <span>support@adventuro.com</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-3">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat Support
                  </Button>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">What's Next?</h3>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                    <span>Check your email for detailed itinerary</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                    <span>Prepare based on the packing list</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                    <span>Your guide will contact you 24-48h before</span>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={() => navigateTo('home')}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Explore More Adventures
                </Button>
                <Button 
                  onClick={() => navigateTo('community')}
                  variant="outline"
                  className="w-full"
                >
                  Join Trekking Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-gradient">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-nature-forest mb-2">Review & Confirm</h1>
          <p className="text-nature-sage text-lg">
            Almost there! Please review your booking details before confirming.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trek Summary */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Trek Details</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={booking.trail.image}
                      alt={booking.trail.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-nature-forest">{booking.trail.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-nature-sage">
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {booking.trail.location}
                      </span>
                      <Badge variant="outline">{booking.trail.difficulty}</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-3 bg-nature-mist rounded-lg">
                    <Calendar className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="font-medium text-nature-forest">Dates</div>
                    <div className="text-xs text-nature-sage">
                      {formatTime(booking.startDate!)} - {formatTime(booking.endDate!)}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-nature-mist rounded-lg">
                    <Clock className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="font-medium text-nature-forest">Duration</div>
                    <div className="text-xs text-nature-sage">{calculateDays()} days</div>
                  </div>
                  <div className="text-center p-3 bg-nature-mist rounded-lg">
                    <Users className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="font-medium text-nature-forest">Group</div>
                    <div className="text-xs text-nature-sage">{booking.groupSize} people</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guide Details */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Your Guide</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 p-4 bg-nature-mist rounded-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">{booking.guide.initials}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-nature-forest">{booking.guide.name}</h4>
                    <p className="text-nature-sage mb-2">{booking.guide.experience}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{booking.guide.rating}</span>
                        <span className="text-sm text-nature-sage">({booking.guide.reviews} reviews)</span>
                      </div>
                      <div className="text-sm text-nature-sage">
                        Languages: {booking.guide.languages.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Information */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Contact Information</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={user?.name || ''}
                      className="mt-1"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ''}
                      className="mt-1"
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={user?.phone || ''}
                    className="mt-1"
                    readOnly
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Payment */}
          <div className="space-y-6">
            {/* Price Breakdown */}
            <Card className="sticky top-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">Final Summary</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Guide Service ({calculateDays()} days × {booking.groupSize})</span>
                    <span>₹{calculateGuideTotal().toLocaleString()}</span>
                  </div>
                  
                  {selectedAddons.map(addon => (
                    <div key={addon.id} className="flex justify-between text-sm">
                      <span className="text-nature-sage">
                        {addon.name} {addon.quantity && addon.quantity > 1 ? `(×${addon.quantity})` : ''}
                      </span>
                      <span>
                        ₹{(addon.price * (addon.quantity || 1) * (addon.priceUnit.includes('per person') ? booking.groupSize : 1)).toLocaleString()}
                      </span>
                    </div>
                  ))}

                  <Separator />
                  <div className="flex justify-between font-bold text-lg text-primary">
                    <span>Total Amount</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button 
                    onClick={handleConfirmBooking}
                    disabled={isProcessing}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Confirm & Pay ₹{calculateTotal().toLocaleString()}
                      </>
                    )}
                  </Button>
                  
                  <div className="text-xs text-center text-nature-sage">
                    Secure payment powered by Razorpay
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Badge */}
            <Card>
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-sm font-medium text-nature-forest">100% Secure Payment</div>
                <div className="text-xs text-nature-sage">SSL encrypted & PCI compliant</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}