# FreelanceHub 🚀

### Modern Freelancer Marketplace Platform

*Connect talented freelancers with clients worldwide through a seamless, feature-rich platform*

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Objectives](#-objectives)
- [Methodology](#-methodology)
- [Working Functionality](#-working-functionality)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Installation & Setup](#-installation--setup)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Project Overview

FreelanceHub is a **full-stack freelancer marketplace platform** that bridges the gap between talented freelancers and clients seeking professional services. Built with modern web technologies, the platform provides a comprehensive ecosystem for job posting, bidding, project management, and secure payments.

### Key Highlights

- 🎯 **Three User Roles**: Freelancers, Clients, and Administrators
- 🔐 **Secure Authentication**: JWT-based authentication with role-based access control
- 💼 **Job Management**: Complete job lifecycle from posting to completion
- 💰 **Bidding System**: Competitive bidding with proposal management
- 📊 **Analytics Dashboard**: Real-time insights with interactive charts
- 🌓 **Dark/Light Mode**: Seamless theme switching with persistent preferences
- 📱 **Fully Responsive**: Optimized for all devices and screen sizes
- 🎨 **Modern UI/UX**: Beautiful interface with smooth animations

---

## 🎯 Objectives

### Primary Objectives

1. **Connect Talent with Opportunity**
   - Create a seamless platform where freelancers can showcase their skills
   - Enable clients to find and hire qualified professionals efficiently
   - Facilitate transparent communication and collaboration

2. **Streamline the Hiring Process**
   - Simplify job posting with intuitive forms and templates
   - Enable competitive bidding with detailed proposals
   - Provide tools for project tracking and milestone management

3. **Ensure Trust and Security**
   - Implement secure authentication and authorization
   - Protect user data with industry-standard encryption
   - Facilitate secure payments through escrow system

4. **Provide Data-Driven Insights**
   - Offer comprehensive analytics for freelancers to track earnings
   - Give clients visibility into project progress and spending
   - Enable administrators to monitor platform health and growth

5. **Deliver Exceptional User Experience**
   - Create an intuitive, modern interface
   - Ensure fast load times and smooth interactions
   - Support accessibility and internationalization

### Secondary Objectives

- Build a scalable architecture that can grow with user demand
- Implement real-time features for instant communication
- Create a mobile-first responsive design
- Establish a foundation for future feature expansion

---

## 🔬 Methodology

### Development Approach

**Agile Development with Iterative Releases**

The project follows an agile methodology with continuous integration and deployment:

1. **Requirements Analysis**
   - User story mapping for all three user roles
   - Feature prioritization based on MVP requirements
   - Technical feasibility assessment

2. **System Design**
   - Database schema design with normalization
   - RESTful API architecture planning
   - Component-based frontend architecture
   - Security and authentication flow design

3. **Implementation Phases**
   - **Phase 1**: Core authentication and user management
   - **Phase 2**: Job posting and browsing functionality
   - **Phase 3**: Bidding and proposal system
   - **Phase 4**: Dashboard and analytics
   - **Phase 5**: Payment and escrow integration
   - **Phase 6**: Real-time messaging and notifications

4. **Testing Strategy**
   - Unit testing for critical business logic
   - Integration testing for API endpoints
   - End-to-end testing for user workflows
   - Cross-browser and device compatibility testing

5. **Deployment & Monitoring**
   - Continuous deployment pipeline
   - Performance monitoring and optimization
   - User feedback collection and iteration

### Technical Architecture

**Frontend Architecture**
- Component-based architecture with React 19
- Context API for global state management
- Custom hooks for reusable logic
- Lazy loading and code splitting for performance

**Backend Architecture**
- RESTful API design with Express.js
- MVC pattern for code organization
- Middleware for authentication and validation
- Database connection pooling for efficiency

**Database Design**
- Normalized PostgreSQL schema
- Indexed columns for query optimization
- Foreign key constraints for data integrity
- Prepared statements to prevent SQL injection

**Security Measures**
- JWT tokens with expiration
- Password hashing with bcrypt
- CORS configuration for API security
- Input validation and sanitization
- SQL injection prevention
- XSS protection

---

## ✅ Working Functionality

### 🔐 Authentication System

**User Registration**
- ✅ Email and password-based registration
- ✅ Role selection (Freelancer/Client)
- ✅ Input validation and error handling
- ✅ Password strength requirements
- ✅ Duplicate email prevention

**User Login**
- ✅ Secure JWT-based authentication
- ✅ Token storage and management
- ✅ Persistent sessions
- ✅ Role-based dashboard routing
- ✅ Remember me functionality

**Session Management**
- ✅ Automatic token refresh
- ✅ Secure logout with token cleanup
- ✅ Protected routes with authentication guards

### 💼 Freelancer Features

**Dashboard**
- ✅ Comprehensive analytics with interactive charts
  - 📈 6-month earnings trend (Area Chart)
  - 🥧 Project distribution by status (Pie Chart)
  - 📊 Weekly activity tracking (Bar Chart)
- ✅ Key metrics with animated counters
  - Total earnings
  - Active projects
  - Completed jobs
  - Success rate
- ✅ Active project cards with progress tracking
- ✅ Quick action buttons for common tasks

**Job Search & Bidding**
- ✅ Browse available jobs with advanced filtering
  - Filter by category, budget, and skills
  - Search by keywords
  - Sort by date, budget, or relevance
- ✅ Detailed job view with full requirements
- ✅ Submit proposals with cover letters
- ✅ Bid amount and timeline specification
- ✅ Track bid status (pending, accepted, rejected)

**Profile Management**
- ✅ Complete profile creation and editing
- ✅ Skills and expertise showcase
- ✅ Portfolio upload and management
- ✅ Experience and education history
- ✅ Hourly rate and availability settings
- ✅ Profile picture upload

**Earnings & Analytics**
- ✅ Detailed earnings breakdown
- ✅ Visual representation of income trends
- ✅ Project-wise earnings tracking
- ✅ Payment history and invoices

**My Gigs**
- ✅ Create service offerings
- ✅ Manage gig pricing and packages
- ✅ Edit and update gig details
- ✅ Track gig performance

### 👔 Client Features

**Dashboard**
- ✅ Overview of posted jobs
- ✅ Active projects monitoring
- ✅ Hired freelancers management
- ✅ Budget tracking and spending analytics
- ✅ Quick access to post new jobs

**Job Posting**
- ✅ Comprehensive job creation form
  - Job title and description
  - Category and subcategory selection
  - Required skills specification
  - Budget range (fixed or hourly)
  - Project duration and deadline
  - Attachment support
- ✅ Draft saving functionality
- ✅ Job preview before publishing
- ✅ Edit and update posted jobs

**Proposal Management**
- ✅ View all received proposals
- ✅ Compare freelancer profiles
- ✅ Review bid amounts and timelines
- ✅ Accept or reject proposals
- ✅ Message freelancers directly

**Payment System**
- ✅ Secure payment processing
- ✅ Escrow protection for projects
- ✅ Milestone-based payments
- ✅ Payment history tracking
- ✅ Invoice generation

### 🛡️ Admin Features

**Analytics Dashboard**
- ✅ Platform-wide statistics
  - Total users (freelancers and clients)
  - Active jobs and completed projects
  - Revenue metrics
  - User growth trends
- ✅ Interactive charts for data visualization
- ✅ Real-time data updates

**User Management**
- ✅ View all registered users
- ✅ Search and filter users
- ✅ User role management
- ✅ Account status control (active/suspended)
- ✅ User activity monitoring

**Platform Monitoring**
- ✅ Job approval and moderation
- ✅ Dispute resolution tools
- ✅ System health monitoring
- ✅ Performance metrics tracking

### 🌐 Public Features

**Landing Page**
- ✅ Hero section with search functionality
- ✅ Category showcase
- ✅ Featured freelancers
- ✅ How it works section
- ✅ Testimonials and reviews
- ✅ Call-to-action buttons

**Browse Jobs**
- ✅ Public job listings
- ✅ Advanced filtering and search
- ✅ Category-based navigation
- ✅ Job detail preview
- ✅ Skeleton loaders for smooth UX

**Browse Freelancers**
- ✅ Freelancer directory
- ✅ Filter by skills, rating, and availability
- ✅ Profile preview cards
- ✅ Direct hire option

### 🎨 UI/UX Features

**Theme System**
- ✅ Dark and light mode support
- ✅ Smooth theme transitions
- ✅ Persistent theme preference
- ✅ System theme detection

**Animations & Interactions**
- ✅ Framer Motion page transitions
- ✅ Hover effects and micro-interactions
- ✅ Loading states with skeleton screens
- ✅ Animated counters and progress bars
- ✅ Smooth scrolling and navigation

**Responsive Design**
- ✅ Mobile-first approach
- ✅ Tablet optimization
- ✅ Desktop layouts
- ✅ Touch-friendly interactions
- ✅ Adaptive navigation

### 🔧 Technical Features

**Performance Optimization**
- ✅ Code splitting and lazy loading
- ✅ Image optimization
- ✅ Caching strategies
- ✅ Database query optimization
- ✅ Connection pooling

**Security Features**
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ CORS protection
- ✅ Input validation and sanitization
- ✅ SQL injection prevention
- ✅ XSS protection

**Error Handling**
- ✅ Comprehensive error boundaries
- ✅ User-friendly error messages
- ✅ Fallback UI components
- ✅ API error handling
- ✅ Network error recovery

---


## 🚀 Tech Stack

### Frontend Technologies

**Core Framework**
- **React 19** - Latest React with modern hooks and concurrent features
- **Vite 6** - Next-generation frontend tooling with lightning-fast HMR
- **React Router v7** - Declarative routing for single-page applications

**Styling & UI**
- **Tailwind CSS 3.4** - Utility-first CSS framework for rapid UI development
- **Framer Motion 12** - Production-ready motion library for React
- **Lucide React** - Beautiful, consistent icon library with 1000+ icons

**Data Visualization**
- **Recharts 3.4** - Composable charting library built on React components
  - Area charts for earnings trends
  - Pie charts for project distribution
  - Bar charts for activity tracking
  - Responsive and interactive tooltips

**3D & Animations**
- **Three.js** - 3D graphics library for WebGL
- **React Three Fiber** - React renderer for Three.js
- **GSAP** - Professional-grade animation library
- **React Particles** - Particle effects and backgrounds

**Additional Libraries**
- **date-fns** - Modern JavaScript date utility library
- **React CountUp** - Animated number counting
- **React Circular Progressbar** - Circular progress indicators
- **Swiper** - Modern mobile touch slider

### Backend Technologies

**Server Framework**
- **Node.js 18+** - JavaScript runtime built on Chrome's V8 engine
- **Express.js 4.18** - Fast, unopinionated web framework for Node.js

**Database**
- **PostgreSQL 14+** - Advanced open-source relational database
- **pg (node-postgres)** - PostgreSQL client for Node.js with connection pooling

**Authentication & Security**
- **JSON Web Tokens (JWT)** - Secure token-based authentication
- **bcryptjs** - Password hashing with salt rounds
- **express-validator** - Express middleware for validation and sanitization
- **CORS** - Cross-Origin Resource Sharing middleware

**Development Tools**
- **nodemon** - Auto-restart server on file changes
- **dotenv** - Environment variable management

### Development & Build Tools

- **ESLint** - Code linting and quality enforcement
- **PostCSS** - CSS transformation and optimization
- **Autoprefixer** - Automatic vendor prefix addition

### Architecture Patterns

- **MVC Pattern** - Model-View-Controller for backend organization
- **Component-Based Architecture** - Reusable React components
- **Context API** - Global state management
- **Custom Hooks** - Reusable stateful logic
- **RESTful API** - Standard HTTP methods for CRUD operations

---

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Client Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Browser    │  │    Mobile    │  │    Tablet    │ │
│  │  (React App) │  │  (Responsive)│  │  (Responsive)│ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTPS/REST API
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Application Layer                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Express.js Server (Port 5001)          │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐ │  │
│  │  │   Auth     │  │    Jobs    │  │    Bids    │ │  │
│  │  │  Routes    │  │   Routes   │  │   Routes   │ │  │
│  │  └────────────┘  └────────────┘  └────────────┘ │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐ │  │
│  │  │    JWT     │  │ Validation │  │    CORS    │ │  │
│  │  │ Middleware │  │ Middleware │  │ Middleware │ │  │
│  │  └────────────┘  └────────────┘  └────────────┘ │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          │ SQL Queries
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │         PostgreSQL Database (Port 5432)          │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐ │  │
│  │  │ Users  │  │  Jobs  │  │  Bids  │  │ Skills │ │  │
│  │  │ Table  │  │ Table  │  │ Table  │  │ Table  │ │  │
│  │  └────────┘  └────────┘  └────────┘  └────────┘ │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Database Schema

**Users Table**
```sql
- id (PRIMARY KEY)
- email (UNIQUE)
- password (HASHED)
- name
- role (freelancer/client/admin)
- avatar
- bio
- created_at
- updated_at
```

**Jobs Table**
```sql
- id (PRIMARY KEY)
- client_id (FOREIGN KEY → users.id)
- title
- description
- category
- budget
- budget_type (fixed/hourly)
- skills (ARRAY)
- status (open/in_progress/completed/cancelled)
- created_at
- deadline
```

**Bids Table**
```sql
- id (PRIMARY KEY)
- job_id (FOREIGN KEY → jobs.id)
- freelancer_id (FOREIGN KEY → users.id)
- amount
- proposal
- delivery_time
- status (pending/accepted/rejected)
- created_at
```

### API Endpoints

**Authentication**
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
```

**Jobs**
```
GET    /api/jobs             - Get all jobs (with filters)
GET    /api/jobs/:id         - Get job by ID
POST   /api/jobs             - Create new job (auth required)
PUT    /api/jobs/:id         - Update job (auth required)
DELETE /api/jobs/:id         - Delete job (auth required)
```

**Bids**
```
GET    /api/bids/my-bids     - Get user's bids (auth required)
GET    /api/bids/job/:jobId  - Get bids for a job
POST   /api/bids             - Submit bid (auth required)
PUT    /api/bids/:id/accept  - Accept bid (auth required)
```

**Users**
```
GET    /api/users/freelancers - Get all freelancers
GET    /api/users/:id         - Get user profile
PUT    /api/users/profile     - Update profile (auth required)
```

---

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **PostgreSQL** 14 or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))

### Step 1: Clone the Repository

```bash
git clone https://github.com/Sandy175-dot/freelancer-Space.git
cd freelancer-Space
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

### Step 3: Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### Step 4: Database Setup

1. **Create PostgreSQL Database**

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE freelancehub;

# Exit psql
\q
```

2. **Run Database Schema**

```bash
# Navigate to server directory
cd server

# Run the setup script
npm run db:setup
```

Or manually run the SQL schema from `supabase-schema.sql` in your PostgreSQL client.

### Step 5: Configure Environment Variables

**Frontend Configuration**

Create `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5001/api
```

**Backend Configuration**

Create `server/.env` file:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=freelancehub
DB_USER=postgres
DB_PASSWORD=your_password_here

# JWT Configuration
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

**Important**: Replace `your_password_here` and `your_secret_key_here` with your actual values.

### Step 6: Start the Application

**Terminal 1 - Start Backend Server**

```bash
cd server
npm run dev
```

The backend will start on `http://localhost:5001`

**Terminal 2 - Start Frontend Development Server**

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### Step 7: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

🎉 **You're all set!** The application should now be running with hot module replacement.

### Verification

To verify everything is working:

1. **Check Backend**: Visit `http://localhost:5001/api/jobs` - should return JSON
2. **Check Frontend**: Visit `http://localhost:5173` - should show landing page
3. **Test Registration**: Create a new account
4. **Test Login**: Login with your credentials

---

## 🏗️ Project Structure

### For Freelancers

**1. Create Your Account**
```
1. Click "Sign Up" on the landing page
2. Select "Freelancer" as your role
3. Enter your email, password, and full name
4. Click "Create Account"
```

**2. Complete Your Profile**
```
1. Navigate to Profile from the dashboard
2. Add your professional photo
3. Write a compelling bio
4. Add your skills and expertise
5. Upload portfolio items
6. Set your hourly rate
7. Save your profile
```

**3. Browse and Bid on Jobs**
```
1. Go to "Job Search" from the dashboard
2. Use filters to find relevant jobs:
   - Category
   - Budget range
   - Skills required
3. Click on a job to view details
4. Click "Submit Proposal"
5. Enter your bid amount
6. Write a cover letter
7. Specify delivery time
8. Submit your bid
```

**4. Track Your Earnings**
```
1. Visit the "Earnings" page
2. View your income trends
3. See project-wise breakdown
4. Download invoices
5. Track payment history
```

**5. Manage Projects**
```
1. View active projects on dashboard
2. Track project progress
3. Communicate with clients
4. Submit deliverables
5. Request milestone payments
```

### For Clients

**1. Create Your Account**
```
1. Click "Sign Up" on the landing page
2. Select "Client" as your role
3. Enter your details
4. Verify your email
```

**2. Post a Job**
```
1. Click "Post a Job" from dashboard
2. Fill in job details:
   - Title and description
   - Category
   - Required skills
   - Budget (fixed or hourly)
   - Project duration
   - Deadline
3. Review and publish
```

**3. Review Proposals**
```
1. Go to "My Jobs" dashboard
2. Click on a job to see proposals
3. Review freelancer profiles
4. Compare bids and timelines
5. Message freelancers for clarification
```

**4. Hire a Freelancer**
```
1. Select the best proposal
2. Click "Accept Bid"
3. Set up payment method
4. Fund escrow account
5. Start the project
```

**5. Manage Projects**
```
1. Track project progress
2. Communicate with freelancer
3. Review deliverables
4. Approve milestones
5. Release payments
6. Leave feedback
```

### For Administrators

**1. Access Admin Panel**
```
1. Login with admin credentials
2. Navigate to Admin Dashboard
```

**2. Monitor Platform**
```
1. View platform statistics
2. Track user growth
3. Monitor revenue metrics
4. Analyze job trends
```

**3. Manage Users**
```
1. Go to "User Management"
2. Search for users
3. View user details
4. Suspend/activate accounts
5. Handle disputes
```

### Common Tasks

**Switch Between Dark/Light Mode**
```
Click the sun/moon icon in the navbar
Your preference is automatically saved
```

**Update Your Profile**
```
1. Click on your avatar in navbar
2. Select "Profile"
3. Edit your information
4. Click "Save Changes"
```

**Search for Jobs/Freelancers**
```
1. Use the search bar on landing page
2. Or navigate to Browse Jobs/Freelancers
3. Apply filters for better results
4. Click on items to view details
```

**Logout**
```
1. Click on your avatar
2. Select "Logout"
3. Confirm logout
```

---

## 📡 API Documentation

### Authentication Endpoints

**Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "role": "freelancer"
}

Response: 201 Created
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "freelancer"
  }
}
```

**Login User**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "freelancer"
  }
}
```

