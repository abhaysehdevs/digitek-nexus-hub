import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Upload,
  Grid,
  List,
  MoreVertical,
  Plus,
  Image,
  Video,
  Trash2,
  Download,
  Share2,
  Edit,
  FolderPlus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Media } from '@/types';
import { useMedia } from '@/contexts/MediaContext';
import { FolderDialog } from '@/components/media/FolderDialog';
import { Folder } from 'lucide-react';

const MediaGallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
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

  // This would come from your API/state management 
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

  // For demo - we'll create a mock handler for form submission
  const handleUploadMedia = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploadOpen(false);
    // This would call your actual media upload logic
    alert('Media uploaded successfully! (This is a demo)');
  };

  const { folders, addMediaToFolder, deleteFolder, deleteMediaFromFolder } = useMedia();
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  // Handle media actions
  const handleDelete = (mediaId: string) => {
    if (selectedFolder) {
      deleteMediaFromFolder(selectedFolder, mediaId);
    }
  };

  const handleAddToFolder = (mediaItem: Media, folderId: string) => {
    addMediaToFolder(folderId, mediaItem);
  };

  const handleDeleteFolder = (folderId: string) => {
    deleteFolder(folderId);
    if (selectedFolder === folderId) {
      setSelectedFolder(null);
    }
  };

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
          
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button className="bg-digitek-600 hover:bg-digitek-700">
                <Upload className="mr-2 h-4 w-4" />
                Upload Media
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleUploadMedia}>
                <DialogHeader>
                  <DialogTitle>Upload Media</DialogTitle>
                  <DialogDescription>
                    Add new images or videos to the media gallery
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter media title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="files">Media Files</Label>
                    <Input 
                      id="files" 
                      type="file" 
                      accept="image/*,video/*" 
                      multiple
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      You can upload multiple files at once
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event">Related Event</Label>
                    <Select>
                      <SelectTrigger id="event">
                        <SelectValue placeholder="Select an event" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No specific event</SelectItem>
                        {events.map(event => (
                          <SelectItem key={event.id} value={event.id}>
                            {event.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Enter a description for these media items"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (Optional)</Label>
                    <Input 
                      id="tags" 
                      placeholder="Enter tags separated by commas"
                    />
                    <p className="text-xs text-muted-foreground">
                      Example: event, workshop, presentation
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUploadOpen(false)} type="button">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-digitek-600 hover:bg-digitek-700">
                    Upload
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
        
        {/* All Media */}
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
        
        {/* Images */}
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
        
        {/* Videos */}
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

interface MediaItemProps {
  item: Media;
  getEventName: (id?: string) => string;
  getMemberName: (id: string) => string;
  formatDate: (date: string) => string;
}

const MediaGridItem: React.FC<MediaItemProps> = ({ 
  item, 
  getEventName,
  getMemberName,
  formatDate
}) => {
  const { folders, addMediaToFolder } = useMedia();
  const eventName = getEventName(item.eventId);
  const [showFolderMenu, setShowFolderMenu] = useState(false);

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
        
        {/* Overlay with actions */}
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
          <Button 
            variant="destructive" 
            size="icon" 
            className="h-9 w-9"
            onClick={() => {
              //e.stopPropagation();
              //handleDelete(item.id);
            }}
          >
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

const MediaListItem: React.FC<MediaItemProps> = ({ 
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

export default MediaGallery;
