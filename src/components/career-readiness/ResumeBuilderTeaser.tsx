import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCareerReadinessProgress } from '@/hooks/useCareerReadinessProgress';
import { calculateResumeProgress } from '@/types/career-readiness';

const ResumeBuilderTeaser: React.FC = () => {
  const navigate = useNavigate();
  const { getResumeModuleDetails } = useCareerReadinessProgress();
  const resumePercent = calculateResumeProgress(getResumeModuleDetails());

  const handleBuildResume = () => {
    navigate('/career/resume');
  };

  return (
    <Card className="rounded-2xl border-emerald-100">
      <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
          <FileText className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-foreground">Resume Builder</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {resumePercent > 0
              ? `Your draft is ${resumePercent}% complete — keep building!`
              : 'Build your resume as you grow your skills.'}
          </p>
        </div>
        <Button
          variant="outline"
          className="border-emerald-300 text-emerald-800 hover:bg-emerald-50 shrink-0 w-full sm:w-auto"
          onClick={handleBuildResume}
        >
          Build Resume
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResumeBuilderTeaser;
