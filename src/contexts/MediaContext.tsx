
import React, { createContext, useContext, useState } from 'react';
import { Media } from '@/types';

interface MediaContextType {
  folders: EventFolder[];
  createFolder: (name: string, eventId: string) => void;
  addMediaToFolder: (folderId: string, mediaItem: Media) => void;
  deleteFolder: (folderId: string) => void;
  deleteMediaFromFolder: (folderId: string, mediaId: string) => void;
  moveMediaToFolder: (mediaId: string, fromFolderId: string, toFolderId: string) => void;
}

interface EventFolder {
  id: string;
  name: string;
  eventId: string;
  media: Media[];
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider = ({ children }: { children: React.ReactNode }) => {
  const [folders, setFolders] = useState<EventFolder[]>([]);

  const createFolder = (name: string, eventId: string) => {
    const newFolder: EventFolder = {
      id: Date.now().toString(),
      name,
      eventId,
      media: [],
    };
    setFolders([...folders, newFolder]);
  };

  const addMediaToFolder = (folderId: string, mediaItem: Media) => {
    setFolders(folders.map(folder => {
      if (folder.id === folderId) {
        return {
          ...folder,
          media: [...folder.media, mediaItem]
        };
      }
      return folder;
    }));
  };

  const deleteFolder = (folderId: string) => {
    setFolders(folders.filter(folder => folder.id !== folderId));
  };

  const deleteMediaFromFolder = (folderId: string, mediaId: string) => {
    setFolders(folders.map(folder => {
      if (folder.id === folderId) {
        return {
          ...folder,
          media: folder.media.filter(item => item.id !== mediaId)
        };
      }
      return folder;
    }));
  };

  const moveMediaToFolder = (mediaId: string, fromFolderId: string, toFolderId: string) => {
    const fromFolder = folders.find(f => f.id === fromFolderId);
    const mediaItem = fromFolder?.media.find(m => m.id === mediaId);
    
    if (!mediaItem) return;

    setFolders(folders.map(folder => {
      if (folder.id === fromFolderId) {
        return {
          ...folder,
          media: folder.media.filter(m => m.id !== mediaId)
        };
      }
      if (folder.id === toFolderId) {
        return {
          ...folder,
          media: [...folder.media, mediaItem]
        };
      }
      return folder;
    }));
  };

  return (
    <MediaContext.Provider value={{
      folders,
      createFolder,
      addMediaToFolder,
      deleteFolder,
      deleteMediaFromFolder,
      moveMediaToFolder,
    }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};
