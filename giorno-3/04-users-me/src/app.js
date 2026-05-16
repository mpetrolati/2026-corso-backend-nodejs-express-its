import express from 'express';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth',  authRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => res.status(404).json({ errore: 'Route non trovata' }));
app.use(errorHandler);

export default app;
