import { useEffect, useState } from 'react';
import styles from '../styles/PreHome.module.css'

const PreHomeStats = ( { finishedBG, setRunBlur, setChecked } ) => {
  const [count, setCount] = useState(0);
  const [int, setInt] = useState(null);
  const [mounted, setMounted] = useState(true);

  const stats = [
    'Lorem ipsum dolor sit amet', 
    'Lorem ipsum dolor sit amet, consectetur', 
    'Lorem ipsum dolor'
  ];


  const displayInterval = (tempCount, intervalTime) => {
    if (tempCount === 0) {
      ++tempCount;
      setCount(tempCount);
      setRunBlur(true);
    }
    if (tempCount < 3) {
      setInt(setInterval(() => {
        if (tempCount === 3) {
          clearInterval(int);
        }

        if (mounted) {
          ++tempCount;
          setCount(tempCount);
        }
      }, 3000));
    }
  }

  const showNext = () => {
    if (count === 3) {
      setChecked(true);
    }
    else {
      // stop old interval and start blur effect
      clearInterval(int);
      setRunBlur(true);
  
      // start new interval
      let tempCount = count + 1; 
      displayInterval(tempCount); 
      setCount(tempCount);
    }
  }

  useEffect(() => {
    if (finishedBG && count === 0) showNext();
  }, [finishedBG]);

  


  return(
    <div>
      <div onClick={() => showNext()} className={styles.windowClick} />
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