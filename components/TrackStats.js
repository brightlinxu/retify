import { useState } from 'react';
import Bubbles from './Bubbles.js';
import TopTrack from './TopTrack.js';
import { Parallax } from 'react-scroll-parallax';
import LoadingAnimation from './LoadingAnimation.js';
import lotti from '../public/images/loading animation white.json';
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
        <LoadingAnimation lotti={lotti} distFromTop={42}/>
      </div>}
    </div>
  );
}

export default TrackStats;