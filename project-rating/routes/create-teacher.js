const express = require("express");
const {check, validationResult} = require("express-validator");
const mongoose = require("mongoose");
const TeacherPoll = require("../models/teacherPoll");
const router = express.Router();

router.post("/", [
  check("teacher", "Please enter a valid teacher").not().isEmpty()
], async (request, response) => {
  const errors = validationResult(request).array();
  if (errors.length !== 0) {
    return response.json(errors);
  }
  const {teacher} = request.body;
  const numberOfWins = 0;
  const numberOfLosses = 0;
  try {
    const newTeacher = new TeacherPoll({numberOfWins, numberOfLosses, teacher});
    await newTeacher.save();
    return response.json({newTeacher});
  } catch (error) {
    return response.json(error);
  }
});

module.exports = router;