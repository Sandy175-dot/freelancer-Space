-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT DEFAULT 'Remote',
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  responsibilities TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  budget_min NUMERIC,
  budget_max NUMERIC,
  budget_type TEXT CHECK (budget_type IN ('fixed', 'hourly')) DEFAULT 'fixed',
  duration TEXT,
  experience_level TEXT CHECK (experience_level IN ('entry', 'intermediate', 'expert')) DEFAULT 'intermediate',
  project_type TEXT CHECK (project_type IN ('fixed price', 'hourly')) DEFAULT 'fixed price',
  skills TEXT[] DEFAULT '{}',
  status TEXT CHECK (status IN ('open', 'in-progress', 'completed', 'closed')) DEFAULT 'open',
  proposals_count INTEGER DEFAULT 0,
  client_rating NUMERIC DEFAULT 0,
  client_reviews INTEGER DEFAULT 0,
  client_jobs_posted INTEGER DEFAULT 0,
  client_hire_rate TEXT DEFAULT '0%',
  client_total_spent TEXT DEFAULT '₹0',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_jobs_client_id ON jobs(client_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view open jobs
CREATE POLICY "Anyone can view open jobs"
  ON jobs FOR SELECT
  USING (status = 'open');

-- Policy: Clients can view their own jobs
CREATE POLICY "Clients can view their own jobs"
  ON jobs FOR SELECT
  USING (auth.uid() = client_id);

-- Policy: Authenticated users can insert jobs
CREATE POLICY "Authenticated users can insert jobs"
  ON jobs FOR INSERT
  WITH CHECK (auth.uid() = client_id);

-- Policy: Clients can update their own jobs
CREATE POLICY "Clients can update their own jobs"
  ON jobs FOR UPDATE
  USING (auth.uid() = client_id);

-- Policy: Clients can delete their own jobs
CREATE POLICY "Clients can delete their own jobs"
  ON jobs FOR DELETE
  USING (auth.uid() = client_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- Bids table for proposals
-- ==========================================

CREATE TABLE IF NOT EXISTS bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bid_amount NUMERIC NOT NULL,
  proposal TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending','accepted','rejected')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- One bid per job per freelancer
CREATE UNIQUE INDEX IF NOT EXISTS uniq_bid_per_job_freelancer ON bids(job_id, freelancer_id);
CREATE INDEX IF NOT EXISTS idx_bids_job_id ON bids(job_id);
CREATE INDEX IF NOT EXISTS idx_bids_freelancer_id ON bids(freelancer_id);

ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- Freelancers can insert/select their own bids
CREATE POLICY "freelancers insert own bids"
  ON bids FOR INSERT
  WITH CHECK (auth.uid() = freelancer_id);

CREATE POLICY "freelancers select own bids"
  ON bids FOR SELECT
  USING (auth.uid() = freelancer_id);

-- Clients can view bids for their jobs
CREATE POLICY "clients select bids on their jobs"
  ON bids FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM jobs j WHERE j.id = bids.job_id AND j.client_id = auth.uid()
  ));

-- Clients can update bid status for their jobs
CREATE POLICY "clients update bids for their jobs"
  ON bids FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM jobs j WHERE j.id = bids.job_id AND j.client_id = auth.uid()
  ));

-- ==========================================
-- User Profiles (linked to auth.users)
-- ==========================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT UNIQUE,
  role TEXT CHECK (role IN ('freelancer','client','admin')) DEFAULT 'freelancer',
  avatar_url TEXT,
  skills TEXT[] DEFAULT '{}',
  bio TEXT,
  rating NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view all profiles (public directory style)
CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT
  USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Keep updated_at fresh
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profiles_updated_at();

-- Insert sample jobs data (Run this after setting up authentication)
-- Note: Replace 'YOUR_CLIENT_ID' with actual user UUID from auth.users table

