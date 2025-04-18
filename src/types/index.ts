
// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type UserRole = 
  | 'admin'
  | 'president'
  | 'vice_president'
  | 'event_manager'
  | 'poster_designer'
  | 'video_editor'
  | 'social_media_manager'
  | 'member';

// Task Types
export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  eventId?: string;
  attachments?: Attachment[];
}

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  media?: Media[];
}

export type EventCategory = 
  | 'tech_talk'
  | 'workshop'
  | 'hackathon'
  | 'networking'
  | 'conference'
  | 'competition'
  | 'social'
  | 'other';

// Media Types
export interface Media {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  uploadedBy: string;
  eventId?: string;
  createdAt: string;
  tags?: string[];
}

// Attachment Type
export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedBy: string;
  createdAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: string;
  data?: Record<string, any>;
}

export type NotificationType = 
  | 'task_assigned'
  | 'task_completed'
  | 'task_updated'
  | 'event_created'
  | 'event_updated'
  | 'role_updated';
