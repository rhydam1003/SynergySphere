#!/bin/bash

# SynergySphere API cURL Examples
# Make sure the server is running on localhost:4000

BASE_URL="http://localhost:4000"
API_URL="$BASE_URL/api"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}SynergySphere API Testing Script${NC}"
echo "================================="

# 1. Register a new user
echo -e "\n${GREEN}1. Registering new user...${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ava Smith",
    "email": "ava@example.com",
    "password": "Passw0rd!"
  }')
echo "$REGISTER_RESPONSE" | jq '.'

# Extract token from register (may be empty on duplicate)
REGISTER_TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.data.accessToken // empty')
echo -e "${BLUE}Register token: ${REGISTER_TOKEN:0:20}...${NC}"

# 2. Login
echo -e "\n${GREEN}2. Logging in...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ava@example.com",
    "password": "Passw0rd!"
  }')
echo "$LOGIN_RESPONSE" | jq '.'

# Prefer register token; fallback to login token
LOGIN_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.accessToken // empty')
TOKEN="$REGISTER_TOKEN"
if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  TOKEN="$LOGIN_TOKEN"
fi

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo -e "${BLUE}No valid access token obtained from register/login. Exiting.${NC}"
  exit 1
fi

echo -e "${BLUE}Token in use: ${TOKEN:0:20}...${NC}"

# 3. Get current user
echo -e "\n${GREEN}3. Getting current user...${NC}"
curl -s "$API_URL/auth/me" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 4. Create a project
echo -e "\n${GREEN}4. Creating a project...${NC}"
PROJECT_RESPONSE=$(curl -s -X POST "$API_URL/projects" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alpha Project",
    "description": "Our first MVP project"
  }')
echo "$PROJECT_RESPONSE" | jq '.'

PROJECT_ID=$(echo "$PROJECT_RESPONSE" | jq -r '.data._id')
echo -e "${BLUE}Project ID: $PROJECT_ID${NC}"

# 5. Get all projects
echo -e "\n${GREEN}5. Getting all projects...${NC}"
curl -s "$API_URL/projects" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 6. Create a task
echo -e "\n${GREEN}6. Creating a task...${NC}"
TASK_RESPONSE=$(curl -s -X POST "$API_URL/projects/$PROJECT_ID/tasks" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Design Login Page",
    "description": "Create responsive login page design",
    "priority": "high",
    "dueDate": "2025-09-30T00:00:00Z"
  }')
echo "$TASK_RESPONSE" | jq '.'

TASK_ID=$(echo "$TASK_RESPONSE" | jq -r '.data._id')
echo -e "${BLUE}Task ID: $TASK_ID${NC}"

# 7. Get project tasks
echo -e "\n${GREEN}7. Getting project tasks...${NC}"
curl -s "$API_URL/projects/$PROJECT_ID/tasks" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 8. Update task status
echo -e "\n${GREEN}8. Updating task status...${NC}"
curl -s -X PATCH "$API_URL/tasks/$TASK_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_progress"
  }' | jq '.'

# 9. Create a thread
echo -e "\n${GREEN}9. Creating a discussion thread...${NC}"
THREAD_RESPONSE=$(curl -s -X POST "$API_URL/projects/$PROJECT_ID/threads" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Design Discussion"
  }')
echo "$THREAD_RESPONSE" | jq '.'

THREAD_ID=$(echo "$THREAD_RESPONSE" | jq -r '.data._id')
echo -e "${BLUE}Thread ID: $THREAD_ID${NC}"

# 10. Post a message
echo -e "\n${GREEN}10. Posting a message...${NC}"
curl -s -X POST "$API_URL/threads/$THREAD_ID/messages" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "body": "What do you think about using a dark theme for the login page?"
  }' | jq '.'

# 11. Get notifications
echo -e "\n${GREEN}11. Getting notifications...${NC}"
curl -s "$API_URL/notifications" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 12. Get project activity
echo -e "\n${GREEN}12. Getting project activity...${NC}"
curl -s "$API_URL/projects/$PROJECT_ID/activity" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

echo -e "\n${BLUE}Testing complete!${NC}"
echo "================================="
echo -e "${GREEN}API Documentation available at: $BASE_URL/docs${NC}"
