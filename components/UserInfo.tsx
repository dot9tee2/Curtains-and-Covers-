'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function UserInfo() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <span>Signed in as: {user.email}</span>
    </div>
  );
} 