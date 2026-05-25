import type { DecisionSimulator } from '@/types/village-lesson';

export function ownershipSimulator(
  title: string,
  intro: string,
  scenario: string,
  endMessage: string
): DecisionSimulator {
  return {
    title,
    intro,
    scenario,
    meters: [{ id: 'progress', label: 'Progress', emoji: '📊', initial: 50, color: 'green' }],
    rounds: [
      {
        id: 'placeholder',
        situation: 'Complete the interactive exercise above.',
        choices: [
          {
            id: 'ok',
            label: 'Continue',
            description: 'Proceed after the simulation.',
            effects: { progress: 0 },
            feedback: endMessage,
          },
        ],
      },
    ],
    endMessage,
  };
}
