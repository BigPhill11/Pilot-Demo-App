import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminTab from '@/components/admin/AdminTab';
import { isPhilAdminEmail } from '@/lib/adminAccess';

const AdminPage = () => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user || !isPhilAdminEmail(user.email)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <AdminTab />
    </div>
  );
};

export default AdminPage;
