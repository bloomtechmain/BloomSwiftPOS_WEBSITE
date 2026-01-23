const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const testRoutes = require('./routes/testRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const serviceRequestRoutes = require('./routes/serviceRequestRoutes');
const hardwareRoutes = require('./routes/hardwareRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

app.use('/api/test', testRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/service-requests', serviceRequestRoutes);
app.use('/api/hardware', hardwareRoutes);
app.use('/api/tickets', ticketRoutes);

app.get('/', (req, res) => {
  res.send('BloomSwiftPOS Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Keep process alive to debug
setInterval(() => {
  // console.log('Heartbeat'); 
}, 10000);
