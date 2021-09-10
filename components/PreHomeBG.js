import { useEffect, useState } from 'react';
import { getWindowSize } from '../utilities/getWindowSize.js';
import { useSpring, animated } from 'react-spring';
import LottieAnimation from './LottieAnimation.js';
import lottie from '../public/images/loading animation.json';
import { getImgPositions, getImgMoveDists } from '../utilities/imgInfo.js';
import 'animate.css';
import styles from '../styles/PreHome.module.css';

const PreHomeBG = ( { tracks, artists, picInterval, setFinishedBG, runBlur, x, y, hasData, loadAnimation } ) => {
  const windowSize = getWindowSize();
  
  const positions = getImgPositions();
  const [moveDists, setMoveDists] = useState([]);
  
  const [count, setCount] = useState(0);
  const [srcs, setSrcs] = useState([]);
  const [gotSrcs, setGotSrcs] = useState(false);
  const [blur, setBlur] = useState(0);



  // used for mousemove parallex effect
  const [spring, setSpring] = useSpring(() => ({ 
    xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } 
  }));
  setSpring.start({ xy: [x - windowSize.width / 2, y - windowSize.height / 2] });



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
    if (gotSrcs) {
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
  }, [gotSrcs]);

  useEffect(() => {
    setMoveDists(getImgMoveDists());
  }, []);


  const baseSize = (windowSize.width + windowSize.height) / 13; // 13 and 615 are just numbers I picked
  const changingSize = (windowSize.width + windowSize.height) / 720; 

  if (tracks.length && artists.length && moveDists.length && !loadAnimation) {
    if (!gotSrcs) {
      setSrcs(getPicSrcs());
      setGotSrcs(true);
    }
    

    return(
      <div>
        {srcs.slice(0, count).map((src, id) => (
          <div key={id} style={{left: `${positions[id].left}`, top: `${positions[id].top}`, 
          filter: `blur(${blur}px)`, zIndex: `${(id + 1) * -1}`}} className={styles.fixedPosition} 
          >
            <div className={'animate__animated animate__fadeInUp'}>
              <animated.div style={{transform: spring.xy.to((x, y) => `translate3d(${x / moveDists[id].x/*x / ((id * 0.5) + 12)*/}px, ${y / moveDists[id].y/*y / ((id * 0.5) + 12)*/}px, 0)`)}}>
                <img src={src} alt='Track Image' height={baseSize - (id * changingSize)} style={{borderRadius: '5%'}} />
              </animated.div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  else if (hasData) {
    return (
      <LottieAnimation lottie={lottie} top={50} left={50} fadeIn={false}/>
    );
  }
  else return <div></div>;
  
}

export default PreHomeBG;