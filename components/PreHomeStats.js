import { useEffect, useState } from 'react';
import styles from '../styles/PreHome.module.css'

const PreHomeStats = () => {
  const [count, setCount] = useState(1);
  const [int, setInt] = useState(null);

  const testArr = [
    'Lorem ipsum dolor sit amet', 
    'Lorem ipsum dolor sit amet, consectetur', 
    'Lorem ipsum dolor'
  ];


  const displayInterval = (tempCount, intervalTime) => {
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

  useEffect(() => {
    displayInterval(1);
  }, []);

  const func = () => {
    clearInterval(int);
    let tempCount = count + 1;
    displayInterval(tempCount);
    setCount(tempCount);
  }


  return(
    <div>
      <button onClick={() => func()} style={{width: '100%', height: '50px'}}>
        next bubble
      </button>
      <div className={styles.boxLayout} >
        {testArr.slice(0, count).map((entry, id) => (
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