# Notes App

Full-stack notes application with:
- Backend: Node.js, Express, MongoDB, JWT auth
- Frontend: React + Vite

## Project Structure

```text
Notes-app/
  Backend/
    server.js
    .env
    src/
      config/
      controllers/
      middlewares/
      models/
      routes/
  Frontend/
    notes-frontend/
      src/
```

## Features

- User signup and login
- JWT-based protected routes
- User profile endpoint
- Notes CRUD (create, read, update, delete)
- Frontend auth flow with protected dashboard
- Show/hide password toggle on login and signup forms

## Backend Setup

1. Open terminal in:
   - `Backend`
2. Install dependencies:
   - `npm install`
3. Create `.env`:
   - `PORT=3000`
   - `MONGODB_URI=your_mongodb_connection_string`
   - `JWT_SECRET_KEY=your_secret_key`
4. Start backend:
   - `npm start`

Backend runs on: `http://localhost:3000`

## Frontend Setup

1. Open terminal in:
   - `Frontend/notes-frontend`
2. Install dependencies:
   - `npm install`
3. Start frontend:
   - `npm run dev`

Frontend runs on Vite dev server (usually `http://localhost:5173`).

Note:
- Vite is configured to proxy `/api/v1` to `http://localhost:3000`.
- You can also set a custom API URL with `VITE_API_BASE_URL`.

## API Base URL

`/api/v1`

## Main API Endpoints

### Auth
- `POST /api/v1/auth/login`

### Users
- `POST /api/v1/users/signup`
- `GET /api/v1/users/profile` (protected)
- `PUT /api/v1/users/update/:id` (protected)
- `DELETE /api/v1/users/delete/:id` (protected)

### Notes
- `POST /api/v1/notes` (protected)
- `GET /api/v1/notes` (protected)
- `PUT /api/v1/notes/:id` (protected)
- `DELETE /api/v1/notes/:id` (protected)

## Auth Header Format

For protected routes, send:

```http
Authorization: Bearer <your_jwt_token>
```

## Quick Run Order

1. Start backend first (`Backend`): `npm start`
2. Start frontend second (`Frontend/notes-frontend`): `npm run dev`
3. Open frontend URL, signup, login, and manage notes

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- React
- React Router
- Axios
- Vite
