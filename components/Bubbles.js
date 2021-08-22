import { useState } from 'react';
import Bubble from './Bubble.js';
import styles from '../styles/Bubble.module.css';

const Bubbles = ( { tracks } ) => {
  const originalBbls = [
    {x: 775, y: 225, size: 200},
    {x: 300, y: 200, size: 180},
    {x: 325, y: 425, size: 170},
    {x: 620, y: 350, size: 160},
    {x: 500, y: 475, size: 160},
    {x: 450, y: 300, size: 150},
    {x: 575, y: 900, size: 150}
  ];

  const [lastClicked, setLastClicked] = useState(null);
  const [clickedBbl, setClickedBbl] = useState(null);
  const [transition, setTransition] = useState(false);


  const clicked = (id) => {
    if (lastClicked === id && clickedBbl !== null) { // same bubble clicked and not in original pos
      setClickedBbl(null);
    }
    else { // different bubble clicked
      setClickedBbl(originalBbls[id]);
    }

    setLastClicked(id); // set lastClicked to current id
  }

  
  if (tracks.length === 0) {
    return(
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div>
      {originalBbls.map((bbl, id) => (
        <Bubble key={id} id={id} originalBbl={bbl} clickedBbl={clickedBbl} clicked={clicked} transition={transition} setTransition={setTransition}
          track={tracks.slice(1)[id]}
        />
      ))}
    </div>
  );


  
}

export default Bubbles;