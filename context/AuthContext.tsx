import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from '@/api/userApi';

type User = {
  username: string;
  avatarUrl: string | null;
};

type UserContextType = {
  username: string | null;
  setUsername: (username: string | null) => Promise<void>;
  isLoading: boolean;
  user: User | null;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [username, setUsernameState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setUsername = async (name: string | null) => {
    try {
      setUsernameState(name);
      if (name) {
        await AsyncStorage.setItem('username', name);
      } else {
        await AsyncStorage.removeItem('username');
      }
    } catch (e) {
      console.error('Failed to update username in storage:', e);
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        const newUser = {
          username: currentUser.username,
          avatarUrl: currentUser.avatar?.url || null,
        };
        setUser(newUser);
        await setUsername(currentUser.username);
      } else {
        setUser(null);
        await setUsername(null);
      }
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      setUser(null);
      await setUsername(null);
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      try {
        setIsLoading(true);
        const savedUsername = await AsyncStorage.getItem('username');

        if (savedUsername) {
          setUsernameState(savedUsername);
          await refreshUser();
        }
      } catch (e) {
        console.error('Failed to load user data:', e);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, isLoading, user, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage has been cleared!');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};