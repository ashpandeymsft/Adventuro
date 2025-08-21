import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { 
  Bot, 
  Send, 
  MapPin, 
  Thermometer,
  Calendar,
  AlertTriangle,
  Camera,
  Users,
  Mountain,
  Compass
} from "lucide-react";

export function AIGuidePage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Namaste! I'm Adventuro AI, your intelligent trekking companion for India. I can help you plan treks, check weather conditions, suggest gear, and answer questions about Indian trails. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickActions = [
    { icon: MapPin, label: "Best treks near me", query: "What are the best treks near Mumbai?" },
    { icon: Thermometer, label: "Weather update", query: "What's the weather like in Himalayas this week?" },
    { icon: Calendar, label: "Best time to visit", query: "When is the best time to trek Kedarkantha?" },
    { icon: AlertTriangle, label: "Safety tips", query: "Safety tips for high altitude trekking in India" },
    { icon: Camera, label: "Photography spots", query: "Best photography spots on Indian treks" },
    { icon: Users, label: "Group vs solo", query: "Should I trek solo or with a group?" }
  ];

  const aiResponses = [
    "Based on your location in Mumbai, I recommend the Rajmachi Fort trek (2 days, easy difficulty) or Harishchandragad (2-3 days, moderate). Both offer great monsoon views!",
    "Current weather in the Himalayas shows clear skies in Uttarakhand with temperatures around 15-20°C during the day. Perfect trekking conditions!",
    "The best time for Kedarkantha trek is December to April when you'll get beautiful snow-covered trails and clear mountain views. Avoid monsoon season (July-September).",
    "For high altitude trekking: 1) Acclimatize properly, 2) Stay hydrated, 3) Recognize altitude sickness symptoms, 4) Carry emergency medications, 5) Trek with experienced guides.",
    "Amazing photography spots: Valley of Flowers for wildflowers, Roopkund for mysterious skeletal lake, Hampta Pass for contrasting landscapes, and Kedarkantha summit for 360° mountain views!",
    "For beginners, I recommend starting with group treks for safety and learning. Popular options include organized treks to Triund, Rajmachi, or Kudremukh with experienced guides."
  ];

  const sendMessage = (message: string) => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    const botResponse = {
      id: messages.length + 2,
      type: 'bot',
      content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage, botResponse]);
    setInputMessage('');
  };

  const handleQuickAction = (query: string) => {
    sendMessage(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <div className="inline-flex p-4 rounded-full bg-orange-100 text-orange-600 mb-4">
            <Bot className="h-8 w-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">AI Trekking Guide</h1>
          <p className="text-gray-600">Your intelligent companion for Indian trekking adventures</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleQuickAction(action.query)}
              >
                <CardContent className="p-4 text-center">
                  <Icon className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                  <p className="text-sm font-medium text-gray-900">{action.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Chat Interface */}
        <Card className="h-96 sm:h-[500px] flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Adventuro AI</h3>
                <p className="text-sm text-gray-500">Online • Expert in Indian treks</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-0">
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs sm:max-w-md ${
                    message.type === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  } rounded-lg p-3`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-orange-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about Indian treks, weather, gear..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                className="flex-1"
              />
              <Button 
                onClick={() => sendMessage(inputMessage)}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* AI Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Mountain className="h-8 w-8 mx-auto mb-3 text-orange-600" />
              <h3 className="font-semibold mb-2">Trail Recommendations</h3>
              <p className="text-sm text-gray-600">Personalized suggestions based on your experience and preferences</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Thermometer className="h-8 w-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2">Real-time Weather</h3>
              <p className="text-sm text-gray-600">Live weather updates and forecasts for all trekking regions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Compass className="h-8 w-8 mx-auto mb-3 text-green-600" />
              <h3 className="font-semibold mb-2">Route Planning</h3>
              <p className="text-sm text-gray-600">Detailed itineraries with distance, elevation, and timing</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}