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

🟢 **Day 10 Completed**

Module 3 focused on integrating MongoDB Atlas with the Scriptora backend and implementing database-driven blog functionality.

### Day 9 – Database Setup

* Created MongoDB Atlas cluster
* Created MongoDB database user
* Installed Mongoose
* Configured MongoDB connection
* Added MongoDB connection string using environment variables
* Connected MongoDB Atlas with the Express.js backend
* Successfully tested the database connection

### Day 10 – MongoDB Blog Integration & CRUD

Implemented complete database-backed blog management using MongoDB Atlas and Mongoose.

### Blog Database Model

* Created Mongoose Blog schema/model
* Added fields for title, category, image, description, content, tags and author
* Added likes, comments and views counters
* Added automatic `createdAt` and `updatedAt` timestamps
* Added `authorId` to associate each blog with its creator

### Blog APIs

Implemented and tested the following REST APIs:

#### Create Blog

```text
POST /api/blogs
```

#### Get All Blogs

```text
GET /api/blogs
```

#### Get Blog by ID

```text
GET /api/blogs/:id
```

#### Update Blog

```text
PUT /api/blogs/:id
```

#### Delete Blog

```text
DELETE /api/blogs/:id
```

#### Like Blog

```text
POST /api/blogs/:id/like
```

#### Increment Blog Views

```text
POST /api/blogs/:id/view
```

### Comments

Implemented database-backed blog comments.

```text
POST /api/comments
GET /api/comments/:blogId
```

* Added comment creation and retrieval
* Connected comments with individual blog IDs
* Displayed stored comments on the blog details page

### User-Specific Blogs

Implemented account-based blog ownership using `authorId`.

* Each newly created blog stores the logged-in user's ID
* Public **Blogs** page displays all published blogs
* **My Blogs** displays only blogs created by the currently logged-in user
* Verified separation between personal and college accounts
* Prevented blogs from one account from appearing in another account's **My Blogs**

### CRUD & Database Testing

* Tested Create, Read, Update and Delete operations using Postman
* Verified likes and view counts update in MongoDB
* Verified comments are stored and retrieved from MongoDB
* Verified edited blog data is updated in MongoDB
* Verified deleted blogs are removed from MongoDB
* Verified `authorId` filtering with multiple user accounts
* Verified frontend pages reflect database changes correctly

### Current Progress

| Module                                    | Status       |
| ----------------------------------------- | ------------ |
| Module 1 – Frontend Development           | 🟢 Completed |
| Module 2 – Backend & Frontend Integration | 🟢 Completed |
| Module 3 – Day 9: Database Setup          | 🟢 Completed |
| Module 3 – Day 10: MongoDB & CRUD         | 🟢 Completed |
| Module 3 – Day 11: Database Integration   | 🟡 Upcoming  |
| Module 3 – Day 12: Testing & Finalization | 🟡 Upcoming  |

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