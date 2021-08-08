import { useEffect, useState } from 'react';
import styles from '../styles/PreHome.module.css'

const PreHomeStats = ( { finishedBG, setRunBlur, setChecked } ) => {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(null);

  const stats = [
    'Lorem ipsum dolor sit amet', 
    'Lorem ipsum dolor sit amet, consectetur', 
    'Lorem ipsum dolor'
  ];


  useEffect(() => {
    let mounted = true; 

    if (count === 4) {
      clearTimeout(time);
      setChecked(true);
    }
    else if (count !== 0) {
      // stop old interval and start blur effect
      clearTimeout(time);
      if (mounted) setRunBlur(true);

      // start new interval (with new count)
      if (count < 3) {
        setTime(setTimeout(() => {
          if (mounted) setCount(count => count + 1);
        }, 3000));
      }
    }

    return () => mounted = false;
  }, [count]);

  useEffect(() => {
    // if the background is finished and count is still at 0
    if (finishedBG && count === 0) setCount(1);
  }, [finishedBG])

  


  return(
    <div>
      <div onClick={() => setCount(count => count + 1)} className={styles.windowClick} />
      {stats.slice(0, count).map((entry, id) => (
        <div key={id} style={{top: `${(id + 1) * 25}%`}} className={[styles.boxBackground, styles.fixedPosition].join(' ')} >
          <div style={{fontSize: `${(window.innerWidth + window.innerHeight) / 100}px`}}>
            {entry}
          </div>
        </div>
      ))}
    </div>
    
  );
}

export default PreHomeStats;