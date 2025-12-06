const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const rateLimit = require("express-rate-limit");

const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL || "https://tailor0me.vercel.app", 
  "https://gptresume.vercel.app"
];
// Security middleware
app.use(helmet())
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman or server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
})
app.use('/api/', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// API routes
app.use('/api', routes)
app.use('/check',(req,res)=>{
  res.json({
    status:'ok',
    
  })
})
// Error handling
app.use(errorHandler)


// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

module.exports = app;