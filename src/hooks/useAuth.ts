import { useState, useEffect } from 'react';

export interface UserInfo {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  role: 'admin' | 'partner' | 'customer';
  avatar?: string;
}

export function useAuth() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserFromStorage = () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUserFromStorage();

    // Listen for storage changes (in case of multi-tab or manual updates)
    const handleStorageChange = () => loadUserFromStorage();
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener('auth-update', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-update', handleStorageChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  const updateProfile = (newData: Partial<UserInfo>) => {
    if (user) {
      const updatedUser = { ...user, ...newData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      // Trigger update for other components
      window.dispatchEvent(new Event('auth-update'));
    }
  };

  return { 
    user, 
    isLoggedIn: !!user, 
    loading, 
    logout,
    updateProfile 
  };
}
