import { useState, useEffect } from 'react';
import PreHomeBG from '../components/PreHomeBG.js';
import PreHomeStats from '../components/PreHomeStats.js';
import styles from '../styles/PreHome.module.css';

const PreHome = ( { tracks, artists, setChecked } ) => {
  const picInterval = 60;

  const [finishedBG, setFinishedBG] = useState(false);


  return(
    <div>
      <button onClick={() => {setChecked(true)}}>
        see my stats!
      </button>
      <PreHomeBG tracks={tracks} artists={artists} picInterval={picInterval} setFinishedBG={setFinishedBG}/>
      {finishedBG && <PreHomeStats />}
    </div>
  );
}

export default PreHome;