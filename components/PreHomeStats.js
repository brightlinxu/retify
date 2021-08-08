import { useEffect, useState } from 'react';
import styles from '../styles/PreHome.module.css'

const PreHomeStats = ( { finishedBG, setRunBlur } ) => {
  const [count, setCount] = useState(0);
  const [int, setInt] = useState(null);

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

        ++tempCount;
        setCount(tempCount);
      }, 3000));
    }
  }

  const showNext = () => {
    // stop old interval and start blur effect
    clearInterval(int);
    setRunBlur(true);

    // start new interval
    let tempCount = count + 1; 
    displayInterval(tempCount); 
    setCount(tempCount);
  }

  useEffect(() => {
    if (finishedBG && count === 0) showNext();
  }, [finishedBG]);

  


  return(
    <div>
      <button onClick={() => showNext()} style={{width: '100%', height: '50px'}}>
        next bubble
      </button>
      <div className={styles.boxLayout} >
        {stats.slice(0, count).map((entry, id) => (
          <div key={id} className={styles.boxBackground}>
            <div className={styles.boxText}>
              {entry}
            </div>
          </div>))}
      </div>
    </div>
    
  );
}

export default PreHomeStats;