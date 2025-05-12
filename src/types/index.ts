export type Tool = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
  path: string;
  isPopular?: boolean;
  isNew?: boolean;
  isUpcoming?: boolean;
};

export type ToolCategory = 
  | 'image' 
  | 'text' 
  | 'conversion' 
  | 'generator'
  | 'calculator'
  | 'developer';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  favoriteTools: string[];
  recentTools: string[];
};