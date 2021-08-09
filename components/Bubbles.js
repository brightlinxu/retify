import { useState } from 'react';
import Bubble from './Bubble.js';
import styles from '../styles/Bubble.module.css';

const Bubbles = () => {
  const originalBbls = [
    {x: 300, y: 300, size: 80},
    {x: 210, y: 300, size: 80},
    {x: 255, y: 225, size: 80},
  ];

  const [lastClicked, setLastClicked] = useState(null);
  const [clickedBbl, setClickedBbl] = useState(null);


  const clicked = (id) => {
    if (lastClicked === id && clickedBbl !== null) { // same bubble clicked and not in original pos
      setClickedBbl(null);
    }
    else { // different bubble clicked
      setClickedBbl(originalBbls[id]);
    }

    setLastClicked(id); // set lastClicked to current id
  }

  
  return (
    <div>
      {originalBbls.map((bbl, id) => (
        <Bubble key={id} id={id} originalBbl={bbl} clickedBbl={clickedBbl} clicked={clicked}/>
      ))}
    </div>
  );


  
}

export default Bubbles;