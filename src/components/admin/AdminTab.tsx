
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import ClipProductionBoard from '@/components/phils-friends/ClipProductionBoard';

const AdminTab = () => {
  return (
    <div className="space-y-6">
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Shield className="h-5 w-5" />
            Admin Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-700 text-sm">
            ⚠️ Admin-only functionality. Manage Phil's Friends videos and content here.
          </p>
        </CardContent>
      </Card>

      <ClipProductionBoard />
    </div>
  );
};

export default AdminTab;
