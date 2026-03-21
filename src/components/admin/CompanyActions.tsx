
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCompanyManager } from './CompanyManagerProvider';

const CompanyActions: React.FC = () => {
  const { setShowForm } = useCompanyManager();

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">Company Management</h2>
      <Button 
        onClick={() => setShowForm(true)} 
        className="flex items-center space-x-2"
      >
        <Plus className="h-4 w-4" />
        <span>Add Company</span>
      </Button>
    </div>
  );
};

export default CompanyActions;
