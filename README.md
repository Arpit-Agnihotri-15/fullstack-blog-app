# Scriptora

> Where Ideas Become Stories

A modern Full Stack Blogging Platform developed during my **Full Stack Web Development Internship at Codomax Digital Solutions**.

## Tech Stack

**Frontend:** HTML5, CSS3, JavaScript  
**Backend:** Node.js, Express.js, CORS, dotenv, bcryptjs, JWT  
**Database:** MongoDB Atlas, Mongoose  
**Testing:** Postman

---

# Module 1 – Frontend Development

🟢 **Completed**

- Responsive Home, Blogs, About and Contact pages
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

- Node.js & Express.js server
- REST APIs, routes and controllers
- Authentication APIs
- Blog CRUD APIs
- Comments, Likes and Views APIs
- CORS and environment configuration
- Frontend ↔ Backend integration
- Postman API testing

---

# Module 3 – Database & Full Stack Integration

🟢 **Completed**

- MongoDB Atlas + Mongoose integration
- Database-backed Users, Blogs, Comments, Subscribers and Contacts
- Complete Blog CRUD with MongoDB persistence
- User-specific **My Blogs** using `authorId`
- Dashboard statistics from database
- Profile management, password change and account deletion
- Featured Blogs based on engagement
- Newsletter subscription with duplicate protection
- Contact form with backend validation
- Search and category filtering
- Comments, Likes, Views and Share functionality
- JWT-based authentication
- Protected Create, Edit and Delete Blog APIs
- Backend ownership authorization for Edit/Delete
- Multi-account security testing
- Logout and protected-page testing
- Final application and API testing

---

# Project Structure

```text
Scriptora/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
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
| Module 3 – Database & Full Stack Integration | 🟢 Completed |

---

# Run Locally

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

# Module 4 – CRUD Operations

🟡 **In Progress**

### Day 13 – Create & Read
- Create and publish new blogs
- Fetch and display all blogs
- View individual blog details
- Search and category filtering
- Tested image URL handling and invalid blog cases

### Day 14 – Update
- Edit existing blogs
- Update title, content, category, image and tags
- Verified updated data in MongoDB and Blog Details
- Tested user ownership protection for editing

### Day 15 – Delete
- Delete blogs with confirmation
- Verified deletion from database and UI
- Tested delete ownership protection using multiple accounts
- Fixed Create/Edit mode navigation issue
- Improved Blog Details back navigation
- Verified complete CRUD functionality

### Current Progress

| Module | Status |
|---|---|
| Module 1 – Frontend | 🟢 Completed |
| Module 2 – Backend | 🟢 Completed |
| Module 3 – Database & Full Stack Integration | 🟢 Completed |
| Module 4 – CRUD Operations | 🟡 In Progress |
