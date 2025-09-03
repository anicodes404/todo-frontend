'use client';

import React, { useState, useEffect } from 'react';
import type { Task } from '../lib/api';
import { getTasks, deleteTask, updateTask } from '../lib/api';
import ErrorMessage from './errorMessage';
import TaskItem from './taskItem';
import type { APIError } from '../lib/errors';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | APIError | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load tasks'));
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete task'));
      console.error('Error deleting task:', err);
    }
  }

  async function handleStatusUpdate(id: number, status: Task['status']) {
    try {
      const updatedTask = await updateTask(id, { status });
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update task'));
      console.error('Error updating task:', err);
    }
  }

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <ErrorMessage error={error} className="mb-4" />;

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Create one to get started!</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={() => handleDelete(task.id)}
            onStatusChange={(status) => handleStatusUpdate(task.id, status)}
          />
        ))
      )}
    </div>
  );
}
