import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from '@/components/UserCard';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import FilterDropdown from '@/components/FilterDropdown';
import { toast } from "@/hooks/use-toast";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUser } from '@/services/userService';
import { Loader2 } from 'lucide-react';


interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
const formSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
});
type FormData = z.infer<typeof formSchema>;
interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    fetchUsers(currentPage);
  }, [currentPage, navigate]);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
    },
  });
  useEffect(() => {
    if (selectedUser && isEditDialogOpen) {
      form.reset({
        first_name: selectedUser.first_name,
        last_name: selectedUser.last_name,
        email: selectedUser.email,
      });
    }
  }, [selectedUser, isEditDialogOpen, form]);
  useEffect(() => {
    if (users.length) {
      let result = [...users];
      if (searchTerm) {
        result = result.filter(user => 
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (filterCriteria !== 'all') {
        result.sort((a, b) => {
          switch (filterCriteria) {
            case 'first_name':
              return a.first_name.localeCompare(b.first_name);
            case 'last_name':
              return a.last_name.localeCompare(b.last_name);
            case 'email':
              return a.email.localeCompare(b.email);
            default:
              return 0;
          }
        });
      }
      setFilteredUsers(result);
    }
  }, [users, searchTerm, filterCriteria]);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data: ApiResponse = await response.json();
      setUsers(data.data);
      setFilteredUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError('Failed to fetch users');
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilter = (filter: string) => {
    setFilterCriteria(filter);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (userId: number) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(users.filter(user => user.id !== userId));
      toast({
        title: "Success",
        description: "User deleted successfully!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    }
  };
  const handleUpdate = async (data: FormData) => {
    if (!selectedUser) return;
    
    setSubmitting(true);
    try {
      await updateUser(selectedUser.id, data);
      
      // Update the user in the local state
      setUsers(users.map(user => {
        if (user.id === selectedUser.id) {
          return { ...user, ...data };
        }
        return user;
      }));
      
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <main>

      <h1 className="text-3xl font-bold mb-8 text-center">User Management</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <SearchBar onSearch={handleSearch} />
        <FilterDropdown onFilter={handleFilter} />
      </div>
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
        ) : (
          <>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No users found matching your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map(user => (
                <UserCard 
                  key={user.id}
                  user={user}
                  onEdit={() => handleEdit(user)}
                  onDelete={() => handleDelete(user.id)}
                  />
                  ))}
            </div>
          )}
          {!searchTerm && (
            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            />
            )}
        </>
      )}
      </main>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to the user's information.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={submitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={submitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" disabled={submitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
