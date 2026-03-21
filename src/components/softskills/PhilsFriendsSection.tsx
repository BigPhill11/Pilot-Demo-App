
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, User, GraduationCap, Building } from 'lucide-react';

interface PhilsFriend {
  id: string;
  name: string;
  title: string;
  company: string;
  category: 'professional' | 'professor' | 'non_finance';
  videoUrl: string;
  thumbnail: string;
  description: string;
  duration: string;
}

interface PhilsFriendsSectionProps {
  courseCategory: string;
}

const PhilsFriendsSection: React.FC<PhilsFriendsSectionProps> = ({ courseCategory }) => {
  const [selectedVideo, setSelectedVideo] = useState<PhilsFriend | null>(null);

  // Mock data - in real app this would come from your database
  const friendsData: Record<string, PhilsFriend[]> = {
    interviewing: [
      {
        id: '1',
        name: 'Sarah Chen',
        title: 'Senior Investment Banker',
        company: 'Goldman Sachs',
        category: 'professional',
        videoUrl: 'https://example.com/video1',
        thumbnail: '/placeholder.svg',
        description: 'Learn interviewing techniques from someone who conducts 50+ interviews per year',
        duration: '12:30'
      },
      {
        id: '2',
        name: 'Dr. Michael Roberts',
        title: 'Professor of Finance',
        company: 'Wharton School',
        category: 'professor',
        videoUrl: 'https://example.com/video2',
        thumbnail: '/placeholder.svg',
        description: 'Academic perspective on what makes a strong candidate',
        duration: '15:45'
      },
      {
        id: '3',
        name: 'Jessica Martinez',
        title: 'Marketing Director',
        company: 'Tech Startup',
        category: 'non_finance',
        videoUrl: 'https://example.com/video3',
        thumbnail: '/placeholder.svg',
        description: 'General interviewing skills that apply across all industries',
        duration: '10:20'
      }
    ],
    networking: [
      {
        id: '4',
        name: 'David Park',
        title: 'Hedge Fund Manager',
        company: 'Bridgewater Associates',
        category: 'professional',
        videoUrl: 'https://example.com/video4',
        thumbnail: '/placeholder.svg',
        description: 'How to build meaningful professional relationships in finance',
        duration: '18:15'
      }
    ],
    professional_communication: [
      {
        id: '5',
        name: 'Lisa Thompson',
        title: 'Communications Professor',
        company: 'Stanford Business School',
        category: 'professor',
        videoUrl: 'https://example.com/video5',
        thumbnail: '/placeholder.svg',
        description: 'The fundamentals of effective business communication',
        duration: '22:10'
      }
    ],
    business_attire: [
      {
        id: '6',
        name: 'Robert Kim',
        title: 'Style Consultant',
        company: 'Independent',
        category: 'non_finance',
        videoUrl: 'https://example.com/video6',
        thumbnail: '/placeholder.svg',
        description: 'Professional dress codes and what they communicate',
        duration: '14:30'
      }
    ],
    workplace_etiquette: [
      {
        id: '7',
        name: 'Amanda Foster',
        title: 'HR Director',
        company: 'JPMorgan Chase',
        category: 'professional',
        videoUrl: 'https://example.com/video7',
        thumbnail: '/placeholder.svg',
        description: 'Unwritten rules of professional workplace behavior',
        duration: '16:45'
      }
    ]
  };

  const friends = friendsData[courseCategory] || [];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'professional': return Building;
      case 'professor': return GraduationCap;
      case 'non_finance': return User;
      default: return User;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'professional': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'professor': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'non_finance': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'professional': return 'Finance Professional';
      case 'professor': return 'Professor';
      case 'non_finance': return 'Someone not in Finance';
      default: return 'Professional';
    }
  };

  const groupedFriends = friends.reduce((acc, friend) => {
    if (!acc[friend.category]) {
      acc[friend.category] = [];
    }
    acc[friend.category].push(friend);
    return acc;
  }, {} as Record<string, PhilsFriend[]>);

  if (friends.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Phil's Friends videos coming soon for this category!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Learn from Phil's Friends</h3>
        <p className="text-muted-foreground">
          Get insights from professionals, professors, and experts from various backgrounds
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="professional">Finance Pros</TabsTrigger>
          <TabsTrigger value="professor">Professors</TabsTrigger>
          <TabsTrigger value="non_finance">Non-Finance</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {friends.map((friend) => {
              const IconComponent = getCategoryIcon(friend.category);
              return (
                <Card key={friend.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{friend.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{friend.title}</p>
                          <p className="text-sm text-muted-foreground">{friend.company}</p>
                        </div>
                      </div>
                      <Badge className={getCategoryColor(friend.category)}>
                        {getCategoryLabel(friend.category)}
                      </Badge>
                    </div>
                    <CardDescription>{friend.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{friend.duration}</span>
                      <Button onClick={() => setSelectedVideo(friend)}>
                        <Play className="h-4 w-4 mr-2" />
                        Watch Video
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {Object.entries(groupedFriends).map(([category, categoryFriends]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryFriends.map((friend) => {
                const IconComponent = getCategoryIcon(friend.category);
                return (
                  <Card key={friend.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{friend.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{friend.title}</p>
                            <p className="text-sm text-muted-foreground">{friend.company}</p>
                          </div>
                        </div>
                        <Badge className={getCategoryColor(friend.category)}>
                          {getCategoryLabel(friend.category)}
                        </Badge>
                      </div>
                      <CardDescription>{friend.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{friend.duration}</span>
                        <Button onClick={() => setSelectedVideo(friend)}>
                          <Play className="h-4 w-4 mr-2" />
                          Watch Video
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedVideo.name}</h3>
                  <p className="text-muted-foreground">{selectedVideo.title} at {selectedVideo.company}</p>
                </div>
                <Button variant="outline" onClick={() => setSelectedVideo(null)}>
                  Close
                </Button>
              </div>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Play className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Video player would be here</p>
                  <p className="text-sm text-muted-foreground">Duration: {selectedVideo.duration}</p>
                </div>
              </div>
              <p className="text-muted-foreground">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhilsFriendsSection;
