import { useEffect, useState } from 'react';
import { getWD } from './WindowDimensions.js'
import styles from '../styles/ImageFadeIn.module.css'

const PreHomeBG = ( { tracks, artists } ) => {
  const positions = [{left: '35%', top: '40%'},
                     {left: '88%', top: '23%'},
                     {left: '14%', top: '80%'},
                     {left: '68%', top: '65%'},
                     {left: '55%', top: '50%'},
                     {left: '8%', top: '24%'},
                     {left: '61%', top: '17%'},
                     {left: '86%', top: '84%'},
                     {left: '43%', top: '75%'},
                     {left: '20%', top: '48%'},
                     {left: '74%', top: '38%'},
                     {left: '92%', top: '52%'},
                     {left: '30%', top: '70%'},
                     {left: '27%', top: '18%'},
                     {left: '57%', top: '87%'},
                     {left: '49%', top: '28%'},
                     {left: '8%', top: '56%'},
                     {left: '82%', top: '57%'},
                     {left: '74%', top: '20%'},
                     {left: '31%', top: '91%'},
                     {left: '40%', top: '13%'},
                     {left: '74%', top: '86%'},
                     {left: '45%', top: '51%'},
                     {left: '18%', top: '25%'},
                     {left: '56%', top: '69%'},
                     {left: '65%', top: '39%'},
                     {left: '10%', top: '10%'},
                     {left: '10%', top: '10%'},
                     {left: '10%', top: '10%'},
                     {left: '10%', top: '10%'}];


  const [count, setCount] = useState(0);
  const [srcs, setSrcs] = useState([]);
  const [gotSrcs, setGotSrcs] = useState(false);

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
    let mounted = true;

    const interval = setInterval(() => {
      if (count === positions.length) {
        clearInterval(interval);
      }
      if (mounted) setCount(count => count + 1);
      
    }, 80);

    return () => mounted = false; // fix mounting error
  }, []);



  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }


  if (tracks.length !== 0 && artists.length !== 0) {
    //const { height, width } = useWindowDimensions();

    if (!gotSrcs) {
      setSrcs(getPicSrcs());
      setGotSrcs(true);
    }

    return(
      <div>
        {srcs.slice(0, count).map((src, id) => (
          <div key={id} style={{position: 'fixed', left: `${positions[id].left}`, top: `${positions[id].top}`, transform: 'translate(-50%, -50%)', zIndex: `${(id + 1) * -1}`}}>
            <img src={src} height={150 - (id * 3.5)} className={styles.fadeInImg}/>
            {id}
          </div>
        ))}
        <br /><br /><br /><br /><br /><br /><br />
        <div>
          height: {window.innerHeight}
        </div>
        <div>
          width: {window.innerWidth}
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