import pg from 'pg';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const { Client } = pg;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const testConnection = async (password) => {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'postgres',
    user: process.env.DB_USER || 'postgres',
    password: password,
  });

  try {
    await client.connect();
    console.log('✅ Connection successful!');
    await client.end();
    return true;
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    return false;
  }
};

const promptPassword = () => {
  return new Promise((resolve) => {
    rl.question('Enter your PostgreSQL password: ', (password) => {
      resolve(password);
    });
  });
};

const main = async () => {
  console.log('🔍 Testing PostgreSQL connection...\n');
  console.log('Current settings:');
  console.log(`  Host: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`  Port: ${process.env.DB_PORT || 5432}`);
  console.log(`  User: ${process.env.DB_USER || 'postgres'}`);
  console.log(`  Password from .env: ${process.env.DB_PASSWORD}\n`);

  // First try with password from .env
  console.log('Trying password from .env file...');
  const envSuccess = await testConnection(process.env.DB_PASSWORD);

  if (envSuccess) {
    console.log('\n✅ Your .env file is configured correctly!');
    console.log('You can now run: npm run db:setup');
    rl.close();
    return;
  }

  console.log('\n❌ Password in .env file is incorrect.');
  console.log('Let\'s try to find the correct password...\n');

  // Try common passwords
  const commonPasswords = ['postgres', 'admin', 'password', 'root', '123456'];
  
  for (const pwd of commonPasswords) {
    console.log(`Trying password: "${pwd}"...`);
    const success = await testConnection(pwd);
    if (success) {
      console.log(`\n✅ Found working password: "${pwd}"`);
      console.log('\nUpdate your server/.env file with:');
      console.log(`DB_PASSWORD=${pwd}`);
      rl.close();
      return;
    }
  }

  // Ask user for password
  console.log('\nCommon passwords didn\'t work. Please enter your password manually:');
  const userPassword = await promptPassword();
  
  const success = await testConnection(userPassword);
  if (success) {
    console.log('\n✅ Password works!');
    console.log('\nUpdate your server/.env file with:');
    console.log(`DB_PASSWORD=${userPassword}`);
  } else {
    console.log('\n❌ Password still doesn\'t work.');
    console.log('\nPlease check:');
    console.log('1. PostgreSQL is installed and running');
    console.log('2. You\'re using the correct password');
    console.log('3. PostgreSQL is listening on localhost:5432');
  }

  rl.close();
};

main();
