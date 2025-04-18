
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Event, Task } from '@/types';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // This would come from your API/state management
  const events: Event[] = [
    {
      id: '1',
      title: 'Spring Hackathon',
      description: 'A weekend-long coding competition focused on developing innovative solutions.',
      date: '2025-05-01',
      time: '9:00 AM',
      location: 'Engineering Building',
      category: 'hackathon',
      createdBy: '1',
      createdAt: '2025-04-01',
      updatedAt: '2025-04-01',
    },
    {
      id: '2',
      title: 'AI Workshop',
      description: 'Learn the basics of artificial intelligence and machine learning.',
      date: '2025-04-25',
      time: '2:00 PM',
      location: 'Computer Science Lab',
      category: 'workshop',
      createdBy: '2',
      createdAt: '2025-04-02',
      updatedAt: '2025-04-02',
    },
    {
      id: '3',
      title: 'Alumni Networking',
      description: 'Connect with alumni working in various tech companies.',
      date: '2025-05-10',
      time: '6:00 PM',
      location: 'Student Union',
      category: 'networking',
      createdBy: '3',
      createdAt: '2025-04-03',
      updatedAt: '2025-04-03',
    },
    {
      id: '4',
      title: 'JavaScript Deep Dive',
      description: 'An in-depth workshop on advanced JavaScript concepts and patterns.',
      date: '2025-05-15',
      time: '3:00 PM',
      location: 'Virtual',
      category: 'workshop',
      createdBy: '2',
      createdAt: '2025-04-04',
      updatedAt: '2025-04-04',
    },
    {
      id: '5',
      title: 'Tech Talk: Blockchain',
      description: 'Understanding blockchain technology and its applications.',
      date: '2025-04-28',
      time: '4:00 PM',
      location: 'Lecture Hall 101',
      category: 'tech_talk',
      createdBy: '1',
      createdAt: '2025-04-05',
      updatedAt: '2025-04-05',
    },
  ];
  
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Design poster for Tech Talk',
      description: 'Create a promotional poster for the upcoming blockchain tech talk.',
      assignedTo: '4', // Alex Chen
      assignedBy: '1', // Jane Cooper
      status: 'completed',
      dueDate: '2025-04-15',
      createdAt: '2025-04-01',
      updatedAt: '2025-04-14',
      eventId: '5', // Tech Talk: Blockchain
    },
    {
      id: '2',
      title: 'Edit workshop videos',
      description: 'Edit and compile all video footage from the Python workshop.',
      assignedTo: '5', // Lisa Wang
      assignedBy: '2', // Mike Johnson
      status: 'in-progress',
      dueDate: '2025-04-20',
      createdAt: '2025-04-10',
      updatedAt: '2025-04-12',
      eventId: '2', // AI Workshop
    },
    {
      id: '3',
      title: 'Create social media posts for Hackathon',
      description: 'Design and schedule 5 social media posts to promote the Spring Hackathon.',
      assignedTo: '6', // Tom Wilson
      assignedBy: '3', // Sarah Miller
      status: 'pending',
      dueDate: '2025-04-22',
      createdAt: '2025-04-12',
      updatedAt: '2025-04-12',
      eventId: '1', // Spring Hackathon
    },
    {
      id: '4',
      title: 'Setup registration form for Alumni Networking',
      description: 'Create and distribute a registration form for the upcoming Alumni Networking event.',
      assignedTo: '3', // Sarah Miller
      assignedBy: '1', // Jane Cooper
      status: 'completed',
      dueDate: '2025-04-18',
      createdAt: '2025-04-08',
      updatedAt: '2025-04-16',
      eventId: '3', // Alumni Networking
    },
    {
      id: '5',
      title: 'Prepare JavaScript workshop materials',
      description: 'Create slides, code examples, and exercises for the JavaScript Deep Dive workshop.',
      assignedTo: '7', // Emma Davis
      assignedBy: '2', // Mike Johnson
      status: 'in-progress',
      dueDate: '2025-05-10',
      createdAt: '2025-04-15',
      updatedAt: '2025-04-16',
      eventId: '4', // JavaScript Deep Dive
    },
  ];

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

  // Helper functions
  const getMemberName = (id: string) => {
    const member = members.find(m => m.id === id);
    return member ? member.name : 'Unknown Member';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
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

  // Generate calendar data
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of month
    const firstDay = new Date(year, month, 1);
    // Last day of month
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of week of first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    // Total days in month
    const daysInMonth = lastDay.getDate();
    
    // Generate array of calendar days
    const days = [];
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      
      // Get events for this day
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === i &&
          eventDate.getMonth() === month &&
          eventDate.getFullYear() === year
        );
      });
      
      // Get tasks due on this day
      const dayTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return (
          taskDate.getDate() === i &&
          taskDate.getMonth() === month &&
          taskDate.getFullYear() === year
        );
      });
      
      days.push({
        date,
        events: dayEvents,
        tasks: dayTasks
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  
  // Get weekday names
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get month name
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  
  // Navigate to previous/next month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  // Get selected day's events and tasks
  const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  
  const selectedDateEvents = events.filter(event => event.date === selectedDateStr);
  const selectedDateTasks = tasks.filter(task => task.dueDate === selectedDateStr);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">
          View upcoming events and task deadlines
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {monthName} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Weekday headers */}
              {weekdays.map(day => (
                <div key={day} className="text-center text-sm font-medium py-1">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {calendarDays.map((day, index) => (
                <div 
                  key={index} 
                  className={`
                    p-1 min-h-[80px] border rounded-sm relative
                    ${!day ? 'bg-muted/30' : 'hover:bg-muted/50 cursor-pointer'}
                    ${day && day.date.getDate() === selectedDate.getDate() && 
                    day.date.getMonth() === selectedDate.getMonth() && 
                    day.date.getFullYear() === selectedDate.getFullYear() 
                      ? 'bg-digitek-50 border-digitek-200 dark:bg-digitek-900/10 dark:border-digitek-800/30' 
                      : 'border-border'}
                  `}
                  onClick={() => day && setSelectedDate(day.date)}
                >
                  {day && (
                    <>
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium">
                          {day.date.getDate()}
                        </span>
                        
                        {(day.events.length > 0 || day.tasks.length > 0) && (
                          <div className="flex gap-0.5">
                            {day.events.length > 0 && (
                              <div 
                                className={`h-2 w-2 rounded-full bg-digitek-500`} 
                                title={`${day.events.length} event${day.events.length > 1 ? 's' : ''}`}
                              />
                            )}
                            {day.tasks.length > 0 && (
                              <div 
                                className={`h-2 w-2 rounded-full bg-orange-500`} 
                                title={`${day.tasks.length} task${day.tasks.length > 1 ? 's' : ''}`}
                              />
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-1 space-y-1 overflow-hidden max-h-[50px]">
                        {day.events.slice(0, 2).map(event => (
                          <div 
                            key={event.id} 
                            className={`
                              text-[10px] truncate px-1 py-0.5 rounded-sm
                              ${event.category === 'hackathon' 
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300' 
                                : event.category === 'workshop'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                                  : event.category === 'networking'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
                              }
                            `}
                          >
                            {event.title}
                          </div>
                        ))}
                        
                        {day.events.length > 2 && (
                          <div className="text-[10px] text-center text-muted-foreground">
                            +{day.events.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-digitek-500" />
              {formatDate(selectedDateStr)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="events">
                  Events
                  {selectedDateEvents.length > 0 && (
                    <Badge variant="outline" className="ml-2">
                      {selectedDateEvents.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="tasks">
                  Tasks
                  {selectedDateTasks.length > 0 && (
                    <Badge variant="outline" className="ml-2">
                      {selectedDateTasks.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="events">
                {selectedDateEvents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No events scheduled for this day
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedDateEvents.map(event => (
                      <div key={event.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{event.title}</h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
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
                        
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{event.time}</span>
                          <span className="mx-2">•</span>
                          <span>{event.location}</span>
                        </div>
                        
                        <Badge 
                          variant="outline"
                          className={`
                            mt-2 text-xs
                            ${event.category === 'hackathon' 
                              ? 'border-purple-500 text-purple-700 dark:text-purple-400' 
                              : event.category === 'workshop'
                                ? 'border-blue-500 text-blue-700 dark:text-blue-400'
                                : event.category === 'networking'
                                  ? 'border-green-500 text-green-700 dark:text-green-400'
                                  : 'border-gray-500 text-gray-700 dark:text-gray-400'
                            }
                          `}
                        >
                          {event.category.replace('_', ' ')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="tasks">
                {selectedDateTasks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No tasks due on this day
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedDateTasks.map(task => (
                      <div key={task.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{task.title}</h3>
                          <Badge 
                            className={
                              task.status === 'completed'
                                ? 'bg-completed'
                                : task.status === 'in-progress'
                                  ? 'bg-in-progress'
                                  : 'bg-pending text-white'
                            }
                          >
                            {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mt-2">
                          {task.description}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px] bg-digitek-100 text-digitek-800">
                              {getInitials(getMemberName(task.assignedTo))}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs">
                            Assigned to: {getMemberName(task.assignedTo)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
