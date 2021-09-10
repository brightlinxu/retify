import { useState } from 'react';
import Bubbles from './Bubbles.js';
import TopTrack from './TopTrack.js';
import { Parallax } from 'react-scroll-parallax';
import LottieAnimation from './LottieAnimation.js';
import lottie from '../public/images/loading animation white.json';
import { Fade } from 'react-awesome-reveal';
import { getWindowSize } from '../utilities/getWindowSize.js';
import Image from 'next/image';
import styles from '../styles/TrackStats.module.css';

const TrackStats = ( { tracks, musicStarted } ) => {
  const windowSize = getWindowSize();
  const totalWindowSize = windowSize.width + windowSize.height;

  return(
    <div>
      <Parallax y={[-15, 15]} className={styles.background}>
        <Image src='/images/scribble17.png' alt='Background Image' style={{height: '95vh', width: '90vw'}}/>
      </Parallax>
      <div className={styles.container} style={{fontSize: `${(totalWindowSize / 120) + 5}px`}}>
        <Fade triggerOnce>
          <div className={styles.topSong}>
            -Top Song-
          </div>
        </Fade>
      </div>
      {musicStarted ? 
      <div>
        <TopTrack topTrack={tracks[0]}/>
        <Bubbles tracks={tracks.slice(1)}/>
      </div>
      :
      <div>
        <LottieAnimation lottie={lottie} left={50} top={44} fadeIn={false}/>
      </div>}
    </div>
  );
}

export default TrackStats;