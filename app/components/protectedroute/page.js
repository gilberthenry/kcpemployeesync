"use client";
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace('/login');
      else if (allowedRoles && !allowedRoles.includes(user.role)) router.replace('/login');
    }
  }, [loading, user, allowedRoles, router]);

  if (loading || !user) return <div>Loading...</div>;

  return <>{children}</>;
}