
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyList from './CompanyList';
import CSVUploader from './CSVUploader';
import { useCompanyManager } from './CompanyManagerProvider';

const CompanyTabs: React.FC = () => {
  const { companies, loading, handleEdit, handleDelete, handleCSVUpload } = useCompanyManager();

  return (
    <Tabs defaultValue="list" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="list">Company List</TabsTrigger>
        <TabsTrigger value="upload">CSV Upload</TabsTrigger>
      </TabsList>
      
      <TabsContent value="list" className="space-y-4">
        <CompanyList
          companies={companies}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </TabsContent>
      
      <TabsContent value="upload" className="space-y-4">
        <CSVUploader onUpload={handleCSVUpload} />
      </TabsContent>
    </Tabs>
  );
};

export default CompanyTabs;
