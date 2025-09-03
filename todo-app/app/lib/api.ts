import { APIError, handleAPIError } from './errors';

// Types for our Task data
export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  dueDate: string | null;
}

const API_BASE_URL = 'http://localhost:4000/api';

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    return handleAPIError(response);
  }
  try {
    return await response.json();
  } catch (error) {
    throw new APIError('Invalid JSON response from server', 500);
  }
}

// Helper function to make API requests
async function fetchWithError(
  url: string,
  options?: RequestInit
): Promise<Response> {
  try {
    return await fetch(url, options);
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new APIError(
        'Unable to connect to the server. Please check your internet connection.',
        503
      );
    }
    return handleAPIError(error);
  }
}

// Get all tasks
export async function getTasks(): Promise<Task[]> {
  const response = await fetchWithError(`${API_BASE_URL}/tasks`);
  return handleResponse<Task[]>(response);
}

// Get a single task by ID
export async function getTask(id: number): Promise<Task> {
  const response = await fetchWithError(`${API_BASE_URL}/tasks/${id}`);
  return handleResponse<Task>(response);
}

// Create a new task
export async function createTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
  const response = await fetchWithError(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Task>(response);
}

// Update a task
export async function updateTask(id: number, data: Partial<Task>): Promise<Task> {
  const response = await fetchWithError(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Task>(response);
}

// Delete a task
export async function deleteTask(id: number): Promise<void> {
  const response = await fetchWithError(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    return handleAPIError(response);
  }
}
