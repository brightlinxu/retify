import { useState, useEffect } from 'react';
import PreHomeBG from '../components/PreHomeBG.js';
import PreHomeStats from '../components/PreHomeStats.js';
import styles from '../styles/PreHome.module.css';

const PreHome = ( { tracks, artists, setChecked } ) => {
  const picInterval = 60;

  const [runBlur, setRunBlur] = useState(false);
  const [finishedBG, setFinishedBG] = useState(false);


  return(
    <div>
      <button onClick={() => setChecked(true)}>
        see my stats!
      </button>
      <PreHomeBG tracks={tracks} artists={artists} picInterval={picInterval} setFinishedBG={setFinishedBG} runBlur={runBlur}/>
      <PreHomeStats tracks={tracks} artists={artists} finishedBG={finishedBG} setRunBlur={setRunBlur} setChecked={setChecked}/>
    </div>
  );
}

export default PreHome;