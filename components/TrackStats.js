import { useState } from 'react';
import Bubbles from './Bubbles.js';
import TopTrack from './TopTrack.js';
import styles from '../styles/TrackStats.module.css';

const TrackStats = ( { tracks } ) => {

  return(
    <div>
      <TopTrack topTrack={tracks[0]}/>
      <Bubbles tracks={tracks}/>
    </div>
  );
}

export default TrackStats;