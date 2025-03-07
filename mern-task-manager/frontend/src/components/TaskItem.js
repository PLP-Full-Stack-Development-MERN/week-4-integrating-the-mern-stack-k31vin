import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task, onDelete }) => {
// Formating date to be more readable
const formatDate = (dateString) => {
if (!dateString) return 'No due date';
const options = { year: 'numeric', month: 'long', day: 'numeric' };
return new Date(dateString).toLocaleDateString(undefined, options);
};

// Define status badge colors
const getStatusColor = (status) => {
switch (status) {
    case 'pending':
    return 'bg-yellow-100 text-yellow-800';
    case 'in progress':
    return 'bg-blue-100 text-blue-800';
    case 'completed':
    return 'bg-green-100 text-green-800';
    default:
    return 'bg-gray-100 text-gray-800';
}
};

return (
<div className="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-blue-500">
    <div className="flex justify-between items-start">
    <div>
        <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
        <p className="text-gray-600 mb-3">{task.description || 'No description provided'}</p>
        <div className="flex items-center space-x-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
        <span className="text-sm text-gray-500">
            Due: {formatDate(task.dueDate)}
        </span>
        </div>
    </div>
    <div className="flex space-x-2">
        <Link 
        to={`/edit/${task._id}`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline text-sm"
        >
        Edit
        </Link>
        <button 
        onClick={() => onDelete(task._id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline text-sm"
        >
        Delete
        </button>
    </div>
    </div>
</div>
);
};

export default TaskItem;
