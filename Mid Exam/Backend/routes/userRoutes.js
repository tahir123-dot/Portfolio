const express = require("express");
const { Signup, Login} = require("../controller/user");
const {getJobs} = require("../controller/job");

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/jobs", getJobs); 

module.exports = router;
