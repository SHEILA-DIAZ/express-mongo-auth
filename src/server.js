import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Missing MONGO_URI. Configure it in .env before starting the server.');
  process.exitCode = 1;
} else {
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB Atlas');
      app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error('MongoDB connection failed:', err.name);
      process.exitCode = 1;
    });
}
