import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';

const app = express();
const sourceDirectory = path.dirname(fileURLToPath(import.meta.url));
app.set('view engine', 'ejs');
app.set('views', path.join(sourceDirectory, 'views'));
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.redirect('/signIn'));
for (const page of ['signIn', 'signUp', 'dashboard-user', 'dashboard-admin', 'profile']) {
  app.get(`/${page}`, (req, res) => res.render(page));
}
app.get('/403', (req, res) => res.status(403).render('403'));
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'express-auth-diaz' });
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'Ruta no encontrada' });
  }
  res.status(404).render('404');
});

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid user data or ID' });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Email already exists' });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON' });
  }
  console.error('Request failed:', err.name);
  const status = Number.isInteger(err.status) ? err.status : 500;
  res.status(status).json({ message: status < 500 ? err.message : 'Internal server error' });
});

export default app;
