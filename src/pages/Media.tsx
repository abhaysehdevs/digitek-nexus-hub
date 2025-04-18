import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Grid, List, Image, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Media } from '@/types';
import { useMedia } from '@/contexts/MediaContext';
import { FolderDialog } from '@/components/media/FolderDialog';
import { MediaUploadDialog } from '@/components/media/MediaUploadDialog';
import { MediaGridItem } from '@/components/media/MediaGridItem';
import { MediaListItem } from '@/components/media/MediaListItem';
import { FolderList } from '@/components/media/FolderList';
import { Folder } from 'lucide-react';

const MediaGallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // This would come from your actual API/state management 
  const members = [
    { id: '1', name: 'Jane Cooper', avatar: '', role: 'president' },
    { id: '2', name: 'Mike Johnson', avatar: '', role: 'vice_president' },
    { id: '3', name: 'Sarah Miller', avatar: '', role: 'event_manager' },
    { id: '4', name: 'Alex Chen', avatar: '', role: 'poster_designer' },
    { id: '5', name: 'Lisa Wang', avatar: '', role: 'video_editor' },
    { id: '6', name: 'Tom Wilson', avatar: '', role: 'social_media_manager' },
    { id: '7', name: 'Emma Davis', avatar: '', role: 'member' },
    { id: '8', name: 'David Kim', avatar: '', role: 'member' },
  ];
  
  const events = [
    { id: '1', title: 'Spring Hackathon' },
    { id: '2', title: 'AI Workshop' },
    { id: '3', title: 'Alumni Networking' },
    { id: '4', title: 'JavaScript Deep Dive' },
    { id: '5', title: 'Tech Talk: Blockchain' },
  ];

  // This would come from actual API data
  const mediaItems: Media[] = [
    {
      id: '1',
      title: 'Hackathon Presentation',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=60',
      thumbnailUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=60',
      uploadedBy: '1', // Jane Cooper
      eventId: '1', // Spring Hackathon
      createdAt: '2025-03-15',
      tags: ['hackathon', 'presentation', 'team']
    },
    {
      id: '2',
      title: 'AI Workshop Session',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=60',
      thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=60',
      uploadedBy: '2', // Mike Johnson
      eventId: '2', // AI Workshop
      createdAt: '2025-03-20',
      tags: ['workshop', 'ai', 'coding']
    },
    {
      id: '3',
      title: 'Networking Event',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=500&q=60',
      thumbnailUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=500&q=60',
      uploadedBy: '3', // Sarah Miller
      eventId: '3', // Alumni Networking
      createdAt: '2025-04-02',
      tags: ['networking', 'alumni', 'social']
    },
    {
      id: '4',
      title: 'JavaScript Workshop Demo',
      type: 'video',
      url: 'https://example.com/videos/javascript_workshop.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=60',
      uploadedBy: '7', // Emma Davis
      eventId: '4', // JavaScript Deep Dive
      createdAt: '2025-04-10',
      tags: ['javascript', 'workshop', 'coding']
    },
    {
      id: '5',
      title: 'Blockchain Tech Talk',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=500&q=60',
      thumbnailUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=500&q=60',
      uploadedBy: '4', // Alex Chen
      eventId: '5', // Tech Talk: Blockchain
      createdAt: '2025-04-15',
      tags: ['blockchain', 'tech-talk', 'presentation']
    },
    {
      id: '6',
      title: 'Hackathon Team Building',
      type: 'video',
      url: 'https://example.com/videos/team_building.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=500&q=60',
      uploadedBy: '1', // Jane Cooper
      eventId: '1', // Spring Hackathon
      createdAt: '2025-03-10',
      tags: ['hackathon', 'team', 'collaboration']
    },
  ];

  // Helper functions
  const getMemberName = (id: string) => {
    const member = members.find(m => m.id === id);
    return member ? member.name : 'Unknown Member';
  };

  const getEventName = (id?: string) => {
    if (!id) return 'No Event';
    const event = events.find(e => e.id === id);
    return event ? event.title : 'Unknown Event';
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter media based on search query
  const filteredMedia = mediaItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    getEventName(item.eventId).toLowerCase().includes(searchQuery.toLowerCase()) ||
    getMemberName(item.uploadedBy).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const imageItems = filteredMedia.filter(item => item.type === 'image');
  const videoItems = filteredMedia.filter(item => item.type === 'video');

  const { folders } = useMedia();
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  // Filter media based on selected folder
  const displayedMedia = selectedFolder
    ? folders.find(f => f.id === selectedFolder)?.media || []
    : filteredMedia;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media Gallery</h1>
          <p className="text-muted-foreground">
            Organize and manage club event media
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-muted' : ''}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-muted' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
          
          <MediaUploadDialog
            events={events}
            isOpen={isUploadOpen}
            setIsOpen={setIsUploadOpen}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, tag, event, or uploader..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-1/3 flex justify-end gap-2">
          <FolderDialog events={events} />
          <Select
            value={selectedFolder || "all"}
            onValueChange={(value) => setSelectedFolder(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue>
                {selectedFolder
                  ? folders.find(f => f.id === selectedFolder)?.name || "Select Folder"
                  : "All Media"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Media</SelectItem>
              {folders.map(folder => (
                <SelectItem key={folder.id} value={folder.id}>
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4" />
                    {folder.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {folders.length > 0 && !selectedFolder && (
        <FolderList
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
        />
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all">All Media</TabsTrigger>
          <TabsTrigger value="images">
            Images
            {imageItems.length > 0 && (
              <Badge variant="outline" className="ml-2">
                {imageItems.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="videos">
            Videos
            {videoItems.length > 0 && (
              <Badge variant="outline" className="ml-2">
                {videoItems.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {displayedMedia.length === 0 ? (
            <Card>
              <CardContent className="py-8 flex flex-col items-center">
                <Image className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No media items found
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsUploadOpen(true)}
                >
                  Upload Media
                </Button>
              </CardContent>
            </Card>
          ) : (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedMedia.map(item => (
                  <MediaGridItem 
                    key={item.id} 
                    item={item}
                    getEventName={getEventName}
                    getMemberName={getMemberName}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {displayedMedia.map(item => (
                  <MediaListItem
                    key={item.id}
                    item={item}
                    getEventName={getEventName}
                    getMemberName={getMemberName}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            )
          )}
        </TabsContent>
        
        <TabsContent value="images">
          {imageItems.length === 0 ? (
            <Card>
              <CardContent className="py-8 flex flex-col items-center">
                <Image className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No images found
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsUploadOpen(true)}
                >
                  Upload Images
                </Button>
              </CardContent>
            </Card>
          ) : (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imageItems.map(item => (
                  <MediaGridItem 
                    key={item.id} 
                    item={item}
                    getEventName={getEventName}
                    getMemberName={getMemberName}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {imageItems.map(item => (
                  <MediaListItem
                    key={item.id}
                    item={item}
                    getEventName={getEventName}
                    getMemberName={getMemberName}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            )
          )}
        </TabsContent>
        
        <TabsContent value="videos">
          {videoItems.length === 0 ? (
            <Card>
              <CardContent className="py-8 flex flex-col items-center">
                <Video className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No videos found
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsUploadOpen(true)}
                >
                  Upload Videos
                </Button>
              </CardContent>
            </Card>
          ) : (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videoItems.map(item => (
                  <MediaGridItem 
                    key={item.id} 
                    item={item}
                    getEventName={getEventName}
                    getMemberName={getMemberName}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {videoItems.map(item => (
                  <MediaListItem
                    key={item.id}
                    item={item}
                    getEventName={getEventName}
                    getMemberName={getMemberName}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            )
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MediaGallery;
