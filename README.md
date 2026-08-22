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

# Module 4 – CRUD Operations

🟢 **Completed**

- Complete Blog CRUD functionality using REST APIs
- Create and publish blogs with MongoDB persistence
- Read all blogs and individual blog details
- Update existing blogs with ownership authorization
- Delete blogs with confirmation and ownership protection
- Verified CRUD operations directly with MongoDB
- Search and category filtering for blogs
- Image URL handling and fallback images
- Create/Edit mode and Blog Details navigation fixes
- Multi-account ownership and security testing
- End-to-end CRUD testing from Create → Read → Update → Delete

# Module 5 – Authentication & Security

🟡 **Under Progress**

🟢 **Day 17 – Completed**

- Implemented secure JWT-based authentication
- Added JWT authentication middleware
- Added protected `GET /api/auth/me` endpoint
- Retrieve current logged-in user from verified JWT
- Added Bearer token validation
- Protected authentication requests against missing tokens
- Protected authentication requests against invalid or expired tokens
- Excluded user passwords from authenticated user responses
- Tested authentication flow using Postman
- Verified successful authentication and unauthorized access handling

### 🟢 Day 18 – Protected Dashboard & User-Specific Blogs

- Added protected `GET /api/blogs/my` endpoint
- Used JWT authentication middleware to identify the logged-in user
- Fetch only blogs belonging to the authenticated user
- Removed frontend-side filtering of all blogs by `authorId`
- Connected Dashboard to the secure `/api/blogs/my` endpoint
- Connected My Blogs page to the secure `/api/blogs/my` endpoint
- Added Bearer JWT token to protected frontend requests
- Added authentication handling for missing, empty and invalid tokens
- Verified Personal and College account blog isolation
- Tested Dashboard and My Blogs with multiple user accounts
- Verified zero-blog accounts show `0` dashboard statistics and **No Blogs Yet**
- Verified secure API requests through browser Network testing
- Completed end-to-end user-specific blog access testing

### 🟢 Day 19 – Profile & User Management

- Secured profile operations using JWT authentication
- Added protected `GET /api/users/me` endpoint
- Added protected `PUT /api/users/me` endpoint for profile updates
- Added protected `PUT /api/users/me/password` endpoint for password changes
- Added protected `DELETE /api/users/me` endpoint for account deletion
- Replaced URL-based user identification with `req.user.id` from the verified JWT
- Connected Profile page to the authenticated `/me` endpoints
- Added Bearer JWT authentication to profile requests
- Implemented profile information and user statistics loading
- Implemented secure profile update functionality
- Implemented secure password change with current-password verification
- Implemented account deletion with associated blogs and comments cleanup
- Tested profile access and updates with multiple user accounts
- Tested incorrect password and missing JWT scenarios
- Verified authenticated requests through browser Network testing
- Verified deleted accounts can no longer log in
- Completed end-to-end Profile & User Management testing

### Current Progress

| Module | Status |
|---|---|
| Module 1 – Frontend | 🟢 Completed |
| Module 2 – Backend | 🟢 Completed |
| Module 3 – Database & Full Stack Integration | 🟢 Completed |
| Module 4 – CRUD Operations | 🟢 Completed |
| Module 5 – Authentication & Security | 🟢 Day 19 Completed |

# Project Structure

```text
Blog-App(Scriptora)/
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
