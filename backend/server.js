const express = require('express');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();
const { requestLogger, authLogger, errorLogger } = require('./middleware/logger');

const app = express();
const port = process.env.PORT || 5000;

// Enable gzip/brotli compression for all responses
app.use(compression());

// CORS configuration with detailed logging
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or same-origin)
    if (!origin) {
      console.log('[CORS] ✓ Request with no origin (Postman/same-origin) - ALLOWED');
      return callback(null, true);
    }
    
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:5173', // Vite dev server
      'http://localhost:5174', // Vite dev server (alternative port)
      'http://localhost:5175', // Vite dev server (another alternative)
      'http://localhost:3000', // Alternative dev server
      'https://bloomswiftpos.com', // Cloudflare Pages primary domain
      'https://www.bloomswiftpos.com', // Cloudflare Pages www subdomain
      'https://bloomswiftpos-pages.pages.dev' // Cloudflare Pages default domain (if needed)
    ].filter(Boolean); // Remove undefined values

    console.log(`[CORS] Checking origin: ${origin}`);
    console.log(`[CORS] Allowed origins: ${allowedOrigins.join(', ')}`);

    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log(`[CORS] ✓ Origin ${origin} - ALLOWED`);
      callback(null, true);
    } else {
      authLogger.corsBlocked(origin, allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' })); // Increased limit for image uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Add request logging middleware (after body parsers, before routes)
app.use(requestLogger);

const testRoutes = require('./routes/testRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const serviceRequestRoutes = require('./routes/serviceRequestRoutes');
const hardwareRoutes = require('./routes/hardwareRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/test', testRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/service-requests', serviceRequestRoutes);
app.use('/api/hardware', hardwareRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('BloomSwiftPOS Backend is running!');
});

// Health check endpoint for Railway keep-alive
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Static asset caching headers (if serving static files in future)
app.use((req, res, next) => {
  // Cache static assets for 1 year
  if (req.url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|woff|woff2|ttf|css|js)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  next();
});

// Error handling middleware (must be last)
app.use(errorLogger);

app.listen(port, () => {
  console.log('\n' + '='.repeat(60));
  console.log(`🚀 BloomSwiftPOS Backend Server Started`);
  console.log(`📍 Port: ${port}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'Not set'}`);
  console.log(`📝 Logging: Enabled (logs/access.log, logs/auth.log, logs/error.log)`);
  console.log(`🔒 CORS: Configured`);
  console.log('='.repeat(60) + '\n');
});

process.on('uncaughtException', (err) => {
  console.error('\n❌ UNCAUGHT EXCEPTION:');
  console.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('\n❌ UNHANDLED REJECTION:');
  console.error('Promise:', promise);
  console.error('Reason:', reason);
});
