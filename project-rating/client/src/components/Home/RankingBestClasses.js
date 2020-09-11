import React, {useContext, useEffect} from 'react';
import {PollContext} from "../../context/PollContext";



const RankingBestClasses = () => {

  const information = useContext(PollContext);
  const {getAllTeachers, teachers} = information;

  useEffect(() => {
    getAllTeachers();
    // eslint-disable-next-line
  }, []);

  const getProgressBar = number => {
    return (
      <>
        <h3>{teachers[number].teacher.toUpperCase()}</h3>
        <div className="progress">
          <div className="progress-value" 
          style={{width: `${teachers[number].percentageOfWins}%`}}></div>
          <h4>{teachers[number].percentageOfWins}%</h4>
       </div>
      </>
    )
  }

  return (
    <div>
      {teachers.length !== 0 && (
        <div>
        <div id="btn-extreme">
        <a id="play-now-btn-extreme" href="/mejor-profesor">Jugar Ahora</a>
      </div>
    <div id="progress-bars-classes">
      <div className="best-classes">
        <h1>Top 4</h1>
        {getProgressBar(teachers.length - 1)}
        {getProgressBar(teachers.length - 2)}
        {getProgressBar(teachers.length - 3)}
        {getProgressBar(teachers.length - 4)}
      </div>
      <div>
        <a id="play-now-btn" href="/mejor-profesor">Jugar Ahora</a>
      </div>
      <div className="best-person">
        <h1>Peores</h1>
        {getProgressBar(0)}
        {getProgressBar(1)}
        {getProgressBar(2)}
        {getProgressBar(3)}
      </div>
    </div>
    <div id="mobile-div-play">
      <a id="play-now-btn-mobile" href="/mejor-profesor">Jugar Ahora</a>
    </div>
    </div>
      )}
      
  </div>
  )
}


export default RankingBestClasses;
