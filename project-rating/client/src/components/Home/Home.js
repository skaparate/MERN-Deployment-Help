import React from 'react';

// Components
import RankingBestClasses from "./RankingBestClasses";

const Home = () => {
  return (
    <div id="home-main">
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <h1 id="title-website">Ranking de Los Agustinos</h1>
      <RankingBestClasses />
    </div>
  )
}

export default Home;
