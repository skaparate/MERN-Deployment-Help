import React, {useContext, useEffect} from 'react';
import {PollContext} from "../context/PollContext";

const ResultadosUser = () => {
// profesor favorito
  const information = useContext(PollContext);
  const {getAllTeachers, teachers} = information;

  useEffect(() => {
    getAllTeachers();
    // eslint-disable-next-line
  }, []);

  const getPercentages = name => {
    let wins = parseInt(localStorage.getItem(`${name}-wins`));
    let losses = parseInt(localStorage.getItem(`${name}-losses`));
    if (wins === 0) {
      wins = 1;
    }
    if (wins === 0) {
      losses = 1;
    }
    let percentageOfWinsPersonal = wins / (wins + losses) * 100;
    if (Number.isNaN(percentageOfWinsPersonal)) {
      percentageOfWinsPersonal = 50;
    }
    percentageOfWinsPersonal = Math.round(percentageOfWinsPersonal);
    return percentageOfWinsPersonal;
  }

  let arrayOfPersonal = []

  teachers.forEach(currentPersonalArrayTeacher => {
    arrayOfPersonal.push({
      name: currentPersonalArrayTeacher.teacher,
      percentage: (getPercentages(currentPersonalArrayTeacher.teacher))
    })
  })

  const getPersonalProgressBar = number => {
    arrayOfPersonal.sort((a, b) => (a.percentage > b.percentage) ? 1 : -1);
    return (
      <>
       <h3>{(arrayOfPersonal[number].name).toUpperCase()}</h3>
        <div className="progress-results">
          <div className="progress-value-results" style={{
            width: `${arrayOfPersonal[number].percentage}%`
          }}></div>
          <h4>{arrayOfPersonal[number].percentage}%</h4>
        </div>
      </>
    )
  }

  const getBestTeacher = () => {
    arrayOfPersonal.sort((a, b) => (a.percentage > b.percentage) ? 1 : -1);
    return arrayOfPersonal[arrayOfPersonal.length - 1];
  }

  const getWorstTeacher = () => {
    arrayOfPersonal.sort((a, b) => (a.percentage > b.percentage) ? 1 : -1);
    return arrayOfPersonal[0];
  }

  const getProgressBar = number => {
    return (
      <>
       <h3>{(teachers[number].teacher).toUpperCase()}</h3>
        <div className="progress-results">
          <div className="progress-value-results" style={{
            width: `${teachers[number].percentageOfWins}%`
          }}></div>
          <h4>{teachers[number].percentageOfWins}%</h4>
        </div>
      </>
    )
  }

  return (
    <div>
      <h1 id="title-website-class-small">
        Profesor favorito: {getBestTeacher().name}
      </h1>
      <h1 id="title-website-class-small">
        Peor profesor: {getWorstTeacher().name}
      </h1>
      
      <div id="progress-bars-classes-results">
        <div id="result-best-classes" className="best-classes">
          <h1 id="title-website-results">Tus Resultados</h1>
          {/* Add more if more teachers */}
            {getPersonalProgressBar(12)}
            {getPersonalProgressBar(11)}
            {getPersonalProgressBar(10)}
            {getPersonalProgressBar(9)}
            {getPersonalProgressBar(8)}
            {getPersonalProgressBar(7)}
            {getPersonalProgressBar(6)}
            {getPersonalProgressBar(5)}
            {getPersonalProgressBar(4)}
            {getPersonalProgressBar(3)}
            {getPersonalProgressBar(2)}
            {getPersonalProgressBar(1)}
            {getPersonalProgressBar(0)}
        </div>

        <div id="result-best-classes" className="best-person">
          <h1>Media General</h1>
          {/* Add more if more teachers */}
            {getProgressBar(12)}
            {getProgressBar(11)}
            {getProgressBar(10)}
            {getProgressBar(9)}
            {getProgressBar(8)}
            {getProgressBar(7)}
            {getProgressBar(6)}
            {getProgressBar(5)}
            {getProgressBar(4)}
            {getProgressBar(3)}
            {getProgressBar(2)}
            {getProgressBar(1)}
            {getProgressBar(0)}
      </div>
      </div>
    </div>
  )
}


export default ResultadosUser;
