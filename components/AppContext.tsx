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

interface BookingAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  category: 'accommodation' | 'meals' | 'gear' | 'transport' | 'other';
  selected: boolean;
  quantity?: number;
}

interface BookingState {
  trail: any | null;
  guide: Guide | null;
  startDate: string | null;
  endDate: string | null;
  groupSize: number;
  addOns: BookingAddOn[];
  totalPrice: number;
  bookingId: string | null;
  status: 'draft' | 'confirmed' | 'cancelled';
}

interface AppState {
  currentPage: string;
  searchQuery: string;
  selectedTrail: any | null;
  bookmarks: string[];
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
  | { type: 'TOGGLE_BOOKMARK'; payload: string }
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
  toggleBookmark: (trailId: string) => void;
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
          ...initialState.booking,
          trail: action.payload.trail,
          addOns: getDefaultAddOns()
        }
      };
    
    case 'SELECT_GUIDE':
      return {
        ...state,
        booking: {
          ...state.booking,
          guide: action.payload
        }
      };
    
    case 'SET_BOOKING_DATES':
      return {
        ...state,
        booking: {
          ...state.booking,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate
        }
      };
    
    case 'SET_GROUP_SIZE':
      return {
        ...state,
        booking: {
          ...state.booking,
          groupSize: action.payload
        }
      };
    
    case 'TOGGLE_ADDON':
      return {
        ...state,
        booking: {
          ...state.booking,
          addOns: state.booking.addOns.map(addon =>
            addon.id === action.payload.id
              ? {
                  ...addon,
                  selected: !addon.selected,
                  quantity: action.payload.quantity || addon.quantity || 1
                }
              : addon
          )
        }
      };
    
    case 'CONFIRM_BOOKING':
      return {
        ...state,
        booking: {
          ...state.booking,
          bookingId: action.payload.bookingId,
          status: 'confirmed'
        }
      };
    
    case 'CANCEL_BOOKING':
      return {
        ...state,
        booking: {
          ...state.booking,
          status: 'cancelled'
        }
      };
    
    case 'RESET_BOOKING':
      return {
        ...state,
        booking: initialState.booking
      };
    
    default:
      return state;
  }
}

function getDefaultAddOns(): BookingAddOn[] {
  return [
    {
      id: 'accommodation',
      name: 'Accommodation Package',
      description: 'Comfortable stays before and after trek',
      price: 2500,
      priceUnit: 'per night',
      category: 'accommodation',
      selected: false,
      quantity: 2
    },
    {
      id: 'meals',
      name: 'Complete Meal Package',
      description: 'All meals during trek (breakfast, lunch, dinner)',
      price: 800,
      priceUnit: 'per day',
      category: 'meals',
      selected: false,
      quantity: 1
    },
    {
      id: 'gear-basic',
      name: 'Basic Gear Package',
      description: 'Essential trekking equipment',
      price: 1200,
      priceUnit: 'per package',
      category: 'gear',
      selected: false,
      quantity: 1
    },
    {
      id: 'gear-premium',
      name: 'Premium Gear Package',
      description: 'Professional high-altitude equipment',
      price: 2500,
      priceUnit: 'per package',
      category: 'gear',
      selected: false,
      quantity: 1
    },
    {
      id: 'transport',
      name: 'Transportation Package',
      description: 'Pick-up and drop from nearest city',
      price: 1500,
      priceUnit: 'per person',
      category: 'transport',
      selected: false,
      quantity: 1
    },
    {
      id: 'photography',
      name: 'Photography Service',
      description: 'Professional trek photography',
      price: 3000,
      priceUnit: 'per trek',
      category: 'other',
      selected: false,
      quantity: 1
    }
  ];
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const navigateTo = (page: string, data?: any) => {
    dispatch({ type: 'NAVIGATE_TO', payload: { page, data } });
  };

  const toggleBookmark = (trailId: string) => {
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
    const bookingId = `ADV${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    dispatch({ type: 'CONFIRM_BOOKING', payload: { bookingId } });
  };

  const cancelBooking = () => {
    dispatch({ type: 'CANCEL_BOOKING' });
  };

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
  };

  const calculateTotal = () => {
    const { booking } = state;
    let total = 0;

    // Guide cost
    if (booking.guide && booking.startDate && booking.endDate) {
      const days = Math.ceil((new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24));
      total += booking.guide.pricePerDay * days * booking.groupSize;
    }

    // Add-ons cost
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

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}