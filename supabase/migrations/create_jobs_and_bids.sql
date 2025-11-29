-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  budget DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bids table
CREATE TABLE IF NOT EXISTS bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  bid_amount DECIMAL(10, 2) NOT NULL,
  proposal TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, freelancer_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_jobs_client_id ON jobs(client_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bids_job_id ON bids(job_id);
CREATE INDEX IF NOT EXISTS idx_bids_freelancer_id ON bids(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_bids_status ON bids(status);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- Jobs policies
CREATE POLICY "Anyone can view open jobs" ON jobs
  FOR SELECT USING (status = 'open' OR auth.uid() = client_id);

CREATE POLICY "Clients can insert their own jobs" ON jobs
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can update their own jobs" ON jobs
  FOR UPDATE USING (auth.uid() = client_id);

CREATE POLICY "Clients can delete their own jobs" ON jobs
  FOR DELETE USING (auth.uid() = client_id);

-- Bids policies
CREATE POLICY "Job owners and bid owners can view bids" ON bids
  FOR SELECT USING (
    auth.uid() = freelancer_id OR 
    auth.uid() IN (SELECT client_id FROM jobs WHERE id = bids.job_id)
  );

CREATE POLICY "Freelancers can insert their own bids" ON bids
  FOR INSERT WITH CHECK (auth.uid() = freelancer_id);

CREATE POLICY "Freelancers can update their own pending bids" ON bids
  FOR UPDATE USING (auth.uid() = freelancer_id AND status = 'pending');

CREATE POLICY "Job owners can update bid status" ON bids
  FOR UPDATE USING (
    auth.uid() IN (SELECT client_id FROM jobs WHERE id = bids.job_id)
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bids_updated_at BEFORE UPDATE ON bids
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
