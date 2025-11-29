# Supabase Database Setup for Job Posting & Bidding System

## Quick Setup Instructions

### 1. Run the Migration

Go to your Supabase project dashboard:
1. Navigate to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `migrations/create_jobs_and_bids.sql`
4. Click **Run** to execute the migration

### 2. Verify Tables

After running the migration, verify that the following tables were created:
- `jobs` - Stores job postings
- `bids` - Stores freelancer bids on jobs

### 3. Enable Realtime (Optional but Recommended)

For realtime bid notifications:
1. Go to **Database** → **Replication**
2. Enable replication for the `bids` table
3. This allows clients to see new bids instantly

## Database Schema

### Jobs Table
- `id` - UUID primary key
- `title` - Job title
- `description` - Job description
- `budget` - Job budget (decimal)
- `category` - Job category
- `tags` - Array of skill tags
- `deadline` - Project deadline
- `client_id` - Foreign key to profiles
- `status` - Job status (open/closed/in_progress/completed)
- `created_at` - Timestamp
- `updated_at` - Timestamp

### Bids Table
- `id` - UUID primary key
- `job_id` - Foreign key to jobs
- `freelancer_id` - Foreign key to profiles
- `bid_amount` - Bid amount (decimal)
- `proposal` - Freelancer's proposal text
- `status` - Bid status (pending/accepted/rejected)
- `created_at` - Timestamp
- `updated_at` - Timestamp

## Row Level Security (RLS)

The migration automatically sets up RLS policies:

### Jobs Policies
- Anyone can view open jobs
- Clients can only manage their own jobs
- Clients can insert, update, and delete their jobs

### Bids Policies
- Freelancers can view their own bids
- Clients can view bids on their jobs
- Freelancers can create and update their pending bids
- Clients can update bid status (accept/reject)

## Testing the Setup

After running the migration, you can test with these SQL queries:

```sql
-- Test: Insert a job (replace client_id with actual user ID)
INSERT INTO jobs (title, description, budget, category, deadline, client_id)
VALUES ('Test Job', 'This is a test job', 1000, 'Web Development', NOW() + INTERVAL '7 days', 'your-user-id');

-- Test: View all jobs
SELECT * FROM jobs;

-- Test: Insert a bid (replace job_id and freelancer_id)
INSERT INTO bids (job_id, freelancer_id, bid_amount, proposal)
VALUES ('job-id', 'freelancer-id', 900, 'I can complete this project');

-- Test: View all bids
SELECT * FROM bids;
```

## Troubleshooting

### Issue: Tables not created
- Make sure you're running the SQL in the correct project
- Check for syntax errors in the SQL editor

### Issue: RLS blocking queries
- Verify you're authenticated when testing
- Check that user IDs match the foreign keys

### Issue: Realtime not working
- Enable replication for the tables
- Check that you've subscribed to the correct channel in the code

## Next Steps

After setting up the database:
1. Test job posting from the client dashboard
2. Test job browsing from the freelancer dashboard
3. Test bid submission
4. Verify realtime updates are working
