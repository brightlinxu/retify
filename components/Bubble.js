import { useEffect, useState } from 'react';
import styles from '../styles/Bubble.module.css'

const Bubble = ( { id, originalBbl, clickedBbl, clicked } ) => {
  const BIGBBLSIZE = 120;
  const MOVEDISTBELOW = 20;
  const MOVEDISTABOVE = 35;
  
  const [bblPos, setBblPos] = useState(originalBbl);
  const [hover, setHover] = useState(false);
  

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
      let tempDist = MOVEDISTBELOW;
      if (originalBbl.y < clickedBbl.y) tempDist = (MOVEDISTABOVE * -1);
      if (originalBbl.x < clickedBbl.x) tempDist = (MOVEDISTBELOW * -1);

      if (originalBbl.y === clickedBbl.y)
        return {newX: originalBbl.x + tempDist, newY: originalBbl.y};
      return {newX: originalBbl.x, newY: originalBbl.y + tempDist};
    }
    
    let moveDist = MOVEDISTBELOW;
    if (originalBbl.y < clickedBbl.y) moveDist = MOVEDISTABOVE;   

    let xdist = Math.sqrt((moveDist ** 2) / (1 + (getSlope() ** 2)));
    let ydist = xdist * slope;

    if (originalBbl.x < clickedBbl.x)
      return {newX: originalBbl.x - xdist, newY: originalBbl.y - ydist};
    return {newX: originalBbl.x + xdist, newY: originalBbl.y + ydist};
  }

  const getNewPos = () => {
    // if the bubble clicked is this bubble
    if (bblEqual(clickedBbl, originalBbl)) {
      return {x: originalBbl.x, y: originalBbl.y, size: BIGBBLSIZE};
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

  
  return(
    <div style={{transform: `matrix(1, 0, 0, 1, ${bblPos.x}, ${bblPos.y}) translate(-50%, -85%) ${hover ? 'scale(1.1)' : ''}`, transition: `${hover ? '0.1s' : '0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'}`, width: `${bblPos.size}px`, height: `${bblPos.size}px`}}
      className={styles.circle} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={() => {
        clicked(id);
        setHover(false);
      }}
    >
      <div className={styles.text}>
        bubble{id + 1}
      </div>
    </div>
  );
}

export default Bubble;