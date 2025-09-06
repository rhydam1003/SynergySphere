# SynergySphere API - Complete cURL Commands Collection

This document lists cURL commands for all implemented endpoints. Use in terminal or import snippets into Postman.

Base URL: `http://localhost:4000/api`

---

## Environment Variables

Linux/Mac (bash/zsh):

```bash
export BASE_URL="http://localhost:4000/api"
export EMAIL="ava@example.com"
export PASSWORD="Passw0rd!"
export TOKEN=""
export PROJECT_ID=""
export TASK_ID=""
export THREAD_ID=""
```

Windows PowerShell:

```powershell
$env:BASE_URL = "http://localhost:4000/api"
$env:EMAIL = "ava@example.com"
$env:PASSWORD = "Passw0rd!"
$env:TOKEN = ""
$env:PROJECT_ID = ""
$env:TASK_ID = ""
$env:THREAD_ID = ""
```

Note: Some commands use `jq` for parsing JSON. Install it if missing.

---

## 🔐 Authentication

1. Register

```bash
curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ava Smith",
    "email": "'$EMAIL'",
    "password": "'$PASSWORD'"
  }'
```

2. Login

```bash
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'$EMAIL'",
    "password": "'$PASSWORD'"
  }')
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.accessToken')
```

PowerShell:

```powershell
$LOGIN_RESPONSE = curl -s -X POST "$env:BASE_URL/auth/login" `
  -H "Content-Type: application/json" `
  -d "{\"email\": \"$($env:EMAIL)\", \"password\": \"$($env:PASSWORD)\"}"
$env:TOKEN = ($LOGIN_RESPONSE | jq -r '.data.accessToken')
```

3. Me

```bash
curl -s "$BASE_URL/auth/me" -H "Authorization: Bearer $TOKEN" | jq '.'
```

4. Forgot Password

```bash
curl -s -X POST "$BASE_URL/auth/forgot-password" \
  -H "Content-Type: application/json" \
  -d '{"email": "'$EMAIL'"}' | jq '.'
```

5. Reset Password (example)

```bash
curl -s -X POST "$BASE_URL/auth/reset-password" \
  -H "Content-Type: application/json" \
  -d '{"token": "<reset-token>", "password": "NewPassw0rd!"}' | jq '.'
```

---

## 👤 Users

List users (auth)

```bash
curl -s "$BASE_URL/users" -H "Authorization: Bearer $TOKEN" | jq '.'
```

---

## 📁 Projects

Create project

```bash
PROJECT_RESPONSE=$(curl -s -X POST "$BASE_URL/projects" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Alpha Project","description":"Our first MVP project"}')
PROJECT_ID=$(echo "$PROJECT_RESPONSE" | jq -r '.data._id')
```

List my projects

```bash
curl -s "$BASE_URL/projects" -H "Authorization: Bearer $TOKEN" | jq '.'
```

Get project

```bash
curl -s "$BASE_URL/projects/$PROJECT_ID" -H "Authorization: Bearer $TOKEN" | jq '.'
```

Update project

```bash
curl -s -X PATCH "$BASE_URL/projects/$PROJECT_ID" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"Alpha Project v2"}' | jq '.'
```

Delete project

```bash
curl -s -X DELETE "$BASE_URL/projects/$PROJECT_ID" -H "Authorization: Bearer $TOKEN" | jq '.'
```

Add member

```bash
curl -s -X POST "$BASE_URL/projects/$PROJECT_ID/members" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"userId":"<userId>","role":"member"}' | jq '.'
```

Update member role

```bash
curl -s -X PATCH "$BASE_URL/projects/$PROJECT_ID/members/<userId>" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"role":"manager"}' | jq '.'
```

Remove member

```bash
curl -s -X DELETE "$BASE_URL/projects/$PROJECT_ID/members/<userId>" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
```

Project activity

```bash
curl -s "$BASE_URL/projects/$PROJECT_ID/activity" -H "Authorization: Bearer $TOKEN" | jq '.'
```

---

## ✅ Tasks

