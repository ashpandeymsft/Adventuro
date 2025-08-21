import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
interface Guide {
  id: string;
  name: string;
  initials: string;
  experience: string;
  rating: number;
  reviews: number;
  languages: string[];
  specialties: string[];
  pricePerDay: number;
  avatar?: string;
  bio?: string;
}

interface BookingState {
  trail: any | null;
  guide: Guide | null;
  startDate: string | null;
  endDate: string | null;
  groupSize: number;
  addOns: { id: string; quantity: number }[];
  totalPrice: number;
  bookingId: string | null;
  status: 'draft' | 'confirmed' | 'cancelled';
}

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  TrendingUp,
  MapPin, 
  Clock, 
  Star, 
  Users, 
  Flame,
  ArrowRight,
  Heart,
  Calendar
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useApp } from "./AppContext";

interface AppState {
  currentPage: string;
  searchQuery: string;
  selectedTrail: any | null;
  bookmarks: number[];
  user: {
    name: string;
    email: string;
    phone: string;
  } | null;
  booking: BookingState;
}

type AppAction =
  | { type: 'NAVIGATE_TO'; payload: { page: string; data?: any } }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_TRAIL'; payload: any }
  | { type: 'TOGGLE_BOOKMARK'; payload: number }
  | { type: 'SET_USER'; payload: any }
  | { type: 'START_BOOKING'; payload: { trail: any } }
  | { type: 'SELECT_GUIDE'; payload: Guide }
  | { type: 'SET_BOOKING_DATES'; payload: { startDate: string; endDate: string } }
  | { type: 'SET_GROUP_SIZE'; payload: number }
  | { type: 'TOGGLE_ADDON'; payload: { id: string; quantity?: number } }
  | { type: 'CONFIRM_BOOKING'; payload: { bookingId: string } }
  | { type: 'CANCEL_BOOKING' }
  | { type: 'RESET_BOOKING' };

