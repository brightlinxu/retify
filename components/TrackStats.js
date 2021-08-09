import { useState } from 'react';
import styles from '../styles/TrackStats.module.css';

const TrackStats = () => {
  const bigBblSize = 100;
  const originalBbls = [
    {x: 300, y: 300, size: 80},
    {x: 210, y: 300, size: 80},
    {x: 255, y: 225, size: 80},
  ];

  const [dynamicBbls, setDynamicBbls] = useState([...originalBbls]);

  let lastID = null;

  const updateBbls = (bblID) => {
    console.log(bblID);
    console.log(dynamicBbls == originalBbls);
    
    let tempBbls = dynamicBbls;

    if (bblID !== lastID) {
      tempBbls.forEach((bbl, tempID, arr) => {
        if (tempID === bblID) {
          arr[tempID].size = bigBblSize;
        }
        else {
          console.log(originalBbls[tempID].size);
          arr[tempID].size = originalBbls[tempID].size;
        }
      });

      setDynamicBbls(tempBbls);
    }
    else {
      setDynamicBbls(originalBbls);
    }
    
    console.log(tempBbls);

    lastID = bblID; // set lastID to current id
  }



  return(
    <div>
      {dynamicBbls.map((bbl, bblID) => (
        <div key={bblID} style={{transform: `matrix(1, 0, 0, 1, ${bbl.x}, ${bbl.y})`, width: `${bbl.size}px`, height: `${bbl.size}px`}} 
          className={styles.box} onClick={() => {updateBbls(bblID)}}
        >
          <div className={styles.text}>
            track{bblID + 1}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrackStats;