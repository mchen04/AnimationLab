import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, User, Auth } from 'firebase/auth';

interface AuthContextType {
  auth: Auth;
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  auth: auth,
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user); // Add this line
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
