import { useEffect, useState } from 'react';
import styles from '../styles/PreHomeBG.module.css'

const PreHomeBG = ( { tracks, artists } ) => {
  const picInterval = 60;
  const positions = [{left: '34%', top: '41%'}, // row = pic ID + 6
                     {left: '88%', top: '23%'},
                     {left: '11%', top: '85%'},
                     {left: '69%', top: '65%'},
                     {left: '55%', top: '50%'},
                     {left: '8%', top: '24%'},
                     {left: '61%', top: '17%'},
                     {left: '86%', top: '86%'},
                     {left: '43%', top: '73%'},
                     {left: '20%', top: '48%'},
                     {left: '76%', top: '38%'},
                     {left: '92%', top: '50%'},
                     {left: '30%', top: '70%'},
                     {left: '27%', top: '18%'},
                     {left: '56%', top: '87%'},
                     {left: '49%', top: '28%'},
                     {left: '8%', top: '56%'},
                     {left: '82%', top: '57%'},
                     {left: '73%', top: '19%'},
                     {left: '31%', top: '91%'},
                     {left: '40%', top: '15%'},
                     {left: '74%', top: '86%'},
                     {left: '45%', top: '51%'},
                     {left: '18%', top: '25%'},
                     {left: '56%', top: '69%'},
                     {left: '65%', top: '39%'},
                     {left: '19%', top: '66%'},
                     {left: '44%', top: '92%'},
                     {left: '65%', top: '86%'},
                     {left: '92%', top: '67%'}];


  const [count, setCount] = useState(0);
  const [srcs, setSrcs] = useState([]);
  const [gotSrcs, setGotSrcs] = useState(false);
  const [startCount, setStartCount] = useState(false);

  // returns a set of unique album/artist pictures
  const getPicSrcs = () => {
    let uniquePics = new Set();
    let trackCount = 0, artistCount = 0;

    while (uniquePics.size < (tracks.length * 1.5)) {
      // loop through pics until a unique one is added
      let beforeSize = uniquePics.size;
      while (beforeSize === uniquePics.size && trackCount < tracks.length) {
        uniquePics.add(tracks[trackCount++].album.images[0].url);
      }

      // add artist pic because there are no repeats
      if (artistCount < artists.length) {
        uniquePics.add(artists[artistCount++].images[0].url);
      }

      // if nothing is added from both track and artist pictures, then break.
      // this is to sleft an infinite loop
      if (beforeSize === uniquePics.size) break;
    }

    return Array.from(uniquePics);
  }




  // counter to fade in pictures one by one
  useEffect(() => {
    if (startCount) {
      let mounted = true;

      const interval = setInterval(() => {
        if (count === positions.length) {
          clearInterval(interval);
        }
        if (mounted) setCount(count => count + 1);
        
      }, picInterval);

      return () => mounted = false; // fix mounting error
    }
  }, [startCount]);


  if (tracks.length !== 0 && artists.length !== 0) {
    const baseSize = (window.innerHeight + window.innerWidth) / 13; // 13 and 615 are just numbers I picked
    const changingSize = (window.innerHeight + window.innerWidth) / 615; 

    if (!gotSrcs) {
      setSrcs(getPicSrcs());
      setGotSrcs(true);
      setStartCount(true);
    }

    return(
      <div>
        {srcs.slice(0, count).map((src, id) => (
          <div key={id} style={{position: 'fixed', left: `${positions[id].left}`, top: `${positions[id].top}`, 
                                transform: 'translate(-50%, -50%)', filter: `blur(0px)`, zIndex: `${(id + 1) * -1}`}}>
            <img src={src} height={baseSize - (id * changingSize)} className={styles.fadeInImg}/>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      Loading...
    </div>
  );
  
}

export default PreHomeBG;