const API_URL = 'http://localhost:3000';

// Task interface
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
}

// Get tasks
export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${API_URL}/tasks`);
  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return res.json();
};

// Create task
export const createTask = async (task: { title: string; description?: string }) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    throw new Error('Failed to create task');
  }
  return res.json();
};