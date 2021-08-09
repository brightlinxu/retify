import { useEffect, useState } from 'react';
import styles from '../styles/Bubble.module.css'

const Bubble = ( { id, originalBbl, clickedBbl, clicked } ) => {
  const BIGBBLSIZE = 120;
  
  const [bblPos, setBblPos] = useState(originalBbl);
  

  // deep comparison of 2 bubbles (which are objects)
  const bblEqual = (bbl1, bbl2) => {
    return bbl1.x === bbl2.x &&
    bbl1.y === bbl2.y &&
    bbl1.size === bbl2.size;
  }

  const getNewPos = () => {
    // if the bubble clicked is this bubble
    if (bblEqual(clickedBbl, originalBbl)) {
      return {x: originalBbl.x, y: originalBbl.y, size: BIGBBLSIZE};
    }

    // if the bubble clicked isn't this bubbl
    // let slope =   

    return {x: 100, y: 100, size: 80}
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
    <div style={{transform: `matrix(1, 0, 0, 1, ${bblPos.x}, ${bblPos.y}) translate(-50%, -85%)`, width: `${bblPos.size}px`, height: `${bblPos.size}px`}}
      className={styles.circle} onClick={() => clicked(id)}
    >
      <div className={styles.text}>
        bubble{id + 1}
      </div>
    </div>
  );

  
  return(
    <div>
      {dynamicBbls.map((bbl, bblID) => (
        <div key={bblID} style={{transform: `matrix(1, 0, 0, 1, ${bbl.x}, ${bbl.y}) `, width: `${bbl.size}px`, height: `${bbl.size}px`}} 
          className={styles.circle} onClick={() => {updateBbls(bblID)}}
        >
          <div className={styles.text}>
            track{bblID + 1}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bubble;