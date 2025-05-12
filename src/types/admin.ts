export interface ContactMeta {
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  formSettings?: {
    emailNotifications: boolean;
    autoResponse: boolean;
    responseMessage: string;
  };
}

export interface HeroMeta {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  primaryCTA?: {
    text?: string;
    url?: string;
  };
  secondaryCTA?: {
    text?: string;
    url?: string;
  };
}

export interface AboutMeta {
  title?: string;
  description?: string;
  secondaryDescription?: string;
  image?: string;
  personalInfo?: {
    name?: string;
    location?: string;
    email?: string;
  };
}

export interface ProjectsMeta {
  title?: string;
  description?: string;
  projects?: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
    github: string;
  }>;
}

export interface SkillsMeta {
  title?: string;
  description?: string;
  skills?: Array<{
    name: string;
    level: number;
    category: string;
  }>;
}

export interface ExperienceMeta {
  title?: string;
  description?: string;
  experiences?: Array<{
    id: number;
    company: string;
    position: string;
    duration: string;
    description: string[];
  }>;
}

export interface HeaderMeta {
  logo?: string;
}

export interface AdminSection {
  id: string;
  section_id: string;
  meta: HeroMeta & AboutMeta & ProjectsMeta & SkillsMeta & ExperienceMeta & HeaderMeta & ContactMeta & {
    [key: string]: any; // Allow dynamic property access
    seo?: {
      title: string;
      description: string;
      keywords: string[];
    };
    navigation?: {
      items: Array<{ label: string; url: string }>;
    };
    contact?: {
      email: string;
      phone: string;
      address: string;
    };
    analytics?: {
      googleAnalyticsId: string;
    };
  };
  created_at: string;
  updated_at: string;
}

export interface AdminState {
  sections: AdminSection[];
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  setSections: (sections: AdminSection[]) => void;
  setAuthenticated: (status: boolean) => void;
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  updateSection: (id: string, data: Partial<AdminSection>) => Promise<void>;
  deleteSection: (id: string) => Promise<void>;
  createSection: (data: Partial<AdminSection>) => Promise<void>;
}

export interface DashboardStats {
  totalSections: number;
  totalImages: number;
  lastUpdated: string;
  recentActivities: Array<{
    id: string;
    action: string;
    section: string;
    timestamp: string;
  }>;
}