Create task

```bash
TASK_RESPONSE=$(curl -s -X POST "$BASE_URL/projects/$PROJECT_ID/tasks" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"title":"Design Login Page","description":"Responsive design","priority":"high","dueDate":"2025-09-30T00:00:00Z"}')
TASK_ID=$(echo "$TASK_RESPONSE" | jq -r '.data._id')
```

List project tasks

```bash
curl -s "$BASE_URL/projects/$PROJECT_ID/tasks?status=todo" -H "Authorization: Bearer $TOKEN" | jq '.'
```

Get task

```bash
curl -s "$BASE_URL/tasks/$TASK_ID" -H "Authorization: Bearer $TOKEN" | jq '.'
```

Update task

```bash
curl -s -X PATCH "$BASE_URL/tasks/$TASK_ID" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"status":"in_progress"}' | jq '.'
```

Delete task

```bash
curl -s -X DELETE "$BASE_URL/tasks/$TASK_ID" -H "Authorization: Bearer $TOKEN" | jq '.'
```

---

## 💬 Threads & Messages

Create thread

```bash
THREAD_RESPONSE=$(curl -s -X POST "$BASE_URL/projects/$PROJECT_ID/threads" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"title":"Design Discussion"}')
THREAD_ID=$(echo "$THREAD_RESPONSE" | jq -r '.data._id')
```

List threads

```bash
curl -s "$BASE_URL/projects/$PROJECT_ID/threads" -H "Authorization: Bearer $TOKEN" | jq '.'
```

Get thread

```bash
curl -s "$BASE_URL/threads/$THREAD_ID" -H "Authorization: Bearer $TOKEN" | jq '.'
```

Post message

```bash
curl -s -X POST "$BASE_URL/threads/$THREAD_ID/messages" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"body":"What do you think about a dark theme?"}' | jq '.'
```

List messages

```bash
curl -s "$BASE_URL/threads/$THREAD_ID/messages" -H "Authorization: Bearer $TOKEN" | jq '.'
```

---

## 🔔 Notifications

List notifications

```bash
curl -s "$BASE_URL/notifications" -H "Authorization: Bearer $TOKEN" | jq '.'
```

Mark read

```bash
curl -s -X PATCH "$BASE_URL/notifications/<notificationId>/read" -H "Authorization: Bearer $TOKEN" | jq '.'
```

Mark all read

```bash
curl -s -X PATCH "$BASE_URL/notifications/read-all" -H "Authorization: Bearer $TOKEN" | jq '.'
```

---

## 🏥 Health

```bash
curl -s http://localhost:4000/health | jq '.'
```

---

## 🔧 Suggested Testing Flow

1. Register (or re-use existing email)
2. Login and export `TOKEN`
3. Create a project → capture `PROJECT_ID`
4. Create a task → capture `TASK_ID`
5. Create a thread → capture `THREAD_ID`
6. Exercise list/get/update/delete endpoints

Quick flow (bash):

```bash
# Login
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" -H "Content-Type: application/json" -d '{"email":"'$EMAIL'","password":"'$PASSWORD'"}')
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.accessToken')

# Create project
PROJECT_RESPONSE=$(curl -s -X POST "$BASE_URL/projects" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"name":"Alpha Project"}')
PROJECT_ID=$(echo "$PROJECT_RESPONSE" | jq -r '.data._id')

# Create task
TASK_RESPONSE=$(curl -s -X POST "$BASE_URL/projects/$PROJECT_ID/tasks" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"title":"Design Login Page"}')
TASK_ID=$(echo "$TASK_RESPONSE" | jq -r '.data._id')

# Create thread
THREAD_RESPONSE=$(curl -s -X POST "$BASE_URL/projects/$PROJECT_ID/threads" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"title":"Design Discussion"}')
THREAD_ID=$(echo "$THREAD_RESPONSE" | jq -r '.data._id')
```

Notes:

- Replace `<userId>` and `<notificationId>` placeholders where applicable.
- Passwords must contain upper/lowercase letters and a number (min 8 chars).
