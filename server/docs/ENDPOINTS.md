# SynergySphere API - Consolidated Endpoints

Base URL: `http://localhost:4000`
API Base: `/api`
Docs (Swagger UI): `/docs`

Auth: Send `Authorization: Bearer <accessToken>` header for protected routes.
Content-Type: `application/json` unless noted.

Error shape:

```json
{
  "error": "Message",
  "statusCode": 400
}
```

---

## Auth

POST `/api/auth/register`

- Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Passw0rd!"
}
```

- 201 Response (data excerpt):

```json
{
  "success": true,
  "data": {
    "user": { "_id": "...", "name": "John Doe", "email": "john@example.com", "roles": ["member"] },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

POST `/api/auth/login`

- Body:

```json
{ "email": "john@example.com", "password": "Passw0rd!" }
```

- 200 Response: same shape as register

GET `/api/auth/me` (auth)

- 200 Response: `data` is current user

POST `/api/auth/forgot-password`

- Body: `{ "email": "john@example.com" }`
- 200 Response: `{ "success": true, "message": "Password reset instructions sent to email" }`

POST `/api/auth/reset-password`

- Body:

```json
{ "token": "<token-from-email>", "password": "NewPassw0rd!" }
```

- 200 Response: `{ "success": true, "message": "Password reset successful" }`

---

## Users

GET `/api/users` (auth)

- 200 Response: `data` is array of users (passwordHash omitted)

---

## Projects

POST `/api/projects` (auth)

- Body:

```json
{ "name": "Alpha Project", "description": "Our first MVP project" }
```

- 201 Response: `data` is created project

GET `/api/projects` (auth)

- 200 Response: list of projects where requester is owner/member

GET `/api/projects/:id` (auth)

- 200 Response: project details

PATCH `/api/projects/:id` (auth, owner only)

- Body (any subset):

```json
{ "name": "New Name", "description": "Updated" }
```

- 200 Response: updated project

DELETE `/api/projects/:id` (auth, owner only)

- 200 Response: `{ "success": true }`

POST `/api/projects/:id/members` (auth, owner only)

- Body:

```json
{ "userId": "<userId>", "role": "manager|member" }
```

- 200 Response: updated project with members

PATCH `/api/projects/:id/members/:userId` (auth, owner only)

- Body: `{ "role": "manager|member" }`
- 200 Response: updated project

DELETE `/api/projects/:id/members/:userId` (auth, owner only)

- 200 Response: updated project

GET `/api/projects/:id/activity` (auth, project member)

- 200 Response: array of activity items

---

## Tasks

POST `/api/projects/:projectId/tasks` (auth, project member)

- Body (minimum): `{ "title": "Design Login Page" }`
- Optional: `description`, `assignee`, `status` (todo|in_progress|done), `dueDate` (ISO), `priority` (low|medium|high)
- 201 Response: created task

GET `/api/projects/:projectId/tasks` (auth)

- Query (optional): `status`, `assignee`
- 200 Response: array of tasks

GET `/api/tasks/:id` (auth)

- 200 Response: task

PATCH `/api/tasks/:id` (auth)

- Body: any subset of task fields; set `assignee`/`dueDate` to `null` to clear
- 200 Response: updated task

DELETE `/api/tasks/:id` (auth)

- 200 Response: `{ "success": true }`

---

## Threads & Messages

POST `/api/projects/:projectId/threads` (auth, project member)

- Body: `{ "title": "Design Discussion" }`
- 201 Response: thread

GET `/api/projects/:projectId/threads` (auth)

- 200 Response: array of threads

GET `/api/threads/:id` (auth)

- 200 Response: thread

POST `/api/threads/:id/messages` (auth)

- Body:

```json
{ "body": "What do you think about dark theme?", "attachments": ["https://..."] }
```

- 201 Response: message

GET `/api/threads/:id/messages` (auth)

- 200 Response: array of messages (ascending by createdAt)

---

## Notifications

GET `/api/notifications` (auth)

- 200 Response: array of notifications for user

PATCH `/api/notifications/:id/read` (auth)

- 200 Response: updated notification (read: true)

PATCH `/api/notifications/read-all` (auth)

- 200 Response:

```json
{ "success": true, "data": { "updated": 3 } }
```

---

## Common Headers

- Auth: `Authorization: Bearer <token>`
- JSON: `Content-Type: application/json`

---

## Notes

- Validation errors return 400 with mapped field messages.
- Rate limiting applies under `/api` (defaults: 100 requests / 15 min per IP).
- Date-time fields are ISO strings.
- IDs are MongoDB ObjectIds.
