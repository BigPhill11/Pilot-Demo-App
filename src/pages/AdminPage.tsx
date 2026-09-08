import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminTab from '@/components/admin/AdminTab';

const AdminPage = () => {
  // Gated on the admin role rather than the hardcoded owner email, so issuing
  // teacher codes can be delegated without a code change. The email still
  // qualifies via isAdmin, and the database enforces the same rule through
  // is_phil_admin().
  const { user, loading, rolesLoaded, isAdmin } = useAuth();

  if (loading || (user && !rolesLoaded)) return null;
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <AdminTab />
    </div>
  );
};

export default AdminPage;
