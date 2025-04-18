
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FolderPlus, Share2, Trash2, Video } from "lucide-react";
import { Media } from '@/types';
import { useMedia } from '@/contexts/MediaContext';

interface MediaGridItemProps {
  item: Media;
  getEventName: (id?: string) => string;
  getMemberName: (id: string) => string;
  formatDate: (date: string) => string;
}

export const MediaGridItem: React.FC<MediaGridItemProps> = ({ 
  item, 
  getEventName,
  getMemberName,
  formatDate
}) => {
  const { folders, addMediaToFolder } = useMedia();
  const eventName = getEventName(item.eventId);

  const handleAddToFolder = (mediaItem: Media, folderId: string) => {
    addMediaToFolder(folderId, mediaItem);
  };

  return (
    <div className="group relative bg-muted rounded-lg overflow-hidden shadow hover:shadow-md transition-all">
      <div className="aspect-square relative overflow-hidden">
        {item.type === 'video' ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <Video className="h-1/4 w-1/4 text-muted-foreground" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        ) : (
          <img 
            src={item.thumbnailUrl || item.url} 
            alt={item.title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="h-9 w-9">
                <FolderPlus className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Add to Folder</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {folders.map(folder => (
                <DropdownMenuItem 
                  key={folder.id}
                  onClick={() => handleAddToFolder(item, folder.id)}
                >
                  {folder.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="secondary" size="icon" className="h-9 w-9">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" className="h-9 w-9">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm truncate">{item.title}</h3>
          <Badge variant="outline" className="text-[10px] px-1">
            {item.type}
          </Badge>
        </div>
        
        <div className="text-xs text-muted-foreground mt-1 space-y-1">
          <p>{eventName}</p>
          <p>Uploaded by: {getMemberName(item.uploadedBy)}</p>
          <p>{formatDate(item.createdAt)}</p>
        </div>
        
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className="text-[10px] px-1 py-0 h-4 bg-background"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
