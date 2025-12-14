"use client";

import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import { NotificationProvider } from '../context/NotificationContext';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
