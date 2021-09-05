import { useState, useEffect } from 'react';
import PreHomeBG from '../components/PreHomeBG.js';
import PreHomeStats from '../components/PreHomeStats.js';
import styles from '../styles/PreHome.module.css';

const PreHome = ( { tracks, artists, setChecked, hasData } ) => {
  const picInterval = 60;

  const [runBlur, setRunBlur] = useState(false);
  const [finishedBG, setFinishedBG] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [x, setx] = useState(null);
  const [y, sety] = useState(null);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setLoaded(true);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);


  return(
    <div onMouseMove={({ clientX: x, clientY: y }) => {setx(x); sety(y);}} className={styles.windowFill}>
      <PreHomeBG tracks={tracks} artists={artists} picInterval={picInterval} setFinishedBG={setFinishedBG} 
        runBlur={runBlur} x={x} y={y} setx={setx} sety={sety} hasData={hasData} loaded={loaded}
      />
      {loaded && <PreHomeStats tracks={tracks} artists={artists} finishedBG={finishedBG} setRunBlur={setRunBlur} setChecked={setChecked}/>}
    </div>
  );
}

export default PreHome;