const initialState: AppState = {
  currentPage: 'home',
  searchQuery: '',
  selectedTrail: null,
  bookmarks: [],
  user: {
    name: 'Adventure Seeker',
    email: 'seeker@adventuro.com',
    phone: '+91 98765 43210'
  },
  booking: {
    trail: null,
    guide: null,
    startDate: null,
    endDate: null,
    groupSize: 1,
    addOns: [],
    totalPrice: 0,
    bookingId: null,
    status: 'draft'
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  navigateTo: (page: string, data?: any) => void;
  toggleBookmark: (trailId: number) => void;
  startBooking: (trail: any) => void;
  selectGuide: (guide: Guide) => void;
  setBookingDates: (startDate: string, endDate: string) => void;
  setGroupSize: (size: number) => void;
  toggleAddOn: (id: string, quantity?: number) => void;
  confirmBooking: () => void;
  cancelBooking: () => void;
  resetBooking: () => void;
  calculateTotal: () => number;
} | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'NAVIGATE_TO':
      return {
        ...state,
        currentPage: action.payload.page,
        selectedTrail: action.payload.data?.trail || state.selectedTrail,
      };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_SELECTED_TRAIL':
      return { ...state, selectedTrail: action.payload };
    
    case 'TOGGLE_BOOKMARK':
      const bookmarks = state.bookmarks.includes(action.payload)
        ? state.bookmarks.filter(id => id !== action.payload)
        : [...state.bookmarks, action.payload];
      return { ...state, bookmarks };
    
    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'START_BOOKING':
      return {
        ...state,
        booking: {
          ...state.booking,
          trail: action.payload.trail,
        },
        currentPage: 'booking-details',
      };
    
    case 'SELECT_GUIDE':
      return {
        ...state,
        booking: {
          ...state.booking,
          guide: action.payload,
        },
      };

    case 'SET_BOOKING_DATES':
      return {
        ...state,
        booking: {
          ...state.booking,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
        },
      };

    case 'SET_GROUP_SIZE':
      return {
        ...state,
        booking: {
          ...state.booking,
          groupSize: action.payload,
        },
      };

    case 'TOGGLE_ADDON':
      const existingAddonIndex = state.booking.addOns.findIndex(addon => addon.id === action.payload.id);
      let updatedAddOns = [...state.booking.addOns];

      if (existingAddonIndex > -1) {
        if (action.payload.quantity === 0) {
          // Remove the addon if quantity is set to 0
          updatedAddOns.splice(existingAddonIndex, 1);
        } else {
          // Update the quantity of existing addon
          updatedAddOns[existingAddonIndex] = {
            ...updatedAddOns[existingAddonIndex],
            quantity: action.payload.quantity || 1, // Use provided quantity or default to 1
          };
        }
      } else {
        // Add new addon with quantity 1 if not specified
        updatedAddOns.push({ id: action.payload.id, quantity: action.payload.quantity || 1 });
      }

      return {
        ...state,
        booking: {
          ...state.booking,
          addOns: updatedAddOns,
        },
      };
    
    case 'CONFIRM_BOOKING':
      return {
        ...state,
        booking: {
          ...state.booking,
          status: 'confirmed',
          bookingId: action.payload.bookingId,
        },
        currentPage: 'booking-confirmation'
      };

    case 'CANCEL_BOOKING':
      return {
        ...state,
        booking: {
          ...state.booking,
          status: 'cancelled',
        },
      };

    case 'RESET_BOOKING':
      return {
        ...state,
        booking: {
          trail: null,
          guide: null,
          startDate: null,
          endDate: null,
          groupSize: 1,
          addOns: [],
          totalPrice: 0,
          bookingId: null,
          status: 'draft'
        }
      };

    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const navigateTo = (page: string, data?: any) => {
    dispatch({ type: 'NAVIGATE_TO', payload: { page, data } });
  };

  const toggleBookmark = (trailId: number) => {
    dispatch({ type: 'TOGGLE_BOOKMARK', payload: trailId });
  };

  const startBooking = (trail: any) => {
    dispatch({ type: 'START_BOOKING', payload: { trail } });
  };

  const selectGuide = (guide: Guide) => {
    dispatch({ type: 'SELECT_GUIDE', payload: guide });
  };

  const setBookingDates = (startDate: string, endDate: string) => {
    dispatch({ type: 'SET_BOOKING_DATES', payload: { startDate, endDate } });
  };

  const setGroupSize = (size: number) => {
    dispatch({ type: 'SET_GROUP_SIZE', payload: size });
  };

  const toggleAddOn = (id: string, quantity?: number) => {
    dispatch({ type: 'TOGGLE_ADDON', payload: { id, quantity } });
  };

  const confirmBooking = () => {
    // Simulate booking confirmation and generate a booking ID
    const bookingId = Math.random().toString(36).substring(7).toUpperCase();
    dispatch({ type: 'CONFIRM_BOOKING', payload: { bookingId } });
  };

  const cancelBooking = () => {
    dispatch({ type: 'CANCEL_BOOKING' });
  };

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
  };

  const calculateTotal = () => {
    let total = 0;
    if (state.booking.trail) {
      total += 100; // Base price for the trail
      if (state.booking.guide) {
        total += state.booking.guide.pricePerDay;
      }
      total *= state.booking.groupSize;
      state.booking.addOns.forEach(addOn => {
        total += 20 * addOn.quantity; // Price per addon
      });
    }
    return total;
  };

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      navigateTo,
      toggleBookmark,
      startBooking,
      selectGuide,
      setBookingDates,
      setGroupSize,
      toggleAddOn,
      confirmBooking,
      cancelBooking,
      resetBooking,
      calculateTotal
    }}>
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppContext, useAppContext };

