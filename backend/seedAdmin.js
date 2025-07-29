// edvenger/backend/seedAdmin.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import connectDB from './config/db.js';

const ADMIN_NAME = 'Elix';
const ADMIN_EMAIL = 'stembot2025@gmail.com'; // Change as desired
const ADMIN_PASSWORD = 'Stem@2025'; // Change as desired

async function seedAdmin() {
  await connectDB();

  // Check if admin already exists
  const existing = await User.findOne({ email: ADMIN_EMAIL, role: 'admin' });
  if (existing) {
    console.log('✅ Admin user already exists.');
    process.exit(0);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  // Create the admin user
  await User.create({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    password: hashedPassword,
    role: 'admin'
    // No institute field needed for admin
  });

  console.log('✅ Admin user created successfully!');
  process.exit(0);
}

seedAdmin().catch(err => {
  console.error('❌ Error seeding admin:', err);
  process.exit(1);
});