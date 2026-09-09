import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import MinimalLayout from '@/components/layout/MinimalLayout';
import { useAuth } from '@/hooks/useAuth';

/**
 * The student half of the app: lessons, empire, career, profile.
 *
 * A teacher account has no use for any of it — they are here to watch a class,
 * not to play through the curriculum — so they are sent to their dashboard
 * instead of being shown a student home with a Teach tab tucked into the nav.
 * Admins are teachers as far as `isTeacher` is concerned but still need to see
 * what students see, so only teacher-without-admin is redirected.
 *
 * The redirect waits for roles to load. Acting on a half-loaded auth state
 * would bounce a student to /teach for a frame on every cold load.
 */
const StudentArea: React.FC = () => {
  const { loading, rolesLoaded, isTeacherOnly } = useAuth();

  if (!loading && rolesLoaded && isTeacherOnly) {
    return <Navigate to="/teach" replace />;
  }

  return (
    <MinimalLayout>
      <Outlet />
    </MinimalLayout>
  );
};

export default StudentArea;
