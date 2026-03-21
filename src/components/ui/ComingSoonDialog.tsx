import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PandaLogo from '@/components/icons/PandaLogo';

interface ComingSoonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

const ComingSoonDialog: React.FC<ComingSoonDialogProps> = ({
  isOpen,
  onClose,
  featureName = 'This feature',
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader className="space-y-4">
          <div className="mx-auto">
            <PandaLogo className="h-20 w-20" />
          </div>
          <div className="text-2xl">🚧</div>
          <DialogTitle className="text-xl font-bold text-foreground">
            Under Construction
          </DialogTitle>
          <DialogDescription className="text-base space-y-2">
            <p className="font-medium text-foreground">
              Phil the Panda is working hard to get {featureName} finished!
            </p>
            <p className="text-muted-foreground">
              Check back soon for awesome new content. In the meantime, explore Personal Finance and Flashcards!
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Button onClick={onClose} className="w-full">
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonDialog;
