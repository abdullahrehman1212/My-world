import { User } from '../types';

export const currentUser: User = {
  id: 'user1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatarUrl: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
  role: 'user',
  favoriteTools: ['remove-bg', 'qr-code', 'tiny-png'],
  recentTools: ['remove-bg', 'json-formatter', 'lorem-ipsum', 'diff-checker']
};

export const adminUser: User = {
  id: 'admin1',
  name: 'Admin User',
  email: 'admin@example.com',
  avatarUrl: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg',
  role: 'admin',
  favoriteTools: [],
  recentTools: []
};