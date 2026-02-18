const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Helper to format timestamp
const getTimestamp = () => {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
};

// Helper to write to log file
const writeToLog = (filename, message) => {
  const logPath = path.join(logsDir, filename);
  const logEntry = `[${getTimestamp()}] ${message}\n`;
  fs.appendFileSync(logPath, logEntry);
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const { method, originalUrl, headers } = req;
  const origin = headers.origin || headers.referer || 'unknown';

  // Log the incoming request
  const requestLog = `${method} ${originalUrl} from ${origin}`;
  console.log(`\n${'='.repeat(60)}`);
  console.log(`[REQUEST] ${requestLog}`);
  writeToLog('access.log', requestLog);

  // Capture the response
  const originalSend = res.send;
  res.send = function (data) {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    const statusIcon = statusCode >= 200 && statusCode < 300 ? '✓' : '✗';
    
    const responseLog = `${statusIcon} ${method} ${originalUrl} - Status: ${statusCode} (${duration}ms)`;
    console.log(`[RESPONSE] ${responseLog}`);
    writeToLog('access.log', responseLog);
    
    if (statusCode >= 400) {
      writeToLog('error.log', `${responseLog} | Data: ${data}`);
    }
    
    console.log(`${'='.repeat(60)}\n`);
    
    originalSend.call(this, data);
  };

  next();
};

// Auth-specific logging
const authLogger = {
  loginAttempt: (email, origin) => {
    const message = `Login attempt for: ${email} from ${origin}`;
    console.log(`[AUTH] ${message}`);
    writeToLog('auth.log', message);
  },
  
  loginSuccess: (email, role) => {
    const message = `✓ Login successful for: ${email} (${role})`;
    console.log(`[AUTH] ${message}`);
    writeToLog('auth.log', message);
  },
  
  loginFailed: (email, reason) => {
    const message = `✗ Login failed for: ${email} - Reason: ${reason}`;
    console.log(`[AUTH] ${message}`);
    writeToLog('auth.log', message);
  },
  
  corsBlocked: (origin, allowedOrigins) => {
    const message = `✗ CORS BLOCKED - Origin: ${origin} | Allowed: ${allowedOrigins.join(', ')}`;
    console.error(`[CORS] ${message}`);
    writeToLog('error.log', message);
  },
  
  databaseError: (operation, error) => {
    const message = `✗ Database error during ${operation}: ${error.message}`;
    console.error(`[DATABASE] ${message}`);
    writeToLog('error.log', `${message}\nStack: ${error.stack}`);
  }
};

// Error logging middleware
const errorLogger = (err, req, res, next) => {
  const { method, originalUrl } = req;
  const errorLog = `✗ ERROR ${method} ${originalUrl}: ${err.message}`;
  
  console.error(`[ERROR] ${errorLog}`);
  console.error(err.stack);
  writeToLog('error.log', `${errorLog}\nStack: ${err.stack}`);
  
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

module.exports = {
  requestLogger,
  authLogger,
  errorLogger
};
