import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ResumeTipCard from './ResumeTipCard';
import ResumeBulletEditor from './ResumeBulletEditor';
import { RESUME_BULLET_EXAMPLES } from '@/data/career-readiness/resume';
import {
  createResumeBullet,
  createResumeRoleEntry,
  type ResumeRoleEntry,
} from '@/types/career-readiness';
import type { ResumeBulletSection } from '@/hooks/useResumeBulletCheck';

interface ResumeRoleSectionProps {
  title: string;
  tip: string;
  section: ResumeBulletSection;
  entries: ResumeRoleEntry[];
  onChange: (entries: ResumeRoleEntry[]) => void;
}

const ResumeRoleSection: React.FC<ResumeRoleSectionProps> = ({
  title,
  tip,
  section,
  entries,
  onChange,
}) => {
  const examples = RESUME_BULLET_EXAMPLES[section];

  const updateEntry = (id: string, patch: Partial<ResumeRoleEntry>) => {
    onChange(entries.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };

  const updateBullet = (entryId: string, bulletId: string, text: string) => {
    onChange(
      entries.map((e) =>
        e.id === entryId
          ? {
              ...e,
              bullets: e.bullets.map((b) => (b.id === bulletId ? { ...b, text } : b)),
            }
          : e
      )
    );
  };

  const addEntry = () => onChange([...entries, createResumeRoleEntry()]);

  const removeEntry = (id: string) => {
    if (entries.length <= 1) return;
    onChange(entries.filter((e) => e.id !== id));
  };

  const addBullet = (entryId: string) => {
    onChange(
      entries.map((e) =>
        e.id === entryId
          ? { ...e, bullets: [...e.bullets, createResumeBullet()] }
          : e
      )
    );
  };

  const removeBullet = (entryId: string, bulletId: string) => {
    onChange(
      entries.map((e) => {
        if (e.id !== entryId || e.bullets.length <= 1) return e;
        return { ...e, bullets: e.bullets.filter((b) => b.id !== bulletId) };
      })
    );
  };

  const list = entries.length > 0 ? entries : [createResumeRoleEntry()];

  return (
    <div className="space-y-4">
      <ResumeTipCard tip={tip} />

      <div className="rounded-lg border border-dashed border-emerald-200 bg-emerald-50/40 p-3 text-xs text-muted-foreground space-y-1">
        <p className="font-medium text-emerald-800">Strong bullet examples</p>
        {examples.map((ex, i) => (
          <p key={i} className="italic">
            • {ex}
          </p>
        ))}
      </div>

      {list.map((entry, idx) => (
        <div
          key={entry.id}
          className="space-y-3 rounded-xl border border-emerald-100 bg-white p-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-emerald-900">
              {title} #{idx + 1}
            </p>
            {list.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive h-8"
                onClick={() => removeEntry(entry.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Organization</Label>
              <Input
                placeholder="Company or club name"
                value={entry.organization}
                onChange={(e) => updateEntry(entry.id, { organization: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="City, ST"
                value={entry.location}
                onChange={(e) => updateEntry(entry.id, { location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Date range</Label>
              <Input
                placeholder="June 2025 — Present"
                value={entry.dateRange}
                onChange={(e) => updateEntry(entry.id, { dateRange: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Title / role</Label>
              <Input
                placeholder="Investment Analyst Intern"
                value={entry.title}
                onChange={(e) => updateEntry(entry.id, { title: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bullet points</Label>
            {entry.bullets.map((bullet) => (
              <div key={bullet.id} className="space-y-1">
                <ResumeBulletEditor
                  value={bullet.text}
                  onChange={(text) => updateBullet(entry.id, bullet.id, text)}
                  section={section}
                  roleContext={`${entry.title} at ${entry.organization}`}
                  onApplySuggestion={(text) => updateBullet(entry.id, bullet.id, text)}
                />
                {entry.bullets.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-muted-foreground"
                    onClick={() => removeBullet(entry.id, bullet.id)}
                  >
                    Remove bullet
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-emerald-200 text-emerald-800"
              onClick={() => addBullet(entry.id)}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add bullet
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full border-emerald-300 text-emerald-800"
        onClick={addEntry}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add another {title.toLowerCase()}
      </Button>
    </div>
  );
};

export default ResumeRoleSection;
