
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  UserPlus,
  MoreVertical,
  Filter
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from '@/types';

const Members = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all');

  // This would come from actual API data
  const members = [
    {
      id: '1',
      name: 'Jane Cooper',
      email: 'jane@example.com',
      role: 'president' as UserRole,
      avatar: '',
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'vice_president' as UserRole,
      avatar: '',
    },
    {
      id: '3',
      name: 'Sarah Miller',
      email: 'sarah@example.com',
      role: 'event_manager' as UserRole,
      avatar: '',
    },
    {
      id: '4',
      name: 'Alex Chen',
      email: 'alex@example.com',
      role: 'poster_designer' as UserRole,
      avatar: '',
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa@example.com',
      role: 'video_editor' as UserRole,
      avatar: '',
    },
    {
      id: '6',
      name: 'Tom Wilson',
      email: 'tom@example.com',
      role: 'social_media_manager' as UserRole,
      avatar: '',
    },
    {
      id: '7',
      name: 'Emma Davis',
      email: 'emma@example.com',
      role: 'member' as UserRole,
      avatar: '',
    },
    {
      id: '8',
      name: 'David Kim',
      email: 'david@example.com',
      role: 'member' as UserRole,
      avatar: '',
    },
  ];

  // Filter members based on search query and selected role
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Format role for display
  const formatRole = (role: UserRole) => {
    return role.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // For demo - we'll create a mock handler for form submission
  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAddMemberOpen(false);
    // This would call your actual member creation logic
    alert('Member added successfully! (This is a demo)');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground">
            Manage club members and their roles
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
            <DialogTrigger asChild>
              <Button className="bg-digitek-600 hover:bg-digitek-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleAddMember}>
                <DialogHeader>
                  <DialogTitle>Add New Member</DialogTitle>
                  <DialogDescription>
                    Invite a new member to join the club
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter member's full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter member's email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select required defaultValue="member">
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="president">President</SelectItem>
                        <SelectItem value="vice_president">Vice President</SelectItem>
                        <SelectItem value="event_manager">Event Manager</SelectItem>
                        <SelectItem value="poster_designer">Poster Designer</SelectItem>
                        <SelectItem value="video_editor">Video Editor</SelectItem>
                        <SelectItem value="social_media_manager">Social Media Manager</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Profile Picture (Optional)</Label>
                    <Input id="avatar" type="file" accept="image/*" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddMemberOpen(false)} type="button">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-digitek-600 hover:bg-digitek-700">
                    Add Member
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
            placeholder="Search members..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-1/3 flex justify-end">
          <Select 
            value={selectedRole} 
            onValueChange={(value) => setSelectedRole(value as UserRole | 'all')}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>
                  {selectedRole === 'all' 
                    ? 'All Roles' 
                    : formatRole(selectedRole as UserRole)}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="president">President</SelectItem>
              <SelectItem value="vice_president">Vice President</SelectItem>
              <SelectItem value="event_manager">Event Manager</SelectItem>
              <SelectItem value="poster_designer">Poster Designer</SelectItem>
              <SelectItem value="video_editor">Video Editor</SelectItem>
              <SelectItem value="social_media_manager">Social Media Manager</SelectItem>
              <SelectItem value="member">Member</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-8 flex flex-col items-center">
              <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                No members found matching your filters
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRole('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredMembers.map(member => (
            <Card key={member.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-digitek-100 text-digitek-800">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{member.name}</CardTitle>
                      <CardDescription className="text-xs">{member.email}</CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Role</DropdownMenuItem>
                      <DropdownMenuItem>Assign Task</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Remove Member</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-4">
                <div className="flex justify-between items-center">
                  <Badge
                    className={
                      member.role === 'president' || member.role === 'vice_president'
                        ? 'bg-digitek-600'
                        : member.role === 'event_manager'
                          ? 'bg-blue-500'
                          : member.role === 'poster_designer' || member.role === 'video_editor'
                            ? 'bg-green-500'
                            : member.role === 'social_media_manager'
                              ? 'bg-orange-500'
                              : 'bg-gray-500'
                    }
                  >
                    {formatRole(member.role)}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Members;
