import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  firebaseSignOut, 
  onAuthStateChanged,
  isFirebaseConfigured,
  FirebaseUser 
} from '../services/firebase';

export interface AuthUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  role: UserRole;
  isGoogleUser: boolean;
  provider: string;
  joinedAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  currentUser: User;
  currentRole: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: (preferredRole?: UserRole) => Promise<AuthUser>;
  signInSimulatedGoogle: (name: string, email: string, role?: UserRole) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  switchRole: (role: UserRole) => void;
  isFirebaseLive: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ROLE_METADATA: Record<UserRole, { title: string; organization: string }> = {
  CITIZEN: {
    title: 'Verified Citizen',
    organization: 'Jharkhand Civic Community',
  },
  GOVT_ADMIN: {
    title: 'Municipal Administrator',
    organization: 'Dept. of Urban Development & Municipal Affairs',
  },
  UNIVERSITY: {
    title: 'Research Scholar & Innovation Lead',
    organization: 'R&D Innovation Lab • NIT & BIT Mesra Consortium',
  },
  INDUSTRY: {
    title: 'Corporate Innovation Partner',
    organization: 'Civic CSR & Emerging Tech Consortium',
  },
};

const STORAGE_SESSION_KEY = 'civicsolve_auth_user_session';
const STORAGE_ROLE_KEY = 'civicsolve_active_role';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem(STORAGE_ROLE_KEY);
    if (savedRole && ['CITIZEN', 'GOVT_ADMIN', 'UNIVERSITY', 'INDUSTRY'].includes(savedRole)) {
      return savedRole as UserRole;
    }
    return 'CITIZEN';
  });

  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedSession = localStorage.getItem(STORAGE_SESSION_KEY);
    if (savedSession) {
      try {
        return JSON.parse(savedSession);
      } catch (err) {
        console.error('Failed to parse saved auth session:', err);
      }
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isFirebaseLive = isFirebaseConfigured();

  // Listen for live Firebase Auth state changes
  useEffect(() => {
    if (auth && isFirebaseLive) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
        if (fbUser) {
          const authUser: AuthUser = {
            uid: fbUser.uid,
            displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Civic Innovator',
            email: fbUser.email || '',
            photoURL: fbUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(fbUser.displayName || 'Civic User')}&background=0284c7&color=ffffff&bold=true`,
            role: currentRole,
            isGoogleUser: true,
            provider: 'google.com',
            joinedAt: new Date().toLocaleDateString(),
          };
          setUser(authUser);
          localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(authUser));
        } else {
          // If Firebase confirms no active session and no offline simulated session
          const savedSession = localStorage.getItem(STORAGE_SESSION_KEY);
          if (savedSession) {
            try {
              const parsed = JSON.parse(savedSession);
              if (parsed.provider === 'google.com') {
                setUser(null);
                localStorage.removeItem(STORAGE_SESSION_KEY);
              }
            } catch {
              setUser(null);
            }
          }
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    } else {
      setIsLoading(false);
    }
  }, [isFirebaseLive, currentRole]);

  // Persist role change
  const switchRole = (newRole: UserRole) => {
    setCurrentRole(newRole);
    localStorage.setItem(STORAGE_ROLE_KEY, newRole);
    if (user) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(updatedUser));
    }
  };

  // Real Google Sign-In with Firebase popup
  const signInWithGoogle = async (preferredRole?: UserRole): Promise<AuthUser> => {
    const roleToSet = preferredRole || currentRole;

    if (isFirebaseLive && auth) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const fbUser = result.user;

        const authUser: AuthUser = {
          uid: fbUser.uid,
          displayName: fbUser.displayName || 'Google User',
          email: fbUser.email || '',
          photoURL: fbUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(fbUser.displayName || 'Google User')}&background=0284c7&color=ffffff&bold=true`,
          role: roleToSet,
          isGoogleUser: true,
          provider: 'google.com',
          joinedAt: new Date().toLocaleDateString(),
        };

        setUser(authUser);
        switchRole(roleToSet);
        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(authUser));
        return authUser;
      } catch (error: any) {
        console.error('Firebase Google Sign-In error:', error);
        // If popup was closed by user or network error
        if (error.code === 'auth/popup-closed-by-user') {
          throw new Error('Sign-in cancelled by user.');
        }
        throw error;
      }
    } else {
      // Fallback for immediate evaluation when Firebase keys are not yet added to .env
      return signInSimulatedGoogle('Civic Innovator', 'innovator@civicsolve.org', roleToSet);
    }
  };

  // Developer / Offline Google Sign-in simulation fallback
  const signInSimulatedGoogle = async (
    name: string = 'Civic Innovator', 
    email: string = 'citizen.user@gmail.com', 
    role: UserRole = 'CITIZEN'
  ): Promise<AuthUser> => {
    const authUser: AuthUser = {
      uid: 'google-sim-' + Date.now(),
      displayName: name,
      email: email,
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0284c7&color=ffffff&bold=true`,
      role: role,
      isGoogleUser: true,
      provider: 'google-demo',
      joinedAt: new Date().toLocaleDateString(),
    };

    setUser(authUser);
    switchRole(role);
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(authUser));
    return authUser;
  };

  // Real Sign-Out
  const signOut = async (): Promise<void> => {
    try {
      if (auth && isFirebaseLive) {
        await firebaseSignOut(auth);
      }
    } catch (err) {
      console.warn('Firebase sign-out error:', err);
    } finally {
      setUser(null);
      localStorage.removeItem(STORAGE_SESSION_KEY);
    }
  };

  // Adapter to provide compatibility with existing components
  const isAuthenticated = Boolean(user);

  const currentUser: User = user
    ? {
        id: user.uid,
        name: user.displayName,
        role: currentRole,
        title: ROLE_METADATA[currentRole].title,
        organization: ROLE_METADATA[currentRole].organization,
        avatar: user.photoURL,
      }
    : {
        id: 'guest-user',
        name: 'Guest Citizen',
        role: currentRole,
        title: ROLE_METADATA[currentRole].title,
        organization: 'Civic Community',
        avatar: `https://ui-avatars.com/api/?name=Guest+Citizen&background=e2e8f0&color=475569`,
      };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser,
        currentRole,
        isAuthenticated,
        isLoading,
        signInWithGoogle,
        signInSimulatedGoogle,
        signOut,
        switchRole,
        isFirebaseLive,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};