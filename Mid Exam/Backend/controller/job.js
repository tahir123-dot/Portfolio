const Jobs = require("../models/jobs");

const Joblisting = async () => {
  try {
    // Fetch jobs data from API
    const response = await fetch("https://jsonfakery.com/jobs");
    const jobsData = await response.json();

    if (!Array.isArray(jobsData)) {
      console.error("Invalid API response");
      return;
    }

    let totalJobs = await Jobs.countDocuments(); // 'let' use kiya

    if (totalJobs >= 30) {
      console.log("Database already has 30 jobs. No more jobs will be added.");
      return; // Stop execution if limit reached
    }

    // Filter only required jobs to insert
    const jobsToInsert = [];

    for (const job of jobsData) {
      if (totalJobs >= 30) break; // Stop if limit reached

      const existingJob = await Jobs.findOne({
        title: job.title,
        company: job.company,
      });
      if (!existingJob) {
        jobsToInsert.push(job);
        totalJobs++; // Increment count
      }
    }

    if (jobsToInsert.length > 0) {
      await Jobs.insertMany(jobsToInsert);
      console.log(`${jobsToInsert.length} new jobs added.`);
    } else {
      console.log("No new jobs to add.");
    }
  } catch (error) {
    console.error("Error fetching or saving jobs:", error);
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find(
      {},
      "title company salary_from description application_deadline"
    );

    if (!jobs.length) {
      return res.status(404).json({ message: "No jobs found" });
    }

    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { Joblisting, getJobs };
