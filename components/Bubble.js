import { useEffect, useState } from 'react';
import styles from '../styles/Bubble.module.css'

const Bubble = ( { id, originalBbl, clickedBbl, clicked, transition, setTransition } ) => {
  const BIGSIZE = 110; // in px
  const MOVEDIST = 25; // in px
  const MOVEDUR = 600; // in ms
  
  const [bblPos, setBblPos] = useState(originalBbl);
  const [hover, setHover] = useState(false);
  const [time, setTime] = useState(null);
  

  // deep comparison of 2 bubbles (which are objects)
  const bblEqual = (bbl1, bbl2) => {
    return bbl1.x === bbl2.x &&
    bbl1.y === bbl2.y &&
    bbl1.size === bbl2.size;
  }

  const getSlope = () => {
    let ydif = originalBbl.y - clickedBbl.y;
    let xdif = originalBbl.x - clickedBbl.x;

    if (xdif === 0) return 0;
    return ydif / xdif;
  }

  const getNewXY = () => {
    let slope = getSlope();

    if (slope === 0) { // above and below clicked bubble
      let moveDist = MOVEDIST;
      if (originalBbl.y < clickedBbl.y || originalBbl.x < clickedBbl.x) moveDist = MOVEDIST * -1;

      if (originalBbl.y === clickedBbl.y)
        return {newX: originalBbl.x + moveDist, newY: originalBbl.y};
      return {newX: originalBbl.x, newY: originalBbl.y + moveDist};
    }
    
    let moveDist = MOVEDIST;
    if (originalBbl.y < clickedBbl.y) moveDist = MOVEDIST;   

    let xdist = Math.sqrt((moveDist ** 2) / (1 + (getSlope() ** 2)));
    let ydist = xdist * slope;

    if (originalBbl.x < clickedBbl.x)
      return {newX: originalBbl.x - xdist, newY: originalBbl.y - ydist};
    return {newX: originalBbl.x + xdist, newY: originalBbl.y + ydist};
  }

  const getNewPos = () => {
    // if the bubble clicked is this bubble
    if (bblEqual(clickedBbl, originalBbl)) {
      return {x: originalBbl.x, y: originalBbl.y, size: BIGSIZE};
    }
    
    // if the bubble clicked isn't this bubble
    let { newX, newY } = getNewXY();

    return {x: newX, y: newY, size: originalBbl.size};
  }
  
  const updatePos = () => {
    if (clickedBbl === null) { // display original positions
      setBblPos(originalBbl);
    }
    else { // display changed positions
      setBblPos(getNewPos());
    }
  }

  // check for when there is bubble clicked
  useEffect(() => {
    updatePos();
  }, [clickedBbl]);


  // style shortcuts for multiple browser support
  const transformSC = `matrix(1, 0, 0, 1, ${bblPos.x}, ${bblPos.y}) translate(-50%, -50%) scale(${bblPos.size * (hover ? 1.05 : 1) / originalBbl.size})`;
  const transitionSC = `${transition ? `${MOVEDUR}ms cubic-bezier(0.34, 1.56, 0.64, 1)` : '0.1s linear'}`;

  
  return(
    <div style={{
        transform: transformSC, WebkitTransform: transformSC, MozTransform: transformSC, OTransform: transformSC, MsTransform: transformSC,
        transition: transitionSC, WebkitTransform: transitionSC, MozTransform: transitionSC, OTransform: transitionSC, MsTransform: transitionSC,
        width: `${originalBbl.size}px`, height: `${originalBbl.size}px`
      }}
      className={styles.circle} 
      onMouseEnter={() => {setHover(true);}} 
      onMouseLeave={() => {setHover(false);}}
      onClick={() => {if (!transition) {clearTimeout(time); setTransition(true); clicked(id); setTime(setTimeout(() => setTransition(false), MOVEDUR))}}}
    >
      <div style={{fontSize: `${originalBbl.size}%`}}className={styles.text}>
        bubble{id + 1}
      </div>
    </div>
  );
}

export default Bubble;