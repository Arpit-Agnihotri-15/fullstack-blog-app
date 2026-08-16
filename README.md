# Scriptora

> Where Ideas Become Stories

A modern Full Stack Blogging Platform developed during my **Full Stack Web Development Internship at Codomax Digital Solutions**.

## Tech Stack

**Frontend:** HTML5, CSS3, JavaScript  
**Backend:** Node.js, Express.js, CORS, dotenv, bcryptjs  
**Database:** MongoDB Atlas, Mongoose  
**Testing:** Postman

---

# Module 1 – Frontend Development

🟢 **Completed**

Developed the responsive frontend of Scriptora using HTML, CSS and JavaScript.

### Main Features
- Home, Blogs, About and Contact pages
- Login & Registration UI
- Dashboard & Profile
- Create Blog & My Blogs
- Blog Details
- Likes, Comments, Views & Share
- Featured Blogs
- Search & Category Filtering
- Newsletter / Subscribe
- Form validation and responsive design

---

# Module 2 – Backend Development

🟢 **Completed**

Built the initial backend using Node.js and Express.js.

### Work Completed
- Express server setup
- REST API structure
- Authentication APIs
- Blog APIs
- Routes and Controllers
- CORS & environment configuration
- Frontend ↔ Backend integration
- API testing using Postman

### Main APIs

```text
POST /api/auth/register
POST /api/auth/login

GET    /api/blogs
GET    /api/blogs/:id
POST   /api/blogs
PUT    /api/blogs/:id
DELETE /api/blogs/:id
```

---

# Module 3 – Database & Full Stack Integration

🟢 **Day 11 Completed**

## Day 9 – MongoDB Setup

- Created MongoDB Atlas database
- Configured Mongoose
- Connected MongoDB with Express
- Added environment-based database configuration

Collections:

```text
users
blogs
comments
subscribers
contacts
```

---

## Day 10 – Blog CRUD & Database Integration

Implemented complete database-backed blog functionality.

### Features
- Create, Read, Update and Delete Blogs
- Like and View functionality
- Blog comments
- `authorId` based blog ownership
- My Blogs filtering
- Multi-account testing
- MongoDB persistence
- Postman API testing

### APIs

```text
GET    /api/blogs
GET    /api/blogs/:id
POST   /api/blogs
PUT    /api/blogs/:id
DELETE /api/blogs/:id
POST   /api/blogs/:id/like
POST   /api/blogs/:id/view

POST /api/comments
GET  /api/comments/:blogId
```

---

## Day 11 – Full Stack Feature Integration

Connected the remaining major frontend features with MongoDB and backend APIs.

### Dashboard
- Real user-specific Blogs, Likes, Comments and Views
- Recent Blogs from MongoDB

### Profile
- Profile data from MongoDB
- Edit Profile
- Change Password
- Delete Account
- User statistics

```text
GET    /api/users/:id
PUT    /api/users/:id
PUT    /api/users/:id/password
DELETE /api/users/:id
```

### Featured Blogs
- Database-driven Featured Blogs
- Ranking based on Likes + Views + Comments
- Top 3 blogs displayed on Home

```text
GET /api/blogs/featured
```

### Newsletter / Subscribe
- MongoDB-backed subscriptions
- Email validation
- Duplicate subscription protection

```text
POST /api/subscribers
```

### Contact Form
- MongoDB-backed contact messages
- Frontend and backend validation

```text
POST /api/contact
```

### Other Features Verified
- Search
- Category Filtering
- Blog Sharing
- Comments
- Navbar Navigation
- Login/Logout
- Multi-user blog separation
- End-to-end application testing

---

# Project Structure

```text
Scriptora/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── pages/
│   └── index.html
│
└── README.md
```

---

# Current Progress

| Module | Status |
|---|---|
| Module 1 – Frontend | 🟢 Completed |
| Module 2 – Backend | 🟢 Completed |
| Module 3 – Day 9 | 🟢 Completed |
| Module 3 – Day 10 | 🟢 Completed |
| Module 3 – Day 11 | 🟢 Completed |
| Module 3 – Day 12 | 🟡 Upcoming |

---

# Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

Frontend can be opened using VS Code Live Server.

---

# Next Step

Day 12 will focus on final testing, error handling, cleanup, documentation and deployment preparation.
