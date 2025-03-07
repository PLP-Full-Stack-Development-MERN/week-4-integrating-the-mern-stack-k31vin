# MERN Task Manager

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Create, read, update, and delete tasks
- Filter tasks by status (Pending, In Progress, Completed)
- Responsive design with Tailwind CSS

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:

## install dependencies
2. Install dependencies:

## npm install
3. Create a `.env` file with the following variables:
## MONGO_URI = your_mongodb_connection_string
## PORT = 5000

4. Start the server
##  npm run dev

### Frontend Setup

1. Navigate to the frontend directory
## cd frontend

2. Install dependencies:
## npm install

3. Start the React application
## npm start

## API Documentation

### Base URL
`http://localhost:5000/api`

### Endpoints

#### GET /tasks
- Returns all tasks
- Response: Array of task objects

#### GET /tasks/:id
- Returns a specific task by ID
- Response: Task object

#### POST /tasks
- Creates a new task
- Request Body: `{ title, description, status, dueDate }`
- Response: Created task object

#### PUT /tasks/:id
- Updates a task by ID
- Request Body: `{ title, description, status, dueDate }`
- Response: Updated task object

#### DELETE /tasks/:id
- Deletes a task by ID
- Response: Success message

## Live Demo

#### - Frontend: [https://mern-task-manager.vercel.app](https://mern-task-manager.vercel.app)
#### - Backend API: [https://mern-task-manager-api.onrender.com/api](https://mern-task-manager-api.onrender.com/api)

## Testing the Application

### Backend API Testing with Postman:

#### Test GET /api/tasks
#### Test POST /api/tasks with a sample task
#### Test GET /api/tasks/:id with a valid ID
#### Test PUT /api/tasks/:id to update a task
#### Test DELETE /api/tasks/:id to remove a task


## Frontend Testing:

### Verify that tasks can be created via the form
### Confirm tasks display properly in the list
### Test the edit functionality
### Test the delete functionality
### Verify that task filtering works correctly
