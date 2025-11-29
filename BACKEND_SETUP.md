# Backend Setup Guide

## Quick Start

### 1. Install PostgreSQL

**Windows:**
```bash
# Download and install from:
https://www.postgresql.org/download/windows/

# During installation:
- Port: 5432 (default)
- Set a password for postgres user (remember this!)
```

### 2. Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Setup database (creates DB, tables, and sample data)
npm run db:setup

# Start the server
npm run dev
```

### 3. Test the API

Open http://localhost:5000/health in your browser

You should see:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2024-..."
}
```

## Default Test Credentials

**Client Account:**
- Email: `client@test.com`
- Password: `password123`

**Freelancer Account:**
- Email: `freelancer@test.com`
- Password: `password123`

## API Base URL

```
http://localhost:5000/api
```

## Common Issues

### Issue: "password authentication failed"

**Solution:** Update `server/.env` with your PostgreSQL password:
```env
DB_PASSWORD=your_actual_postgres_password
```

### Issue: "database does not exist"

**Solution:** Run the setup script:
```bash
cd server
npm run db:setup
```

### Issue: "Port 5000 already in use"

**Solution:** Change port in `server/.env`:
```env
PORT=5001
```

## Next: Connect Frontend to Backend

Update `src/lib/supabaseClient.js` to use the local backend:

```javascript
const API_URL = 'http://localhost:5000/api';

export const jobsAPI = {
  getAllJobs: async () => {
    const response = await fetch(`${API_URL}/jobs`);
    return response.json();
  },
  // ... other methods
};
```

## Full Documentation

See `server/README.md` for complete API documentation.