-- Web Development Jobs
INSERT INTO jobs (title, company, location, description, requirements, responsibilities, category, budget_min, budget_max, duration, experience_level, project_type, skills, proposals_count, client_rating, client_reviews, client_jobs_posted, client_hire_rate, client_total_spent)
VALUES 
  ('Full Stack Developer Needed', 'Tech Solutions Inc.', 'Remote', 
   'Looking for an experienced full stack developer to build a modern web application using React and Node.js. The ideal candidate should have strong experience with REST APIs, database design, and cloud deployment.',
   ARRAY['5+ years of experience in full stack development', 'Expert knowledge of React, Node.js, and MongoDB', 'Experience with AWS or similar cloud platforms', 'Strong understanding of RESTful API design', 'Excellent problem-solving skills'],
   ARRAY['Design and develop scalable web applications', 'Write clean, maintainable code', 'Collaborate with the design team', 'Implement security and data protection', 'Participate in code reviews'],
   'web development', 3000, 5000, '2-3 months', 'expert', 'fixed price',
   ARRAY['React', 'Node.js', 'MongoDB', 'REST API'],
   12, 4.8, 45, 23, '85%', '₹125,000'),

  ('WordPress Developer for E-commerce Site', 'ShopEasy', 'Remote',
   'Need a WordPress expert to build and customize an e-commerce website with WooCommerce. Must have experience with payment gateway integration and custom theme development.',
   ARRAY['3+ years of WordPress development', 'Expert in WooCommerce', 'PHP and MySQL proficiency', 'Experience with payment gateways'],
   ARRAY['Build e-commerce website', 'Customize WooCommerce', 'Integrate payment systems', 'Optimize site performance'],
   'web development', 2000, 3000, '1 month', 'intermediate', 'fixed price',
   ARRAY['WordPress', 'WooCommerce', 'PHP', 'CSS'],
   8, 4.6, 28, 15, '78%', '₹52,000'),

  ('Frontend React Developer', 'WebCraft Studios', 'Remote',
   'Seeking a skilled React developer to create responsive and interactive user interfaces. Experience with TypeScript and modern CSS frameworks required.',
   ARRAY['4+ years of React development', 'TypeScript proficiency', 'Experience with Tailwind CSS', 'Strong UI/UX understanding'],
   ARRAY['Build responsive React components', 'Implement state management', 'Write unit tests', 'Optimize performance'],
   'web development', 3500, 5000, '2 months', 'expert', 'fixed price',
   ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
   10, 4.9, 67, 34, '90%', '₹215,000');

-- Mobile Apps Jobs
INSERT INTO jobs (title, company, location, description, requirements, responsibilities, category, budget_min, budget_max, duration, experience_level, project_type, skills, proposals_count, client_rating, client_reviews, client_jobs_posted, client_hire_rate, client_total_spent)
VALUES 
  ('Mobile App Developer (iOS)', 'AppMakers LLC', 'Remote',
   'Looking for an iOS developer to build a native mobile application with modern Swift. App Store submission experience required.',
   ARRAY['4+ years of iOS development experience', 'Expert knowledge of Swift and SwiftUI', 'Experience with Core Data and networking', 'Published apps on the App Store'],
   ARRAY['Develop native iOS application', 'Implement REST API integration', 'Write unit and UI tests', 'Submit app to App Store'],
   'mobile apps', 4000, 6000, '3 months', 'expert', 'fixed price',
   ARRAY['Swift', 'iOS Development', 'UI Kit', 'Core Data'],
   9, 4.9, 67, 34, '90%', '₹215,000'),

  ('React Native Developer', 'MobileFirst Inc.', 'Remote',
   'Build a cross-platform mobile app for iOS and Android using React Native. Firebase integration needed.',
   ARRAY['3+ years of React Native experience', 'JavaScript/TypeScript proficiency', 'Firebase experience', 'Published apps on both platforms'],
   ARRAY['Develop cross-platform mobile app', 'Integrate Firebase services', 'Implement push notifications', 'Test on multiple devices'],
   'mobile apps', 3500, 5000, '2 months', 'intermediate', 'fixed price',
   ARRAY['React Native', 'JavaScript', 'Redux', 'Firebase'],
   14, 4.7, 38, 19, '82%', '₹95,000'),

  ('Android App Developer', 'DroidApps', 'Remote',
   'Develop a native Android application with modern architecture and best practices. Kotlin and Jetpack Compose required.',
   ARRAY['3+ years of Android development', 'Expert in Kotlin', 'Experience with Jetpack Compose', 'MVVM architecture knowledge'],
   ARRAY['Build native Android app', 'Implement modern UI', 'Write clean architecture code', 'Publish to Google Play'],
   'mobile apps', 3000, 4500, '2 months', 'intermediate', 'fixed price',
   ARRAY['Kotlin', 'Android', 'Jetpack Compose', 'MVVM'],
   11, 4.5, 22, 12, '75%', '₹48,000');

