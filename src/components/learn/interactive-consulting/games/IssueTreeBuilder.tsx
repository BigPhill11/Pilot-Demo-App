
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TreePine, Plus, X, CheckCircle } from 'lucide-react';

interface IssueTreeBuilderProps {
  onComplete: (score: number) => void;
}

interface TreeNode {
  id: string;
  text: string;
  level: number;
  parentId?: string;
  children: TreeNode[];
}

const IssueTreeBuilder: React.FC<IssueTreeBuilderProps> = ({ onComplete }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState<string>('');

  const problems = [
    {
      title: 'Restaurant Revenue Decline',
      rootProblem: 'Restaurant revenue has dropped 25% in 6 months',
      correctStructure: [
        'Revenue Decline',
        '├── Customer Volume Down',
        '│   ├── Poor Marketing',
        '│   └── Competition Increase',
        '├── Average Spend Down',
        '│   ├── Menu Pricing Issues',
        '│   └── Less Premium Items Sold',
        '└── Operating Hours Reduced'
      ],
      suggestedBranches: [
        'Customer Volume Down',
        'Average Spend Down', 
        'Operating Hours Reduced',
        'Poor Marketing',
        'Competition Increase',
        'Menu Pricing Issues',
        'Less Premium Items Sold'
      ]
    }
  ];

  const [rootNode, setRootNode] = useState<TreeNode>({
    id: 'root',
    text: problems[0].rootProblem,
    level: 0,
    children: []
  });

  const addBranch = (parentId: string, branchText: string) => {
    const newNode: TreeNode = {
      id: `node-${Date.now()}`,
      text: branchText,
      level: parentId === 'root' ? 1 : 2,
      parentId,
      children: []
    };

    if (parentId === 'root') {
      setRootNode(prev => ({
        ...prev,
        children: [...prev.children, newNode]
      }));
    } else {
      // Add to existing parent node
      setRootNode(prev => updateNodeChildren(prev, parentId, newNode));
    }
  };

  const updateNodeChildren = (node: TreeNode, parentId: string, newChild: TreeNode): TreeNode => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...node.children, newChild]
      };
    }
    return {
      ...node,
      children: node.children.map(child => updateNodeChildren(child, parentId, newChild))
    };
  };

  const removeNode = (nodeId: string) => {
    setRootNode(prev => removeNodeFromTree(prev, nodeId));
  };

  const removeNodeFromTree = (node: TreeNode, nodeId: string): TreeNode => {
    return {
      ...node,
      children: node.children
        .filter(child => child.id !== nodeId)
        .map(child => removeNodeFromTree(child, nodeId))
    };
  };

  const validateTree = () => {
    const problem = problems[currentProblem];
    let validationScore = 0;
    
    // Check if main branches exist
    const mainBranches = rootNode.children.map(child => child.text.toLowerCase());
    const requiredMainBranches = ['customer volume', 'average spend', 'operating hours'];
    
    requiredMainBranches.forEach(required => {
      if (mainBranches.some(branch => branch.includes(required))) {
        validationScore += 20;
      }
    });

    // Check for sub-branches
    rootNode.children.forEach(branch => {
      if (branch.children.length > 0) {
        validationScore += 10;
      }
    });

    setScore(validationScore);
    setGameComplete(true);
    setFeedback(`Great work! Your issue tree scored ${validationScore}/100. You've structured the problem logically using MECE principles.`);
    
    setTimeout(() => onComplete(validationScore), 1500);
  };

  const renderTree = (node: TreeNode, isRoot = false) => (
    <div key={node.id} className={`${isRoot ? '' : 'ml-6 mt-2'} space-y-2`}>
      <div className={`flex items-center gap-2 p-3 rounded-lg border ${isRoot ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
        <span className="flex-1 font-medium">{node.text}</span>
        {!isRoot && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => removeNode(node.id)}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
        {node.level < 2 && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const branchText = prompt('Enter branch description:');
              if (branchText) addBranch(node.id, branchText);
            }}
            className="h-6 w-6 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        )}
      </div>
      {node.children.map(child => renderTree(child))}
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TreePine className="h-5 w-5 text-green-500" />
            Issue Tree Builder
          </CardTitle>
          <Badge variant="outline">Build a MECE structure</Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Break down the problem into Mutually Exclusive and Collectively Exhaustive (MECE) components.
            </p>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Problem Statement:</h4>
              <p className="text-yellow-700">{problems[currentProblem].rootProblem}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Your Issue Tree:</h4>
            {renderTree(rootNode, true)}
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Quick Add Branches:</h4>
            <div className="grid grid-cols-2 gap-2">
              {problems[currentProblem].suggestedBranches.map((branch, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => addBranch('root', branch)}
                  className="text-left justify-start"
                >
                  {branch}
                </Button>
              ))}
            </div>
          </div>

          {feedback && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-500" />
                <p className="text-green-700">{feedback}</p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={validateTree} disabled={gameComplete || rootNode.children.length === 0}>
              Validate Issue Tree
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setRootNode({ ...rootNode, children: [] });
                setScore(0);
                setGameComplete(false);
                setFeedback('');
              }}
            >
              Reset Tree
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueTreeBuilder;
