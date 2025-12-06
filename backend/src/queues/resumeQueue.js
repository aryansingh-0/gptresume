const { Queue } = require('bullmq');
const { connection } = require('../config/redis');

const resumeQueue = new Queue("resumeQueue", { connection });

module.exports = { resumeQueue };
