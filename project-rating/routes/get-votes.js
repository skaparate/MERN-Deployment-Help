const express = require("express");
const mongoose = require("mongoose");
const TeacherPoll = require("../models/teacherPoll");
const router = express.Router();

router.get("/:teacher", async (request, response) => {
  const {teacher} = request.params;
  try {
    const currentTeacher = await TeacherPoll.findOne({teacher});
    const {numberOfWins, numberOfLosses} = currentTeacher;
    return response.json({teacher, numberOfWins, numberOfLosses});
  } catch (error) {
    return response.json({error});
  }
});

module.exports = router;