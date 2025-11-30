# Task Management System

This is my submission for the Junior Software Developer coding challenge. It is a full-stack application that allows users to create and view tasks.

## Tech Stack

- **Backend:** NestJS (TypeScript)
- **Frontend:** React + Vite (TypeScript)
- **Database:** PostgreSQL
- **Infrastructure:** Docker & Docker Compose
- **Package Manager:** pnpm

## How to Run

I have containerized the application so you only need Docker installed.

1.  Open your terminal in the project root folder.
2.  Run the following command:

    ```bash
    docker compose up --build
    ```

3.  Wait a moment for the containers to build and start. Look for the message: `Nest application successfully started`.

## Accessing the Application

Once the containers are running:

- **Frontend UI:** [http://localhost:5173](http://localhost:5173)
- **API Documentation (Swagger):** [http://localhost:3000/api](http://localhost:3000/api)

## Running Tests

To run the backend unit tests:

```bash
cd backend
pnpm test
```
