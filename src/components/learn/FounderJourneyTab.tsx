import React, { useState } from 'react';
import FounderJourneyDashboard from '@/components/founder-journey/FounderJourneyDashboard';
import FounderMissionFlow from '@/components/founder-journey/FounderMissionFlow';
import { getFounderMission } from '@/data/founder-journey/missions';
import { useFounderJourneyProgress } from '@/hooks/useFounderJourneyProgress';
import FounderJourneyIntro from '@/components/founder-journey/FounderJourneyIntro';
import { isFounderLessonUnlocked } from '@/lib/founderJourneyProgress';
import type { FounderMissionId } from '@/types/founder-journey';

const FounderJourneyTab: React.FC = () => {
  const {
    progress,
    completionPercent,
    startMission,
    saveMissionStep,
    completeMission,
    saveCanvasSection,
    completeIntro,
    saveTeachResult,
    ready,
  } = useFounderJourneyProgress();
  const [openMissionId, setOpenMissionId] = useState<FounderMissionId | null>(null);

  const [replayIntro, setReplayIntro] = useState(false);

  const openMission = (missionId: FounderMissionId) => {
    if (!isFounderLessonUnlocked(missionId, progress)) return;
    startMission(missionId);
    setOpenMissionId(missionId);
  };

  const mission = getFounderMission(openMissionId);

  if (mission) {
    return (
      <FounderMissionFlow
        key={mission.id}
        mission={mission}
        progress={progress}
        initialStep={progress.missionStepById[mission.id]}
        alreadyCompleted={progress.completedMissionIds.includes(mission.id)}
        onBack={() => setOpenMissionId(null)}
        onSaveStep={(step) => saveMissionStep(mission.id, step)}
        onSaveCanvas={saveCanvasSection}
        onSaveTeachResult={(result) => saveTeachResult(mission.id, result)}
        onComplete={() => {
          completeMission(mission.id);
          setOpenMissionId(null);
        }}
      />
    );
  }

  return (
    <>
    <FounderJourneyDashboard
      progress={progress}
      completionPercent={completionPercent}
      onStartMission={openMission}
      onSaveCanvas={saveCanvasSection}
      onShowIntro={() => setReplayIntro(true)}
    />
    {ready && (!progress.introCompleted || replayIntro) && <FounderJourneyIntro onComplete={() => { completeIntro(); setReplayIntro(false); }} />}
    </>
  );
};

export default FounderJourneyTab;
