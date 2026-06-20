# Mini Project Management Portal

A responsive task management portal with a React frontend and an Express/MySQL backend. The app supports JWT login, task creation, completion, deletion, search, filtering, pagination, sorting, dashboard statistics, loading states, empty states, and a dark mode toggle.

## Folder Structure

```text
project-root/
frontend/
├─ src/
├─ components/
├─ pages/
└─ services/
backend/
├─ routes/
├─ controllers/
├─ models/
└─ config/
```

## Setup Steps

1. Clone the repository.
2. Run `npm install` from the project root.
3. Create `backend/.env` from `backend/.env.example` and set your MySQL credentials and JWT secret.
4. Import `backend/sql/schema.sql` into MySQL.
5. Start both apps with `npm start`.

## Assumptions

- Tasks are scoped to the logged-in user.
- MySQL is available locally or remotely before starting the backend.
- The frontend talks to the backend through `VITE_API_URL`, which defaults to `http://localhost:4000/api`.
- Completing a task updates its status to `Completed`.

## API Documentation

Base URL: `/api`

### Auth

- `POST /auth/register` - Register a new user.
- `POST /auth/login` - Log in and receive a JWT.
- `GET /auth/me` - Get the current authenticated user.

### Tasks

- `GET /tasks` - List tasks with optional `search`, `status`, `page`, `limit`, `sort`, and `order` query parameters.
- `GET /tasks/stats` - Return dashboard statistics.
- `POST /tasks` - Create a new task.
- `PATCH /tasks/:id/complete` - Mark a task as completed.
- `DELETE /tasks/:id` - Delete a task.

## Example Commit Messages

- Initial project setup
- Implemented task APIs
- Added React Dashboard
- Integrated frontend with backend
- Updated README
