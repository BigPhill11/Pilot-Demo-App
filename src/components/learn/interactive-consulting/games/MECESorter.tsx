
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface MECESorterProps {
  onComplete: (score: number) => void;
}

const MECESorter: React.FC<MECESorterProps> = ({ onComplete }) => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userSorting, setUserSorting] = useState<string[][]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string>('');
  const [gameComplete, setGameComplete] = useState(false);

  const challenges = [
    {
      title: 'Customer Segmentation',
      description: 'Sort these customer characteristics into MECE segments',
      items: [
        'Age 18-25', 'Age 26-35', 'Age 36-50', 'Age 50+',
        'High Income', 'Medium Income', 'Low Income',
        'Urban', 'Suburban', 'Rural',
        'Tech Savvy', 'Traditional'
      ],
      correctGroups: [
        ['Age 18-25', 'Age 26-35', 'Age 36-50', 'Age 50+'],
        ['High Income', 'Medium Income', 'Low Income'],
        ['Urban', 'Suburban', 'Rural'],
        ['Tech Savvy', 'Traditional']
      ],
      groupNames: ['Age Groups', 'Income Levels', 'Location Types', 'Tech Adoption']
    },
    {
      title: 'Cost Structure Analysis',
      description: 'Organize these costs into MECE categories',
      items: [
        'Salaries', 'Benefits', 'Office Rent', 'Utilities',
        'Raw Materials', 'Manufacturing', 'Packaging',
        'TV Advertising', 'Digital Marketing', 'PR Events',
        'R&D', 'Patents', 'Training'
      ],
      correctGroups: [
        ['Salaries', 'Benefits'],
        ['Office Rent', 'Utilities'],
        ['Raw Materials', 'Manufacturing', 'Packaging'],
        ['TV Advertising', 'Digital Marketing', 'PR Events'],
        ['R&D', 'Patents', 'Training']
      ],
      groupNames: ['Personnel', 'Facilities', 'Production', 'Marketing', 'Development']
    }
  ];

  const [availableItems, setAvailableItems] = useState<string[]>(challenges[0].items);
  const [sortingGroups, setSortingGroups] = useState<{ name: string; items: string[] }[]>(
    challenges[0].groupNames.map(name => ({ name, items: [] }))
  );

  const addItemToGroup = (item: string, groupIndex: number) => {
    setAvailableItems(prev => prev.filter(i => i !== item));
    setSortingGroups(prev => prev.map((group, idx) => 
      idx === groupIndex 
        ? { ...group, items: [...group.items, item] }
        : group
    ));
  };

  const removeItemFromGroup = (item: string, groupIndex: number) => {
    setSortingGroups(prev => prev.map((group, idx) => 
      idx === groupIndex 
        ? { ...group, items: group.items.filter(i => i !== item) }
        : group
    ));
    setAvailableItems(prev => [...prev, item]);
  };

  const validateSorting = () => {
    const challenge = challenges[currentChallenge];
    let validationScore = 0;
    let correctGroups = 0;

    challenge.correctGroups.forEach((correctGroup, index) => {
      const userGroup = sortingGroups[index]?.items || [];
      
      // Check if the group contains exactly the right items
      const isExactMatch = correctGroup.length === userGroup.length &&
        correctGroup.every(item => userGroup.includes(item));
      
      if (isExactMatch) {
        correctGroups++;
        validationScore += 20;
      }
    });

    // Bonus points for completing all groups correctly
    if (correctGroups === challenge.correctGroups.length) {
      validationScore += 20; // Total possible: 120 points, capped at 100
    }

    const finalScore = Math.min(100, validationScore);
    setScore(finalScore);
    
    if (correctGroups === challenge.correctGroups.length) {
      setFeedback(`Perfect! You've correctly organized all items using MECE principles. Score: ${finalScore}/100`);
    } else {
      setFeedback(`Good effort! You got ${correctGroups}/${challenge.correctGroups.length} groups correct. MECE requires mutually exclusive and collectively exhaustive categories.`);
    }

    setGameComplete(true);
    setTimeout(() => onComplete(finalScore), 2000);
  };

  const resetChallenge = () => {
    const challenge = challenges[currentChallenge];
    setAvailableItems(challenge.items);
    setSortingGroups(challenge.groupNames.map(name => ({ name, items: [] })));
    setScore(0);
    setFeedback('');
    setGameComplete(false);
  };

  const challenge = challenges[currentChallenge];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-500" />
            MECE Sorter
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline">{challenge.title}</Badge>
            <Badge variant="outline">Challenge {currentChallenge + 1}/{challenges.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {challenge.description}. Remember: categories must be Mutually Exclusive (no overlap) and Collectively Exhaustive (cover everything).
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3">Available Items:</h4>
              <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border-2 border-dashed border-gray-300 rounded-lg">
                {availableItems.map((item, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      // Show modal to select group
                      const groupIndex = prompt(
                        `Select group for "${item}":\n${sortingGroups.map((g, i) => `${i}: ${g.name}`).join('\n')}`
                      );
                      if (groupIndex !== null && !isNaN(Number(groupIndex))) {
                        const idx = Number(groupIndex);
                        if (idx >= 0 && idx < sortingGroups.length) {
                          addItemToGroup(item, idx);
                        }
                      }
                    }}
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {sortingGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium mb-2">{group.name}</h5>
                  <div className="flex flex-wrap gap-2 min-h-[40px]">
                    {group.items.map((item, itemIndex) => (
                      <Badge
                        key={itemIndex}
                        variant="default"
                        className="cursor-pointer hover:bg-red-500"
                        onClick={() => removeItemFromGroup(item, groupIndex)}
                      >
                        {item} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {feedback && (
            <div className={`p-4 rounded-lg ${score >= 80 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
              <div className="flex items-start gap-2">
                {score >= 80 ? 
                  <CheckCircle className="h-4 w-4 mt-1 text-green-500" /> :
                  <XCircle className="h-4 w-4 mt-1 text-yellow-500" />
                }
                <p className={score >= 80 ? 'text-green-700' : 'text-yellow-700'}>
                  {feedback}
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={validateSorting} 
              disabled={gameComplete || availableItems.length > 0}
            >
              Validate MECE Structure
            </Button>
            <Button variant="outline" onClick={resetChallenge}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          {gameComplete && score >= 80 && (
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">MECE Master!</h3>
              <p className="text-green-700">You've successfully applied MECE principles to organize complex information.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MECESorter;
