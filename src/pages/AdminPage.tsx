import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminTab from '@/components/admin/AdminTab';

const ADMIN_EMAILS = ['phillipghead@gmail.com'];

const AdminPage = () => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user || !ADMIN_EMAILS.includes(user.email ?? '')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <AdminTab />
    </div>
  );
};

export default AdminPage;
