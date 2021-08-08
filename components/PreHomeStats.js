import { useEffect, useState } from 'react';
import styles from '../styles/PreHome.module.css'

const PreHomeStats = ( { tracks, artists, finishedBG, setRunBlur, setChecked } ) => {
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

    return {min, sec};
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
                 .slice(0, 3)
                 .map(genre => { return genre[0]; });
  }


  // contains stats that are displayed inside of bubbles
  // format is: {title, array with all the stats}
  const stats = [
    {title: 'Average Song Duration:', info: getAvgDur().min + ' min and ' + getAvgDur().sec + ' sec'}, 
    {title: 'Top Artists:', info: artists.slice(0, 3).map(artist => {return artist.name}).join(', ')}, 
    {title: 'Top Genres:', info: getTopGenres().join(', ')}
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

  


  return(
    <div>
      <div onClick={() => setCount(count => count + 1)} className={styles.windowClick} />
      {stats.slice(0, count).map((stat, id) => (
        <div key={id} style={{top: `${(id + 1) * 25}%`}} className={[styles.bubbleBackground, styles.fixedPosition].join(' ')} >
          <div style={{fontSize: `${(window.innerWidth + window.innerHeight) / 100}px`, textAlign: 'center'}}>
            <div>
              {stat.title}
            </div>
            <div>
              {stat.info}
            </div>
          </div>
        </div>
      ))}
    </div>
    
  );
}

export default PreHomeStats;