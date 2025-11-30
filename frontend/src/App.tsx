import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { fetchTasks, createTask } from './api';
import type { Task } from './api';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await fetchTasks();
      if (Array.isArray(data)) {
        setTasks(data);
        setError('');
      } else {
        setError('Invalid data received from server.');
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to the server.');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTask({ title, description: description.trim() || undefined });
      setTitle('');
      setDescription('');
      load();
      setError('');
    } catch (err) {
      setError('Failed to create task. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>HMCTS Task Manager</h1>

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem', padding: '10px', background: '#ffebee' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '2rem' }}>
        <input
          aria-label="New Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          style={{ padding: '10px', fontSize: '1rem' }}
          required
        />
        <textarea
          aria-label="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description (optional)..."
          style={{ padding: '10px', fontSize: '1rem', minHeight: '60px', resize: 'vertical' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Add Task
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ 
            padding: '15px', 
            borderBottom: '1px solid #eee'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{task.title}</div>
            {task.description && (
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                {task.description}
              </p>
            )}
          </li>
        ))}
      </ul>

      {tasks.length === 0 && !error && (
        <p style={{ color: '#888', textAlign: 'center' }}>
          No tasks found. Use the form above to create one!
        </p>
      )}
    </div>
  );
}

export default App;