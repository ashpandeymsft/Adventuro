import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Camera, 
  MapPin, 
  Star, 
  Calendar,
  TrendingUp,
  Users,
  Award,
  Plus,
  Filter,
  Search,
  ChevronDown,
  Mountain,
  Image as ImageIcon
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useApp } from "./AppContext";

export function CommunityPage() {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('feed');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState('');

  const communityPosts = [
    {
      id: 1,
      user: {
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        level: "Expert Trekker",
        completedTreks: 47
      },
      trek: "Kedarkantha Trek",
      location: "Uttarakhand",
      date: "2 days ago",
      rating: 5,
      images: [
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
      ],
      content: "Just completed the most incredible trek to Kedarkantha! The snow-capped views were absolutely breathtaking. Started early at 4 AM for the summit push - totally worth it for the sunrise. Weather was perfect, around -5°C at the top. Highly recommend carrying microspikes for the final ascent. The sense of achievement is indescribable! 🏔️❄️",
      likes: 127,
      comments: 23,
      shares: 8,
      tags: ["winter-trek", "summit", "himalayas", "snow"],
      difficulty: "Moderate",
      duration: "6 days"
    },
    {
      id: 2,
      user: {
        name: "Arjun Patel",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        level: "Adventure Seeker",
        completedTreks: 18
      },
      trek: "Rajmachi Trek",
      location: "Maharashtra",
      date: "1 week ago",
      rating: 4,
      images: [
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop"
      ],
      content: "Perfect weekend getaway from Mumbai! Rajmachi during monsoon is a completely different experience. The entire landscape turns emerald green and the waterfalls are in full flow. The ancient fort ruins add a historical touch to the adventure. Met amazing fellow trekkers on the way. Pro tip: Carry a good raincoat and waterproof your backpack!",
      likes: 89,
      comments: 15,
      shares: 12,
      tags: ["monsoon", "weekend-trek", "maharashtra", "fort"],
      difficulty: "Easy",
      duration: "2 days"
    },
    {
      id: 3,
      user: {
        name: "Sneha Reddy",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        level: "Mountain Enthusiast",
        completedTreks: 32
      },
      trek: "Valley of Flowers",
      location: "Uttarakhand",
      date: "3 weeks ago",
      rating: 5,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1464822759844-d150baec7494?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop"
      ],
      content: "Words cannot describe the magic of Valley of Flowers! Went during peak bloom season and it was like walking through a fairy tale. Hundreds of varieties of alpine flowers creating a natural carpet. The trek to Hemkund Sahib added a spiritual dimension. Respect to the local guides who ensure this UNESCO site remains pristine. Already planning my next visit! 🌸🌺",
      likes: 203,
      comments: 41,
      shares: 28,
      tags: ["unesco", "flowers", "spiritual", "alpine"],
      difficulty: "Moderate",
      duration: "6 days"
    }
  ];

  const trekkerSpotlight = [
    {
      name: "Rohit Kumar",
      completedTreks: 89,
      favoriteRegion: "Himalayas",
      achievement: "Mountaineering Expert",
      recentTrek: "Stok Kangri"
    },
    {
      name: "Anita Singh",
      completedTreks: 67,
      favoriteRegion: "Western Ghats",
      achievement: "Monsoon Specialist",
      recentTrek: "Harishchandragad"
    },
    {
      name: "Vikram Joshi",
      completedTreks: 124,
      favoriteRegion: "Eastern Himalayas",
      achievement: "Trail Pioneer", 
      recentTrek: "Goecha La"
    }
  ];

  const handleCreatePost = () => {
    if (newPost.trim()) {
      // Add new post logic here
      setNewPost('');
      setShowNewPost(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Adventuro Community
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your adventures, discover new trails, and connect with fellow trekkers across India
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">12.5K</p>
              <p className="text-sm text-gray-600">Active Trekkers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Mountain className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">3,247</p>
              <p className="text-sm text-gray-600">Treks Shared</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Camera className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">18.3K</p>
              <p className="text-sm text-gray-600">Photos Shared</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">892</p>
              <p className="text-sm text-gray-600">Expert Reviews</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="spotlight">Trekker Spotlight</TabsTrigger>
            <TabsTrigger value="challenges">Monthly Challenges</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            {/* Create Post Section */}
            <Card>
              <CardContent className="p-4">
                {!showNewPost ? (
                  <Button 
                    onClick={() => setShowNewPost(true)}
                    className="w-full justify-start text-left"
                    variant="ghost"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Share your latest adventure...
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Tell the community about your trek experience, tips, or discoveries..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Add Photos
                      </Button>
                      <Button size="sm" variant="outline">
                        <MapPin className="h-4 w-4 mr-2" />
                        Tag Location
                      </Button>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" onClick={() => setShowNewPost(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreatePost} className="bg-orange-600 hover:bg-orange-700">
                        Share Experience
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Filter and Search */}
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search posts, trails, or trekkers..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Community Posts */}
            <div className="space-y-6">
              {communityPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <ImageWithFallback
                            src={post.user.avatar}
                            alt={post.user.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                          <p className="text-sm text-gray-600">{post.user.level} • {post.user.completedTreks} treks completed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{post.date}</p>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < post.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Trek Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-600 mr-1" />
                        <span className="font-semibold text-gray-900">{post.trek}</span>
                        <span className="text-gray-600 ml-1">• {post.location}</span>
                      </div>
                      <Badge variant="secondary">{post.difficulty}</Badge>
                      <Badge variant="outline">{post.duration}</Badge>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                    {/* Post Images */}
                    {post.images.length > 0 && (
                      <div className={`grid gap-2 mb-4 ${
                        post.images.length === 1 ? 'grid-cols-1' : 
                        post.images.length === 2 ? 'grid-cols-2' : 
                        'grid-cols-2 md:grid-cols-3'
                      }`}>
                        {post.images.map((image, index) => (
                          <ImageWithFallback
                            key={index}
                            src={image}
                            alt={`${post.trek} ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                          />
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                          <Share2 className="h-4 w-4" />
                          <span className="text-sm">{post.shares}</span>
                        </button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigateTo('trail-detail')}
                      >
                        View Trek Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="spotlight" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trekkerSpotlight.map((trekker, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{trekker.name[0]}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{trekker.name}</h3>
                    <Badge className="mb-3">{trekker.achievement}</Badge>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>{trekker.completedTreks} treks completed</p>
                      <p>Loves: {trekker.favoriteRegion}</p>
                      <p>Latest: {trekker.recentTrek}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">January Challenge</h3>
                  <Badge className="w-fit">Active</Badge>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Winter Warrior Challenge</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Complete any winter trek in the Himalayas during January. Share your experience with photos and tips!
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">89 participants</span>
                    <Button size="sm">Join Challenge</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">February Challenge</h3>
                  <Badge variant="outline" className="w-fit">Upcoming</Badge>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Photography Masters</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Capture the best landscape photo during your trek. Winner gets professional photography gear!
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Starts Feb 1</span>
                    <Button size="sm" variant="outline">Notify Me</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}