require("dotenv").config();
const { resumeQueue, Worker } = require("./redis");
const LLMAdapter = require("../services/llm.adapter"); // ✅ instance not destructured

// Create worker to process jobs
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

// Worker event listeners
resumeWorker.on("completed", (job) => {
  console.log(`🎉 Job ${job.id} completed with result:`, job.returnvalue);
});

resumeWorker.on("failed", (job, err) => {
  console.error(`💥 Job ${job.id} failed: ${err.message}`);
});

// Add dummy job to queue
(async () => {
  const dummyJob = await resumeQueue.add("tailorResume", {
    userId: "user123",
    jobDescription: "Full Stack Developer at Google",
    profile: {
      name: "Aryan Singh",
      education: "B.Tech CSE (AI/ML)",
      skills: ["React", "Node.js", "Machine Learning"],
    },
  });

  console.log("🚀 Dummy job added to queue with ID:", dummyJob.id);
})();
