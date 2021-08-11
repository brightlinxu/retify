import { useState } from 'react';
import Bubbles from './Bubbles.js'
import styles from '../styles/TrackStats.module.css';

const TrackStats = ( { tracks } ) => {


  return(
    <div>
      <Bubbles tracks={tracks} />
    </div>
  );
}

export default TrackStats;