import { getDate } from '../utilities/getReleaseDate.js';
import { getWindowSize } from '../utilities/getWindowSize.js';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css';
import { Parallax } from 'react-scroll-parallax';
import styles from '../styles/TopTrack.module.css';

const TopTrack = ( { topTrack } ) => {
  const windowSize = getWindowSize();
  const totalWindowSize = windowSize.width + windowSize.height;

  if (topTrack === undefined) {
    return <div />;
  }

  return (
    <div>
      <Parallax y={[-15, 15]} className={styles.background}>
        <img src='/images/scribble17.png' style={{height: '90vh', width: '85vw'}}/>
      </Parallax>
      <div className={styles.container}> 
        <ScrollAnimation animateIn='animate__fadeInUp' animateOnce={true}>
          <img src={topTrack && topTrack.album.images[0].url} className={styles.img}/>
        </ScrollAnimation>
        <ScrollAnimation animateIn='animate__fadeInUp' animateOnce={true} delay={800}>
          <div className={styles.song} style={{fontSize: `${(totalWindowSize / 60) + 5}px`}}>
            {topTrack && topTrack.name}
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn='animate__fadeInUp' animateOnce={true} delay={900}>
          <div className={styles.artists} style={{fontSize: `${(totalWindowSize / 100) + 5}px`}}>
            {topTrack && topTrack.artists.map(artist => {return artist.name}).join(', ')}
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn='animate__fadeInUp' animateOnce={true} delay={2200}>
          <div className={styles.date} style={{fontSize: `${(totalWindowSize / 90) + 5}px`}}>
            Released {topTrack && getDate(topTrack.album.release_date)}
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn='animate__bounceIn' animateOnce={true} delay={4000} duration={2}>
          <img src='/images/arrow down.png' style={{height: `${(totalWindowSize / 100) + 5}px`}}
            className={styles.arrow}/>
        </ScrollAnimation>
      </div>

    </div>
  );
}

export default TopTrack;