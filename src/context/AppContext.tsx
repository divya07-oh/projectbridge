import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { 
  MOCK_PROJECTS, 
  MOCK_USER, 
  MOCK_APPLICATIONS, 
  MOCK_NOTIFICATIONS, 
  MOCK_MESSAGES 
} from '@/data/mockData';

export type UserType = 'student' | 'business';

export interface User {
  id: string;
  type: UserType;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  coverImage?: string;
  college?: string;
  company?: string;
  bio?: string;
  skills?: string[];
  portfolio?: { title: string, link: string }[];
  stats?: any;
  projectsCompleted?: number;
  achievements?: string[];
}

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  projects: any[];
  setProjects: (projects: any[]) => void;
  applications: any[];
  setApplications: (apps: any[]) => void;
  notifications: any[];
  setNotifications: (nots: any[]) => void;
  conversations: any[];
  setConversations: (convs: any[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial default users
const defaultUsers: User[] = [
  {
    ...MOCK_USER,
    id: 'u1',
    type: 'student',
    email: 'student@test.com',
    password: 'password123'
  },
  {
    id: 'b1',
    type: 'business',
    name: 'Spice Villa',
    company: 'Spice Villa',
    email: 'business@test.com',
    password: 'password123'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('pn_currentUser', null);
  const [users, setUsers] = useLocalStorage<User[]>('pn_users', defaultUsers);
  const [projects, setProjects] = useLocalStorage<any[]>('pn_projects', MOCK_PROJECTS);
  const [applications, setApplications] = useLocalStorage<any[]>('pn_applications', MOCK_APPLICATIONS);
  const [notifications, setNotifications] = useLocalStorage<any[]>('pn_notifications', MOCK_NOTIFICATIONS);
  
  const initialConversations = MOCK_MESSAGES;
  
  const [conversations, setConversations] = useLocalStorage<any[]>('pn_conversations', initialConversations);

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      users, setUsers,
      projects, setProjects,
      applications, setApplications,
      notifications, setNotifications,
      conversations, setConversations
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
