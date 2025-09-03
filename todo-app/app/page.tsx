'use client';

import TaskList from './components/taskList';
import TaskForm from './components/taskForm';

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Todo App</h1>
      <TaskForm onTaskCreated={() => {
        // This will trigger a re-fetch in the TaskList component
        window.location.reload();
      }} />
      <TaskList />
    </main>
  )
}
