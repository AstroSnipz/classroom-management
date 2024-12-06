# Classroom Management System

This is a full-stack web application designed to facilitate classroom management by providing role-based functionality for Principals, Teachers, and Students. The system supports the creation of classrooms, timetable management, and user accounts with role-based access control (RBAC).

The application is built using modern web technologies to ensure security, scalability, and ease of use.

# Features

# Role-Based Access Control

1. Principal
   --> Can create classrooms and assign teachers to them.
   --> Can assign students to teachers.
   --> Can manage teacher and student accounts (add, edit, delete).
   --> Can view and edit classroom timetables.

# Teacher

--> Can view the list of students in their classroom.
--> Can edit or delete student accounts.
--> Can create and manage timetables for their assigned classrooms.

# Student

--> Can view the list of students in their classroom.
--> Can view the classroom timetable.

# Tech Stack

# Frontend

Framework: Next.js (React.js Framework)
Styling: Tailwind CSS

# Backend

Framework: Node.js with Express.js

# Database:

PostgreSQL

# Authentication:

Next Auth

# Project Setup

# Prerequisites

Ensure you have the following installed:

Node.js (v16 or higher)
PostgreSQL (v13 or higher)
Git
Installation

1. **Clone the Repository**  
   [https://github.com/AstroSnipz/classroom-management.git](https://github.com/AstroSnipz/classroom-management.git)

```bash
git clone https://github.com/AstroSnipz/classroom-management.git
```

# Navigate to the Project Directory

cd classroom-management

# Install Dependencies

# Install dependencies for the entire project

npm install

# Set Up Environment Variables

USER=your_postgresql_username
HOST=your_postgresql_host
DATABASE=your_postgresql_database_name
PASSWORD=your_postgresql_password
DB_PORT=your_postgresql_port
SECRET_KEY=your_secret_key
NODE_ENV=development

# Start the Development Server

`npm run dev`

# Access the Application

Open your browser and navigate to:
[http://localhost:3000]
