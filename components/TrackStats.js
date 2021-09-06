import { useState } from 'react';
import Bubbles from './Bubbles.js';
import TopTrack from './TopTrack.js';
import { Parallax } from 'react-scroll-parallax';
import LottieAnimation from './LottieAnimation.js';
import lottie from '../public/images/loading animation white.json';
import styles from '../styles/TrackStats.module.css';

const TrackStats = ( { tracks, musicStarted } ) => {

  return(
    <div>
      <Parallax y={[-15, 15]} className={styles.background}>
        <img src='/images/scribble17.png' style={{height: '90vh', width: '85vw'}}/>
      </Parallax>
      {musicStarted ? 
      <div>
        <TopTrack topTrack={tracks[0]}/>
        <Bubbles tracks={tracks.slice(1)}/>
      </div>
      :
      <div>
        <LottieAnimation lottie={lottie} left={50} top={42} fadeIn={false}/>
      </div>}
    </div>
  );
}

export default TrackStats;