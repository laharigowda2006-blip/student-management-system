# Student Management System - DBMS Project

Complete web-based student management system with database connectivity and full CRUD operations.

## Features
- INSERT: Add new students to database
- SELECT: Retrieve student information
- UPDATE: Modify student records
- DELETE: Remove students
- SEARCH: Find students by name/email/roll number
- Responsive UI with real-time database updates

## Tech Stack
- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express.js
- Database: MySQL

## Installation
1. npm install
2. mysql -u root -p < database/schema.sql
3. cp .env.example .env
4. npm start
5. Open http://localhost:3000

## API Endpoints
- POST /api/students - INSERT
- GET /api/students - SELECT all
- GET /api/students/:id - SELECT one
- PUT /api/students/:id - UPDATE
- DELETE /api/students/:id - DELETE
