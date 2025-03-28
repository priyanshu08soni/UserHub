import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="flex justify-center items-center pb-2">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
          <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="text-center">
        <h3 className="text-xl font-semibold">{user.first_name} {user.last_name}</h3>
        <p className="text-sm text-gray-500 mt-1">{user.email}</p>
      </CardContent>
      <CardFooter className="flex justify-center space-x-2 pb-4">
        <Button variant="outline" size="sm" onClick={onEdit} className="flex items-center">
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete} className="flex items-center">
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
