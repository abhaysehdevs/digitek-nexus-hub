
import React from 'react';
import { Button } from "@/components/ui/button";
import { Folder, Trash2 } from "lucide-react";
import { useMedia } from '@/contexts/MediaContext';

interface FolderListProps {
  selectedFolder: string | null;
  setSelectedFolder: (folderId: string | null) => void;
}

export const FolderList: React.FC<FolderListProps> = ({ selectedFolder, setSelectedFolder }) => {
  const { folders, deleteFolder } = useMedia();

  const handleDeleteFolder = (folderId: string) => {
    deleteFolder(folderId);
    if (selectedFolder === folderId) {
      setSelectedFolder(null);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      {folders.map(folder => (
        <div key={folder.id} className="p-4 border rounded-lg hover:bg-accent cursor-pointer"
             onClick={() => setSelectedFolder(folder.id)}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              <span className="font-medium">{folder.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFolder(folder.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {folder.media.length} items
          </p>
        </div>
      ))}
    </div>
  );
};
