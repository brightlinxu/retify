import { useEffect, useState } from 'react';
import styles from '../styles/Bubble.module.css'

const Bubble = ( { id, originalBbl, clickedBbl, clicked, transition, setTransition, track } ) => {
  const colors =  ['ffd358', 'ffd664', 'ffd96c', 'ffdd7c', 'ffe089', 'ffe59c'];
  const BIGSIZE = 230; // in px
  const MOVEDIST = 50; // in px
  const MOVEDUR = 600; // in ms
  
  const [bblPos, setBblPos] = useState(originalBbl);
  const [hover, setHover] = useState(false);
  const [time, setTime] = useState(null);
  const [thisBblClicked, setThisBblClicked] = useState(false);
  const [color, setColor] = useState(null);


  const getDate = (date) => {
    const separated = date.split('-'); // [0] = year, [1] = month, [2] = day
    
    let year = separated[0];
    let month = separated[1];
    let day = separated[2];

    switch(month) {
      case '01': month = 'January'; break;
      case '02': month = 'February'; break;
      case '03': month = 'March'; break;
      case '04': month = 'April'; break;
      case '05': month = 'May'; break;
      case '06': month = 'June'; break;
      case '07': month = 'July'; break;
      case '08': month = 'August'; break;
      case '09': month = 'September'; break;
      case '10': month = 'October'; break;
      case '11': month = 'November'; break;
      case '12': month = 'December'; break;
    }

    return `${month} ${day[0] === '0' ? day[1] : day}, ${year}`;
  }

  // deep comparison of 2 bubbles (which are objects)
  const bblEqual = (bbl1, bbl2) => {
    return bbl1.x === bbl2.x &&
    bbl1.y === bbl2.y &&
    bbl1.size === bbl2.size;
  }

  // get slope of 2 points (return 0 if slope is undefined)
  const getSlope = () => {
    let ydif = originalBbl.y - clickedBbl.y;
    let xdif = originalBbl.x - clickedBbl.x;

    if (xdif === 0) return 0;
    return ydif / xdif;
  }

  // calculate x and y position for bubble to move to
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

  // return original bubble is current bubble is clicked
  // return new bubble position if the current bubble isn't clicked
  const getNewPos = () => {
    // if the bubble clicked is this bubble
    if (bblEqual(clickedBbl, originalBbl)) {
      setThisBblClicked(true);
      return {x: originalBbl.x, y: originalBbl.y, size: BIGSIZE};
    }
    
    // if the bubble clicked isn't this bubble
    setThisBblClicked(false);
    let { newX, newY } = getNewXY();
    return {x: newX, y: newY, size: originalBbl.size};
  }
  
  const updatePos = () => {
    if (clickedBbl === null) { // display original positions
      setBblPos(originalBbl);
      setThisBblClicked(false);
    }
    else { // display changed positions
      setBblPos(getNewPos());
    }
  }

  // check for when there is bubble clicked
  useEffect(() => {
    updatePos();
  }, [clickedBbl]);

  // set random color for bubble initially
  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);


  // style shortcuts for multiple browser support
  const transformSC = `matrix(1, 0, 0, 1, ${bblPos.x}, ${bblPos.y}) translate(-50%, -50%) scale(${bblPos.size * (hover ? 1.05 : 1) / originalBbl.size})`;
  const transitionSC = `${transition ? `${MOVEDUR}ms cubic-bezier(0.34, 1.56, 0.64, 1)` : '0.1s linear'}`;

  
  return(
    <div style={{
        transform: transformSC, WebkitTransform: transformSC, MozTransform: transformSC, OTransform: transformSC, MsTransform: transformSC,
        transition: transitionSC, WebkitTransform: transitionSC, MozTransform: transitionSC, OTransform: transitionSC, MsTransform: transitionSC,
        width: `${originalBbl.size}px`, height: `${originalBbl.size}px`, background: `#${color}`
      }}
      className={styles.circle} 
      onMouseEnter={() => {setHover(true);}} 
      onMouseLeave={() => {setHover(false);}}
      onClick={() => {if (!transition) {clearTimeout(time); setTransition(true); clicked(id); setTime(setTimeout(() => setTransition(false), MOVEDUR))}}}
    >
      <div className={styles.rank}>
        {id + 2}
      </div>
      <img src={track.album.images[0].url} className={styles.trackImage}/>
      <div className={styles.trackText}>
        <div style={{fontSize: `${originalBbl.size / 2}%`}}>
          {track && track.name}
        </div>
        <div style={{fontSize: `${originalBbl.size / 3}%`}}>
          {track && track.artists.map(artist => {return artist.name}).join(', ')}
        </div>
        <div style={{opacity: `${thisBblClicked ? 1 : 0}`, fontSize: `${originalBbl.size / 2.5}%`}} className={styles.extraText}>
          Released {getDate(track.album.release_date)}
        </div>
      </div>
    </div>
  );
}

export default Bubble;