import React from 'react';
import { CheckCircle2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PandaLogo from '@/components/icons/PandaLogo';
import ResumePreviewSection from './ResumePreviewSection';
import type { ResumeBuilderAnswers } from '@/types/career-readiness';

interface ResumeFinishScreenProps {
  answers: ResumeBuilderAnswers;
  onEdit: () => void;
  onBackToCareer: () => void;
}

const ResumeFinishScreen: React.FC<ResumeFinishScreenProps> = ({
  answers,
  onEdit,
  onBackToCareer,
}) => {
  return (
    <div className="space-y-5">
      <Card className="rounded-2xl border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
        <CardContent className="p-6 flex flex-col items-center text-center gap-3">
          <PandaLogo className="h-16 w-16" />
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          <h2 className="text-xl font-bold text-emerald-950">Resume draft complete!</h2>
          <p className="text-sm text-muted-foreground max-w-md">
            Nice work — your resume is saved. Copy it for applications or keep refining bullets
            with AskPhil.
          </p>
        </CardContent>
      </Card>

      <ResumePreviewSection answers={answers} />

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          className="flex-1 border-emerald-300"
          onClick={onEdit}
        >
          <FileText className="h-4 w-4 mr-2" />
          Edit sections
        </Button>
        <Button
          className="flex-1 bg-emerald-800 hover:bg-emerald-900"
          onClick={onBackToCareer}
        >
          Back to Career Hub
        </Button>
      </div>
    </div>
  );
};

export default ResumeFinishScreen;
