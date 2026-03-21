import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import GameCompletionBanner from './components/GameCompletionBanner';

interface Task {
  id: string;
  name: string;
  stakeholder: string;
  priority: 'high' | 'medium' | 'low';
  duration: number;
  dependencies: string[];
  completed: boolean;
}

interface Stakeholder {
  id: string;
  name: string;
  availability: number;
  color: string;
}

const stakeholders: Stakeholder[] = [
  { id: 'legal', name: 'Legal Team', availability: 8, color: 'bg-blue-500' },
  { id: 'finance', name: 'Finance Team', availability: 6, color: 'bg-green-500' },
  { id: 'regulatory', name: 'Regulatory', availability: 4, color: 'bg-orange-500' },
  { id: 'management', name: 'Management', availability: 5, color: 'bg-purple-500' }
];

const tasks: Task[] = [
  {
    id: 'due-diligence',
    name: 'Due Diligence Review',
    stakeholder: 'legal',
    priority: 'high',
    duration: 3,
    dependencies: [],
    completed: false
  },
  {
    id: 'financial-model',
    name: 'Financial Model',
    stakeholder: 'finance',
    priority: 'high', 
    duration: 4,
    dependencies: [],
    completed: false
  },
  {
    id: 'regulatory-filing',
    name: 'Regulatory Filing',
    stakeholder: 'regulatory',
    priority: 'medium',
    duration: 2,
    dependencies: ['due-diligence'],
    completed: false
  },
  {
    id: 'board-approval',
    name: 'Board Approval',
    stakeholder: 'management',
    priority: 'high',
    duration: 2,
    dependencies: ['financial-model'],
    completed: false
  },
  {
    id: 'documentation',
    name: 'Final Documentation',
    stakeholder: 'legal',
    priority: 'medium',
    duration: 2,
    dependencies: ['regulatory-filing', 'board-approval'],
    completed: false
  }
];

interface DealCoordinatorGameProps {
  onComplete: (score: number) => void;
}

