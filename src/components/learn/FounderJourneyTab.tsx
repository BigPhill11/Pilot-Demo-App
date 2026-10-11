import React, { useState } from 'react';
import FounderJourneyDashboard from '@/components/founder-journey/FounderJourneyDashboard';
import FounderMissionFlow from '@/components/founder-journey/FounderMissionFlow';
import { FOUNDER_MISSIONS, getFounderMission } from '@/data/founder-journey/missions';
import { useFounderJourneyProgress } from '@/hooks/useFounderJourneyProgress';
import type { FounderMissionId } from '@/types/founder-journey';

const FounderJourneyTab: React.FC = () => {
  const {
    progress,
    completionPercent,
    startMission,
    saveMissionStep,
    completeMission,
    saveCanvasSection,
  } = useFounderJourneyProgress();
  const [openMissionId, setOpenMissionId] = useState<FounderMissionId | null>(null);

  const openMission = (missionId: FounderMissionId) => {
    const missionIndex = FOUNDER_MISSIONS.findIndex((mission) => mission.id === missionId);
    const previous = FOUNDER_MISSIONS[missionIndex - 1];
    const unlocked = missionIndex === 0
      || progress.completedMissionIds.includes(missionId)
      || (previous && progress.completedMissionIds.includes(previous.id));
    if (!unlocked) return;
    startMission(missionId);
    setOpenMissionId(missionId);
  };

  const mission = getFounderMission(openMissionId);

  if (mission) {
    return (
      <FounderMissionFlow
        mission={mission}
        progress={progress}
        initialStep={progress.missionStepById[mission.id]}
        alreadyCompleted={progress.completedMissionIds.includes(mission.id)}
        onBack={() => setOpenMissionId(null)}
        onSaveStep={(step) => saveMissionStep(mission.id, step)}
        onSaveCanvas={saveCanvasSection}
        onComplete={() => {
          completeMission(mission.id);
          setOpenMissionId(null);
        }}
      />
    );
  }

  return (
    <FounderJourneyDashboard
      progress={progress}
      completionPercent={completionPercent}
      onStartMission={openMission}
      onSaveCanvas={saveCanvasSection}
    />
  );
};

export default FounderJourneyTab;