### Jobs Endpoints

**Get All Jobs**
```http
GET /api/jobs?category=design&budget_min=100&budget_max=1000

Response: 200 OK
{
  "success": true,
  "jobs": [
    {
      "id": 1,
      "title": "Logo Design",
      "description": "Need a modern logo...",
      "category": "design",
      "budget": 500,
      "skills": ["Photoshop", "Illustrator"],
      "status": "open",
      "created_at": "2024-01-08T10:00:00Z"
    }
  ]
}
```

**Create Job**
```http
POST /api/jobs
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Website Development",
  "description": "Need a responsive website...",
  "category": "web-development",
  "budget": 2000,
  "budget_type": "fixed",
  "skills": ["React", "Node.js"],
  "deadline": "2024-02-15"
}

Response: 201 Created
{
  "success": true,
  "job": { ... }
}
```

### Bids Endpoints

**Submit Bid**
```http
POST /api/bids
Authorization: Bearer {token}
Content-Type: application/json

{
  "job_id": 1,
  "amount": 450,
  "proposal": "I can deliver this project...",
  "delivery_time": 7
}

Response: 201 Created
{
  "success": true,
  "bid": { ... }
}
```

**Get My Bids**
```http
GET /api/bids/my-bids
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "bids": [ ... ]
}
```

### Error Responses

**400 Bad Request**
```json
{
  "error": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

**401 Unauthorized**
```json
{
  "error": "Invalid credentials"
}
```

**500 Server Error**
```json
{
  "error": "Server error during operation"
}
```

---


```
freelancer-Space/
├── public/                          # Static assets
│   ├── assets/                      # Images and media files
│   ├── fonts/                       # Custom fonts
│   ├── icons/                       # Icon files
│   └── vite.svg                     # Vite logo
│
├── server/                          # Backend application
│   ├── config/
│   │   └── database.js              # PostgreSQL connection config
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js                  # Authentication routes
│   │   ├── jobs.js                  # Job management routes
│   │   ├── bids.js                  # Bidding system routes
│   │   └── users.js                 # User profile routes
│   ├── scripts/
│   │   ├── setupDatabase.js         # Database initialization
│   │   └── testConnection.js        # DB connection test
│   ├── .env                         # Environment variables
│   ├── .env.example.backup          # Example env file
│   ├── package.json                 # Backend dependencies
│   ├── server.js                    # Express server entry point
│   └── README.md                    # Backend documentation
│
├── src/                             # Frontend application
│   ├── assets/                      # React assets
│   │   └── react.svg
│   │
│   ├── components/                  # Reusable components
│   │   ├── 3D/
│   │   │   └── Workspace3D.jsx      # 3D workspace visualization
│   │   ├── Admin/
│   │   │   └── PerformanceDashboard.jsx
│   │   ├── Animations/
│   │   │   └── GSAPAnimations.jsx   # GSAP animation components
│   │   ├── Background/
│   │   │   ├── ParticleAnimation.jsx
│   │   │   ├── ParticleBackground.jsx
│   │   │   ├── StarField.jsx        # Animated star background
│   │   │   └── WebGLBackground.jsx
│   │   ├── Charts/
│   │   │   ├── EarningsChart.jsx    # Earnings visualization
│   │   │   └── RadialProgress.jsx   # Circular progress
│   │   ├── Client/
│   │   │   ├── BidCard.jsx          # Bid display card
│   │   │   ├── MessageCard.jsx      # Message preview
│   │   │   └── PostedProjectCard.jsx
│   │   ├── Dashboard/
│   │   │   ├── ProjectCard.jsx      # Project display card
│   │   │   └── StatsCard.jsx        # Statistics card
│   │   ├── Jobs/
│   │   │   ├── BidModal.jsx         # Bid submission modal
│   │   │   ├── EnhancedJobCard.jsx  # Enhanced job card
│   │   │   ├── JobCard.jsx          # Basic job card
│   │   │   ├── JobCardSkeleton.jsx  # Loading skeleton
│   │   │   └── PostJobForm.jsx      # Job posting form
│   │   ├── Landing/
│   │   │   ├── CategorySection.jsx  # Category showcase
│   │   │   ├── Footer.jsx           # Landing footer
│   │   │   ├── GlobalNetworkSection.jsx
│   │   │   ├── HeroSection.jsx      # Hero banner
│   │   │   ├── MakeItRealSection.jsx
│   │   │   ├── Navigation.jsx       # Landing navigation
│   │   │   ├── ShowcaseGallery.jsx  # Project showcase
│   │   │   └── TriangleSplitNav.jsx
│   │   ├── Layout/
│   │   │   ├── DashboardLayout.jsx  # Dashboard wrapper
│   │   │   ├── Footer.jsx           # App footer
│   │   │   └── Navbar.jsx           # Main navigation
│   │   ├── Profile/
│   │   │   ├── PortfolioCard.jsx    # Portfolio item card
│   │   │   └── SkillBadge.jsx       # Skill tag component
│   │   ├── Skeletons/
│   │   │   ├── DashboardSkeleton.jsx
│   │   │   ├── JobCardSkeleton.jsx
│   │   │   └── ProfileCardSkeleton.jsx
│   │   ├── UI/
│   │   │   ├── AnimatedCounter.jsx  # Number animation
│   │   │   ├── Avatar.jsx           # User avatar
│   │   │   ├── Badge.jsx            # Badge component
│   │   │   ├── Button.jsx           # Button component
│   │   │   ├── Card.jsx             # Card component
│   │   │   ├── CornerButton.jsx     # Corner action button
│   │   │   ├── LoadingSpinner.jsx   # Loading indicator
│   │   │   ├── Modal.jsx            # Modal dialog
│   │   │   ├── ProgressBar.jsx      # Progress indicator
│   │   │   ├── RatingStars.jsx      # Star rating
│   │   │   ├── SearchBar.jsx        # Search input
│   │   │   ├── Tabs.jsx             # Tab navigation
│   │   │   └── Toast.jsx            # Toast notifications
│   │   └── ErrorBoundary.jsx        # Error boundary wrapper
│   │
│   ├── contexts/                    # React contexts
│   │   ├── AuthContext.jsx          # Authentication state
│   │   └── ThemeContext.jsx         # Theme management
│   │
│   ├── hooks/                       # Custom hooks
│   │   └── usePerformanceOptimization.js
│   │
│   ├── lib/                         # Utility libraries
│   │   ├── jobs.js                  # Job utilities
│   │   ├── mockAuth.js              # Mock authentication
│   │   ├── mockData.js              # Mock data for testing
│   │   ├── supabase.js              # Supabase client
│   │   └── supabaseClient.js        # Supabase configuration
│   │
│   ├── pages/                       # Page components
│   │   ├── Admin/
│   │   │   ├── Dashboard.jsx        # Admin dashboard
│   │   │   └── UserManagement.jsx   # User management
│   │   ├── Auth/
│   │   │   ├── Login.jsx            # Login page
│   │   │   └── Signup.jsx           # Registration page
│   │   ├── Client/
│   │   │   ├── Dashboard.jsx        # Client dashboard
│   │   │   ├── MyJobs.jsx           # Posted jobs
│   │   │   ├── Payment.jsx          # Payment management
│   │   │   ├── PostJob.jsx          # Job posting
│   │   │   ├── PostProject.jsx      # Project posting
│   │   │   └── PostProjectDetails.jsx
│   │   ├── Freelancer/
│   │   │   ├── BrowseJobs.jsx       # Job browsing
│   │   │   ├── Dashboard.jsx        # Freelancer dashboard
│   │   │   ├── Earnings.jsx         # Earnings page
│   │   │   ├── ImprovedDashboard.jsx
│   │   │   ├── JobSearch.jsx        # Job search
│   │   │   ├── Messages.jsx         # Messaging
│   │   │   ├── MyBids.jsx           # Bid management
│   │   │   ├── MyGigs.jsx           # Gig management
│   │   │   ├── Profile.jsx          # Profile page
│   │   │   ├── SimpleBrowseJobs.jsx
│   │   │   ├── TestBrowseJobs.jsx
│   │   │   └── UltraSimpleBrowse.jsx
│   │   ├── BrowseFreelancers.jsx    # Freelancer directory
│   │   ├── BrowseJobs.jsx           # Public job listings
│   │   ├── HireConfirmation.jsx     # Hire confirmation
│   │   ├── JobDetail.jsx            # Job details page
│   │   ├── Landing.jsx              # Landing page
│   │   ├── Payment.jsx              # Payment page
│   │   ├── ProjectDetail.jsx        # Project details
│   │   ├── ProjectWorkspace.jsx     # Project workspace
│   │   └── Solutions.jsx            # Solutions page
│   │
│   ├── services/                    # API services
│   │   ├── api.js                   # Main API client
│   │   ├── bidService.js            # Bid operations
│   │   └── jobService.js            # Job operations
│   │
│   ├── utils/                       # Utility functions
│   │   ├── cache.js                 # Caching utilities
│   │   └── checkDatabase.js         # DB health check
│   │
│   ├── App.css                      # App-level styles
│   ├── App.jsx                      # Main App component
│   ├── App.test2.jsx                # Test file
│   ├── index.css                    # Global styles
│   └── main.jsx                     # React entry point
│
├── supabase/                        # Supabase configuration
│   ├── migrations/
│   │   └── create_jobs_and_bids.sql
│   └── README.md
│
├── .env                             # Frontend environment variables
├── .env.example                     # Example env file
├── .gitignore                       # Git ignore rules
├── BACKEND_SETUP.md                 # Backend setup guide
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML entry point
├── package.json                     # Frontend dependencies
├── package-lock.json                # Dependency lock file
├── postcss.config.js                # PostCSS configuration
├── README.md                        # This file
├── RESEARCH_DOCUMENTATION.md        # Research notes
├── supabase-schema.sql              # Database schema
├── tailwind.config.js               # Tailwind configuration
└── vite.config.js                   # Vite configuration
```

### Key Directories Explained

**`/server`** - Complete backend application with Express.js
- RESTful API endpoints
- JWT authentication
- PostgreSQL database integration
- Middleware for validation and security

**`/src/components`** - Reusable React components
- Organized by feature and functionality
- Includes UI primitives and complex components
- Skeleton loaders for better UX

**`/src/pages`** - Route-level page components
- Separate directories for each user role
- Public pages for landing and browsing
- Protected pages for authenticated users

**`/src/contexts`** - Global state management
- Authentication state and methods
- Theme preferences (dark/light mode)

**`/src/services`** - API integration layer
- Centralized API calls
- Error handling
- Request/response transformation

---

## 🔧 Available Scripts

### Frontend Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server at `localhost:5173` |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

### Backend Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm run db:setup` | Initialize database schema |
| `npm run db:test` | Test database connection |

### Development Workflow

**Start Full Application**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

**Build for Production**
```bash
# Build frontend
npm run build

# Test production build
npm run preview

# Start backend in production
cd server
npm start
```

---

## 🚧 Roadmap & Future Enhancements

### Phase 1: Core Enhancements (Q1 2024)
- [ ] Real-time notifications system
- [ ] File upload for portfolios and attachments
- [ ] Advanced search with Elasticsearch
- [ ] Email notifications (SendGrid/AWS SES)
- [ ] Password reset functionality

### Phase 2: Payment Integration (Q2 2024)
- [ ] Stripe payment gateway integration
- [ ] PayPal support
- [ ] Escrow system implementation
- [ ] Automated invoicing
- [ ] Multi-currency support

### Phase 3: Communication (Q2 2024)
- [ ] Real-time messaging with WebSockets
- [ ] Video call integration (Zoom/Google Meet)
- [ ] File sharing in messages
- [ ] Voice messages
- [ ] Message notifications

### Phase 4: Advanced Features (Q3 2024)
- [ ] Multi-language support (i18n)
- [ ] Dispute resolution system
- [ ] Freelancer verification badges
- [ ] Skills assessment tests
- [ ] Project milestones tracking
- [ ] Advanced rating and review system
- [ ] Recommendation engine

### Phase 5: Mobile & PWA (Q4 2024)
- [ ] Progressive Web App (PWA) support
- [ ] Offline mode capabilities
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] App store deployment

### Phase 6: Analytics & Optimization
- [ ] Google Analytics integration
- [ ] A/B testing framework
- [ ] Performance monitoring (Sentry)
- [ ] SEO optimization
- [ ] CDN integration
- [ ] Database optimization

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, improving documentation, or proposing new features, your help is appreciated.

### How to Contribute

1. **Fork the Repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/freelancer-Space.git
   cd freelancer-Space
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes thoroughly

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: amazing new feature"
   ```

   **Commit Message Guidelines:**
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for updates to existing features
   - `Refactor:` for code refactoring
   - `Docs:` for documentation changes

6. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes
   - Submit the PR

### Contribution Guidelines

**Code Style**
- Use ESLint configuration provided
- Follow React best practices
- Use functional components and hooks
- Write meaningful variable and function names
- Keep components small and focused

**Testing**
- Test in both light and dark modes
- Verify responsive design on multiple devices
- Test all user flows
- Check for console errors

**Documentation**
- Update README if needed
- Add JSDoc comments for functions
- Document complex logic
- Update API documentation for new endpoints

### Areas Where We Need Help

- 🐛 **Bug Fixes** - Help identify and fix bugs
- 🎨 **UI/UX** - Improve design and user experience
- 📚 **Documentation** - Improve guides and tutorials
- 🌐 **Translations** - Add multi-language support
- ⚡ **Performance** - Optimize code and queries
- ✨ **Features** - Implement items from roadmap
- 🧪 **Testing** - Write unit and integration tests

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow project guidelines
- Report inappropriate behavior

---

## 🐛 Bug Reports & Feature Requests

### Reporting Bugs

Found a bug? Please open an issue with:

**Bug Report Template:**
```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen

**Actual Behavior**
What actually happened

**Screenshots**
If applicable, add screenshots

**Environment**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Device: [e.g., Desktop, iPhone 12]
- Version: [e.g., 1.0.0]

**Additional Context**
Any other relevant information
```

### Requesting Features

Have an idea? Open an issue with:

**Feature Request Template:**
```markdown
**Feature Description**
Clear description of the feature

**Problem It Solves**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other solutions you've thought about

**Additional Context**
Mockups, examples, or references
```

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 FreelanceHub

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

See [LICENSE](LICENSE) file for full details.

---

## 💬 Support & Contact

Need help or have questions?

### Community Support
- 💬 **GitHub Discussions** - Ask questions and share ideas
- 🐛 **GitHub Issues** - Report bugs and request features
- 📖 **Documentation** - Check our comprehensive guides

### Direct Contact
- 📧 **Email**: support@freelancehub.com
- 🐦 **Twitter**: [@freelancehub](https://twitter.com/freelancehub)
- 💼 **LinkedIn**: [FreelanceHub](https://linkedin.com/company/freelancehub)

### Resources
- 📚 **Documentation**: [Full Docs](./BACKEND_SETUP.md)
- 🎥 **Video Tutorials**: Coming soon
- 📝 **Blog**: Coming soon
- 🎓 **Learning Resources**: Coming soon

---

## 🙏 Acknowledgments

This project wouldn't be possible without these amazing technologies and communities:

### Technologies
- **React Team** - For the incredible React framework
- **Tailwind Labs** - For Tailwind CSS
- **Vercel** - For Vite and hosting solutions
- **PostgreSQL** - For the robust database
- **Express.js** - For the web framework
- **Framer** - For Framer Motion animations
- **Recharts Team** - For beautiful chart components

### Resources
- **Lucide Icons** - For the comprehensive icon library
- **Unsplash** - For high-quality placeholder images
- **Google Fonts** - For web fonts
- **MDN Web Docs** - For excellent documentation

### Inspiration
- **Fiverr** - For marketplace inspiration
- **Upwork** - For freelancer platform concepts
- **Dribbble** - For design inspiration
- **GitHub** - For collaboration tools

### Community
- All contributors who have helped improve this project
- The open-source community for continuous support
- Beta testers for valuable feedback

---

## 🌟 Show Your Support

If you find this project helpful or interesting:

- ⭐ **Star this repository** on GitHub
- 🐦 **Share it** on social media
- 📝 **Write about it** on your blog or Medium
- 🤝 **Contribute** to the codebase
- 💰 **Sponsor** the development (coming soon)
- 📢 **Spread the word** to other developers

Every star and contribution helps the project grow!

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Sandy175-dot/freelancer-Space?style=social)
![GitHub forks](https://img.shields.io/github/forks/Sandy175-dot/freelancer-Space?style=social)
![GitHub issues](https://img.shields.io/github/issues/Sandy175-dot/freelancer-Space)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Sandy175-dot/freelancer-Space)
![GitHub last commit](https://img.shields.io/github/last-commit/Sandy175-dot/freelancer-Space)

---

<div align="center">

### Built with ❤️ by the FreelanceHub Team

**Empowering freelancers and clients worldwide**

**Tech Stack:** React • Node.js • PostgreSQL • Express • Tailwind CSS • Framer Motion

[⬆ Back to Top](#freelancehub-)

---

© 2024 FreelanceHub. All rights reserved.

</div>
