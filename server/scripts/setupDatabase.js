import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

const setupDatabase = async () => {
  // First connect to postgres database to create our database
  const dbPassword = (process.env.DB_PASSWORD || 'postgres').trim();
  
  // Debug: Show what we're trying to connect with
  console.log('Attempting connection with:');
  console.log('  Host:', process.env.DB_HOST || 'localhost');
  console.log('  Port:', process.env.DB_PORT || 5432);
  console.log('  User:', process.env.DB_USER || 'postgres');
  console.log('  Password length:', dbPassword.length);
  console.log('  Password (first 3 chars):', dbPassword.substring(0, 3) + '***');
  console.log('');
  
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: 'postgres',
    user: process.env.DB_USER || 'postgres',
    password: dbPassword,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'freelancehub';
    await client.query(`DROP DATABASE IF EXISTS ${dbName}`);
    await client.query(`CREATE DATABASE ${dbName}`);
    console.log(`✅ Database '${dbName}' created successfully`);

    await client.end();

    // Connect to the new database to create tables
    const appClient = new Client({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      database: dbName,
      user: process.env.DB_USER || 'postgres',
      password: dbPassword,
    });

    await appClient.connect();

    // Create tables
    await appClient.query(`
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('freelancer', 'client', 'admin')),
        avatar VARCHAR(500),
        bio TEXT,
        skills TEXT[],
        hourly_rate DECIMAL(10, 2),
        location VARCHAR(255),
        phone VARCHAR(50),
        website VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Jobs/Projects table
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(500) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        budget_min DECIMAL(10, 2),
        budget_max DECIMAL(10, 2),
        duration VARCHAR(100),
        location VARCHAR(255) DEFAULT 'Remote',
        skills TEXT[],
        status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Bids/Proposals table
      CREATE TABLE IF NOT EXISTS bids (
        id SERIAL PRIMARY KEY,
        job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
        freelancer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        bid_amount DECIMAL(10, 2) NOT NULL,
        proposal TEXT NOT NULL,
        estimated_duration VARCHAR(100),
        portfolio_link VARCHAR(500),
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(job_id, freelancer_id)
      );

      -- Projects (accepted jobs)
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
        client_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        freelancer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        bid_id INTEGER REFERENCES bids(id) ON DELETE SET NULL,
        title VARCHAR(500) NOT NULL,
        description TEXT,
        budget DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled', 'disputed')),
        start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        end_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Messages table
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Reviews table
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        reviewer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        reviewee_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(project_id, reviewer_id)
      );

      -- Payments table
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        payer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        payee_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
        payment_method VARCHAR(100),
        transaction_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create indexes for better performance
      CREATE INDEX idx_jobs_client ON jobs(client_id);
      CREATE INDEX idx_jobs_status ON jobs(status);
      CREATE INDEX idx_jobs_category ON jobs(category);
      CREATE INDEX idx_bids_job ON bids(job_id);
      CREATE INDEX idx_bids_freelancer ON bids(freelancer_id);
      CREATE INDEX idx_projects_client ON projects(client_id);
      CREATE INDEX idx_projects_freelancer ON projects(freelancer_id);
      CREATE INDEX idx_messages_sender ON messages(sender_id);
      CREATE INDEX idx_messages_receiver ON messages(receiver_id);
      CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id);
    `);

    console.log('✅ All tables created successfully');

    // Insert sample data
    await appClient.query(`
      -- Insert sample users
      INSERT INTO users (email, password, name, role, bio, skills, hourly_rate, location) VALUES
      ('client@test.com', '$2a$10$YourHashedPasswordHere', 'John Client', 'client', 'Looking for talented freelancers', NULL, NULL, 'New York, USA'),
      ('freelancer@test.com', '$2a$10$YourHashedPasswordHere', 'Jane Freelancer', 'freelancer', 'Full Stack Developer with 5+ years experience', ARRAY['React', 'Node.js', 'PostgreSQL'], 50.00, 'Remote'),
      ('admin@test.com', '$2a$10$YourHashedPasswordHere', 'Admin User', 'admin', 'Platform Administrator', NULL, NULL, 'Remote');

      -- Insert sample jobs
      INSERT INTO jobs (client_id, title, description, category, budget_min, budget_max, duration, skills, status) VALUES
      (1, 'Build a Modern E-commerce Website', 'Need a full-stack developer to build a modern e-commerce platform with React and Node.js', 'web development', 3000, 5000, '2-3 months', ARRAY['React', 'Node.js', 'MongoDB', 'REST API'], 'open'),
      (1, 'Mobile App UI/UX Design', 'Design a beautiful and intuitive mobile app interface for fitness tracking', 'design', 2000, 4000, '1 month', ARRAY['Figma', 'UI/UX', 'Mobile Design'], 'open'),
      (1, 'Content Writer for Tech Blog', 'Write engaging articles about latest technology trends', 'writing', 1500, 2500, '2 weeks', ARRAY['Content Writing', 'SEO', 'Technology'], 'open');
    `);

    console.log('✅ Sample data inserted successfully');

    await appClient.end();
    console.log('✅ Database setup completed!');
    console.log('\n📝 Default credentials:');
    console.log('   Client: client@test.com / password123');
    console.log('   Freelancer: freelancer@test.com / password123');
    console.log('   Admin: admin@test.com / password123');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
};

setupDatabase();
