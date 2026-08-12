# Scriptora

> Where Ideas Become Stories

A modern Full Stack Blogging Platform developed as part of my **Full Stack Web Development Internship at Codomax Digital Solutions**.

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* CORS
* dotenv
* Nodemon
* bcryptjs

### Database

* MongoDB Atlas
* Mongoose

### API Testing

* Postman

---

## Module 1 – Frontend Development

🟢 **Completed**

Scriptora's frontend was developed using HTML, CSS and JavaScript with a responsive and interactive user interface.

### Features

* Responsive Home Page
* Login & Registration Pages
* Dashboard
* Profile Page
* Create Blog Page
* My Blogs
* Blog Management
* Blog Details
* Featured Blogs
* Likes, Comments, Views & Share UI
* About Page
* Contact Page
* Form Validation
* Custom Toast Notifications
* Custom Confirmation Modals
* LocalStorage-based frontend functionality
* Password Visibility Toggle
* Responsive Design for Desktop, Tablet & Mobile

---

## Module 2 – Backend Development & Frontend Integration

🟢 **Completed**

Module 2 focused on developing the initial backend for Scriptora using Node.js and Express.js and connecting the core frontend operations with backend REST APIs.

### Backend Setup

* Initialized Node.js backend
* Configured Express.js server
* Added CORS middleware
* Added dotenv for environment variables
* Added Nodemon for development
* Created REST API structure
* Added API health-check endpoint
* Added 404 route handling
* Organized backend using routes and controllers
* Tested backend APIs using Postman

### User Authentication APIs

Implemented backend APIs for user registration and login.

#### Registration

```text
POST /api/auth/register
```

#### Login

```text
POST /api/auth/login
```

### Blog APIs

Implemented backend APIs for creating, retrieving, updating and deleting blogs.

#### Get All Blogs

```text
GET /api/blogs
```

#### Get Blog by ID

```text
GET /api/blogs/:id
```

#### Create Blog

```text
POST /api/blogs
```

#### Update Blog

```text
PUT /api/blogs/:id
```

#### Delete Blog

```text
DELETE /api/blogs/:id
```

### Frontend Integration

* Connected frontend with backend REST APIs
* Integrated registration API
* Integrated login API
* Integrated blog APIs
* Added API error handling
* Tested API requests using Postman

---

## Module 3 – Database Integration

🟢 **Day 9 Completed**

Module 3 started with integrating a persistent database into the Scriptora backend.

### Database Setup

* Created MongoDB Atlas cluster
* Created MongoDB database user
* Installed Mongoose
* Configured MongoDB connection
* Added MongoDB connection string using environment variables
* Connected MongoDB Atlas with the Express.js backend
* Successfully tested the database connection

### Current Progress

| Module                                    | Status       |
| ----------------------------------------- | ------------ |
| Module 1 – Frontend Development           | 🟢 Completed |
| Module 2 – Backend & Frontend Integration | 🟢 Completed |
| Module 3 – Day 9: Database Setup          | 🟢 Completed |
| Module 3 – Day 10: Database Models        | 🟡 Upcoming  |
| Module 3 – Day 11: Database Integration   | 🟡 Upcoming  |
| Module 3 – Day 12: Testing & Finalization | 🟡 Upcoming  |

---

## ▶️ Run the Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```