# User Management System

## Overview
This project implements a User Management System where users, bosses, and administrators can interact with the system according to their roles. It provides functionality for user authentication, role-based access control, and management of user relationships.

## Features
- **User Authentication:** Users can register, log in, and authenticate using their email and password credentials.
- **Role-based Access Control:** Different roles (user, boss, admin) have specific permissions and access levels within the system.
- **User Management:** Users can view their own information, bosses can manage their subordinates, and administrators have access to all users.
- **Change Boss:** Users can change their boss if allowed by the system.

## Technologies Used
- **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Prisma:** A modern database toolkit for TypeScript and Node.js that simplifies database access and management.
- **PostgreSQL:** A powerful, open-source relational database system used for storing user and role information.
- **bcrypt:** A library for hashing passwords securely before storing them in the database.

## Setup Instructions
1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up environment variables, including database connection details.
   ```plaintext
   DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres
   PORT=3000
4. Run the database migrations using npx prisma migrate dev.
5. Start the server using npm start.
6. Access the application using the provided endpoints.

## API Endpoints
1. POST /auth/register: Register a new user.
2. POST /auth/login: Log in an existing user.
3. GET /users: Retrieve user information based on role and permissions.
4. PUT /users/:userId/change-boss: Change the boss of a user.