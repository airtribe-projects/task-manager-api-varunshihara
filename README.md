# Task Manager API

A simple in-memory Task Manager API built with Express.js for Airtribe's Backend Engineering Launchpad Assignment 1.

## Overview
This project provides a RESTful API to manage tasks, supporting CRUD operations, filtering, sorting, and priority levels. All data is stored in memory (no database).

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the server:**
   ```sh
   node app.js
   ```
   Or for development with auto-reload:
   ```sh
   npm run dev
   ```
4. **Run tests:**
   ```sh
   npm test
   ```

The server runs on [http://localhost:3000](http://localhost:3000) by default.

## API Endpoints

### 1. Get All Tasks
- **GET /tasks**
- **Query Parameters:**
  - `completed` (optional): `true` or `false` to filter by completion status
  - `sort` (optional): `createdAt` to sort by creation date
- **Example:**
  ```sh
  curl http://localhost:3000/tasks?completed=true&sort=createdAt
  ```

### 2. Get Task by ID
- **GET /tasks/:id**
- **Example:**
  ```sh
  curl http://localhost:3000/tasks/1
  ```

### 3. Get Tasks by Priority
- **GET /tasks/priority/:level**
- **Path Parameter:**
  - `level`: `low`, `medium`, or `high`
- **Example:**
  ```sh
  curl http://localhost:3000/tasks/priority/high
  ```

### 4. Create a Task
- **POST /tasks**
- **Body:**
  ```json
  {
    "title": "Create a new project",
    "description": "Create a new project using Magic",
    "completed": false,
    "priority": "medium"
  }
  ```
- **Example:**
  ```sh
  curl -X POST http://localhost:3000/tasks \
    -H "Content-Type: application/json" \
    -d '{"title":"Create a new project","description":"Create a new project using Magic","completed":false,"priority":"medium"}'
  ```

### 5. Update a Task
- **PUT /tasks/:id**
- **Body:** Same as POST /tasks
- **Example:**
  ```sh
  curl -X PUT http://localhost:3000/tasks/1 \
    -H "Content-Type: application/json" \
    -d '{"title":"Updated title","description":"Updated desc","completed":true,"priority":"high"}'
  ```

### 6. Delete a Task
- **DELETE /tasks/:id**
- **Example:**
  ```sh
  curl -X DELETE http://localhost:3000/tasks/1
  ```

## Task Schema
```json
{
  "id": 2,
  "title": "Create a new project",
  "description": "Create a new project using Magic",
  "completed": false,
  "priority": "medium",
  "createdAt": "2025-07-08T12:00:00.000Z"
}
```

## Notes
- All data is lost when the server restarts.
- Only Node.js v18+ is supported.

---

**Author:** Airtribe
