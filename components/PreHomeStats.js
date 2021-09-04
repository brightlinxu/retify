import { useEffect, useState } from 'react';
import { getWindowSize } from '../utilities/getWindowSize.js';
import 'animate.css';
import styles from '../styles/PreHome.module.css';

const PreHomeStats = ( { tracks, artists, finishedBG, setRunBlur, setChecked } ) => {
  const windowSize = getWindowSize();
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(null);

  // finding average duration
  const getAvgDur = () => {
    // adding together all durations in array
    let totalDur = tracks.reduce((total, current) => {
      return total + (current.duration_ms / 1000);
    }, 0);
    
    // getting average of total durations
    let avgDur = totalDur / tracks.length;

    // separating average duration into minutes and seconds
    let min = Math.floor(avgDur / 60);
    let sec = Math.round(avgDur - (min * 60));
    if (sec === 60) {
      sec = 0;
      ++min;
    }

    return {min, sec};
  }

  const capitalize = (genre) => {
    let temp = '';
    temp += genre[0].toUpperCase();
    let size = genre.length;
    let cap = false;
    for (let i = 1; i < size; ++i) {
      if (cap) {
        temp += genre[i].toUpperCase();
        cap = false;
      }
      else {
        temp += genre[i];
      }
      if (genre[i] === ' ') cap = true;
    }
    return temp;
  }

  // finding top genres
  const getTopGenres = () => {
    let tempGenres = {};

    // counting number of each genre and putting into object
    artists.forEach(artist => {
      artist.genres.forEach(genre => {
        if (tempGenres.hasOwnProperty(genre)) {
          ++tempGenres[genre];
        } else {
            tempGenres[genre] = 1;
        }
      });
    });

    return Object.entries(tempGenres)
                 .sort((a,b) => b[1] - a[1])
                 .map(genre => { return capitalize(genre[0]); });
  }

  const handleClick = () => {
    setCount(count => count + 1);
  }

  

  // contains stats that are displayed inside of bubbles
  // format is: {title, array with all the stats}
  const stats = [
    {title: 'Average Song Duration:', info: getAvgDur().min + ' min and ' + getAvgDur().sec + ' sec', pos: 20}, 
    {title: 'Top Artists:', info: artists.slice(0, 3).map((artist, id) => (<div key={id}>{id + 1}. {artist.name}</div>)), pos: 46}, 
    {title: 'Top Genres:', info: getTopGenres().slice(0, 3).map((genre, id) => (<div key={id}>{id + 1}. {genre}</div>)), pos: 75}
  ];




  useEffect(() => {
    let mounted = true; 

    if (count === 4) {
      // alert home page to render track stats and play music
      setChecked(true);
    }
    else if (count !== 0) {
      // stop old interval and start blur effect
      clearTimeout(time);
      setRunBlur(true);

      // start new interval (with new count)
      if (count < 3) {
        setTime(setTimeout(() => {
          if (mounted) setCount(count => count + 1);
        }, 3000));
      }
    }

    return () => mounted = false;
  }, [count]);

  useEffect(() => {
    // if the background is finished and count is still at 0
    if (finishedBG && count === 0) setCount(1);
  }, [finishedBG])

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  
  return(
    <div>
      {stats.slice(0, count).map((stat, id) => (
        <div key={id} style={{left: '50%', top: `${stat.pos}%`}} className={styles.fixedPosition}>
          <div className={'animate__animated animate__fadeInUp'}> 
            <div className={styles.bubbleBackground}>
              <div key={`${id}` + 'title'} style={{fontSize: `${(windowSize.width / 100) + 10}px`}} className={styles.bubbleTitle}>
                {stat.title}
              </div>
              <div key={`${id}` + 'info'} style={{fontSize: `${(windowSize.width / 140) + 10}px`}} className={styles.bubbleInfo}>
                {stat.info}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
  );
}

export default PreHomeStats;