# SkillShare Hub

A full-stack skill-sharing platform built with Spring Boot and React.

## Overview

SkillShare Hub is a platform that facilitates the exchange and acquisition of a wide range of talents, including coding, photography, cooking, and other do-it-yourself crafts. Users can post images, videos, and articles, as well as engage with other users by leaving comments, liking, and sharing content.

## Features

- User registration and authentication
- Skill-sharing post board
- Community-building tools
- Progress updates
- Content sharing (images, videos, articles)
- Social interactions (comments, likes, shares)
- MongoDB Atlas integration
- Secure password storage
- JWT authentication
- Responsive Material-UI design

## Backend (Spring Boot)

The backend is built with Spring Boot and uses MongoDB Atlas for data storage.

### Prerequisites

- Java 17 or higher
- Maven
- MongoDB Atlas account

### Setup

1. Navigate to the project root directory
2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
3. The backend will start on http://localhost:8081

## Frontend (React)

The frontend is built with React and uses Material-UI for styling.

### Prerequisites

- Node.js (v14 or higher)
- npm

### Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The frontend will start on http://localhost:3000

## API Endpoints

- POST /api/auth/signup - Register a new user
- POST /api/auth/login - Login user

## Environment Variables

The application uses the following environment variables:

- MongoDB connection string (configured in application.properties)
- JWT secret key (configured in application.properties) 