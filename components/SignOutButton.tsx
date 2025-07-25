'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function SignOutButton() {
  const { signOut } = useAuth();

  return (
    <button onClick={signOut} className="px-4 py-2 bg-red-500 text-white rounded">
      Sign Out
    </button>
  );
} 