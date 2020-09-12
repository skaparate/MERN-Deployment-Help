import React, {createContext, useReducer} from "react";
import axios from "axios";

const initalState = {
  questions: [
    {position: 0, answered: false},
    {position: 1, answered: false},
    {position: 2, answered: false},
    {position: 3, answered: false},
    {position: 4, answered: false},
    {position: 5, answered: false},
    {position: 6, answered: false},
    {position: 7, answered: false},
    {position: 8, answered: false},
    {position: 9, answered: false},
    {position: 10, answered: false},
    {position: 11, answered: false},
    {position: 12, answered: false},
    {position: 13, answered: false},
    {position: 14, answered: false},
    {position: 15, answered: false},
    {position: 16, answered: false},
    {position: 17, answered: false},
    {position: 18, answered: false},
    {position: 19, answered: false},
    {position: 20, answered: false}

  ],
  teachers: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ANSWER":
      state.questions.forEach(question => {
        if (question.position === action.payload.number) {
          question.answered = true;
        }
      });
      return {
        ...state,
      }
    case "GET_ALL_TEACHERS":
      const {teachersGotten} = action.payload;
      return {
        ...state,
        teachers: teachersGotten
      }
    case "PERSONAL_VOTE":
      state.personalVotes.forEach(currentPersonalTeacher => {
        if (action.payload.personalTeacherWon === currentPersonalTeacher.name) {
          currentPersonalTeacher.votesWon += 1; 
        }
        if (action.payload.personalTeacherLost === currentPersonalTeacher.name) {
          currentPersonalTeacher.votesLost -= 1; 
        }
      });
      return {...state}
    default:
      return {...state};
  }
}

export const PollContext = createContext();

export const PollProvider = props => {
  const [state, dispatch] = useReducer(reducer, initalState);

  const answer = async (number, teacherWon, teacherLost) => {
    await axios.put(`/vote`, {
      vote: "win",
      teacher: teacherWon
    }, {
      'Content-Type': 'application/json',
    });
    await axios.put(`/vote`, {
      vote: "loss",
      teacher: teacherLost
    }, {
      'Content-Type': 'application/json',
    });
    dispatch({type: "ANSWER", payload: {number}});
  };

  const getAllTeachers = async () => {
    const response = await axios.get(`/get-all-teachers`);
    const teachers = response.data;
    teachers.forEach(teacher => {
      let wins = teacher.numberOfWins;
      let losses = teacher.numberOfLosses;
      let percentageOfWins = (wins / (wins + losses) * 100);
      if (Number.isNaN(percentageOfWins)) {
        percentageOfWins = 50;
      }
      percentageOfWins = Math.round(percentageOfWins);
      teacher.percentageOfWins = percentageOfWins;
    });
    teachers.sort((a, b) => (a.percentageOfWins > b.percentageOfWins) ? 1 : -1)
    dispatch({type: "GET_ALL_TEACHERS", payload: {teachersGotten: teachers}});
  }

  const setPersonalVote = (personalTeacherWon, personalTeacherLost) => {
    dispatch({type: "PERSONAL_VOTE", payload: {personalTeacherWon, personalTeacherLost}});
  }

  return (
    <PollContext.Provider value={{
      questions: state.questions,
      questionBeingAnswered: state.questionBeingAnswered,
      teachers: state.teachers,
      answer,
      getAllTeachers,
      setPersonalVote
    }}>
      {props.children}
    </PollContext.Provider>
  )
}