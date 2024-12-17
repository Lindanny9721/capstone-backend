import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './db/db.js';
import planRoutes from './routes/planRoutes.js';
import userRoutes from './routes/userRoutes.js';
import placeRoutes from './routes/placeRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
connectDB();

app.use('/users', userRoutes);
app.use('/plans', planRoutes);
app.use('/apiPlaces', placeRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
