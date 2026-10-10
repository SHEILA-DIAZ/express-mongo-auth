import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
import seedRoles from './utils/seedRoles.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI || !process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error('Configure MONGO_URI and a JWT_SECRET of at least 32 characters.');
  process.exitCode = 1;
} else {
  mongoose.connect(MONGO_URI)
    .then(async () => {
      await seedRoles();
      console.log('Connected to MongoDB Atlas');
      app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error('MongoDB connection failed:', err.name);
      process.exitCode = 1;
    });
}
