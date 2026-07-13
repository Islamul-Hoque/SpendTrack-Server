# SpendTrack

> **A modern, full-stack personal expense and budget management platform for users worldwide.**

SpendTrack is a production-oriented personal finance application designed to help users **record, organize, analyze, and understand their daily spending**.

The primary goal is to make expense tracking extremely simple: a user should be able to enter an expense with minimal effort, while the system automatically handles dates, calculations, summaries, analytics, and reporting.

The application is designed for a **global audience**, not specifically for Bangladesh. The architecture and product design should therefore support international users, currencies, time zones, and scalable future features.

---

## 🎯 Project Goal

The main goal of SpendTrack is to solve a common problem:

> People make many small expenses every day and eventually lose track of where their money went.

SpendTrack aims to provide a simple but powerful platform where users can:

* Record daily expenses
* Categorize expenses
* View daily, monthly, and yearly totals
* Search and filter transactions
* Analyze spending patterns
* Set monthly budgets
* Track income and remaining balance
* View spending analytics and charts
* Manage their personal financial records securely

The application should be easy enough for someone to record an expense within a few seconds while still providing enough analytics for users to understand their financial habits.

---

# 🌍 Target Audience

SpendTrack is intended for **users worldwide**.

Possible users include:

* Students
* Bachelor/Shared-house users
* Employees
* Freelancers
* Families
* Individuals managing personal finances
* Anyone who wants to track personal spending

The application should not be tied to a specific country, currency, or financial system.

---

# 🧠 Core Product Concept

The primary workflow is:

```text
User Registration / Login
        ↓
Personal Dashboard
        ↓
Add Expense
        ↓
Product + Amount + Category
        ↓
System automatically stores date/time
        ↓
Expense appears in transaction history
        ↓
Daily / Monthly / Yearly calculations
        ↓
Analytics and spending insights
```

Example:

```text
Product: Rice
Amount: 850
Category: Grocery
```

The system automatically associates the expense with the authenticated user and records the relevant date/time.

The user should never see another user's private financial data.

---

# 🏗️ High-Level Architecture

SpendTrack will use a separate frontend and backend architecture.

```text
                    ┌──────────────────────┐
                    │      Next.js         │
                    │   TypeScript Client  │
                    └──────────┬───────────┘
                               │
                         REST API / HTTPS
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Express.js Server  │
                    │      TypeScript      │
                    │   Modular Pattern    │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┼─────────────┐
                 │             │             │
                 ▼             ▼             ▼
               Auth         Expenses      Analytics
                 │             │             │
                 └─────────────┼─────────────┘
                               ▼
                           PostgreSQL
```

---

# 📦 Repository Structure

SpendTrack will use two separate repositories.

### Frontend

```text
SpendTrack
```

Technology:

```text
Next.js
TypeScript
```

### Backend

```text
SpendTrack-Server
```

Technology:

```text
Node.js
Express.js
TypeScript
```

Conceptually:

```text
SpendTrack
└── Frontend

SpendTrack-Server
└── Backend
```

---

# 🛠️ Technology Stack

## Frontend

The frontend will be built with:

* **Next.js**
* **TypeScript**
* **Tailwind CSS**
* **React**
* **React Hook Form**
* **Zod**
* **TanStack Query**
* **Recharts**

### Frontend responsibilities

* User interface
* Authentication screens
* Dashboard
* Expense forms
* Expense table/list
* Search and filtering
* Charts
* Budget management
* Profile management
* API communication
* Client-side validation
* Responsive/mobile-first UI

---

# ⚙️ Backend

The backend will be built with:

* **Node.js**
* **Express.js**
* **TypeScript**
* **Modular Architecture**
* **REST API**

The backend will be responsible for:

* Authentication
* Authorization
* User management
* Expense CRUD
* Category management
* Budget management
* Income management
* Analytics
* Validation
* Database operations
* Security
* API error handling

---

# 🧩 Backend Architecture

The backend will follow a **modular architecture**.

Possible structure:

```text
src/
│
├── modules/
│   │
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.route.ts
│   │   └── auth.validation.ts
│   │
│   ├── user/
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.route.ts
│   │   └── user.validation.ts
│   │
│   ├── expense/
│   │   ├── expense.controller.ts
│   │   ├── expense.service.ts
│   │   ├── expense.route.ts
│   │   └── expense.validation.ts
│   │
│   ├── category/
│   │
│   ├── budget/
│   │
│   └── analytics/
│
├── middlewares/
├── config/
├── utils/
├── database/
├── app.ts
└── server.ts
```

The purpose of this architecture is to keep business logic maintainable and make future technology upgrades easier.

---

# 🗄️ Database

## PostgreSQL

SpendTrack will use **PostgreSQL** as its primary database.

MongoDB is intentionally not being used for this project.

PostgreSQL is preferred because SpendTrack contains strongly relational financial data such as:

```text
User
 ├── Expenses
 ├── Categories
 ├── Budgets
 └── Income
```

The application will require:

* Relationships
* Foreign keys
* Constraints
* Aggregations
* Filtering
* Grouping
* Reporting
* Transactions
* Data integrity

PostgreSQL is therefore a natural fit for the application.

---

# 🔌 ORM — Prisma

**Prisma** is planned for a later version of SpendTrack.

Prisma will act as the ORM between the Express backend and PostgreSQL.

Architecture:

```text
Express.js
     ↓
Service Layer
     ↓
Prisma
     ↓
PostgreSQL
```

Prisma is not part of the initial implementation if the developer has not yet learned it. It will be introduced in a later version without changing the overall business architecture.

---

# 🐳 Docker

**Docker** is planned for a later version.

The purpose of Docker will be to make the development and deployment environment reproducible.

Planned architecture:

```text
Docker
│
├── Next.js Container
│
├── Express Container
│
└── PostgreSQL Container
```

Docker will primarily be used for:

* Environment consistency
* Local PostgreSQL setup
* Containerized development
* Easier deployment
* Reproducible environments

Docker is an infrastructure layer and does not replace PostgreSQL.

---

# 🔐 Authentication & Authorization

SpendTrack will support multiple authentication methods.

## Email + Password

Users can create an account using:

```text
Name
Email
Phone Number (Optional)
Profile Image
Password
```

Passwords must never be stored as plain text.

---

## Google Login

Users will also be able to log in directly using their Google account.

Expected flow:

```text
User
 ↓
Google OAuth
 ↓
Express Authentication System
 ↓
User lookup / account creation
 ↓
PostgreSQL
```

---

# 🎟️ Access Token & Refresh Token

SpendTrack will use token-based authentication.

### Access Token

The access token will be short-lived and used for authenticated API requests.

```text
Client
 ↓
Access Token
 ↓
Express API
 ↓
JWT Verification
 ↓
Authenticated User
```

### Refresh Token

A refresh token will be used to obtain a new access token when the access token expires.

The refresh token should be handled using a secure mechanism such as:

```text
HttpOnly
Secure
SameSite
```

cookies where appropriate.

Token rotation and revocation can be implemented as the authentication system matures.

---

# 🔑 Password Hashing

## V1

The initial version may use:

**bcrypt**

This allows authentication to be implemented using already-known technology.

## V2

Password hashing will be upgraded to:

**Argon2id**

Argon2id will be used for modern password hashing and credential protection.

The migration from bcrypt to Argon2id can be handled gradually for existing users rather than requiring a complete rewrite of the authentication system.

---

# 🖼️ Profile Image

Users can upload a profile image during registration or from their profile settings.

Images will be uploaded to:

**ImgBB**

The database will store the image URL rather than the actual image file.

Architecture:

```text
User
 ↓
Next.js
 ↓
Express
 ↓
ImgBB
 ↓
Image URL
 ↓
PostgreSQL
```

The image-storage implementation should remain isolated so that a future migration to another provider such as object storage can be performed without major application changes.

---

# 🔒 Multi-User Data Isolation

This is one of the most important security requirements of SpendTrack.

Each expense belongs to a specific user.

Conceptually:

```text
User
 │
 ├── Expense 1
 ├── Expense 2
 ├── Expense 3
 └── Expense N
```

A user must never be able to access another user's expenses.

Every protected database query must be scoped to the authenticated user's ID.

Example concept:

```sql
SELECT *
FROM expenses
WHERE user_id = authenticated_user_id;
```

The frontend must not be responsible for security.

Authorization must be enforced on the backend.

---

# 💰 Expense Management

Users will be able to:

* Add expenses
* View expenses
* Edit expenses
* Delete expenses
* Search expenses
* Filter expenses
* Sort expenses
* Categorize expenses
* View expense details

Example expense:

```text
Product: Rice
Amount: 850
Category: Grocery
Date: Automatically recorded
User: Authenticated user
```

---

# 🏷️ Categories

Expenses can be organized using categories.

Initial categories may include:

* Food
* Grocery
* Transport
* Shopping
* Education
* Health
* Entertainment
* Bills
* Rent
* Mobile/Internet
* Other

Users may eventually be able to create custom categories.

---

# 📊 Dashboard

The dashboard is the central part of SpendTrack.

It will provide an overview of the user's financial activity.

Possible dashboard metrics:

```text
Total Expense
Today's Expense
This Week's Expense
This Month's Expense
This Year's Expense
Average Daily Expense
Current Budget
Remaining Budget
```

---

# 📅 Daily / Monthly / Yearly Overview

The system should automatically calculate:

### Daily

```text
Today's Total Expense
```

### Monthly

```text
Current Month Total
```

### Yearly

```text
Current Year Total
```

Users should also be able to select different dates or date ranges for historical analysis.

---

# 📈 Expense Analytics

SpendTrack will provide visual analytics using charts.

Examples:

### Category Distribution

```text
Food          36%
Shopping      24%
Transport     15%
Education     10%
Others        15%
```

### Monthly Spending

```text
January       ███████
February      █████
March         ████████
April         ████
...
```

Possible chart library:

**Recharts**

---

# 🔎 Search & Filtering

Users should be able to search and filter expenses.

Possible filters:

```text
Search by product
Category
Date
Date range
Minimum amount
Maximum amount
```

Sorting options:

```text
Newest
Oldest
Highest amount
Lowest amount
```

---

# 💵 Income Management

Planned for a later version.

Users can record income such as:

```text
Monthly Salary
Freelance Income
Other Income
```

The dashboard can then calculate:

```text
Total Income
- Total Expense
----------------
Remaining Balance
```

---

# 🎯 Budget Management

Users will eventually be able to set a monthly spending budget.

Example:

```text
Monthly Budget: $500

Spent:          $375
Remaining:      $125
Used:           75%
```

The application can provide warnings when the user approaches or exceeds their budget.

---

# 🔔 Smart Spending Alerts

Planned future feature.

Possible alerts:

* Budget reached 80%
* Budget exceeded
* Spending significantly increased
* Category spending increased
* Unusual spending pattern
* Monthly spending comparison

Example:

```text
Your food expenses are 32% higher
than last month.
```

---

# 📥 Export & Reports

Planned future feature.

Users may be able to export their financial records as:

* CSV
* PDF

Example report:

```text
SpendTrack Monthly Report

Month: August 2026

Total Expense: $450

Food:        $160
Transport:   $70
Shopping:    $120
Education:   $50
Others:      $50
```

---

# 📱 Responsive Design

SpendTrack will be designed with a **mobile-first approach**.

Expense entry should be extremely fast.

Example:

