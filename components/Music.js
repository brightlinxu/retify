import { useState, useEffect } from "react";

const Music = ({ accessToken, trackUris }) => {
  const SONGLENGTH = 12000; // in milliseconds

  // device related hooks
  const [deviceId, setDeviceId] = useState('');
  const [deviceReady, setDeviceReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [played, setPlayed] = useState(false);

  // song and music related hooks
  const [musicPaused, setMusicPaused] = useState(false);
  //const [afterPause, setAfterPause] = useState(false);
  const [curSongPos, setCurSongPos] = useState(0);
  const [curSongCount, setCurSongCount] = useState(0);
  /*const [clear, setClear] = useState(false);*/

  // variables that clears all the timeouts
  const [musicTimeout, setMusicTimeout] = useState(null);
  const [musicTimeout2, setMusicTimeout2] = useState(null);
  const [cfuTimeout, setCfuTimeout] = useState(null);
  const [cfuInterval, setCfuInterval] = useState(null);
  const [cfdInterval, setCfdInterval] = useState(null);


  const playMusic = (currentPosition, counter) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      body: `{"uris": ["${trackUris[counter]}"], "position_ms": ${currentPosition}}`,
      headers: {'Authorization': 'Bearer ' + accessToken}
    })
      .then(res => {
        if (res.ok) { 
          console.log(`CURRENTLY PLAYING ${trackUris[counter]}`);

          // playing the background music
          if (counter < Object.keys(trackUris).length) {
            backgroundMusic(counter);
          }
          //setAfterPause(false);
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
          setVolume(0);
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
    console.log('CLEARED');
      clearTimeout(musicTimeout);
      clearTimeout(musicTimeout2);
      clearTimeout(cfuTimeout);
      clearInterval(cfuInterval);
      clearInterval(cfdInterval);
  }

  // plays and pauses the music
  const toggleMusic = () => {
    if (musicPaused) {
        // if music is paused, play the song from where it stopped
        playMusic(curSongPos, curSongCount);
    }
    else {
        /*setClear(true);*/
        clear();
        
        // pauses music
        pauseMusic();

        //setAfterPause(true);
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
    }, 80);
  
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
    }, 80);

    setCfuInterval(interval);

    // safety check when volume change API rate limit exceeds
    setCfuTimeout(setTimeout(() => {
        setVolume(100);
    }, crossfadeDur + 3000));
  }

  const backgroundMusic = (counter) => {
    let crossfadeDur = 4640; // 58 * crossfade interval
    
    // records current song when music pauses
    setCurSongCount(counter);
    ++counter;
    
    // if user pauses then plays, don't use crossfadeUp effect
    //if (!afterPause) {
    crossfadeUp(crossfadeDur);
    //}

    setMusicTimeout(setTimeout(() => {
        crossfadeDown();
        
        if (counter < Object.keys(trackUris).length) {
            setMusicTimeout2(setTimeout(() => {
                // plays next song
                playMusic(0, counter);
            }, crossfadeDur));
        }
    }, SONGLENGTH));
  }



  useEffect(() => {
    if (accessToken !== '' && !loaded) {
      setLoaded(true);

      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
        name: 'REtify Web Player',
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
        
        if (state) {
          if (state.paused) {
            setCurSongPos(state.position);
            setMusicPaused(true);
        } 
        else setMusicPaused(false);
        }
      });
    
      // Ready
      player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
    
          setDeviceId(device_id);
          setDeviceReady(true);
      });
    
      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
    
      // Connect to the player!
      player.connect();
      };
    }
  }, [accessToken]);


  useEffect(() => {
    if (deviceId != '' && trackUris.length && !played) {
      setPlayed(true);
      playMusic(0, 0);
    }
    
  }, [deviceId, trackUris, accessToken]);
  
  
  

  return (
    <div>
      <div>
        music is currently playing! {accessToken}
      </div>
      <button onClick={toggleMusic}>
        toggle music
      </button>
    </div>
  );
}

export default Music;