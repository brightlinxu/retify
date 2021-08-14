import { useEffect, useState } from 'react';
import { getWindowSize } from '../utilities/getWindowSize.js';
import styles from '../styles/PreHome.module.css';

const PreHomeBG = ( { tracks, artists, picInterval, setFinishedBG, runBlur } ) => {
  const windowSize = getWindowSize();
  // array that holds all positions of background iamges
  const positions = [ // row = pic ID + 7
    {left: '34%', top: '41%'}, 
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
    {left: '92%', top: '67%'}
  ];


  const [count, setCount] = useState(0);
  const [srcs, setSrcs] = useState([]);
  const [gotSrcs, setGotSrcs] = useState(false);
  const [startCount, setStartCount] = useState(false);
  const [blur, setBlur] = useState(0);


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



  // gradually blurs images when first stats bubble fades in
  useEffect(() => {
    let mounted = true;

    if (runBlur && mounted) {
      let tempBlur = 0;

      let interval = setInterval(() => {
        if (tempBlur >= 2) {
          clearInterval(interval);
        }

        tempBlur = tempBlur + 0.1;
        if (mounted) setBlur(tempBlur);
      }, 50);
    }

    return () => mounted = false;
  }, [runBlur]);

  // counter to fade in pictures one by one
  useEffect(() => {
    if (startCount) {
      let tempCount = 0;
      let mounted = true;

      const interval = setInterval(() => {
        if (tempCount === positions.length) {
          clearInterval(interval);
          // alert that background has all faded in after 1 second
          let timeout = setTimeout(() => {
            if (mounted) setFinishedBG(true);
          }, 1000);
        }

        if (mounted) {
          ++tempCount;
          setCount(tempCount);
        }
      }, picInterval);

      return () => mounted = false; // fix mounting error
    }
  }, [startCount]);


  const baseSize = (windowSize.width + windowSize.height) / 13; // 13 and 615 are just numbers I picked
  const changingSize = (windowSize.width + windowSize.height) / 615; 

  if (tracks.length !== 0 && artists.length !== 0) {
    if (!gotSrcs) {
      setSrcs(getPicSrcs());
      setGotSrcs(true);
      setStartCount(true);
    }

    return(
      <div>
        {srcs.slice(0, count).map((src, id) => (
          <div key={id} style={{left: `${positions[id].left}`, top: `${positions[id].top}`, 
          filter: `blur(${blur}px)`, zIndex: `${(id + 1) * -1}`}} className={styles.fixedPosition}>
            <img src={src} height={baseSize - (id * changingSize)} className={styles.imgFadeIn}/>
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