```text
Product
[ Rice              ]

Amount
[ 850               ]

Category
[ Grocery ▼         ]

[ Add Expense ]
```

The interface should work effectively on:

* Mobile
* Tablet
* Laptop
* Desktop

---

# 🌙 UI Features

Planned UI features include:

* Responsive design
* Dark mode
* Clean dashboard
* Accessible forms
* Loading states
* Error states
* Empty states
* Toast notifications
* Confirmation dialogs
* Skeleton loading where appropriate

---

# 🗃️ Initial Database Model

The initial database can contain the following core entities.

## Users

```text
users
├── id
├── name
├── email
├── phone
├── password_hash
├── google_id
├── avatar_url
├── created_at
└── updated_at
```

## Expenses

```text
expenses
├── id
├── user_id
├── category_id
├── product_name
├── amount
├── expense_date
├── created_at
└── updated_at
```

## Categories

```text
categories
├── id
├── user_id
├── name
└── created_at
```

Future entities:

```text
budgets
incomes
recurring_expenses
notifications
```

---

# 🔗 Data Relationships

Conceptually:

```text
User
 │
 ├───────────────┐
 │               │
 ▼               ▼
Expenses      Categories
 │
 │
 ▼
Expense Analytics

User
 │
 ├── Budgets
 │
 └── Income
```

Every user-owned resource must contain an appropriate relationship to the authenticated user.

---

# 🔌 API Design

The backend will expose RESTful APIs.

Example endpoints:

## Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/google
POST   /api/auth/refresh
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

## User

```text
GET    /api/users/me
PATCH  /api/users/me
```

## Expenses

```text
GET    /api/expenses
POST   /api/expenses
GET    /api/expenses/:id
PATCH  /api/expenses/:id
DELETE /api/expenses/:id
```

## Categories

```text
GET    /api/categories
POST   /api/categories
PATCH  /api/categories/:id
DELETE /api/categories/:id
```

## Analytics

```text
GET /api/analytics/daily
GET /api/analytics/monthly
GET /api/analytics/yearly
GET /api/analytics/category
```

Future APIs:

```text
/api/budgets
/api/incomes
/api/reports
/api/notifications
```

---

# 🧪 Validation & Error Handling

The backend will validate incoming data before processing it.

Examples:

```text
Invalid email
Weak password
Missing product name
Invalid amount
Invalid category
Invalid date
Unauthorized request
Forbidden resource
Resource not found
```

The API should return consistent error responses.

Example:

```json
{
  "success": false,
  "message": "Expense not found"
}
```

---

# 🛡️ Security Goals

SpendTrack will prioritize:

* Password hashing
* JWT authentication
* Refresh token security
* Authorization
* User-level data isolation
* Input validation
* Secure HTTP headers
* CORS configuration
* Rate limiting where appropriate
* Environment variables for secrets
* Secure cookies
* SQL injection protection through parameterized queries/ORM
* Proper API error handling
* No sensitive information in client-side code

---

# 🛣️ Development Roadmap

SpendTrack will be developed incrementally rather than introducing every technology at once.

---

## 🚀 V1 — Core Production MVP

The initial version focuses on building a complete working product using currently familiar technologies.

### Technologies

```text
Next.js
TypeScript
React
Tailwind CSS
Express.js
Node.js
PostgreSQL
JWT
bcrypt
ImgBB
Recharts
```

### Features

* User registration
* Email/password login
* Google login
* JWT access token
* JWT refresh token
* User profile
* Profile image
* Expense CRUD
* Categories
* Daily totals
* Monthly totals
* Yearly totals
* Search
* Filtering
* Sorting
* Dashboard
* Charts
* User-specific data isolation

The goal of V1 is:

> **Build and ship a complete, usable SpendTrack product.**

---

# 🔥 V2 — Architecture & Security Upgrade

After V1 is stable, additional technologies will be introduced.

### New technologies

```text
Prisma
Argon2id
```

### Prisma

Replace the initial database-access implementation with Prisma while keeping PostgreSQL as the database.

```text
V1:

Express
 ↓
Database Layer
 ↓
PostgreSQL


V2:

Express
 ↓
Prisma
 ↓
PostgreSQL
```

The business logic and API architecture should remain largely unchanged.

### Argon2id

Upgrade password hashing:

```text
V1
bcrypt

↓

V2
Argon2id
```

Existing bcrypt hashes can be migrated gradually during successful user authentication rather than requiring every user to reset their password immediately.

---

# 🐳 V3 — Containerization & Infrastructure

Docker will be introduced after the application architecture is stable.

### New technologies

```text
Docker
Docker Compose
```

Potential development environment:

```text
Docker Compose
│
├── Next.js
├── Express.js
└── PostgreSQL
```

Goals:

* Reproducible development environment
* Consistent dependencies
* Easier onboarding
* Containerized PostgreSQL
* Deployment preparation
* Better infrastructure knowledge

---

# 📈 Future Product Roadmap

Possible future versions may include:

```text
V4+
│
├── Income management
├── Advanced budgets
├── Recurring expenses
├── Savings goals
├── Advanced analytics
├── Spending insights
├── Monthly reports
├── CSV export
├── PDF export
├── Notifications
├── Progressive Web App
├── Offline expense entry
└── Advanced financial insights
```

The exact roadmap may change based on user feedback and product requirements.

---

# 🧠 Engineering Principles

SpendTrack should follow these principles:

### 1. Separation of Concerns

Frontend, backend, authentication, business logic, and database access should remain properly separated.

### 2. Modular Backend

Each business domain should have its own module.

```text
Auth
User
Expense
Category
Budget
Analytics
```

### 3. Secure by Design

Authorization must be enforced at the backend level.

### 4. Database Integrity

Financial data should maintain strong relational consistency.

### 5. Scalable Architecture

The system should be designed so future features can be added without rewriting the entire application.

### 6. Progressive Technology Adoption

New technologies should be introduced after understanding their purpose instead of adding tools purely for the sake of using them.

---

# 🎓 Learning Goals

SpendTrack is also a major learning project.

The project is intended to strengthen practical knowledge of:

* Full-stack application architecture
* Next.js
* TypeScript
* Express.js
* Modular backend architecture
* REST API design
* PostgreSQL
* Database relationships
* Authentication
* Authorization
* JWT
* OAuth
* Password hashing
* Data validation
* API security
* Aggregation queries
* Analytics
* Prisma
* Docker
* Deployment
* Production-oriented development

The project will evolve alongside the developer's technical knowledge.

---

# 📌 Important Architecture Decision

MongoDB is intentionally excluded from SpendTrack.

The database strategy is:

```text
PostgreSQL from V1
        ↓
PostgreSQL + Prisma in V2
        ↓
PostgreSQL + Prisma + Docker in V3
```

This avoids unnecessary database migration while allowing the project architecture to evolve.

---

# 🎯 Final Vision

SpendTrack should eventually become more than a simple CRUD expense tracker.

The long-term vision is:

```text
                 SpendTrack
                     │
       ┌─────────────┼─────────────┐
       │             │             │
    Expenses       Income       Budgets
       │             │             │
       └─────────────┼─────────────┘
                     │
                     ▼
                Analytics
                     │
                     ▼
             Spending Insights
                     │
                     ▼
             Better Decisions
```

The core philosophy is simple:

> **Track your spending. Understand your money. Make better financial decisions.**

---

# 📁 Repositories

### Frontend

```text
SpendTrack
```

### Backend

```text
SpendTrack-Server
```

---

# 🏁 Project Status

**Current Stage:** Planning / Initial Development

The project will be developed incrementally through V1, V2, and V3.

The initial priority is to build a stable and functional MVP before introducing additional infrastructure and security technologies such as Prisma, Argon2id, and Docker.
