# 🧠 InstaClone Backend — Complete Architectural Documentation

This backend powers the InstaClone application.
It is designed using layered architecture principles to ensure scalability, maintainability, and clean separation of concerns.

This documentation explains:

* What every file does
* Why it exists
* Why the structure is designed this way
* How the components interact

---

# 📂 Complete Folder & File Breakdown

```
backend/
│
├── server.js
├── package.json
│
└── src/
    ├── app.js
    │
    ├── config/
    │   └── database.js
    │
    ├── routes/
    │   ├── auth.routes.js
    │   ├── post.routes.js
    │   └── user.routes.js
    │
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── post.controller.js
    │   └── user.controller.js
    │
    ├── middlewares/
    │   └── auth.middleware.js
    │
    └── models/
        ├── user.model.js
        ├── post.model.js
        ├── likes.model.js
        └── follow.model.js
```

Now let’s break this down properly.

---

# 🏁 Root Level Files

---

## 📄 server.js

### Responsibility:

* Connects to MongoDB
* Starts the Express server

### Why separate from app.js?

Because:

* `server.js` is responsible for infrastructure (server startup)
* `app.js` is responsible for application logic

This separation allows:

* Unit testing `app.js` without starting the server
* Easier integration testing
* Cleaner architecture

---

## 📄 package.json

Defines:

* Project metadata
* Dependencies
* Scripts

Important dependencies:

* express → API framework
* mongoose → ODM for MongoDB
* bcryptjs → password hashing
* jsonwebtoken → authentication
* cookie-parser → cookie handling
* multer → file upload handling
* @imagekit/nodejs → image hosting integration

---

# 📂 src Folder — Application Core

The `src` folder contains all backend logic.

Why isolate it?

Because:

* Keeps root clean
* Makes project scalable
* Standard production practice

---

# 📄 src/app.js

### Responsibility:

* Creates Express app
* Registers middleware
* Mounts route files

This is the central application container.

It does NOT:

* Start the server
* Connect to DB

Why?

To maintain separation between:
Application configuration vs infrastructure startup.

---

# 📂 src/config

---

## 📄 database.js

### Responsibility:

* Establish MongoDB connection

Why separate config?

Because:

* Configuration logic should not mix with controllers
* Easier environment switching (dev, prod)
* Centralized connection management

---

# 📂 src/routes

Routes define API endpoints.

They DO NOT contain business logic.

Each route file maps:

```
HTTP Method + URL → Controller Function
```

---

## 📄 auth.routes.js

Handles:

* User registration
* User login

Why separate auth routes?

Because authentication is a distinct domain.

---

## 📄 post.routes.js

Handles:

* Create post
* Get posts
* Like post
* Get post details

Why separate?

Because posts are a separate entity in system design.

---

## 📄 user.routes.js

Handles:

* Follow user
* Unfollow user
* Manage follow requests

Why separate from auth?

Because:
Authentication ≠ User relationship logic.

This keeps domain boundaries clean.

---

# 📂 src/controllers

Controllers contain business logic.

They:

* Validate request
* Interact with database
* Send response
* Handle errors

---

## 📄 auth.controller.js

Handles:

* Register user
* Hash password
* Generate JWT
* Login verification
* Set authentication cookie

Why inside controller?

Because authentication logic involves:

* DB query
* Hash comparison
* Token generation
* Response formatting

This is business logic, not routing.

---

## 📄 post.controller.js

Handles:

* Creating new post
* Uploading image via ImageKit
* Fetching posts
* Handling likes

Why image upload here?

Because uploading image is part of "post creation logic".

---

## 📄 user.controller.js

Handles:

* Follow request creation
* Accept/reject follow
* Unfollow logic

Contains business rules like:

* Cannot follow yourself
* Prevent duplicate follow
* Manage follow status

---

# 📂 src/middlewares

Middlewares handle cross-cutting concerns.

---

## 📄 auth.middleware.js

### Responsibility:

* Extract JWT from cookie
* Verify token
* Attach user to request
* Block unauthorized access

Why middleware instead of inside controller?

Because:

* Prevents repeated authentication code
* Centralizes security
* Makes protected routes reusable

This is critical for clean architecture.

---

# 📂 src/models

Models define MongoDB schema.

Each file represents one collection.

---

## 📄 user.model.js

Defines:

* username (unique)
* email (unique)
* password
* profileImage
* bio

Why enforce uniqueness at DB level?

Because frontend validation alone is not secure.

---

## 📄 post.model.js

Defines:

* caption
* imgURL
* user reference

Uses ObjectId reference instead of embedding posts inside user.

Why?

Because:

* Prevents oversized user documents
* Scales better
* Cleaner querying

---

## 📄 likes.model.js

Defines:

* user reference
* post reference

Unique compound index:
(user + post)

Why separate Likes collection?

Instead of storing likes array inside Post:

Because:

* Large arrays hurt performance
* Hard to enforce uniqueness
* Separate collection scales better
* Real-world systems use this approach

---

## 📄 follow.model.js

Defines:

* follower
* followee
* status (pending / accepted / rejected)

Why status field?

Because:

* Supports private accounts
* Enables request-based follow
* Future extensibility (block, mute)

Why not store followers array inside User?

Because:

* Many-to-many relationship
* Hard to manage states
* Difficult to scale
* Separate collection is cleaner

---

# 🔐 Authentication Flow (Step-by-Step)

1. User registers
2. Password hashed using bcrypt
3. JWT token created
4. Token stored in HTTP-only cookie
5. On protected routes:

   * Middleware verifies token
   * Attaches user to request
   * Controller proceeds

Why HTTP-only cookie?

Because:

* Protects against XSS
* More secure than localStorage

Why JWT?

Because:

* Stateless
* Scalable
* No session store required

---

# 🧠 Architectural Decisions Summary

| Decision                   | Why                           |
| -------------------------- | ----------------------------- |
| Separate routes            | Clean endpoint mapping        |
| Separate controllers       | Business logic isolation      |
| Separate models            | Clear DB structure            |
| Separate likes collection  | Scalability                   |
| Separate follow collection | Relationship state management |
| Middleware auth            | Reusable security             |
| server.js separated        | Testability                   |
| image stored in cloud      | Performance                   |

---

# 🚀 Scalability Potential

This architecture allows:

* Adding service layer
* Adding Redis caching
* Adding refresh tokens
* Adding rate limiting
* Adding centralized error handler
* Adding logging system
* Pagination implementation
* Feed ranking algorithm

Without restructuring entire project.

---

# 🎯 What This Backend Demonstrates

This backend demonstrates understanding of:

* Layered architecture
* REST API design
* Secure authentication
* MongoDB relational modeling
* Data integrity enforcement
* Middleware pattern
* Clean separation of concerns
* Scalable thinking

---
