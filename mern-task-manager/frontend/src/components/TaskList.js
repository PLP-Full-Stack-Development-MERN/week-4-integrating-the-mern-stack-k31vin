import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';
import * as api from '../api';

const TaskList = () => {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [filter, setFilter] = useState('all');

useEffect(() => {
fetchTasks();
}, []);

const fetchTasks = async () => {
try {
    setLoading(true);
    const { data } = await api.fetchTasks();
    setTasks(data);
    setError(null);
} catch (error) {
    console.error('Error fetching tasks:', error);
    setError('Failed to fetch tasks. Please try again later.');
} finally {
    setLoading(false);
}
};

const handleDeleteTask = async (id) => {
if (window.confirm('Are you sure you want to delete this task?')) {
    try {
    await api.deleteTask(id);
    setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
    console.error('Error deleting task:', error);
    }
}
};

const filteredTasks = filter === 'all' 
? tasks 
: tasks.filter(task => task.status === filter);

if (loading && tasks.length === 0) {
return <div className="text-center py-10">Loading tasks...</div>;
}

return (
<div className="max-w-4xl mx-auto p-4">
    <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold">Task Manager</h1>
    <Link 
        to="/create" 
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
        Add New Task
    </Link>
    </div>

    {error && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
    </div>
    )}

    <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2">Filter by Status:</label>
    <div className="flex space-x-2">
        <button 
        className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter('all')}
        >
        All
        </button>
        <button 
        className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter('pending')}
        >
        Pending
        </button>
        <button 
        className={`px-4 py-2 rounded ${filter === 'in progress' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter('in progress')}
        >
        In Progress
        </button>
        <button 
        className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        onClick={() => setFilter('completed')}
        >
        Completed
        </button>
    </div>
    </div>

    {filteredTasks.length > 0 ? (
    filteredTasks.map(task => (
        <TaskItem 
        key={task._id} 
        task={task} 
        onDelete={handleDeleteTask} 
        />
    ))
    ) : (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">
        {tasks.length > 0 
            ? `No ${filter !== 'all' ? filter : ''} tasks found.` 
            : 'No tasks yet. Create your first task!'}
        </p>
    </div>
    )}
</div>
);
};

export default TaskList;