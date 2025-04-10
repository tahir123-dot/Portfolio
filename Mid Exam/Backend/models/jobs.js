const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    salary_from: { type: Number, required: true },
    salary_to: { type: Number, required: true },
    employment_type: { type: String, required: true },
    application_deadline: { type: Date, required: true },
    qualifications: { type: [String], required: true },
    contact: { type: String, required: true },
    job_category: { type: String, required: true },
    is_remote_work: { type: Boolean, required: true },
    number_of_opening: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", JobSchema, "Job");

