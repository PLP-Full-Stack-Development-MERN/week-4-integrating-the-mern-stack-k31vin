import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from '../api';

const TaskForm = () => {
const [taskData, setTaskData] = useState({
title: '',
description: '',
status: 'pending',
dueDate: ''
});
const [loading, setLoading] = useState(false);
const [isEdit, setIsEdit] = useState(false);
const navigate = useNavigate();
const { id } = useParams();

useEffect(() => {
if (id) {
    setIsEdit(true);
    fetchTask();
}
}, [id]);

const fetchTask = async () => {
try {
    setLoading(true);
    const { data } = await api.fetchTask(id);
    // Format date for input field
    const formattedDate = data.dueDate ? new Date(data.dueDate).toISOString().split('T')[0] : '';
    setTaskData({ ...data, dueDate: formattedDate });
} catch (error) {
    console.error('Error fetching task:', error);
} finally {
    setLoading(false);
}
};

const handleChange = (e) => {
setTaskData({ ...taskData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();
try {
    setLoading(true);
    if (isEdit) {
    await api.updateTask(id, taskData);
    } else {
    await api.createTask(taskData);
    }
    navigate('/');
} catch (error) {
    console.error('Error saving task:', error);
} finally {
    setLoading(false);
}
};

if (loading && isEdit) return <div className="text-center py-10">Loading...</div>;

return (
<div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
    <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Task' : 'Create New Task'}</h2>
    <form onSubmit={handleSubmit}>
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
        Title
        </label>
        <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title"
        type="text"
        name="title"
        value={taskData.title}
        onChange={handleChange}
        placeholder="Task title"
        required
        />
    </div>

    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
        Description
        </label>
        <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="description"
        name="description"
        value={taskData.description}
        onChange={handleChange}
        placeholder="Task description"
        rows="3"
        />
    </div>

    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
        Status
        </label>
        <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="status"
        name="status"
        value={taskData.status}
        onChange={handleChange}
        >
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
        </select>
    </div>

    <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
        Due Date
        </label>
        <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="dueDate"
        type="date"
        name="dueDate"
        value={taskData.dueDate}
        onChange={handleChange}
        />
    </div>

    <div className="flex items-center justify-between">
        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        disabled={loading}
        >
        {loading ? 'Saving...' : isEdit ? 'Update Task' : 'Create Task'}
        </button>
        <button
        type="button"
        onClick={() => navigate('/')}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
        Cancel
        </button>
    </div>
    </form>
</div>
);
};

export default TaskForm;

