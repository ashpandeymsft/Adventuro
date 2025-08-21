import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Switch } from "./ui/switch";
import { 
  MapPin, 
  Download, 
  Navigation, 
  Share, 
  AlertTriangle, 
  Phone,
  ZoomIn,
  ZoomOut,
  Compass,
  Mountain,
  Wifi,
  WifiOff,
  Timer,
  Route,
  Users,
  Settings,
  Target,
  TrendingUp,
  Activity
} from "lucide-react";
import { useApp } from "./AppContext";

export function TrailMapPage() {
  const { state } = useApp();
  const [isGPSActive, setIsGPSActive] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [mapDownloaded, setMapDownloaded] = useState(true);
  const [emergencySharing, setEmergencySharing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 30.0668, lng: 79.0193 }); // Kedarkantha area
  const [elevation, setElevation] = useState(3650);
  const [speed, setSpeed] = useState(2.3);
  const [distance, setDistance] = useState(4.2);
  const [duration, setDuration] = useState(142); // minutes
  const [zoomLevel, setZoomLevel] = useState(15);

  // Simulate GPS tracking
  useEffect(() => {
    if (!isGPSActive) return;
    
    const interval = setInterval(() => {
      setCurrentLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.0001,
        lng: prev.lng + (Math.random() - 0.5) * 0.0001
      }));
      setElevation(prev => prev + (Math.random() - 0.5) * 5);
      setSpeed(prev => Math.max(0, prev + (Math.random() - 0.5) * 0.5));
      setDistance(prev => prev + 0.01);
      setDuration(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isGPSActive]);

  const trailMarkers = [
    { id: 1, name: "Sankri Village", lat: 30.0668, lng: 79.0193, type: "start", elevation: 1950 },
    { id: 2, name: "Juda ka Talab", lat: 30.0703, lng: 79.0156, type: "campsite", elevation: 2900 },
    { id: 3, name: "Kedarkantha Base", lat: 30.0739, lng: 79.0121, type: "campsite", elevation: 3400 },
    { id: 4, name: "Kedarkantha Summit", lat: 30.0781, lng: 79.0089, type: "summit", elevation: 3800 }
  ];

  const emergencyContacts = [
    { name: "Local Rescue Team", phone: "+91-98765-43210" },
    { name: "Family Contact", phone: "+91-98765-43211" },
    { name: "Trek Guide", phone: "+91-98765-43212" }
  ];

  const handleDownloadMap = () => {
    setMapDownloaded(true);
  };

  const handleEmergencyShare = () => {
    setEmergencySharing(!emergencySharing);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Map Container */}
      <div className="relative h-[50vh] bg-gradient-to-br from-green-100 via-green-200 to-green-300">
        {/* Mock Map Interface */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-400">
          {/* Trail Path */}
          <svg className="absolute inset-0 w-full h-full">
            <path
              d="M 50 200 Q 150 180 250 160 T 350 140"
              stroke="#f97316"
              strokeWidth="4"
              fill="none"
              strokeDasharray="2,2"
            />
          </svg>
          
          {/* Trail Markers */}
          {trailMarkers.map((marker, index) => (
            <div
              key={marker.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `${20 + index * 25}%`, 
                top: `${60 - index * 10}%` 
              }}
            >
              <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                marker.type === 'summit' ? 'bg-red-500' : 
                marker.type === 'campsite' ? 'bg-blue-500' : 'bg-green-500'
              }`} />
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-xs bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap">
                {marker.name}
              </div>
            </div>
          ))}

          {/* Current Location */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-6 h-6 bg-blue-600 rounded-full border-3 border-white shadow-lg pulse" />
              <div className="absolute inset-0 w-6 h-6 bg-blue-600 rounded-full opacity-25 animate-ping" />
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button 
            size="sm" 
            variant="secondary"
            onClick={() => setZoomLevel(prev => Math.min(20, prev + 1))}
            className="bg-white/90 hover:bg-white"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="secondary"
            onClick={() => setZoomLevel(prev => Math.max(10, prev - 1))}
            className="bg-white/90 hover:bg-white"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="secondary"
            className="bg-white/90 hover:bg-white"
          >
            <Compass className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="secondary"
            className="bg-white/90 hover:bg-white"
          >
            <Target className="h-4 w-4" />
          </Button>
        </div>

        {/* Status Indicators */}
        <div className="absolute top-4 left-4 space-y-2">
          <Badge variant={isOfflineMode ? "secondary" : "default"} className="bg-white/90">
            {isOfflineMode ? <WifiOff className="h-3 w-3 mr-1" /> : <Wifi className="h-3 w-3 mr-1" />}
            {isOfflineMode ? "Offline Mode" : "Online"}
          </Badge>
          <Badge variant={mapDownloaded ? "default" : "destructive"} className="bg-white/90">
            <Download className="h-3 w-3 mr-1" />
            {mapDownloaded ? "Map Downloaded" : "Download Required"}
          </Badge>
        </div>

        {/* Emergency Button */}
        <div className="absolute bottom-4 right-4">
          <Button 
            variant={emergencySharing ? "destructive" : "secondary"}
            onClick={handleEmergencyShare}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            SOS
          </Button>
        </div>
      </div>

      {/* Controls and Information */}
      <div className="container mx-auto px-4 py-4 space-y-4">
        {/* GPS and Tracking Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-3 text-center">
              <Navigation className="h-5 w-5 mx-auto mb-1 text-blue-600" />
              <p className="text-sm text-gray-600">GPS Status</p>
              <p className="font-semibold text-green-600">{isGPSActive ? "Active" : "Inactive"}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 text-center">
              <Route className="h-5 w-5 mx-auto mb-1 text-orange-600" />
              <p className="text-sm text-gray-600">Distance</p>
              <p className="font-semibold">{distance.toFixed(1)} km</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 text-center">
              <Timer className="h-5 w-5 mx-auto mb-1 text-purple-600" />
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold">{formatTime(duration)}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 text-center">
              <Mountain className="h-5 w-5 mx-auto mb-1 text-green-600" />
              <p className="text-sm text-gray-600">Elevation</p>
              <p className="font-semibold">{elevation.toFixed(0)}m</p>
            </CardContent>
          </Card>
        </div>

        {/* Trail Controls */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Trail Controls</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Navigation className="h-5 w-5 text-blue-600" />
                <span>GPS Tracking</span>
              </div>
              <Switch 
                checked={isGPSActive} 
                onCheckedChange={setIsGPSActive}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <WifiOff className="h-5 w-5 text-gray-600" />
                <span>Offline Mode</span>
              </div>
              <Switch 
                checked={isOfflineMode} 
                onCheckedChange={setIsOfflineMode}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Share className="h-5 w-5 text-red-600" />
                <span>Emergency Sharing</span>
              </div>
              <Switch 
                checked={emergencySharing} 
                onCheckedChange={setEmergencySharing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Offline Map Management */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Offline Maps</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Kedarkantha Trail Map</p>
                <p className="text-sm text-gray-600">Size: 45 MB • Last updated: 2 days ago</p>
              </div>
              <Badge variant={mapDownloaded ? "default" : "destructive"}>
                {mapDownloaded ? "Downloaded" : "Not Available"}
              </Badge>
            </div>
            
            {!mapDownloaded && (
              <Button 
                onClick={handleDownloadMap}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Offline Map
              </Button>
            )}
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Download Progress</span>
                <span>{mapDownloaded ? "100%" : "0%"}</span>
              </div>
              <Progress value={mapDownloaded ? 100 : 0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        {emergencySharing && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-red-600">Emergency Contacts</h3>
              <p className="text-sm text-gray-600">Your location is being shared with:</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.phone}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <AlertTriangle className="h-4 w-4 inline mr-1" />
                  Location shared: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Trail Markers */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Trail Markers</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {trailMarkers.map((marker) => (
              <div key={marker.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    marker.type === 'summit' ? 'bg-red-500' : 
                    marker.type === 'campsite' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="font-medium">{marker.name}</p>
                    <p className="text-sm text-gray-600">{marker.elevation}m elevation</p>
                  </div>
                </div>
                <Badge variant="outline">
                  {marker.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Elevation Profile */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Elevation Profile</h3>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gray-100 rounded-lg flex items-end justify-between p-4">
              {trailMarkers.map((marker, index) => (
                <div key={marker.id} className="flex flex-col items-center">
                  <div 
                    className="bg-orange-600 w-8 rounded-t"
                    style={{ height: `${(marker.elevation - 1500) / 30}px` }}
                  />
                  <span className="text-xs mt-1">{marker.elevation}m</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>0 km</span>
              <span>5 km</span>
              <span>10 km</span>
              <span>15 km</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}