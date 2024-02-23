Project Title: User Management System

Overview
This project implements a User Management System where users, bosses, and administrators can interact with the system according to their roles. It provides functionality for user authentication, role-based access control, and management of user relationships.

Features
User Authentication: Users can register, log in, and authenticate using their email and password credentials.

Role-based Access Control: Different roles (user, boss, admin) have specific permissions and access levels within the system.

User Management: Users can view their own information, bosses can manage their subordinates, and administrators have access to all users.

Change Boss: Users can change their boss, if allowed by the system.

Technologies Used
NestJS: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

Prisma: A modern database toolkit for TypeScript and Node.js that simplifies database access and management.

PostgreSQL: A powerful, open-source relational database system used for storing user and role information.

bcrypt: A library for hashing passwords securely before storing them in the database.

Setup Instructions
Clone the repository to your local machine.
Install dependencies using npm install.
Set up environment variables, including database connection details.
DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres
Run the database migrations using npx prisma migrate dev.
Start the server using npm start.
Access the application using the provided endpoints.
API Endpoints
POST /auth/register: Register a new user.
POST /auth/login: Log in an existing user.
GET /users: Retrieve user information based on role and permissions.
PUT /users/:userId/change-boss: Change the boss of a user.