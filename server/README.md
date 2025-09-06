# SynergySphere Backend

Advanced Team Collaboration Platform - Production-Ready Backend API

## Features

- 🔐 **JWT Authentication** with role-based access control (Admin, Manager, Member)
- 📦 **MongoDB** with Mongoose ODM
- 🎯 **RESTful API** with comprehensive endpoints
- 📝 **Swagger/OpenAPI** documentation
- ✅ **Input Validation** with Zod
- 🔒 **Security** with Helmet, CORS, and rate limiting
- 📊 **Logging** with Winston and Morgan
- 🧪 **Testing** with Jest and Supertest
- 🚀 **TypeScript** for type safety

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Zod
- **Documentation**: Swagger/OpenAPI
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
cd synergysphere-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start MongoDB (if running locally):
```bash
mongod
```

### Running the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm run build
npm start
```

#### Seed Database
```bash
npm run seed
```

This creates test accounts:
- **Admin**: admin@synergysphere.com / Admin123!
- **Manager**: manager@synergysphere.com / User123!
- **Member**: member@synergysphere.com / User123!

### API Documentation

Once the server is running, access the Swagger documentation at:
```
http://localhost:4000/docs
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - List user's projects
- `GET /api/projects/:id` - Get project details
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add member
- `PATCH /api/projects/:id/members/:userId` - Update member role
- `DELETE /api/projects/:id/members/:userId` - Remove member
- `GET /api/projects/:id/activity` - Get project activity

### Tasks
- `POST /api/projects/:projectId/tasks` - Create task
- `GET /api/projects/:projectId/tasks` - List project tasks
- `GET /api/tasks/:id` - Get task details
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Threads & Messages
- `POST /api/projects/:projectId/threads` - Create thread
- `GET /api/projects/:projectId/threads` - List threads
- `GET /api/threads/:id` - Get thread details
- `POST /api/threads/:id/messages` - Post message
- `GET /api/threads/:id/messages` - Get messages
- `DELETE /api/messages/:id` - Delete message

### Notifications
- `GET /api/notifications` - List notifications
- `PATCH /api/notifications/:id/read` - Mark as read
- `PATCH /api/notifications/read-all` - Mark all as read

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

Watch mode:
```bash
npm run test:watch
```

## cURL Examples

See `scripts/curl-examples.sh` for comprehensive API usage examples.

Quick examples:

```bash
# Register user
curl -X POST "http://localhost:4000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"Pass123!"}'

# Login
curl -X POST "http://localhost:4000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Pass123!"}'

# Create project (with token)
curl -X POST "http://localhost:4000/api/projects" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Project","description":"Project description"}'
```

## Project Structure

```
src/
├── app.ts              # Express app configuration
├── server.ts           # Server entry point
├── config/             # Configuration files
├── controllers/        # Route controllers
├── middlewares/        # Custom middlewares
├── models/            # Mongoose models
├── repositories/      # Data access layer
├── routes/            # API routes
├── services/          # Business logic
├── utils/             # Utility functions
├── validators/        # Input validation schemas
├── docs/              # API documentation
├── seed/              # Database seeders
└── tests/             # Test files
```

## Security

- Password hashing with bcrypt
- JWT tokens for authentication
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Helmet for security headers

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment (development/production/test) | development |
| PORT | Server port | 4000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/synergysphere |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRES_IN | JWT expiration time | 7d |
| RATE_LIMIT_WINDOW_MS | Rate limit window | 900000 |
| RATE_LIMIT_MAX_REQUESTS | Max requests per window | 100 |

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