-- Design Jobs
INSERT INTO jobs (title, company, location, description, requirements, responsibilities, category, budget_min, budget_max, duration, experience_level, project_type, skills, proposals_count, client_rating, client_reviews, client_jobs_posted, client_hire_rate, client_total_spent)
VALUES 
  ('UI/UX Designer for Mobile App', 'StartupXYZ', 'Remote',
   'Need a creative UI/UX designer to design a user-friendly mobile app interface. Looking for someone who can create beautiful, intuitive designs.',
   ARRAY['3+ years of UI/UX design experience', 'Proficiency in Figma and Adobe XD', 'Strong portfolio of mobile app designs', 'Understanding of iOS and Android design guidelines'],
   ARRAY['Create wireframes and prototypes', 'Design intuitive user interfaces', 'Conduct user research', 'Collaborate with developers'],
   'design', 2000, 3000, '1 month', 'intermediate', 'fixed price',
   ARRAY['Figma', 'Adobe XD', 'Mobile Design', 'Prototyping'],
   8, 4.5, 12, 8, '75%', '₹32,000'),

  ('Logo & Brand Identity Designer', 'BrandWorks', 'Remote',
   'Create a complete brand identity including logo, color palette, and brand guidelines for a new tech startup.',
   ARRAY['5+ years of brand design experience', 'Expert in Illustrator and Photoshop', 'Strong portfolio of logos', 'Understanding of brand strategy'],
   ARRAY['Design unique logo', 'Create brand guidelines', 'Design marketing materials', 'Provide multiple concepts'],
   'design', 800, 1500, '2 weeks', 'expert', 'fixed price',
   ARRAY['Illustrator', 'Photoshop', 'Logo Design', 'Branding'],
   15, 4.8, 45, 28, '85%', '₹78,000'),

  ('Web Designer for Landing Pages', 'ConvertPro', 'Remote',
   'Design high-converting landing pages for marketing campaigns. Must understand conversion optimization.',
   ARRAY['3+ years of web design experience', 'Figma proficiency', 'Understanding of UX principles', 'Portfolio of landing pages'],
   ARRAY['Design landing page layouts', 'Create responsive designs', 'Optimize for conversions', 'Collaborate with marketing team'],
   'design', 1200, 2000, '3 weeks', 'intermediate', 'fixed price',
   ARRAY['Figma', 'Web Design', 'UI/UX', 'Responsive Design'],
   12, 4.6, 33, 18, '78%', '₹56,000');

-- Writing Jobs
INSERT INTO jobs (title, company, location, description, requirements, responsibilities, category, budget_min, budget_max, duration, experience_level, project_type, skills, proposals_count, client_rating, client_reviews, client_jobs_posted, client_hire_rate, client_total_spent)
VALUES 
  ('Content Writer for Blog', 'Digital Marketing Co.', 'Remote',
   'Seeking an experienced content writer to create engaging blog posts about technology. SEO knowledge required.',
   ARRAY['2+ years of content writing experience', 'Strong SEO knowledge', 'Excellent research skills', 'Portfolio of published articles'],
   ARRAY['Write 5-7 blog posts per week', 'Conduct keyword research', 'Optimize content for SEO', 'Edit and proofread content'],
   'writing', 500, 1000, '1 week', 'intermediate', 'fixed price',
   ARRAY['SEO Writing', 'Blog Writing', 'Research', 'Copywriting'],
   15, 4.7, 28, 15, '80%', '₹45,000'),

  ('Technical Writer for Documentation', 'SoftwareCo', 'Remote',
   'Write comprehensive technical documentation for software products. Developer background preferred.',
   ARRAY['3+ years of technical writing', 'Understanding of software development', 'Markdown proficiency', 'API documentation experience'],
   ARRAY['Write user guides', 'Create API documentation', 'Maintain knowledge base', 'Collaborate with developers'],
   'writing', 1500, 2500, '1 month', 'expert', 'fixed price',
   ARRAY['Technical Writing', 'API Documentation', 'Markdown', 'Git'],
   7, 4.8, 41, 22, '87%', '₹92,000'),

  ('Copywriter for Marketing Campaigns', 'AdGenius', 'Remote',
   'Create compelling copy for email campaigns, social media, and advertisements. Marketing experience required.',
   ARRAY['3+ years of copywriting', 'Marketing experience', 'Persuasive writing skills', 'Portfolio of campaigns'],
   ARRAY['Write email copy', 'Create social media content', 'Develop ad campaigns', 'A/B test copy variations'],
   'writing', 1000, 2000, '2 weeks', 'intermediate', 'fixed price',
   ARRAY['Copywriting', 'Marketing', 'Persuasive Writing', 'Brand Voice'],
   13, 4.5, 19, 11, '73%', '₹34,000');

