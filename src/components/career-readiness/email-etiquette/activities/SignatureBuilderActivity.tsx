import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Sparkles } from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import type { EmailActivityProps } from './types';

type SignatureDraft = {
  fullName: string;
  schoolOrRole: string;
  email: string;
  linkedIn?: string;
};

const EMPTY: SignatureDraft = {
  fullName: '',
  schoolOrRole: '',
  email: '',
  linkedIn: '',
};

const SignatureBuilderActivity: React.FC<EmailActivityProps> = ({
  answers,
  onUpdateAnswers,
  onComplete,
  isActivityComplete,
}) => {
  const draft: SignatureDraft = answers.signatureDraft ?? EMPTY;
  const wasValidRef = useRef(false);

  const update = (field: keyof SignatureDraft, value: string) => {
    onUpdateAnswers({
      signatureDraft: { ...draft, [field]: value },
    });
  };

  const nameOk = draft.fullName.trim().length >= 2;
  const roleOk = draft.schoolOrRole.trim().length >= 2;
  const emailOk = draft.email.includes('@') && draft.email.trim().length >= 3;
  const allValid = nameOk && roleOk && emailOk;

  useEffect(() => {
    if (allValid && !wasValidRef.current) {
      wasValidRef.current = true;
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (!allValid) {
      wasValidRef.current = false;
    }
  }, [allValid]);

  const handleComplete = () => {
    if (!allValid) return;
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    onComplete();
  };

  const previewLines: { key: string; text: string; bold?: boolean }[] = [];
  if (nameOk) previewLines.push({ key: 'name', text: draft.fullName.trim(), bold: true });
  if (roleOk) previewLines.push({ key: 'role', text: draft.schoolOrRole.trim() });
  if (emailOk) previewLines.push({ key: 'email', text: draft.email.trim() });
  if (draft.linkedIn && draft.linkedIn.trim().length > 0)
    previewLines.push({ key: 'linkedIn', text: draft.linkedIn.trim() });

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Build a clean signature you can paste into every professional email.
        </p>
        {isActivityComplete && (
          <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
            Saved — edit any time
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="rounded-xl border-emerald-100 shadow-sm">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-sm font-semibold">
                Full name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                value={draft.fullName}
                onChange={(e) => update('fullName', e.target.value.slice(0, 60))}
                maxLength={60}
                placeholder="Jordan Lee"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="schoolOrRole" className="text-sm font-semibold">
                School or role <span className="text-red-500">*</span>
              </Label>
              <Input
                id="schoolOrRole"
                value={draft.schoolOrRole}
                onChange={(e) => update('schoolOrRole', e.target.value.slice(0, 100))}
                maxLength={100}
                placeholder="Junior, Lincoln High School"
                className="rounded-lg"
              />
              <p className="text-xs text-muted-foreground">
                Example: "Junior, Lincoln High School" or "Analyst, Greenfield Capital"
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-semibold">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={draft.email}
                onChange={(e) => update('email', e.target.value.slice(0, 80))}
                maxLength={80}
                placeholder="jordan@lincoln.edu"
                className="rounded-lg"
              />
              {!emailOk && draft.email.length > 0 && (
                <p className="text-xs text-red-600">Needs a real email with "@".</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="linkedIn" className="text-sm font-semibold">
                LinkedIn <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="linkedIn"
                value={draft.linkedIn ?? ''}
                onChange={(e) => update('linkedIn', e.target.value.slice(0, 100))}
                maxLength={100}
                placeholder="linkedin.com/in/jordan-lee"
                className="rounded-lg"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-emerald-900 font-semibold">
            <Mail className="w-4 h-4" />
            Live preview
          </div>
          <Card className="rounded-xl border-emerald-200 bg-white shadow-sm">
            <CardContent className="p-5">
              <div className="font-sans text-sm text-gray-800">
                <div className="border-t border-gray-300 mb-3" />
                <AnimatePresence>
                  {previewLines.length === 0 ? (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-muted-foreground italic"
                    >
                      Start typing — your signature will build here.
                    </motion.p>
                  ) : (
                    previewLines.map((line) => (
                      <motion.div
                        key={line.key}
                        layout
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className={`leading-snug ${line.bold ? 'font-semibold text-gray-900' : 'text-gray-700'}`}
                      >
                        {line.text}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
                <div className="border-t border-gray-300 mt-3" />
              </div>

              <AnimatePresence>
                {allValid && (
                  <motion.div
                    key="phil-badge"
                    initial={{ opacity: 0, scale: 0.6, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-2 w-fit"
                  >
                    <PandaLogo className="w-10 h-10" />
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wide text-emerald-700 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Phil Approved
                      </span>
                      <span className="text-xs text-emerald-900">Looks professional and ready to send.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>

      <Button
        className="w-full bg-emerald-800 hover:bg-emerald-900 rounded-xl"
        disabled={!allValid}
        onClick={handleComplete}
      >
        {allValid ? 'Save & mark simulation complete' : 'Fill the 3 required fields to continue'}
      </Button>
    </div>
  );
};

export default SignatureBuilderActivity;
