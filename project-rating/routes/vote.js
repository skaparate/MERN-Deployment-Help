const express = require("express");
const {check, validationResult} = require("express-validator");
const router = express.Router();
const TeacherPoll = require("../models/teacherPoll");

router.put("/", [
  check("vote", "Please include a vote, (win or loss)").not().isEmpty(),
  check("teacher", "Please include a valid teacher").not().isEmpty()
], async (request, response) => {
  const errors = validationResult(request).array();
  if (errors.length !== 0) {
    return response.json({error: errors})
  }
  const {vote, teacher} = request.body;
  if (vote !== "win" && vote !== "loss") {
    return response.json({error: "Invalid vote, it has to be win or loss"})
  }

  try {
    const teacherSelected = await TeacherPoll.findOne({teacher});
    if (!teacherSelected) {
      return response.json({error: "Invalid teacher, please make sure the teacher exists"})
    }
    if (vote === "win") {
      teacherSelected.numberOfWins += 1;
    } else if (vote === "loss") {
      teacherSelected.numberOfLosses += 1;
    }
    await teacherSelected.save();
    return response.json({teacherSelected});

  } catch (error) {
    return response.json({error});
  }
});

module.exports = router;