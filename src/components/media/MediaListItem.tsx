
import React from 'react';
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
import { Download, Edit, MoreVertical, Share2, Trash2, Video } from "lucide-react";
import { Media } from '@/types';

interface MediaListItemProps {
  item: Media;
  getEventName: (id?: string) => string;
  getMemberName: (id: string) => string;
  formatDate: (date: string) => string;
}

export const MediaListItem: React.FC<MediaListItemProps> = ({ 
  item, 
  getEventName,
  getMemberName,
  formatDate
}) => {
  const eventName = getEventName(item.eventId);
  
  return (
    <div className="border border-border rounded-lg overflow-hidden shadow-sm hover:shadow transition-all">
      <div className="p-3 flex gap-4">
        <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
          {item.type === 'video' ? (
            <div className="h-full w-full flex items-center justify-center bg-muted">
              <Video className="h-1/2 w-1/2 text-muted-foreground" />
            </div>
          ) : (
            <img 
              src={item.thumbnailUrl || item.url} 
              alt={item.title} 
              className="h-full w-full object-cover"
            />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-xs text-muted-foreground">
                {eventName} • {formatDate(item.createdAt)}
              </p>
            </div>
            
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs px-1.5">
                {item.type}
              </Badge>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="flex justify-between items-end mt-2">
            <div className="text-xs text-muted-foreground">
              Uploaded by: {getMemberName(item.uploadedBy)}
            </div>
            
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-end">
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
      </div>
    </div>
  );
};
