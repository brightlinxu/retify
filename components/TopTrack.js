import { getDate } from '../utilities/getReleaseDate.js';
import { getWindowSize } from '../utilities/getWindowSize.js';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css';
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import { Parallax } from 'react-scroll-parallax';
import styles from '../styles/TopTrack.module.css';

const TopTrack = ( { topTrack } ) => {
  const windowSize = getWindowSize();
  const totalWindowSize = windowSize.width + windowSize.height;

  if (topTrack === undefined) {
    return <div/>;
  }

  return (
    <div>
      <Parallax y={[-15, 15]} className={styles.background}>
        <img src='/images/scribble17.png' style={{height: '90vh', width: '85vw'}}/>
      </Parallax>
      <div className={styles.container}> 
        <Fade bottom distance={'35vh'}>
          <img src={topTrack && topTrack.album.images[0].url} className={styles.img}/>
        </Fade>
        <Fade bottom delay={800} distance={'18vh'}>
          <div className={styles.song} style={{fontSize: `${(totalWindowSize / 60) + 5}px`}}>
            {topTrack && topTrack.name}
          </div>
        </Fade>
        <Fade bottom delay={900} distance={'18vh'}>
          <div className={styles.artists} style={{fontSize: `${(totalWindowSize / 100) + 5}px`}}>
            {topTrack && topTrack.artists.map(artist => {return artist.name}).join(', ')}
          </div>
        </Fade>
        <Fade bottom delay={2200} distance={'15vh'}>
          <div className={styles.date} style={{fontSize: `${(totalWindowSize / 90) + 5}px`}}>
            Released {topTrack && getDate(topTrack.album.release_date)}
          </div>
        </Fade>
        <Bounce bottom delay={3500} duration={2500} distance={'15vh'}>
          <img src='/images/arrow down.png' style={{height: `${(totalWindowSize / 100) + 5}px`}}
            className={styles.arrow}/>
        </Bounce>
      </div>
    </div>
  );
}

export default TopTrack;