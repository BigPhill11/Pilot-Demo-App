import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useResumeBulletCheck, type ResumeBulletSection } from '@/hooks/useResumeBulletCheck';
import type { ResumeBulletCheckResult } from '@/types/career-readiness';
import { cn } from '@/lib/utils';
import { getBulletHints } from './resumeValidation';

interface ResumeBulletEditorProps {
  value: string;
  onChange: (text: string) => void;
  section: ResumeBulletSection;
  roleContext?: string;
  placeholder?: string;
  onApplySuggestion?: (text: string) => void;
}

const CHECK_LABELS: Record<keyof ResumeBulletCheckResult['checks'], string> = {
  actionVerb: 'Action verb',
  quantification: 'Numbers / scale',
  clarity: 'Clear & concise',
  relevance: 'Relevant',
  format: 'Bullet format',
};

const ResumeBulletEditor: React.FC<ResumeBulletEditorProps> = ({
  value,
  onChange,
  section,
  roleContext,
  placeholder = 'Start with a strong verb and add a measurable result…',
  onApplySuggestion,
}) => {
  const { checkBullet, loading, error, isLoggedIn } = useResumeBulletCheck();
  const [result, setResult] = useState<ResumeBulletCheckResult | null>(null);
  const hints = value.trim().length >= 5 ? getBulletHints(value) : [];

  const handleCheck = async () => {
    const feedback = await checkBullet({
      bulletText: value,
      section,
      roleContext,
    });
    if (feedback) setResult(feedback);
  };

  return (
    <div className="space-y-2 rounded-lg border border-emerald-100 bg-white p-3">
      <Textarea
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setResult(null);
        }}
        placeholder={placeholder}
        className="min-h-[72px] text-sm"
      />

      {hints.length > 0 && !result && (
        <ul className="text-[11px] text-amber-800/90 bg-amber-50/80 rounded-md px-2 py-1.5 list-disc pl-4 space-y-0.5">
          {hints.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="border-emerald-300 text-emerald-800 hover:bg-emerald-50"
          disabled={loading || value.trim().length < 10}
          onClick={handleCheck}
        >
          <Sparkles className="h-3.5 w-3.5 mr-1" />
          {loading ? 'Checking…' : 'Check with AskPhil'}
        </Button>
        {!isLoggedIn && (
          <span className="text-xs text-muted-foreground">Sign in to use AI checks</span>
        )}
      </div>

      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}

      {result && (
        <div className="space-y-2 pt-1 border-t border-emerald-100">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                'border-emerald-200',
                result.score >= 75
                  ? 'text-emerald-800 bg-emerald-50'
                  : 'text-amber-800 bg-amber-50'
              )}
            >
              Score: {result.score}/100
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(Object.entries(result.checks) as [keyof typeof result.checks, boolean][]).map(
              ([key, ok]) => (
                <span
                  key={key}
                  className={cn(
                    'inline-flex items-center gap-0.5 text-[10px] px-2 py-0.5 rounded-full border',
                    ok
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      : 'border-amber-200 bg-amber-50 text-amber-900'
                  )}
                >
                  {ok ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <AlertCircle className="h-3 w-3" />
                  )}
                  {CHECK_LABELS[key]}
                </span>
              )
            )}
          </div>

          {result.issues.length > 0 && (
            <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-0.5">
              {result.issues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          )}

          <p className="text-xs text-foreground">
            <span className="font-medium text-emerald-800">Story: </span>
            {result.storySignal}
          </p>

          {result.improvedBullet && (
            <div className="rounded-md bg-emerald-50/80 p-2 text-xs">
              <p className="font-medium text-emerald-800 mb-1">Suggested rewrite</p>
              <p className="text-foreground">{result.improvedBullet}</p>
              {onApplySuggestion && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="mt-2 h-7 text-emerald-800"
                  onClick={() => onApplySuggestion(result.improvedBullet)}
                >
                  Use suggestion
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeBulletEditor;
