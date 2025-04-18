
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Upload } from "lucide-react";

interface Event {
  id: string;
  title: string;
}

interface MediaUploadDialogProps {
  events: Event[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MediaUploadDialog: React.FC<MediaUploadDialogProps> = ({
  events,
  isOpen,
  setIsOpen,
}) => {
  const handleUploadMedia = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);
    // This would call your actual media upload logic
    alert('Media uploaded successfully! (This is a demo)');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <Button variant="outline" onClick={() => setIsOpen(false)} type="button">
              Cancel
            </Button>
            <Button type="submit" className="bg-digitek-600 hover:bg-digitek-700">
              Upload
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
