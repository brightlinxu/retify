import { useState, useEffect } from "react";

//*****************************************************
// PLAN FOR HOW TO PLAY MUSIC 
// after I get all 60 tracks (20 from each time range)
// order them in an array with the uris in this order:
// #1 short_term, #1 medium_term, #1 longterm_, 
// #2 short_term, #2 medium_term, #2 longterm_,
// #3 short_term, and so on...
//*****************************************************


const Music = ({ accessToken, tracks, setChecked, setMusicStarted }) => {
  const SONGLENGTH = 9000; // in milliseconds
  const CROSSFADEINT = 80; // in milliseconds

  // device related hooks
  const [deviceId, setDeviceId] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [played, setPlayed] = useState(false);

  // song and music related hooks
  const [musicPaused, setMusicPaused] = useState(false);
  const [curSongPos, setCurSongPos] = useState(0);
  const [curSongCount, setCurSongCount] = useState(0);
  const [songEnded, setSongEnded] = useState(false);

  // variables that clears all the timeouts
  const [musicTimeout, setMusicTimeout] = useState(null);
  const [musicTimeout2, setMusicTimeout2] = useState(null);
  const [cfuTimeout, setCfuTimeout] = useState(null);
  const [cfuInterval, setCfuInterval] = useState(null);
  const [cfdInterval, setCfdInterval] = useState(null);
  const [bgTimeout, setBgTimeout] = useState(null);

  let canUnmount = false;
  

  const randomizer = (track) => {
    if (track.duration_ms < 30000) { // in case song is less than 30 seconds
      console.log('LESS THAN 30 SECONDS\n\n\n\n\n')
      return 0;
    }
  
    return Math.floor((Math.random() * 20) + 20) * 1000; // generate number between 20-40 
  }


  const playMusic = (counter, currentPosition) => {
    if (counter === Object.keys(tracks).length) counter = 0; // loop back around
    if (currentPosition === undefined) { // randomize start
      currentPosition = randomizer(tracks[counter]);
    }

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      body: `{"uris": ["${tracks[counter].uri}"], "position_ms": ${currentPosition}}`,
      headers: {'Authorization': 'Bearer ' + accessToken}
    })
      .then(res => {
        if (res.ok) { 
          console.log(`CURRENTLY PLAYING ${tracks[counter].name}`);

          canUnmount = false; // cannot unmount now because music is playing

          // playing the background music
          setBgTimeout(setTimeout(() => {
            backgroundMusic(counter);
            setMusicStarted(true);
          }, 500));

        }
        else console.log('ERROR PLAYING MUSIC');
      });
  }

  // pause music
  const pauseMusic = () => {
    fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + accessToken}
    })
      .then(res => {
        if (res.ok) {
          console.log('PAUSED MUSIC');
          setMusicPaused(true);
          setVolume(0);

          canUnmount = true; // can unmount now because music has stopped
        }
        else console.log('ERROR PAUSING MUSIC');
      });
  }

  // change volume
  const setVolume = (volumePercent) => {
    fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volumePercent}&device_id=${deviceId}`, {
      method: 'PUT',
      headers: {'Authorization': 'Bearer ' + accessToken}
    })
      .then(res => {
        if (res.ok) console.log(`CHANGED VOLUME TO ${volumePercent}`);
        else console.log('ERROR CHANGING VOLUME');
      });
  }

  // clears all the timeouts and intervals controlling background music
  const clear = () => {
    clearTimeout(musicTimeout);
    clearTimeout(musicTimeout2);
    clearTimeout(cfuTimeout);
    clearInterval(cfuInterval);
    clearInterval(cfdInterval);
    clearTimeout(bgTimeout);
    console.log('CLEARED');
  }

  // plays and pauses the music
  const toggleMusic = () => {
    if (musicPaused) {
      // if music is paused, play the song from where it stopped
      playMusic(curSongCount, curSongPos);
    }
    else {
      clear();
      pauseMusic();
    }
  }


  const crossfadeDown = () => {
    let counter = 100;
    // gradually decreases volume
    let interval = setInterval(() => {
      setVolume(counter);
      if (counter <= 14) {
          --counter;
      } else {
          counter -= 2;
      }
          
      // stop interval when volume is 0
      if (counter < 0) {
          clearInterval(interval);
      }
    }, CROSSFADEINT);
  
    setCfdInterval(interval);
    
  }

  const crossfadeUp = (crossfadeDur) => {
    let counter = 0;
    // gradually increase volume
    let interval = setInterval(() => {
      setVolume(counter);
      if (counter <= 13) {
          ++counter;
      } else {
          counter += 2;
      }
      
      // stop interval when volume is 100
      if (counter > 100) {
          clearInterval(interval);
      }
    }, CROSSFADEINT);

    setCfuInterval(interval);

    // safety check when volume change API rate limit exceeds
    setCfuTimeout(setTimeout(() => {
        setVolume(100);
    }, crossfadeDur + 3000));
  }

  const backgroundMusic = (counter) => {
    let crossfadeDur = 58 * CROSSFADEINT; // each interval is repeated 58 times
    
    // records current song when music pauses
    setCurSongCount(counter);
    ++counter;

    // cross fade up when song starts
    crossfadeUp(crossfadeDur);

    // wait for crossfade down to start and playing next song
    setMusicTimeout(setTimeout(() => {
        crossfadeDown();

        setMusicTimeout2(setTimeout(() => {
          // plays next song
          playMusic(counter);
        }, crossfadeDur));
    }, SONGLENGTH));
  }


  useEffect(() => {
    let mounted = true;

    if (accessToken !== '' && !loaded) {
      setLoaded(true);

      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
          name: 'retify Web Player',
          getOAuthToken: callback => { callback(accessToken); },
          volume: 0
        });
      
        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });
      
        // Playback status updates
        player.addListener('player_state_changed', state => { 
          console.log('state:', state); 
          
          if (state && mounted) {
            if (state.paused && state.position === 0) {
              setSongEnded(true);
            }
            else if (state.paused) {
              setCurSongPos(state.position);
              setMusicPaused(true);
          } 
          else if (mounted) setMusicPaused(false);
          }
        });
      
        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
      
            if (mounted) setDeviceId(device_id);
        });
      
        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });
      
        // Connect to the player!
        player.connect();
      };
    }

    return () => mounted = false;
  }, [accessToken]);


  // resumes music in case song ends before interval ends
  useEffect(() => {
    let mounted = true;

    if (songEnded === true) {
      clear();
      if (mounted) playMusic(curSongCount + 1); // plays next song

      // SDK changes state a couple of times, so we need to 
      // wait (1.5 seconds) until it stops changing to reset songEnded
      setTimeout(() => {
        if (mounted) setSongEnded(false);
      }, 1500);
    }

    return () => mounted = false;
  }, [songEnded]);


  // driver function to play music when page is loaded
  useEffect(() => {
    let mounted = true;

    if (deviceId != '' && tracks.length && !played && mounted) {
      setPlayed(true);
      playMusic(0);
    }
    
    return () => mounted = false;
  }, [deviceId, tracks, accessToken]);
  
  
  

  return (
    <div>
      <button style={{width: '300px', height: '300px'}} onClick={() => {
        // pause, so spotify player can stop everything before component stops rendering
        if (!canUnmount) {
          clear();
          pauseMusic();
        }
        
        setTimeout(() => {
          if (canUnmount) setChecked(false);
        }, 500);
      }}>
        go back
      </button>
      <div>
        Currently Playing: {tracks.length !== 0 && tracks[curSongCount].name}
      </div>
      <button onClick={() => toggleMusic()}>
        toggle music
      </button>
    </div>
  );
}

export default Music;