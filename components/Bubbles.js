import { useEffect, useState } from 'react';
import Bubble from './Bubble.js';
import styles from '../styles/Bubble.module.css';
import { getWindowSize } from '../utilities/getWindowSize.js';
import { getBubblePositions, getBubbleBigSize, getBubbleMoveDist } from '../utilities/bubbleInfo.js';

const Bubbles = ( { tracks } ) => {
  const windowSize = getWindowSize();

  const originalBbls = getBubblePositions();

  const [lastClicked, setLastClicked] = useState(null);
  const [clickedBbl, setClickedBbl] = useState(null);
  const [transition, setTransition] = useState(false);
  const [windowState, setWindowState] = useState(0);
  const [originalChange, setOriginalChange] = useState(false);


  const clicked = (id) => {
    if (lastClicked === id && clickedBbl !== null) { // same bubble clicked and not in original pos
      setClickedBbl(null);
    }
    else { // different bubble clicked
      setClickedBbl(originalBbls[windowState][id]);
    }

    setLastClicked(id); // set lastClicked to current id
  }


  const handleResize = () => {
    if (window.innerWidth < 800) {
      setWindowState(1);
    }
    else {
      setWindowState(0);
    }
    setOriginalChange(true);
  }
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
  }, []);
  
  if (tracks.length === 0) {
    return(
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {originalBbls[windowState].map((bbl, id) => (
        <Bubble key={id} id={id} originalBbl={bbl} 
          clickedBbl={clickedBbl} clicked={clicked} transition={transition} setTransition={setTransition}
          originalChange={originalChange} setOriginalChange={setOriginalChange} BIGSIZE={getBubbleBigSize()[windowState]}
          MOVEDIST={getBubbleMoveDist()[windowState]} track={tracks[id]}
        />
      ))}
    </div>
  );


  
}

export default Bubbles;