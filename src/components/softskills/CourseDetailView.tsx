
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Users, Play } from 'lucide-react';
import PhilsFriendsSection from './PhilsFriendsSection';
import ProfessionalInterviewingMastery from './courses/ProfessionalInterviewingMastery';
import NetworkingLikePro from './courses/NetworkingLikePro';
import BusinessCommunicationExcellence from './courses/BusinessCommunicationExcellence';
import BlackInBusinessExcellence from './courses/BlackInBusinessExcellence';
import WorkingWomenExcellence from './courses/WorkingWomenExcellence';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty_level: string;
  estimated_duration: number;
}

interface CourseDetailViewProps {
  course: Course;
  onBack: () => void;
}

const CourseDetailView: React.FC<CourseDetailViewProps> = ({ course, onBack }) => {
  // Check if this is the Professional Interviewing Mastery course
  if (course.category === 'interviewing' && course.title.toLowerCase().includes('professional interviewing mastery')) {
    return <ProfessionalInterviewingMastery onBack={onBack} />;
  }

  // Check if this is the Networking Like a Pro course
  if (course.category === 'networking' && course.title.toLowerCase().includes('networking like a pro')) {
    return <NetworkingLikePro onBack={onBack} />;
  }

  // Check if this is the Business Communication Excellence course
  if (course.category === 'professional_communication' && course.title.toLowerCase().includes('business communication excellence')) {
    return <BusinessCommunicationExcellence onBack={onBack} />;
  }

  // Check if this is the Black in Business Excellence course
  if (course.category === 'diversity_inclusion' && course.title.toLowerCase().includes('black in business excellence')) {
    return <BlackInBusinessExcellence onBack={onBack} />;
  }

  // Check if this is the Working Women Excellence course
  if (course.category === 'diversity_inclusion' && course.title.toLowerCase().includes('working women excellence')) {
    return <WorkingWomenExcellence onBack={onBack} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
        </div>
      </div>

      <Tabs defaultValue="lessons" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lessons">Course Lessons</TabsTrigger>
          <TabsTrigger value="phil-friends">Learn from Phil's Friends</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Course Structure</span>
              </CardTitle>
              <CardDescription>
                Interactive lessons and practical exercises
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Course Content Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Interactive lessons, quizzes, and practical exercises will be available here.
                </p>
                <Button>
                  <Play className="h-4 w-4 mr-2" />
                  Start Course Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phil-friends" className="space-y-6">
          <PhilsFriendsSection courseCategory={course.category} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetailView;
