import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { config } from './config/env';
import { apiRoutes } from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { logger } from './utils/logger';
import { apiResponse } from './utils/apiResponse';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Standard Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Serve static files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// API Routes
// Note: We use /api/v1 for versioning
app.use('/api/v1', apiRoutes);

// 404 Handler
app.use((req, res) => {
  apiResponse.error(res, 404, `Route ${req.method} ${req.url} not found`);
});

// Global Error Handler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
