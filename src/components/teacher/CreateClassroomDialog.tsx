import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { createClassroom } from '@/lib/teacherApi';

interface CreateClassroomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (classroomId: string, joinCode: string) => void;
}

const CreateClassroomDialog: React.FC<CreateClassroomDialogProps> = ({
  open,
  onOpenChange,
  onCreated,
}) => {
  const [name, setName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [term, setTerm] = useState('');
  const [creating, setCreating] = useState(false);

  const reset = () => {
    setName('');
    setSchoolName('');
    setTerm('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setCreating(true);
    try {
      const result = await createClassroom({
        name: trimmed,
        schoolName: schoolName.trim() || undefined,
        term: term.trim() || undefined,
      });
      toast.success(`${result.name} created — code ${result.join_code}`);
      reset();
      onOpenChange(false);
      onCreated(result.id, result.join_code);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not create the classroom.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New class</DialogTitle>
            <DialogDescription>
              Each class gets its own code. Students who sign up with it join this roster
              automatically.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-class-name">Class name</Label>
              <Input
                id="new-class-name"
                placeholder="e.g. Period 5 Economics"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new-class-school">School (optional)</Label>
                <Input
                  id="new-class-school"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-class-term">Term (optional)</Label>
                <Input
                  id="new-class-term"
                  placeholder="e.g. Spring 2027"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={creating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={creating || !name.trim()}>
              {creating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating…
                </>
              ) : (
                'Create class'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassroomDialog;
