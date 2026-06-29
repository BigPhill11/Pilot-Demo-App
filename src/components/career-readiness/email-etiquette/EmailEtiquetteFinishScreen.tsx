import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, ArrowLeft, Sparkles, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import PandaLogo from '@/components/icons/PandaLogo';
import type { EmailEtiquetteModuleAnswers } from '@/types/career-readiness';

interface EmailEtiquetteFinishScreenProps {
  answers: EmailEtiquetteModuleAnswers;
  onBackToCareer: () => void;
}

const EmailEtiquetteFinishScreen: React.FC<EmailEtiquetteFinishScreenProps> = ({
  answers,
  onBackToCareer,
}) => {
  useEffect(() => {
    // Celebration confetti on completion
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.4 },
      colors: ['#1A5C38', '#34a853', '#10b981', '#fbbf24'],
    });
  }, []);

  const anatomy = answers.emailAnatomyDraft;
  const thankYou = answers.thankYouEmailDraft;
  const signature = answers.signatureDraft;

  return (
    <div className="space-y-6">
      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 overflow-hidden">
        <CardContent className="p-6 text-center relative">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12 }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <PandaLogo className="w-20 h-20 rounded-2xl shadow-xl" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="absolute -top-2 -right-2 bg-amber-400 rounded-full p-2 shadow-lg"
              >
                <Trophy className="h-4 w-4 text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-emerald-900"
          >
            Email Etiquette Complete!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-emerald-800/80 mt-2"
          >
            You can now write emails that get opened, read, and answered.
            Badge unlocked.
          </motion.p>
        </CardContent>
      </Card>

      <Card className="border-emerald-100">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <h3 className="font-semibold text-emerald-900">What you can do now</h3>
          </div>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold">→</span>
              <span>Write a cold email that earns a 15-minute call.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold">→</span>
              <span>Send a thank-you that gets you remembered.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold">→</span>
              <span>Use CC, BCC, and timing without burning trust.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 font-bold">→</span>
              <span>Follow up with purpose, not desperation.</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {anatomy?.subjectLine && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              Your cold email draft
            </h3>
            <p className="text-sm font-medium">{anatomy.subjectLine}</p>
            <p className="text-sm mt-2 text-muted-foreground line-clamp-3">
              {anatomy.openingHook} {anatomy.whyYouWhyThem} {anatomy.theAsk}
            </p>
          </CardContent>
        </Card>
      )}

      {thankYou?.subjectLine && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              Your thank-you draft
            </h3>
            <p className="text-sm font-medium">{thankYou.subjectLine}</p>
            <p className="text-sm mt-2 text-muted-foreground line-clamp-3">
              {thankYou.specificReference}
            </p>
          </CardContent>
        </Card>
      )}

      {signature?.fullName && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">
              Your signature
            </h3>
            <div className="text-sm font-mono p-3 rounded-lg bg-muted/40 whitespace-pre-line">
              {signature.fullName}
              {signature.schoolOrRole ? `\n${signature.schoolOrRole}` : ''}
              {signature.email ? `\n${signature.email}` : ''}
              {signature.linkedIn ? `\n${signature.linkedIn}` : ''}
            </div>
          </CardContent>
        </Card>
      )}

      <Button className="w-full bg-emerald-800 hover:bg-emerald-900" onClick={onBackToCareer}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Career Readiness
      </Button>
    </div>
  );
};

export default EmailEtiquetteFinishScreen;
