const express = require("express");
const {check, validationResult} = require("express-validator");
const mongoose = require("mongoose");
const TeacherPoll = require("../models/teacherPoll");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const allTeachers = await TeacherPoll.find({});
    return response.json(allTeachers);
  } catch (error) {
    return response.json(error.message);
  }
});

module.exports = router;