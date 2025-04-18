
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  CalendarPlus, 
  Calendar, 
  Search, 
  MoreVertical,
  Filter
} from "lucide-react";
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
import { EventCategory } from '@/types';

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  // This would come from actual API data
  const events = [
    {
      id: '1',
      title: 'Spring Hackathon',
      description: 'A weekend-long coding competition focused on developing innovative solutions.',
      date: '2025-05-01',
      time: '9:00 AM',
      location: 'Engineering Building',
      category: 'hackathon' as EventCategory,
      media: ['image1.jpg', 'image2.jpg', 'video1.mp4'],
      createdBy: 'Jane Cooper',
    },
    {
      id: '2',
      title: 'AI Workshop',
      description: 'Learn the basics of artificial intelligence and machine learning.',
      date: '2025-04-25',
      time: '2:00 PM',
      location: 'Computer Science Lab',
      category: 'workshop' as EventCategory,
      media: ['image3.jpg'],
      createdBy: 'Mike Johnson',
    },
    {
      id: '3',
      title: 'Alumni Networking',
      description: 'Connect with alumni working in various tech companies.',
      date: '2025-05-10',
      time: '6:00 PM',
      location: 'Student Union',
      category: 'networking' as EventCategory,
      media: [],
      createdBy: 'Sarah Miller',
    },
    {
      id: '4',
      title: 'JavaScript Deep Dive',
      description: 'An in-depth workshop on advanced JavaScript concepts and patterns.',
      date: '2025-05-15',
      time: '3:00 PM',
      location: 'Virtual',
      category: 'workshop' as EventCategory,
      media: ['image4.jpg', 'video2.mp4'],
      createdBy: 'John Doe',
    },
    {
      id: '5',
      title: 'Tech Talk: Blockchain',
      description: 'Understanding blockchain technology and its applications.',
      date: '2025-04-28',
      time: '4:00 PM',
      location: 'Lecture Hall 101',
      category: 'tech_talk' as EventCategory,
      media: [],
      createdBy: 'Alex Chen',
    },
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter events based on search query
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upcomingEvents = filteredEvents.filter(
    event => new Date(event.date) >= new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = filteredEvents.filter(
    event => new Date(event.date) < new Date()
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // For demo - we'll create a mock handler for form submission
  const handleCreateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreateEventOpen(false);
    // This would call your actual event creation logic
    alert('Event created successfully! (This is a demo)');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            Manage and organize club events
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
            <DialogTrigger asChild>
              <Button className="bg-digitek-600 hover:bg-digitek-700">
                <CalendarPlus className="mr-2 h-4 w-4" />
                New Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleCreateEvent}>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>
                    Fill in the details for your new event
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input id="title" placeholder="Enter event title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Enter event description"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Event location" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select required defaultValue="workshop">
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech_talk">Tech Talk</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="hackathon">Hackathon</SelectItem>
                        <SelectItem value="networking">Networking</SelectItem>
                        <SelectItem value="conference">Conference</SelectItem>
                        <SelectItem value="competition">Competition</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="media">Upload Media (Optional)</Label>
                    <Input id="media" type="file" multiple accept="image/*,video/*" />
                    <p className="text-xs text-muted-foreground">
                      You can add more media after creating the event
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateEventOpen(false)} type="button">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-digitek-600 hover:bg-digitek-700">
                    Create Event
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
            placeholder="Search events..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-1/3 flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Tech Talk</DropdownMenuItem>
              <DropdownMenuItem>Workshop</DropdownMenuItem>
              <DropdownMenuItem>Hackathon</DropdownMenuItem>
              <DropdownMenuItem>Networking</DropdownMenuItem>
              <DropdownMenuItem>Competition</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Clear Filters</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingEvents.length === 0 ? (
            <Card>
              <CardContent className="py-8 flex flex-col items-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No upcoming events found
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsCreateEventOpen(true)}
                >
                  Create an Event
                </Button>
              </CardContent>
            </Card>
          ) : (
            upcomingEvents.map(event => (
              <Card key={event.id}>
                <div className="md:flex">
                  <div className="md:w-1/4 bg-muted flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-border">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                      <div className="text-sm font-medium">
                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {event.time}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:w-3/4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant="outline" 
                            className={
                              event.category === 'hackathon'
                                ? 'border-purple-500 text-purple-500'
                                : event.category === 'workshop'
                                  ? 'border-blue-500 text-blue-500'
                                  : event.category === 'tech_talk'
                                    ? 'border-green-500 text-green-500'
                                    : 'border-orange-500 text-orange-500'
                            }
                          >
                            {event.category.replace('_', ' ')}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Event</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete Event</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-2">
                      {event.description}
                    </p>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        Created by: {event.createdBy}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {event.media.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {event.media.length} {event.media.length === 1 ? 'file' : 'files'}
                          </Badge>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {pastEvents.length === 0 ? (
            <Card>
              <CardContent className="py-8 flex flex-col items-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No past events found
                </p>
              </CardContent>
            </Card>
          ) : (
            pastEvents.map(event => (
              <Card key={event.id}>
                <div className="md:flex">
                  <div className="md:w-1/4 bg-muted flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-border">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                      <div className="text-sm font-medium">
                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {event.time}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:w-3/4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant="outline" 
                            className={
                              event.category === 'hackathon'
                                ? 'border-purple-500 text-purple-500'
                                : event.category === 'workshop'
                                  ? 'border-blue-500 text-blue-500'
                                  : event.category === 'tech_talk'
                                    ? 'border-green-500 text-green-500'
                                    : 'border-orange-500 text-orange-500'
                            }
                          >
                            {event.category.replace('_', ' ')}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Event</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete Event</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-2">
                      {event.description}
                    </p>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        Created by: {event.createdBy}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {event.media.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {event.media.length} {event.media.length === 1 ? 'file' : 'files'}
                          </Badge>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Events;
