// src/config/redis.js
require("dotenv").config();
const Redis = require("ioredis");
const { Queue, Worker } = require("bullmq");

// Create Redis connection using full URL
const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null, // avoid deprecation warnings
});

// Export connection + queue factory
const resumeQueue = new Queue("resumeQueue", { connection });

module.exports = { connection, resumeQueue, Worker };
