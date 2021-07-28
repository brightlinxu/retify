import { useEffect, useState } from 'react';
import styles from '../styles/ImageFadeIn.module.css'

const PreHomeBG = ( { tracks, artists } ) => {
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);

  useEffect(() => {
    setTimeout(() => { setOne(true);
      setTimeout(() => { setTwo(true);
      }, 400);
    }, 400);
  });

  if (tracks.length !== 0) {
    return(
      <div>
        <div style={{position: 'fixed', top: '10%', left: '10%'}}>
          <img src={tracks[0].album.images[0].url} 
          width='150px' length='150px'
          className={styles.fadeInImg}/>
        </div>
        <div style={{position: 'fixed', top: '40%', left: '40%'}}>
          {one && <img src={tracks[1].album.images[0].url} 
          width='120px' length='120px'
          className={styles.fadeInImg}/>}
        </div>
        <div style={{position: 'fixed', top: '60%', left: '60%'}}>
          {two && <img src={tracks[3].album.images[0].url} 
          width='90px' length='90px'
          className={styles.fadeInImg}/>}
        </div>
      </div>
    );
  }

  return (
    <div>
      loading...
    </div>
  );
}

export default PreHomeBG;