-- Marketing Jobs
INSERT INTO jobs (title, company, location, description, requirements, responsibilities, category, budget_min, budget_max, duration, experience_level, project_type, skills, proposals_count, client_rating, client_reviews, client_jobs_posted, client_hire_rate, client_total_spent)
VALUES 
  ('Social Media Marketing Manager', 'Brand Boost', 'Remote',
   'Need a social media expert to manage and grow our social media presence across multiple platforms.',
   ARRAY['3+ years of social media marketing experience', 'Proven track record of growing social accounts', 'Experience with Instagram, Facebook, Twitter, LinkedIn', 'Strong analytics skills'],
   ARRAY['Create content calendar', 'Post daily content', 'Engage with followers', 'Analyze performance metrics'],
   'marketing', 1500, 2500, '1 month', 'intermediate', 'fixed price',
   ARRAY['Social Media', 'Content Strategy', 'Analytics', 'Engagement'],
   18, 4.6, 22, 11, '78%', '₹38,000'),

  ('SEO Specialist', 'RankHigh', 'Remote',
   'Optimize website for search engines and improve organic traffic. Must have proven SEO results.',
   ARRAY['4+ years of SEO experience', 'Google Analytics proficiency', 'Keyword research expertise', 'Link building experience'],
   ARRAY['Conduct SEO audits', 'Optimize website content', 'Build quality backlinks', 'Track and report metrics'],
   'marketing', 1200, 2000, '1 month', 'expert', 'fixed price',
   ARRAY['SEO', 'Google Analytics', 'Keyword Research', 'Link Building'],
   9, 4.8, 52, 27, '85%', '₹118,000'),

  ('Email Marketing Campaign Manager', 'EmailPro', 'Remote',
   'Design and execute email marketing campaigns to boost conversions. Mailchimp experience required.',
   ARRAY['2+ years of email marketing', 'Mailchimp expertise', 'A/B testing experience', 'Copywriting skills'],
   ARRAY['Design email templates', 'Write compelling copy', 'Segment email lists', 'Analyze campaign performance'],
   'marketing', 1000, 1800, '3 weeks', 'intermediate', 'fixed price',
   ARRAY['Email Marketing', 'Mailchimp', 'A/B Testing', 'Automation'],
   16, 4.5, 24, 13, '77%', '₹42,000');

-- Data Entry Jobs
INSERT INTO jobs (title, company, location, description, requirements, responsibilities, category, budget_min, budget_max, duration, experience_level, project_type, skills, proposals_count, client_rating, client_reviews, client_jobs_posted, client_hire_rate, client_total_spent)
VALUES 
  ('Data Entry Specialist', 'Global Corp', 'Remote',
   'Looking for detail-oriented individual for data entry and organization tasks. High accuracy required.',
   ARRAY['1+ years of data entry experience', 'Excellent attention to detail', 'Fast typing speed (60+ WPM)', 'Proficiency in Excel'],
   ARRAY['Enter data into spreadsheets', 'Verify data accuracy', 'Organize digital files', 'Generate reports'],
   'data entry', 300, 500, '2 weeks', 'entry', 'fixed price',
   ARRAY['Excel', 'Data Entry', 'Attention to Detail', 'Fast Typing'],
   25, 4.4, 15, 19, '70%', '₹22,000'),

  ('Excel Data Processing', 'DataCorp', 'Remote',
   'Process and organize large datasets in Excel with formulas and pivot tables.',
   ARRAY['2+ years of Excel experience', 'Advanced formula knowledge', 'Pivot table expertise', 'Data cleaning experience'],
   ARRAY['Clean and organize data', 'Create formulas and pivot tables', 'Generate reports', 'Maintain data accuracy'],
   'data entry', 400, 700, '1 week', 'intermediate', 'fixed price',
   ARRAY['Excel', 'Data Processing', 'Formulas', 'Pivot Tables'],
   18, 4.3, 11, 8, '68%', '₹18,000'),

  ('Virtual Assistant - Data Management', 'Admin Solutions', 'Remote',
   'Manage data entry, organize files, and maintain databases. CRM experience preferred.',
   ARRAY['1+ years as virtual assistant', 'Organizational skills', 'Google Sheets proficiency', 'CRM experience helpful'],
   ARRAY['Enter data into CRM', 'Organize digital files', 'Maintain databases', 'Respond to emails'],
   'data entry', 500, 800, '2 weeks', 'entry', 'fixed price',
   ARRAY['Data Entry', 'Organization', 'Google Sheets', 'CRM'],
   20, 4.5, 17, 12, '72%', '₹28,000');