const DealCoordinatorGame: React.FC<DealCoordinatorGameProps> = ({ onComplete }) => {
  const [gameTasks, setGameTasks] = useState<Task[]>(tasks.map(t => ({ ...t })));
  const [currentWeek, setCurrentWeek] = useState(1);
  const [gamePhase, setGamePhase] = useState<'planning' | 'completed'>('planning');
  const [score, setScore] = useState(0);
  const [efficiency, setEfficiency] = useState(100);
  const [selectedTask, setSelectedTask] = useState<string>('');

  const maxWeeks = 8;
  const progress = (currentWeek / maxWeeks) * 100;

  const getAvailableTasks = () => {
    return gameTasks.filter(task => 
      !task.completed && 
      task.dependencies.every(dep => 
        gameTasks.find(t => t.id === dep)?.completed
      )
    );
  };

  const executeTask = (taskId: string) => {
    const task = gameTasks.find(t => t.id === taskId);
    if (!task) return;

    const stakeholder = stakeholders.find(s => s.id === task.stakeholder);
    if (!stakeholder) return;

    // Check if stakeholder has enough availability
    if (stakeholder.availability < task.duration) {
      setEfficiency(prev => Math.max(0, prev - 15));
      return;
    }

    // Complete the task
    setGameTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: true } : t
    ));

    // Reduce stakeholder availability
    stakeholder.availability -= task.duration;

    // Award points based on priority and timing
    let points = 0;
    if (task.priority === 'high') points = 30;
    else if (task.priority === 'medium') points = 20;
    else points = 10;

    // Bonus for early completion
    if (currentWeek <= 4) points += 10;

    setScore(prev => prev + points);
    setSelectedTask('');
  };

  const nextWeek = () => {
    setCurrentWeek(prev => prev + 1);
    
    // Restore some stakeholder availability
    stakeholders.forEach(s => {
      s.availability = Math.min(8, s.availability + 2);
    });

    // Check win/lose conditions
    if (currentWeek >= maxWeeks) {
      endGame();
    } else if (gameTasks.every(t => t.completed)) {
      endGame();
    }
  };

  const endGame = () => {
    const completedTasks = gameTasks.filter(t => t.completed).length;
    const completionBonus = (completedTasks / tasks.length) * 100;
    const timingBonus = Math.max(0, (maxWeeks - currentWeek) * 10);
    const finalScore = Math.round(score + completionBonus + timingBonus + efficiency);

    let feedback = '';
    if (completedTasks === tasks.length) {
      feedback = 'Perfect! You completed all tasks efficiently and on time.';
    } else if (completedTasks >= 4) {
      feedback = 'Great job! You managed most tasks successfully.';
    } else {
      feedback = 'Good effort! Deal coordination takes practice and careful planning.';
    }

    setGamePhase('completed');
    onComplete(finalScore);
  };

  const resetGame = () => {
    setGameTasks(tasks.map(t => ({ ...t, completed: false })));
    setCurrentWeek(1);
    setGamePhase('planning');
    setScore(0);
    setEfficiency(100);
    setSelectedTask('');
    
    // Reset stakeholder availability
    stakeholders.forEach(s => {
      if (s.id === 'legal') s.availability = 8;
      if (s.id === 'finance') s.availability = 6;
      if (s.id === 'regulatory') s.availability = 4;
      if (s.id === 'management') s.availability = 5;
    });
  };

  if (gamePhase === 'completed') {
    const completedTasks = gameTasks.filter(t => t.completed).length;
    const feedback = completedTasks === tasks.length 
      ? 'Perfect! You completed all tasks efficiently and on time.'
      : completedTasks >= 4
        ? 'Great job! You managed most tasks successfully.'
        : 'Good effort! Deal coordination takes practice and careful planning.';

    return (
      <GameCompletionBanner
        title="Deal Coordination Complete!"
        score={score}
        totalScore={400}
        feedback={feedback}
        onPlayAgain={resetGame}
      />
    );
  }

  const availableTasks = getAvailableTasks();

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Users className="h-6 w-6 text-primary" />
          <span>Deal Coordination Master</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Coordinate a complex M&A transaction by managing tasks and stakeholder availability
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            Week {currentWeek}/{maxWeeks}
          </Badge>
          <Badge variant="default">Score: {score}</Badge>
          <Badge variant={efficiency >= 80 ? "default" : efficiency >= 60 ? "secondary" : "destructive"}>
            Efficiency: {efficiency}%
          </Badge>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stakeholders.map((stakeholder) => (
            <Card key={stakeholder.id} className="bg-muted/30">
              <CardContent className="p-4 text-center">
                <div className={`w-4 h-4 rounded-full ${stakeholder.color} mx-auto mb-2`} />
                <h4 className="font-semibold text-sm mb-1">{stakeholder.name}</h4>
                <Badge variant="outline" className="text-xs">
                  {stakeholder.availability}/8 hours
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h4 className="font-semibold mb-4 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Available Tasks This Week:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableTasks.map((task) => {
              const stakeholder = stakeholders.find(s => s.id === task.stakeholder);
              const canExecute = stakeholder && stakeholder.availability >= task.duration;
              
              return (
                <Card 
                  key={task.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedTask === task.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : canExecute
                        ? 'hover:ring-1 hover:ring-primary/50 hover:shadow-md'
                        : 'opacity-50'
                  }`}
                  onClick={() => canExecute && setSelectedTask(task.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-sm">{task.name}</h5>
                      <Badge 
                        variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {stakeholder?.name} • {task.duration} hours
                    </p>
                    {!canExecute && stakeholder && (
                      <p className="text-xs text-red-600">
                        Insufficient availability ({stakeholder.availability}/{task.duration} hours)
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Progress: {gameTasks.filter(t => t.completed).length}/{tasks.length} tasks completed
          </h4>
          <div className="flex flex-wrap gap-2">
            {gameTasks.map(task => (
              <Badge 
                key={task.id} 
                variant={task.completed ? "default" : "outline"}
                className="text-xs"
              >
                {task.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button 
            onClick={() => selectedTask && executeTask(selectedTask)}
            disabled={!selectedTask}
            className="animate-scale-in"
          >
            Execute Task
          </Button>
          <Button variant="outline" onClick={nextWeek}>
            Next Week
          </Button>
          <Button variant="secondary" onClick={resetGame}>
            Reset Game
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealCoordinatorGame;