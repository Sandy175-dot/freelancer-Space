# FreelanceHub Backend API

Node.js/Express backend with PostgreSQL database for the FreelanceHub platform.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### 1. Install PostgreSQL

Make sure PostgreSQL is installed and running on your system.

**Windows:**
- Download from https://www.postgresql.org/download/windows/
- Default port: 5432
- Remember your postgres user password

**Check if PostgreSQL is running:**
```bash
psql --version
```

### 2. Install Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment

Copy `.env.example` to `.env` and update with your PostgreSQL credentials:

```bash
cp .env.example .env
```

Edit `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=freelancehub
DB_USER=postgres
DB_PASSWORD=your_postgres_password
```

### 4. Setup Database

This will create the database, tables, and insert sample data:

```bash
npm run db:setup
```

### 5. Start Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on http://localhost:5000

## API Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "freelancer" // or "client"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Jobs

#### Get All Jobs
```http
GET /api/jobs?category=web%20development&status=open&search=react
```

#### Get Single Job
```http
GET /api/jobs/:id
```

#### Create Job (Client only)
```http
POST /api/jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Build a Website",
  "description": "Need a modern website",
  "category": "web development",
  "budget_min": 1000,
  "budget_max": 3000,
  "duration": "1 month",
  "location": "Remote",
  "skills": ["React", "Node.js"]
}
```

#### Update Job
```http
PUT /api/jobs/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "completed"
}
```

#### Delete Job
```http
DELETE /api/jobs/:id
Authorization: Bearer <token>
```

### Bids

#### Get Bids for Job
```http
GET /api/bids/job/:jobId
Authorization: Bearer <token>
```

#### Get My Bids (Freelancer)
```http
GET /api/bids/my-bids
Authorization: Bearer <token>
```

#### Create Bid (Freelancer only)
```http
POST /api/bids
Authorization: Bearer <token>
Content-Type: application/json

{
  "job_id": 1,
  "bid_amount": 2500,
  "proposal": "I can complete this project...",
  "estimated_duration": "3 weeks",
  "portfolio_link": "https://myportfolio.com"
}
```

#### Accept Bid (Client only)
```http
PUT /api/bids/:id/accept
Authorization: Bearer <token>
```

## Database Schema

### Users
- id, email, password, name, role, avatar, bio, skills, hourly_rate, location, phone, website

### Jobs
- id, client_id, title, description, category, budget_min, budget_max, duration, location, skills, status

### Bids
- id, job_id, freelancer_id, bid_amount, proposal, estimated_duration, portfolio_link, status

### Projects
- id, job_id, client_id, freelancer_id, bid_id, title, description, budget, status

### Messages
- id, sender_id, receiver_id, project_id, content, is_read

### Reviews
- id, project_id, reviewer_id, reviewee_id, rating, comment

### Payments
- id, project_id, payer_id, payee_id, amount, status, payment_method, transaction_id

## Default Test Accounts

After running `npm run db:setup`, you can use these accounts:

**Client:**
- Email: client@test.com
- Password: password123

**Freelancer:**
- Email: freelancer@test.com
- Password: password123

**Admin:**
- Email: admin@test.com
- Password: password123

## Testing the API

### Using curl:

```bash
# Health check
curl http://localhost:5000/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123","name":"Test User","role":"freelancer"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# Get jobs
curl http://localhost:5000/api/jobs
```

### Using Postman or Thunder Client:

Import the endpoints above and test with the VS Code extensions.

## Troubleshooting

### Database Connection Error

1. Check if PostgreSQL is running:
```bash
# Windows
pg_ctl status

# Or check services
services.msc
```

2. Verify credentials in `.env` file

3. Test connection:
```bash
psql -U postgres -h localhost
```

### Port Already in Use

Change PORT in `.env` file:
```env
PORT=5001
```

## Project Structure

```
server/
├── config/
│   └── database.js       # Database connection
├── middleware/
│   └── auth.js          # Authentication middleware
├── routes/
│   ├── auth.js          # Auth routes
│   ├── jobs.js          # Job routes
│   └── bids.js          # Bid routes
├── scripts/
│   └── setupDatabase.js # Database setup script
├── .env                 # Environment variables
├── .env.example         # Example env file
├── package.json         # Dependencies
├── server.js            # Main server file
└── README.md           # This file
```

## Next Steps

1. Connect frontend to backend API
2. Add more routes (users, projects, messages, reviews, payments)
3. Add file upload for avatars and portfolios
4. Implement real-time messaging with Socket.io
5. Add payment integration (Stripe/Razorpay)
6. Add email notifications
7. Implement search with full-text search
8. Add rate limiting and security headers
