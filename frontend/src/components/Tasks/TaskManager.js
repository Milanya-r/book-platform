import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Ошибка получения задач:', error);
      }
    };
    fetchTasks();
  }, []);

  const createTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(prev => [...prev, response.data]);
      setNewTask({ title: '', description: '', dueDate: '' });
    } catch (error) {
      console.error('Ошибка создания задачи:', error);
    }
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
          </li>
        ))}
      </ul>
      {/* Форма для добавления задач */}
      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={e => setNewTask({ ...newTask, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={newTask.description}
        onChange={e => setNewTask({ ...newTask, description: e.target.value })}
      />
      <input
        type="date"
        value={newTask.dueDate}
        onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
      />
      <button onClick={createTask}>Add Task</button>
    </div>
  );
};

export default TaskManager;
