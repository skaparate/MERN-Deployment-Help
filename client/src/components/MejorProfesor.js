import React, {useContext, useEffect} from 'react';
import {PollContext} from "../context/PollContext";
import ResultadosUser from "./ResultadosUser";

const MejorProfesor = () => {
// profesor favorito

  const information = useContext(PollContext);
  const {questions, answer, teachers, getAllTeachers} = information;

  const colors = [
    "#52ACA2", "#999999", "#FFAB4F", "#aa7d42", "#f7850a", "#935357", "#b190a5", "#fdbdb8", "#93786f", "#062542", "#dbdcff", "#ffc0cb",
    "#8542f1", "#ec631d", "#f23a69", "#5b358f", "#924ec6", "#24441e", "#3a6571"
  ]

  const pickRandomColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  }

  const setPeopleToLocalStorage = () => {
    teachers.forEach(currentLSTeacher => {
      localStorage.setItem(`${currentLSTeacher.teacher}-wins`, 0);
      localStorage.setItem(`${currentLSTeacher.teacher}-losses`, 0);
    });
  }

  const setVotes = (number) => {
    const names = getTwoRandomNames();
    return (
      <div id="votes">
        <div style={{backgroundColor: pickRandomColor()}} onClick={() => {
            answerQuestion(number, names[0], names[1]); 
          }} className="option-vote">
          <h1 id="name-teacher-vote">{names[0].toUpperCase()}</h1>
        </div>
        <div style={{backgroundColor: pickRandomColor()}} onClick={() => {
            answerQuestion(number, names[1], names[0]);
          }} className="option-vote">
          <h1 id="name-teacher-vote">{names[1].toUpperCase()}</h1>
        </div>
      </div>
    )
  }

  const getRandomName = () => {
    const randomName = teachers[Math.floor(Math.random() * teachers.length)].teacher;
    return randomName;
  }

  const getTwoRandomNames = () => {
    let namesMatch = true;
    let name1;
    let name2;

    while (namesMatch) {
      name1 = getRandomName();
      name2 = getRandomName();
      if (name1 !== name2) {
        namesMatch = false;
      }
    }

    let arrayOfNames = [name1, name2];
    return arrayOfNames;
  }

  useEffect(() => {
    getAllTeachers();
    setPeopleToLocalStorage();
    // eslint-disable-next-line
  }, []);

  const answerQuestion = (number, teacherWon, teacherLost) => {
    answer(number, teacherWon, teacherLost);
    let wins = parseInt(localStorage.getItem(`${teacherWon}-wins`));
    wins += 1;
    let losses = parseInt(localStorage.getItem(`${teacherLost}-losses`));
    losses += 1;
    localStorage.setItem(`${teacherWon}-wins`, wins);
    localStorage.setItem(`${teacherLost}-losses`, losses);
  }

  return (
    <div>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <h1 id="title-website-class">Mejor Profesor</h1>
      {(teachers.length !== 0 && questions !== undefined) && (
        <>
        {!(questions[0].answered) && setVotes(0)}
        {(!(questions[1].answered) && questions[0].answered) && (
          setVotes(1)
        )}
        {(!(questions[2].answered) && questions[1].answered) && (
          setVotes(2)
        )}
        {(!(questions[3].answered) && questions[2].answered) && (
          setVotes(3)
        )}
        {(!(questions[4].answered) && questions[3].answered) && (
          setVotes(4)
        )}
        {(!(questions[5].answered) && questions[4].answered) && (
          setVotes(5)
        )}
        {(!(questions[6].answered) && questions[5].answered) && (
          setVotes(6)
        )}
        {(!(questions[7].answered) && questions[6].answered) && (
          setVotes(7)
        )}
        {(!(questions[8].answered) && questions[7].answered) && (
          setVotes(8)
        )}
        {(!(questions[9].answered) && questions[8].answered) && (
          setVotes(9)
        )}
        {(!(questions[10].answered) && questions[9].answered) && (
          setVotes(10)
        )}
        {(!(questions[11].answered) && questions[10].answered) && (
          setVotes(11)
        )}
        {(!(questions[12].answered) && questions[11].answered) && (
          setVotes(12)
        )}
        {(!(questions[13].answered) && questions[12].answered) && (
          setVotes(13)
        )}
        {(!(questions[14].answered) && questions[13].answered) && (
          setVotes(14)
        )}
        {(!(questions[15].answered) && questions[14].answered) && (
          setVotes(15)
        )}
        {(!(questions[16].answered) && questions[15].answered) && (
          setVotes(16)
        )}
        {(!(questions[17].answered) && questions[16].answered) && (
          setVotes(17)
        )}
        {(!(questions[18].answered) && questions[17].answered) && (
          setVotes(18)
        )}
        {(!(questions[19].answered) && questions[18].answered) && (
          setVotes(19)
        )}
        {(!(questions[20].answered) && questions[19].answered) && (
          setVotes(20)
        )}
        {questions[20].answered && (
          <ResultadosUser />
        )}
        {questions[20].answered && (
          <div id="buttons-results-menu">
            <a id="play-now-btn" href="/mejor-profesor">Jugar Otra Vez</a>
            <a id="play-now-btn" href="/">Menu Principal</a>
          </div>
        )}
        </>
      )}
    </div>
  )
}

export default MejorProfesor;
