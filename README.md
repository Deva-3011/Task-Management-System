# Mini Project Management Portal

A responsive task management portal with a React frontend and an Express/MySQL backend. The app supports JWT login, task creation, completion, deletion, search, filtering, pagination, sorting, dashboard statistics, loading states, empty states, and a dark mode toggle.

## Features

✓ User Authentication (JWT)  
✓ Task Management (Create, Read, Update, Delete)  
✓ Real-time Dashboard with Statistics  
✓ Search & Filter by Status  
✓ Pagination & Sorting  
✓ Dark Mode Toggle  
✓ Responsive Design (Mobile, Tablet, Desktop)  
✓ User-Scoped Tasks (Each user sees only their tasks)  

## Folder Structure

```text
project-root/
├── frontend/              # React + Vite app
│   ├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components (Dashboard, Login, etc.)
│   ├── services/          # API service calls
│   └── context/           # React context (Auth, Theme)
└── backend/               # Express + MySQL app
    ├── src/
    ├── config/            # Environment & DB config
    ├── models/            # Data models (User, Task)
    ├── controllers/       # Request handlers
    ├── routes/            # API routes
    ├── middleware/        # Auth & error handling
    ├── utils/             # Validation & utilities
    └── tests/             # Unit tests
```

## Setup Steps

### 1. Prerequisites

- Node.js 16+ installed
- MySQL 5.7+ installed and running locally
- Git configured

### 2. Clone & Install

```bash
git clone <your-repo-url>
cd "Task Management System"
npm install
```

### 3. Configure MySQL

**Option A: Using MySQL CLI**

```bash
# Log in to MySQL
mysql -u root -p

# Create the database and tables
SOURCE backend/sql/schema.sql;

# Exit MySQL
EXIT;
```

**Option B: Using MySQL Workbench**

1. Open MySQL Workbench
2. Open a new SQL query tab
3. Copy and paste contents of `backend/sql/schema.sql`
4. Execute the script

### 4. Configure Backend Environment

Create `backend/.env` from the example:

```bash
cp backend/.env.example backend/.env
```

Then edit `backend/.env` with your MySQL credentials:

```env
PORT=4000
JWT_SECRET=your-secret-key-here-use-a-random-string
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_NAME=task_portal
DB_CONNECTION_LIMIT=10
```

### 5. Start the Services

Run both frontend and backend together:

```bash
npm start
```

Or run them separately:

```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd frontend
npm start
```

### 6. Access the Application

- **Frontend**: http://localhost:5173/
- **Backend API**: http://localhost:4000/api
- **Health Check**: http://localhost:4000/api/health

## Testing the App

1. Visit http://localhost:5173/ to see the landing page
2. Click "Get Started Free" and register a new account
3. Log in with your credentials
4. Create tasks on the Add Task page
5. View, filter, search, and manage tasks on the Dashboard
6. Toggle dark mode with the button in the navbar

## Database Schema

### Users Table
```sql
id (INT, Primary Key)
email (VARCHAR, Unique)
password_hash (VARCHAR)
created_at (TIMESTAMP)
```

### Tasks Table
```sql
id (INT, Primary Key)
user_id (INT, Foreign Key → users.id)
title (VARCHAR, Required)
description (TEXT, Min 20 chars)
status (VARCHAR: Pending, In Progress, Completed)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

## API Documentation

### Base URL
```
http://localhost:4000/api
```

### Authentication Endpoints

#### Register
```
POST /auth/register
Body: { email, password }
Response: { token, user: { id, email } }
```

#### Login
```
POST /auth/login
Body: { email, password }
Response: { token, user: { id, email } }
```

#### Get Current User
```
GET /auth/me
Headers: Authorization: Bearer <token>
Response: { user: { id, email, created_at } }
```

### Task Endpoints

#### List Tasks
```
GET /tasks?search=<term>&status=<status>&page=<n>&limit=<n>&order=<ASC|DESC>
Headers: Authorization: Bearer <token>
Response: { tasks: [...], pagination: { page, limit, total, totalPages } }
```

**Query Parameters:**
- `search`: Search in title and description
- `status`: Filter by status (Pending, In Progress, Completed)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `order`: ASC or DESC (default: DESC)

#### Get Dashboard Stats
```
GET /tasks/stats
Headers: Authorization: Bearer <token>
Response: { stats: { totalTasks, pendingTasks, inProgressTasks, completedTasks } }
```

#### Create Task
```
POST /tasks
Headers: Authorization: Bearer <token>
Body: { title, description, status }
Response: { task: { id, title, description, status, created_at, updated_at } }
```

**Validation:**
- `title`: Required, non-empty
- `description`: Required, minimum 20 characters
- `status`: Required, must be "Pending" or "In Progress"

#### Mark Task Complete
```
PATCH /tasks/:id/complete
Headers: Authorization: Bearer <token>
Response: { message: "Task marked as completed." }
```

#### Delete Task
```
DELETE /tasks/:id
Headers: Authorization: Bearer <token>
Response: { message: "Task deleted successfully." }
```

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios (HTTP client)
- Bootstrap 5 (CSS framework)
- Vite (Build tool)

**Backend:**
- Node.js + Express
- MySQL 2 (Database driver)
- JWT (Authentication)
- bcryptjs (Password hashing)
- Vitest (Testing)

## Project Assumptions

- Tasks are scoped to the logged-in user (each user only sees their own tasks)
- JWT tokens expire after 7 days
- Completing a task updates its status to "Completed"
- Passwords are hashed with bcryptjs before storage
- All API responses are JSON
- CORS is enabled to allow frontend-backend communication
- Frontend API URL can be configured via `VITE_API_URL` env variable (defaults to `http://localhost:4000/api`)

## Example Workflow

1. **User registers** → Email and password stored in MySQL with hashed password
2. **User logs in** → Backend validates credentials and issues JWT token
3. **User creates task** → Task stored in MySQL with user_id reference
4. **User views dashboard** → Backend returns only tasks belonging to that user
5. **User filters/searches** → Backend applies filters and returns paginated results
6. **User completes task** → Backend updates task status to "Completed"
7. **User deletes task** → Backend removes task from database

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (both frontend and backend)
npm start

# Run backend tests
npm test

# Build for production
npm run build

# Backend only
cd backend
npm run dev          # Dev mode with nodemon
npm start            # Production mode
npm test             # Run Vitest

# Frontend only
cd frontend
npm run dev          # Dev server with hot reload
npm run build        # Production build
```

## Troubleshooting

### Backend Error: "Access denied for user 'root'@'localhost'"
**Solution:** Check that MySQL is running and update `backend/.env` with correct database credentials.

### Frontend Cannot Connect to API
**Solution:** Ensure backend is running on port 4000 and `VITE_API_URL` is set correctly.

### Tests Fail
**Solution:** Run `npm install` again to ensure all dependencies are installed correctly.

### Port Already in Use
**Solution:** Change the port in `.env` (backend) or `vite.config.js` (frontend), or kill the process using the port.

## Git Commit Examples

```bash
git commit -m "Initial project setup"
git commit -m "Implemented task APIs"
git commit -m "Added React Dashboard"
git commit -m "Integrated frontend with backend"
git commit -m "Updated README"
```

## Future Enhancements

- User profile management
- Task priorities and categories
- Task assignments and sharing
- Email notifications
- File attachments on tasks
- Recurring tasks
- Task comments/notes
- Export tasks to CSV/PDF

## License

MIT
