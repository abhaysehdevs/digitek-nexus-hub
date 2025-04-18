
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileImage, 
  Users,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  // This would come from actual data - using mock for demo
  const stats = {
    totalEvents: 8,
    upcomingEvents: 3,
    totalMembers: 24,
    totalTasks: 15,
    pendingTasks: 5,
    mediaItems: 47
  };
  
  const recentTasks = [
    { 
      id: '1', 
      title: 'Design poster for Tech Talk', 
      status: 'completed', 
      dueDate: '2025-04-15',
      assignedTo: 'Jane Cooper'
    },
    { 
      id: '2', 
      title: 'Edit workshop videos', 
      status: 'in-progress', 
      dueDate: '2025-04-20',
      assignedTo: 'Mike Johnson'
    },
    { 
      id: '3', 
      title: 'Create social media posts for Hackathon', 
      status: 'pending', 
      dueDate: '2025-04-22',
      assignedTo: 'Sarah Miller'
    },
  ];
  
  const upcomingEvents = [
    {
      id: '1',
      title: 'Spring Hackathon',
      date: '2025-05-01',
      time: '9:00 AM',
      category: 'hackathon'
    },
    {
      id: '2',
      title: 'AI Workshop',
      date: '2025-04-25',
      time: '2:00 PM',
      category: 'workshop'
    },
    {
      id: '3',
      title: 'Alumni Networking',
      date: '2025-05-10',
      time: '6:00 PM',
      category: 'networking'
    }
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Digitek club management dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">
              {stats.upcomingEvents} upcoming events
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              Across various roles
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingTasks} pending tasks
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Tasks */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>
              Latest tasks and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map(task => (
                <div 
                  key={task.id} 
                  className="flex items-center justify-between space-x-4 rounded-md border p-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{task.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Assigned to: {task.assignedTo}
                    </p>
                    <div className="flex items-center pt-2">
                      <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Due {formatDate(task.dueDate)}
                      </span>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      task.status === 'completed' 
                        ? 'default' 
                        : task.status === 'in-progress'
                          ? 'secondary'
                          : 'outline'
                    }
                    className={
                      task.status === 'completed'
                        ? 'bg-green-500 hover:bg-green-600'
                        : task.status === 'in-progress'
                          ? 'bg-blue-500 hover:bg-blue-600'
                          : 'bg-transparent text-orange-500 border-orange-500 hover:bg-orange-500/10'
                    }
                  >
                    {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Events scheduled in the near future
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div 
                  key={event.id} 
                  className="flex items-center justify-between space-x-4 rounded-md border p-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{event.title}</p>
                    <div className="flex items-center pt-2">
                      <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatDate(event.date)} at {event.time}
                      </span>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      event.category === 'hackathon'
                        ? 'border-purple-500 text-purple-500 hover:bg-purple-500/10'
                        : event.category === 'workshop'
                          ? 'border-blue-500 text-blue-500 hover:bg-blue-500/10'
                          : 'border-green-500 text-green-500 hover:bg-green-500/10'
                    }
                  >
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1).replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
