'use client';

import storage from '@/lib/storage';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContextType = {
  user: any | null;
  isLoading: boolean;
  isError: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = storage.getToken();
  const [isLoading, setIsLoading] = useState(true);

  // fake user if token exists
  const user = token
    ? { email: 'admin@gmail.com', role: 'admin' }
    : null;

  useEffect(() => {
    if (!token && pathname !== '/login') {
      router.replace('/login');
    }
    setIsLoading(false);
  }, [token, pathname, router]);

  const logout = () => {
    storage.clearToken();
    router.replace('/login');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: false,
        isError: false,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
