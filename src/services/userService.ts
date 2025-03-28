
import { User, PaginatedResponse } from '@/types/user';

const BASE_URL = 'https://reqres.in/api';

export const fetchUsers = async (page: number = 1): Promise<PaginatedResponse<User>> => {
  const response = await fetch(`${BASE_URL}/users?page=${page}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return response.json();
};

export const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  
  return response.json();
};

export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
};
