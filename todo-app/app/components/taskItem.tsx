'use client';

import { Task } from '../lib/api';

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
  onStatusChange: (status: Task['status']) => void;
}

export default function TaskItem({ task, onDelete, onStatusChange }: TaskItemProps) {
  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          {task.description && (
            <p className="text-gray-600 mt-1">{task.description}</p>
          )}
          <div className="flex items-center gap-4 mt-2">
            <span className={`px-2 py-1 rounded-full text-sm ${statusColors[task.status]}`}>
              {task.status.replace('_', ' ')}
            </span>
            {task.dueDate && (
              <span className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(e.target.value as Task['status'])}
            className="rounded border p-1 text-sm"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 p-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
