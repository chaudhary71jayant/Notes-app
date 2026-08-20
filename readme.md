# Notes App

A full-stack notes application built with React, Express, MongoDB, and JWT-based authentication. The JWT is stored in an HTTP-only cookie, so it is not exposed to frontend JavaScript.

## Live Demo

- Frontend: https://make-notes-nyn5.onrender.com/#/login
- Backend: https://notes-app-s5vv.onrender.com

## Features

- User signup, login, and logout
- HTTP-only cookie authentication with protected routes
- User profile management
- Notes CRUD: create, read, update, and delete
- Protected dashboard and password visibility toggle

## Project Structure

```text
Notes-app/
  Backend/
    server.js
    src/
  Frontend/
    notes-frontend/
      src/
```

## Local Setup

### Backend

1. Open a terminal in `Backend`.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `Backend/.env`:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=use_a_long_random_secret
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

The API runs at `http://localhost:3000`.

### Frontend

1. Open a second terminal in `Frontend/notes-frontend`.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

The frontend runs at `http://localhost:5173`. Its Vite proxy forwards `/api/v1` requests to the local backend.

## Render Deployment

Set the following environment variables in the **backend** Render service:

```env
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=use_a_long_random_secret
FRONTEND_URL=https://make-notes-nyn5.onrender.com
```

`FRONTEND_URL` can contain multiple comma-separated origins when local and deployed clients must both be allowed:

```env
FRONTEND_URL=http://localhost:5173,https://make-notes-nyn5.onrender.com
```

Set this environment variable in the **frontend** Render service:

```env
VITE_API_BASE_URL=https://notes-app-s5vv.onrender.com/api/v1
```

Redeploy after changing a Vite environment variable because it is included during the frontend build.

## Authentication

After login, the server stores the JWT in a `token` cookie with these settings:

- `HttpOnly` prevents JavaScript from reading it.
- `Secure` is enabled in production.
- `SameSite=None` allows the deployed frontend to send the cookie to the API.
- Axios uses `withCredentials: true` to include the cookie on protected requests.

Protected endpoints authenticate using the cookie; clients should not send an `Authorization` header or store the token in local storage.

## API Endpoints

Base URL: `/api/v1`

### Auth

- `POST /auth/login`
- `POST /auth/logout`

### Users

- `POST /users/signup`
- `GET /users/profile` - protected
- `PUT /users/update/:id` - protected
- `DELETE /users/delete/:id` - protected

### Notes

- `POST /notes` - protected
- `GET /notes` - protected
- `PUT /notes/:id` - protected
- `DELETE /notes/:id` - protected

## Tech Stack

- React + Vite
- Axios
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Token
- cookie-parser
