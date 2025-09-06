# SynergySphere

SynergySphere is an advanced team collaboration platform designed to streamline project management, task tracking, and communication. It features a robust backend API and a modern frontend interface.

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
