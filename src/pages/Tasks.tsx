
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  PlusCircle, 
  MoreVertical,
  CheckSquare,
  Clock,
  Filter,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Task, TaskStatus } from '@/types';

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'all'>('all');

  // This would come from actual API data
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Design poster for Tech Talk',
      description: 'Create a promotional poster for the upcoming blockchain tech talk. Use the club colors and include all event details.',
      assignedTo: '4', // Alex Chen (poster_designer)
      assignedBy: '1', // Jane Cooper (president)
      status: 'completed',
      dueDate: '2025-04-15',
      createdAt: '2025-04-05',
      updatedAt: '2025-04-14',
      eventId: '5', // Tech Talk: Blockchain
      attachments: [
        {
          id: '1',
          name: 'tech_talk_poster.png',
          type: 'image/png',
          url: '/attachments/tech_talk_poster.png',
          uploadedBy: '4',
          createdAt: '2025-04-14',
        }
      ]
    },
    {
      id: '2',
      title: 'Edit workshop videos',
      description: 'Edit and compile all video footage from the Python workshop. Add intro/outro with club branding and upload to the media gallery.',
      assignedTo: '5', // Lisa Wang (video_editor)
      assignedBy: '2', // Mike Johnson (vice_president)
      status: 'in-progress',
      dueDate: '2025-04-20',
      createdAt: '2025-04-10',
      updatedAt: '2025-04-12',
      eventId: '2', // AI Workshop
      attachments: []
    },
    {
      id: '3',
      title: 'Create social media posts for Hackathon',
      description: 'Design and schedule 5 social media posts to promote the Spring Hackathon. Focus on prizes, registration, and key dates.',
      assignedTo: '6', // Tom Wilson (social_media_manager)
      assignedBy: '3', // Sarah Miller (event_manager)
      status: 'pending',
      dueDate: '2025-04-22',
      createdAt: '2025-04-12',
      updatedAt: '2025-04-12',
      eventId: '1', // Spring Hackathon
      attachments: []
    },
    {
      id: '4',
      title: 'Setup registration form for Alumni Networking',
      description: 'Create and distribute a registration form for the upcoming Alumni Networking event. Collect dietary preferences and career interests.',
      assignedTo: '3', // Sarah Miller (event_manager)
      assignedBy: '1', // Jane Cooper (president)
      status: 'completed',
      dueDate: '2025-04-18',
      createdAt: '2025-04-08',
      updatedAt: '2025-04-16',
      eventId: '3', // Alumni Networking
      attachments: [
        {
          id: '2',
          name: 'registration_responses.xlsx',
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          url: '/attachments/registration_responses.xlsx',
          uploadedBy: '3',
          createdAt: '2025-04-16',
        }
      ]
    },
    {
      id: '5',
      title: 'Prepare JavaScript workshop materials',
      description: 'Create slides, code examples, and exercises for the JavaScript Deep Dive workshop. Include sections on promises, async/await, and modern JS features.',
      assignedTo: '7', // Emma Davis (member)
      assignedBy: '2', // Mike Johnson (vice_president)
      status: 'in-progress',
      dueDate: '2025-05-10',
      createdAt: '2025-04-15',
      updatedAt: '2025-04-16',
      eventId: '4', // JavaScript Deep Dive
      attachments: []
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

  // Filter tasks based on search query and selected status
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         getMemberName(task.assignedTo).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Group tasks by status
  const pendingTasks = filteredTasks.filter(task => task.status === 'pending');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  // For demo - we'll create a mock handler for form submission
  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreateTaskOpen(false);
    // This would call your actual task creation logic
    alert('Task created successfully! (This is a demo)');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track club tasks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
            <DialogTrigger asChild>
              <Button className="bg-digitek-600 hover:bg-digitek-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleCreateTask}>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Assign a new task to a club member
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input id="title" placeholder="Enter task title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Enter task description"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="assignedTo">Assign To</Label>
                      <Select required>
                        <SelectTrigger id="assignedTo">
                          <SelectValue placeholder="Select a member" />
                        </SelectTrigger>
                        <SelectContent>
                          {members.map(member => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name} ({member.role.replace('_', ' ')})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input id="dueDate" type="date" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event">Related Event (Optional)</Label>
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
                    <Label htmlFor="attachments">Attachments (Optional)</Label>
                    <Input id="attachments" type="file" multiple />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateTaskOpen(false)} type="button">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-digitek-600 hover:bg-digitek-700">
                    Create Task
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
            placeholder="Search tasks..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-1/3 flex justify-end">
          <Select 
            value={selectedStatus} 
            onValueChange={(value) => setSelectedStatus(value as TaskStatus | 'all')}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>
                  {selectedStatus === 'all' 
                    ? 'All Statuses' 
                    : selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1).replace('-', ' ')}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending" className="text-pending">
            Pending
            {pendingTasks.length > 0 && (
              <Badge variant="outline" className="ml-2 border-pending text-pending">
                {pendingTasks.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="text-in-progress">
            In Progress
            {inProgressTasks.length > 0 && (
              <Badge variant="outline" className="ml-2 border-in-progress text-in-progress">
                {inProgressTasks.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-completed">
            Completed
            {completedTasks.length > 0 && (
              <Badge variant="outline" className="ml-2 border-completed text-completed">
                {completedTasks.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        {/* All Tasks */}
        <TabsContent value="all" className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card>
              <CardContent className="py-8 flex flex-col items-center">
                <CheckSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No tasks found
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsCreateTaskOpen(true)}
                >
                  Create a Task
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                getMemberName={getMemberName}
                getEventName={getEventName}
                getInitials={getInitials}
                formatDate={formatDate}
              />
            ))
          )}
        </TabsContent>
        
        {/* Pending Tasks */}
        <TabsContent value="pending" className="space-y-4">
          {pendingTasks.length === 0 ? (
            <Card>
              <CardContent className="py-8 flex flex-col items-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No pending tasks found
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsCreateTaskOpen(true)}
                >
                  Create a Task
                </Button>
              </CardContent>
            </Card>
          ) : (
            pendingTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                getMemberName={getMemberName}
                getEventName={getEventName}
                getInitials={getInitials}
                formatDate={formatDate}
              />
            ))
          )}
        </TabsContent>
        
        {/* In Progress Tasks */}
        <TabsContent value="in-progress" className="space-y-4">
          {inProgressTasks.length === 0 ? (
            <Card>
              <CardContent className="py-8 flex flex-col items-center">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No in-progress tasks found
                </p>
              </CardContent>
            </Card>
          ) : (
            inProgressTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                getMemberName={getMemberName}
                getEventName={getEventName}
                getInitials={getInitials}
                formatDate={formatDate}
              />
            ))
          )}
        </TabsContent>
        
        {/* Completed Tasks */}
        <TabsContent value="completed" className="space-y-4">
          {completedTasks.length === 0 ? (
            <Card>
              <CardContent className="py-8 flex flex-col items-center">
                <CheckSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  No completed tasks found
                </p>
              </CardContent>
            </Card>
          ) : (
            completedTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                getMemberName={getMemberName}
                getEventName={getEventName}
                getInitials={getInitials}
                formatDate={formatDate}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TaskCardProps {
  task: Task;
  getMemberName: (id: string) => string;
  getEventName: (id?: string) => string;
  getInitials: (name: string) => string;
  formatDate: (date: string) => string;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  getMemberName, 
  getEventName,
  getInitials,
  formatDate
}) => {
  const memberName = getMemberName(task.assignedTo);
  const eventName = getEventName(task.eventId);
  
  return (
    <Card>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{task.title}</CardTitle>
            <CardDescription className="text-sm">
              {eventName !== 'No Event' && (
                <span className="text-digitek-600 dark:text-digitek-400">
                  {eventName} • 
                </span>
              )}
              <span> Due {formatDate(task.dueDate)}</span>
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Task</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Mark as {task.status === 'pending' ? 'In Progress' : task.status === 'in-progress' ? 'Completed' : 'Pending'}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-4">
          {task.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-digitek-100 text-digitek-800">
                {getInitials(memberName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{memberName}</p>
              <p className="text-xs text-muted-foreground">Assigned by {getMemberName(task.assignedBy)}</p>
            </div>
          </div>
          
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
        
        {task.attachments && task.attachments.length > 0 && (
          <div className="border-t pt-3 mt-2">
            <p className="text-xs font-medium mb-2">Attachments ({task.attachments.length})</p>
            <div className="flex flex-wrap gap-2">
              {task.attachments.map(attachment => (
                <div 
                  key={attachment.id} 
                  className="text-xs border rounded-md px-2 py-1 flex items-center gap-1"
                >
                  {attachment.type.includes('image') 
                    ? <img src={attachment.url} className="h-4 w-4 object-cover rounded" alt="" /> 
                    : <div className="h-4 w-4 bg-muted rounded flex items-center justify-center text-[8px]">
                        {attachment.name.split('.').pop()?.toUpperCase()}
                      </div>
                  }
                  <span className="truncate max-w-[140px]">{attachment.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Tasks;