export function TrendingHikes() {
  const { navigateTo, setSelectedTrail, toggleBookmark, state } = useApp();
  const [activeTab, setActiveTab] = useState<'trending' | 'hot' | 'new'>('trending');

  const trendingTrails = [
    {
      id: 1,
      name: "Kedarkantha Trek",
      location: "Uttarakhand",
      difficulty: "Moderate",
      duration: "6 days",
      elevation: "3,810m",
      rating: 4.8,
      reviews: 2847,
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      trendingRank: 1,
      bookedToday: 127,
      trendChange: "+24%",
      features: ["Snow views", "Summit trek", "Pine forests"],
      nextAvailable: "Jan 15"
    },
    {
      id: 2,
      name: "Hampta Pass Trek",
      location: "Himachal Pradesh", 
      difficulty: "Moderate",
      duration: "5 days",
      elevation: "4,270m",
      rating: 4.7,
      reviews: 1923,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      trendingRank: 2,
      bookedToday: 89,
      trendChange: "+18%",
      features: ["Valley crossing", "Desert views", "River crossings"],
      nextAvailable: "Jan 20"
    },
    {
      id: 3,
      name: "Valley of Flowers",
      location: "Uttarakhand",
      difficulty: "Easy-Moderate", 
      duration: "6 days",
      elevation: "3,658m",
      rating: 4.9,
      reviews: 3241,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      trendingRank: 3,
      bookedToday: 156,
      trendChange: "+32%",
      features: ["Flower meadows", "UNESCO site", "Glacial views"],
      nextAvailable: "Jul 1"
    }
  ];

  const hotTrails = [
    {
      id: 4,
      name: "Chadar Trek",
      location: "Ladakh",
      difficulty: "Challenging",
      duration: "9 days", 
      elevation: "3,505m",
      rating: 4.9,
      reviews: 987,
      image: "https://images.unsplash.com/photo-1464822759844-d150baec7494?w=800&h=600&fit=crop",
      trendingRank: 1,
      bookedToday: 67,
      trendChange: "+45%",
      features: ["Frozen river", "Winter trek", "Ice formations"],
      nextAvailable: "Feb 1"
    },
    {
      id: 5,
      name: "Sandakphu Trek",
      location: "West Bengal",
      difficulty: "Moderate",
      duration: "6 days",
      elevation: "3,636m", 
      rating: 4.6,
      reviews: 1456,
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop",
      trendingRank: 2,
      bookedToday: 78,
      trendChange: "+28%",
      features: ["Everest views", "Rhododendrons", "Sunrise point"],
      nextAvailable: "Mar 10"
    }
  ];

  const newTrails = [
    {
      id: 6,
      name: "Kuari Pass Trek",
      location: "Uttarakhand",
      difficulty: "Easy-Moderate",
      duration: "6 days",
      elevation: "4,268m",
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1464822759844-d150baec7494?w=800&h=600&fit=crop",
      trendingRank: 1,
      bookedToday: 34,
      trendChange: "New",
      features: ["Panoramic views", "Lord Curzon trail", "Oak forests"],
      nextAvailable: "Jan 25"
    }
  ];

  const getCurrentTrails = () => {
    switch (activeTab) {
      case 'hot': return hotTrails;
      case 'new': return newTrails;
      default: return trendingTrails;
    }
  };

    const handleTrailClick = (trail: any) => {
        setSelectedTrail(trail);
        navigateTo('trail-detail');
    };

  return (
    <section className="py-12 bg-nature-gradient">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-foreground">Popular Peaceful Escapes</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover the serene trails that fellow nature lovers are choosing for their mindful adventures.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-card rounded-lg p-1 shadow-nature border border-border">
            <button
              onClick={() => setActiveTab('trending')}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                activeTab === 'trending' 
                  ? 'bg-primary text-primary-foreground shadow-nature' 
                  : 'text-muted-foreground hover:text-primary hover:bg-accent'
              }`}
            >
              <TrendingUp className="h-4 w-4 inline mr-2" />
              Trending
            </button>
            <button
              onClick={() => setActiveTab('hot')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'hot' 
                  ? 'bg-orange-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <Flame className="h-4 w-4 inline mr-2" />
              Hot
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'new' 
                  ? 'bg-orange-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <Star className="h-4 w-4 inline mr-2" />
              New
            </button>
          </div>
        </div>

        {/* Trails Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {getCurrentTrails().map((trail, index) => (
            <Card key={trail.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={trail.image}
                  alt={trail.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Trending Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-orange-600 text-white">
                    #{trail.trendingRank} {activeTab}
                  </Badge>
                </div>

                {/* Bookmark Button */}
                <button
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
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
                </button>

                {/* Trend Indicator */}
                <div className="absolute bottom-3 left-3">
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {trail.trendChange}
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {trail.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{trail.location}</span>
                    <Clock className="h-3 w-3 ml-3 mr-1" />
                    <span>{trail.duration}</span>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{trail.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({trail.reviews.toLocaleString()})</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {trail.features.slice(0, 2).map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Booking Stats */}
                <div className="bg-orange-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-orange-600 mr-1" />
                      <span className="text-gray-700">{trail.bookedToday} booked today</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-gray-700">Next: {trail.nextAvailable}</span>
                    </div>
                  </div>
                </div>

                {/* Elevation and Action */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Max Elevation:</span>
                    <span className="text-lg font-bold text-orange-600 ml-2">{trail.elevation}</span>
                  </div>
                  <Button 
                    onClick={() => handleTrailClick(trail)}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Explore
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigateTo('trails')}
            className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
          >
            View All {activeTab === 'trending' ? 'Trending' : activeTab === 'hot' ? 'Hot' : 'New'} Treks
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}