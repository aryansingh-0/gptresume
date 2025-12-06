require("dotenv").config();
const { resumeQueue, Worker } = require('../config/redis');
const LLMAdapter = require('../services/llm.adapter');

console.log("🔄 Resume worker starting...");

const resumeWorker = new Worker(
  "resumeQueue",
  async (job) => {
    console.log("📥 Worker picked up job:", job.id, job.data);

    const { userId, profile, jobDescription } = job.data;

    // ✅ Use instance directly
    const tailoredResume = await LLMAdapter.tailorResume(profile, jobDescription);

    console.log("✅ Tailored Resume:", tailoredResume);
    return tailoredResume;
  },
  {
    connection: resumeQueue.opts.connection,
  }
);

// listeners
resumeWorker.on("completed", (job) => {
  console.log(`🎉 Job ${job.id} completed with result:`, job.returnvalue);
});

resumeWorker.on("failed", (job, err) => {
  console.error(`💥 Job ${job.id} failed: ${err.message}`);
});

module.exports = { resumeWorker };
