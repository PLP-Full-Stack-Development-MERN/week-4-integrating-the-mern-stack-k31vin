import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
return (
<BrowserRouter>
    <div className="min-h-screen bg-gray-100">
    <div className="container mx-auto py-8 px-4">
        <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<TaskForm />} />
        <Route path="/edit/:id" element={<TaskForm />} />
        </Routes>
    </div>
    </div>
</BrowserRouter>
);
}

export default App;