# SynergySphere

SynergySphere is an advanced team collaboration platform designed to streamline project management, task tracking, and communication. It features a robust backend API and a modern frontend interface.

## The Challenge

SynergySphere – Advanced Team Collaboration Platform

Build a desktop- and mobile-ready collaboration system that acts as a central nervous system for teams. It should streamline core workflows (tasks, projects, communication) and work proactively to surface risks early so teams stay ahead, not react.

## Overall Vision

Teams do their best work when tools fit how they think, communicate, and move together. SynergySphere aims to be an intelligent backbone that helps teams stay organized, aligned, and continuously improving.

## Mission

Deliver an MVP that enables fast, reliable task management and team communication across devices, with a clean, responsive UI and efficient data handling.

## Target User Pain Points

- Scattered information: files, chats, and decisions spread across tools
- Unclear progress: poor visibility into task and project status
- Resource overload/confusion: uneven workload and unclear ownership
- Deadline surprises: delays discovered too late; surface risks early
- Communication gaps: missed updates and buried conversations

## MVP Scope (Must Haves)

- User registration and login
- Create and manage projects
- Add team members to projects
- Assign tasks with due dates and statuses (To-Do, In Progress, Done)
- Project-specific threaded discussions
- Visualize task progress clearly
- Basic notifications for key events
- Responsive UI for mobile and desktop

## Mobile MVP Wireframes (Concept)

- Login/Sign Up
  - Email, password; Sign Up and Forgot Password links
- Project List/Dashboard
  - List of member projects; create new project
- Project Detail
  - Hub for a selected project; access tasks/threads
- Task List/Board
  - Simple list or cards with title, assignee, due date; add task
- Task Creation
  - Title, description, assignee (project members), due date; Save/Cancel
- Task Detail
  - Full details with editable status, assignee, due date
- Profile/Settings
  - Name, email, logout, basic notification preference

## Desktop MVP (Command Center)

- Broader overview of project activity and progress
- Easier data entry for detailed descriptions and bulk edits
- Threaded discussions and notifications surfaced contextually
- Fully responsive layouts shared with mobile

## Data & Performance

- Efficient data models for projects, users, tasks, and threads
- Pagination and indexing for responsiveness (MongoDB/Mongoose)
- JWT auth with role-based access (Admin, Manager, Member)

## Team

- Rhydam — Team Lead, Frontend
- Aarushi — Tester & ML
- Karan — Backend
- Nisha — UI/UX

## Features

- **Frontend**: Built with React, TailwindCSS, and Vite for a fast and responsive user experience.
- **Backend**: RESTful API with Node.js, Express, and MongoDB.
- **Authentication**: Secure JWT-based authentication with role-based access control (Admin, Manager, Member).
- **Real-Time Collaboration**: Threads, messages, and notifications for seamless communication.
- **Project Management**: Create, update, and manage projects, tasks, and team members.
- **Testing**: Comprehensive unit and integration tests using Jest and Supertest.
- **Documentation**: Swagger/OpenAPI for API documentation.

## Tech Stack

### Frontend

- **Framework**: React
- **Styling**: TailwindCSS
- **Build Tool**: Vite

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **Testing**: Jest, Supertest
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 20 or higher
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd SynergySphere
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Set up environment variables for the backend:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start MongoDB (if running locally):
   ```bash
   mongod
   ```

### Running the Application

#### Frontend

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

#### Backend

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Seed Database

Run the following command to seed the database with test accounts:

```bash
npm run seed
```

Test accounts:

- **Admin**: admin@synergysphere.com / Admin123!
- **Manager**: manager@synergysphere.com / User123!
- **Member**: member@synergysphere.com / User123!

## API Documentation

Access the Swagger documentation for the backend API at:

```
http://localhost:4000/docs
```

## Project Structure

### Frontend

```
client/
├── src/
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility libraries
│   ├── pages/            # Page components
│   ├── routes/           # Route definitions
│   ├── store/            # State management
│   └── main.jsx          # Entry point
```

### Backend

```
server/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Custom middlewares
│   ├── models/           # Mongoose models
│   ├── repositories/     # Data access layer
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   ├── validators/       # Input validation schemas
│   └── tests/            # Test files
```

## Testing

### Frontend

Run tests:

```bash
npm test
```

### Backend

Run tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository.
