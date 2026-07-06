import React from 'react';
import type { VillageLesson } from '@/types/village-lesson';
import { getPhilAge, getTeachBackSpec } from '@/lib/teach-back-spec';
import TeachPhilPanel from '@/components/teach-phil/TeachPhilPanel';
import type { TeachPhilResult } from '@/hooks/useTeachPhilSession';

interface Props {
  lesson: VillageLesson;
  onComplete: (result: TeachPhilResult) => void;
}

/** Village-lesson wrapper around the shared Teach Phil panel */
const VillageTeachPhilStep: React.FC<Props> = ({ lesson, onComplete }) => (
  <TeachPhilPanel
    lessonId={lesson.id}
    spec={getTeachBackSpec(lesson)}
    defaultPhilAge={getPhilAge(lesson)}
    onComplete={onComplete}
  />
);

export default VillageTeachPhilStep;
