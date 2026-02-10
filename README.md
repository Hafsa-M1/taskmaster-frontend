# TaskMaster – Frontend

**Personal Task & Time Tracker**
A clean, modern React + TypeScript frontend for creating tasks, tracking time spent, and viewing productivity insights.

Built as part of ANKA Technologies Full-Stack Development Assignment.

---

## Technologies Used

* React 18 + TypeScript
* Vite (build tool)
* Tailwind CSS v3
* React Router v6
* Axios (for API calls)
* Context API (for authentication & global state)

---

## Setup Instructions (Local Development)

1. **Clone the repository**

   ```bash
   git clone https://github.com/Hafsa-M1/taskmaster-frontend.git
   cd taskmaster-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file** in the root (or copy `.env.example` if present)
   Add the following:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will open at [http://localhost:5173](http://localhost:5173) (or the port shown in terminal).

5. **Build for production** (optional)

   ```bash
   npm run build
   npm run preview
   ```

---

## Environment Variables

| Variable       | Description                                                                           |
| -------------- | ------------------------------------------------------------------------------------- |
| `VITE_API_URL` | Base URL of the backend API (default: [http://localhost:3000](http://localhost:3000)) |

**Important Notes:**

* The backend server must be running at `http://localhost:3000`.
* CORS must be enabled on the backend to allow requests from this frontend origin.

---

## Core Features Implemented

* Modern landing page with intuitive UX
* User registration & login forms
* Protected dashboard route
* Responsive design using Tailwind CSS

---

## API Endpoints (Frontend Usage)

> Note: The frontend uses Axios to call these endpoints. Backend must be running.

| Endpoint         | Method | Description                             |
| ---------------- | ------ | --------------------------------------- |
| `/auth/register` | POST   | Register a new user                     |
| `/auth/login`    | POST   | Login existing user                     |
| `/tasks`         | GET    | Fetch all tasks for logged-in user      |
| `/tasks`         | POST   | Create a new task                       |
| `/tasks/:id`     | PUT    | Update a task by ID                     |
| `/tasks/:id`     | DELETE | Delete a task by ID                     |
| `/time-tracking` | POST   | Start/stop task timer                   |
| `/dashboard`     | GET    | Fetch dashboard data (tasks & insights) |

---

**Tip:** Keep `.env` secure and do not push sensitive credentials to the repository.


