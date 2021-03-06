import { useEffect, useState } from 'react';
import { getDate } from '../utilities/getReleaseDate.js';
//import Fade from 'react-reveal/Fade';
import { Fade } from 'react-awesome-reveal';
import styles from '../styles/Bubble.module.css'

const Bubble = ( { id, originalBbl, clickedBbl, clicked, transition, setTransition, 
                  originalChange, setOriginalChange, BIGSIZE, MOVEDIST, track } ) => {
  const MOVEDUR = 700; // in ms
  
  const [bblPos, setBblPos] = useState(originalBbl);
  const [hover, setHover] = useState(false);
  const [time, setTime] = useState(null);
  const [thisBblClicked, setThisBblClicked] = useState(false);



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


  // sets new original bubbles when screen width changes
  useEffect(() => {
    if (originalChange) {
      setBblPos(originalBbl);
      setOriginalChange(false);
    }
  }, [originalChange]);


  // style shortcuts for multiple browser support
  const transformSC = `matrix(1, 0, 0, 1, ${bblPos.x}, ${bblPos.y}) translate(-50%, -50%) scale(${bblPos.size * (hover ? 1.05 : 1) * (thisBblClicked ? 1.25 : 1) / originalBbl.size}, ${bblPos.size * (hover ? 1.05 : 1) / originalBbl.size})`;
  const transitionSC = `${transition ? `${MOVEDUR}ms cubic-bezier(0.34, 1.56, 0.64, 1)` : '0.1s linear'}`;

  
  return(
    <div style={{
        transform: transformSC, WebkitTransform: transformSC, MozTransform: transformSC, OTransform: transformSC, MsTransform: transformSC,
        transition: transitionSC, WebkitTransform: transitionSC, MozTransform: transitionSC, OTransform: transitionSC, MsTransform: transitionSC
      }} 
      className={styles.box}
      onMouseEnter={() => {setHover(true);}} 
      onMouseLeave={() => {setHover(false);}}
      onClick={() => {if (!transition) {clearTimeout(time); setTransition(true); clicked(id); setTime(setTimeout(() => setTransition(false), MOVEDUR))}}}
    >
      <Fade direction={'up'} fraction={0.6} triggerOnce>
        <div style={{width: `${originalBbl.size * 0.8}px`, height: `${originalBbl.size}px`, 
          /*background: `#${color}`,*/ border: '1px solid black', zIndex: `${-1 * id}`, borderRadius: '10%'}} 
        >
          <div className={styles.rank} 
            style={{
              opacity: `${thisBblClicked ? 0 : 1}`, 
              transform: `translate(-50%, -50%) scale(${thisBblClicked ? 0.8 : 1}, 1)`,
              fontSize: `${originalBbl.size / 1.5}%`
            }}>
            {id + 2}
          </div>
          <div style={{
              opacity: `${thisBblClicked ? 1 : 0}`, 
              transform: `translate(-50%, -50%) scale(${thisBblClicked ? 0.8 : 1}, 1)`,
              fontSize: `${originalBbl.size / 1.5}%`
            }} 
            className={styles.rankBig}
          >
            {id + 2}
          </div>
          <img src={track.album.images[0].url} alt='Track Image' className={styles.trackImage}
            style={{
              width: `${thisBblClicked ? 40 : 90}%`,
              height: `${thisBblClicked ? 40 : 72}%`, 
              marginTop: `${thisBblClicked ? 7 : 30}%`, 
              transition: '0.45s cubic-bezier(0.39, 1, 0.41, 1)',
              WebkitTransform: '0.45s cubic-bezier(0.39, 1, 0.41, 1)', 
              MozTransform: '0.45s cubic-bezier(0.39, 1, 0.41, 1)', 
              OTransform: '0.45s cubic-bezier(0.39, 1, 0.41, 1)', 
              MsTransform: '0.45s cubic-bezier(0.39, 1, 0.41, 1)',
            }} 
          />
          <div style={{opacity: `${thisBblClicked ? 1 : 0}`, transform: 'translate(-50%, -50%) scale(0.8, 1)'}} 
            className={styles.trackText}
          >
            <div style={{fontSize: `${originalBbl.size / 2}%`}} className={styles.trackTitle}>
              {track && track.name}
            </div>
            <div style={{fontSize: `${originalBbl.size / 3}%`}} className={styles.trackArtist}>
              {track && track.artists.map(artist => {return artist.name}).join(', ')}
            </div>
            <div style={{fontSize: `${originalBbl.size / 2.6}%`}} className={styles.extraText}>
              Released {track && getDate(track.album.release_date)}
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default Bubble;