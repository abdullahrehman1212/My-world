import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';
import { currentUser } from '../data/mockUser';

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isAdmin: boolean;
  addFavoriteTool: (toolId: string) => void;
  removeFavoriteTool: (toolId: string) => void;
  addRecentTool: (toolId: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(currentUser);

  const isAdmin = user?.role === 'admin';

  const addFavoriteTool = (toolId: string) => {
    if (!user) return;
    
    setUser({
      ...user,
      favoriteTools: user.favoriteTools.includes(toolId) 
        ? user.favoriteTools 
        : [...user.favoriteTools, toolId]
    });
  };

  const removeFavoriteTool = (toolId: string) => {
    if (!user) return;
    
    setUser({
      ...user,
      favoriteTools: user.favoriteTools.filter(id => id !== toolId)
    });
  };

  const addRecentTool = (toolId: string) => {
    if (!user) return;
    
    setUser({
      ...user,
      recentTools: [
        toolId,
        ...user.recentTools.filter(id => id !== toolId).slice(0, 4)
      ]
    });
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      isAdmin, 
      addFavoriteTool, 
      removeFavoriteTool, 
      addRecentTool 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};