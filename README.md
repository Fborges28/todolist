# Project Documentation

## Backend

### Overview

The backend service handles the API endpoints and business logic.

### Environment Variables

Create a `.env` file, at the root folder, with the following variables:

```
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=
BACKEND_PORT=
FRONTEND_PORT=
```

The backend will use these variables to connect to the PostgreSQL database.

### Setup

1. From root folder, navigate to the backend directory:

```bash
cd backend
```

Then create a `.env.development` file with the following variables:

```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:${POSTGRES_PORT}/${POSTGRES_DB}
```

2. From root folder, navigate to the frontend directory:

```bash
cd frontend
```

Then create a `.env.development` file with the following variables:

```
# frontend/.env.development
NEXT_PUBLIC_API_URL=http://backend:3001
```

## Docker

### Prerequisites

- Docker: [docker](https://docs.docker.com/get-docker/)
- Docker Compose [compose](https://docs.docker.com/compose/install/)

### Running with Docker

1. Build and start all services:

```bash
docker compose up --build
```

2. Stop all services:

```bash
docker compose down
```

### Container Structure

- Frontend: React application (Port 3000)
- Backend: Node.js API (Port 3001)
- Database: PostgreSQL (Port 5432)
