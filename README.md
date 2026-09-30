# Exercise Tracker

A full-stack MERN single-page app for logging workouts. You can create, view, edit, and delete exercises. It's backed by a REST API built with Express and MongoDB.

## Tech Stack

- **Backend:** Node.js, Express, Mongoose, MongoDB
- **Frontend:** React 18, React Router, Vite

## Features

- REST API with full CRUD for exercises
- Request validation, with `400` for bad input and `404` for unknown IDs
- React SPA with separate pages for listing, creating, and editing exercises
- Vite dev server proxies API requests to the Express backend

## Project Structure

```
exercises_controller.mjs    Express routes and request validation
exercises_model.mjs         Mongoose schema and database functions
robyd_react/robyd_react/    React frontend (Vite)
  src/pages/                Home, Create, and Edit pages
  src/components/           Exercise table, row, and navigation
```

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Run the backend

Copy `.env.example` to `.env` in the project root and fill in your values:

```
MONGODB_CONNECT_STRING=mongodb+srv://<user>:<password>@<cluster>/
PORT=3000
```

Then install dependencies and start the server:

```bash
npm install
npm start
```

### 2. Run the frontend

In a second terminal:

```bash
cd robyd_react/robyd_react
npm install
npm run dev
```

Open http://localhost:5173. The dev server forwards `/exercises` requests to the backend on port 3000.

## API

| Method | Endpoint          | Description           | Success |
|--------|-------------------|-----------------------|---------|
| POST   | `/exercises`      | Create an exercise    | 201     |
| GET    | `/exercises`      | List all exercises    | 200     |
| GET    | `/exercises/:_id` | Get one exercise      | 200     |
| PUT    | `/exercises/:_id` | Replace an exercise   | 200     |
| DELETE | `/exercises/:_id` | Delete an exercise    | 204     |

Example request body for POST and PUT:

```json
{
  "name": "Squat",
  "reps": 10,
  "weight": 135,
  "unit": "lbs",
  "date": "09-30-26"
}
```

Validation rules:
- `name` must be a non-empty string.
- `reps` and `weight` must be positive integers.
- `unit` must be `lbs` or `kgs`.
- `date` must use the `MM-DD-YY` format.
- The body must contain exactly these five fields.

## Author

Roby Matta
