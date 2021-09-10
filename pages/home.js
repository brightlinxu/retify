import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Music from '../components/Music.js';
import { getAuthUrl } from '../utilities/getAuthUrl.js';
import PreHome from '../components/PreHome.js';
import TrackStats from '../components/TrackStats.js';
import styles from '../styles/Home.module.css';

const Home = () => {
  // api data hooks
  const [accessToken, setAccessToken] = useState('');
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);

  // keeps track if app already called api and got data
  const [hasData, setHasData] = useState(false); 

  // enables users to see data
  const [checked, setChecked] = useState(false);

  // check if music is playing 
  const [musicStarted, setMusicStarted] = useState(false); // set to true temporary

  // if person directly went to home page
  const [actuallyLoaded, setActuallyLoaded] = useState(false);


  // get hash parameters from url
  const getAccessToken = () => {
    // get everything in url after hash
    // then split string wherever there's new query parameter
    let url = window.location.hash.substring(1).split('&');

    // create array for just access token
    let tokenArray = url[0].split('=');

    // create object and store key-value pair access_token: 'token'
    let tokenObject = {};
    tokenObject[tokenArray[0]] = decodeURIComponent(tokenArray[1]);

    // return access token
    return tokenObject.access_token;
  }

  
  const getTop = (type, timeRange, limit) => {
    fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}`, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + accessToken}
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(`${type} info:`, data.items);
        type === 'tracks' ? setTracks(data.items) : setArtists(data.items);
      })
  }

  const router = useRouter();

  // actually running the functions to pull/organize data
  useEffect(() => {
    if (!hasData) {
      setAccessToken(getAccessToken()); // get access token
      
      if (accessToken === undefined) { // access token doesn't exist
        router.push(getAuthUrl('false')); // sign user in again
      }
      else if (accessToken !== '') { // access token exists
        setHasData(true); // makes sure these functions don't run again during re-renders
        // removes hash from url
        history.pushState('', document.title, window.location.pathname);
        console.log('access token:', accessToken);
        getTop('tracks', 'short_term', 30);
        getTop('artists', 'short_term', 30);
      }
    }
  }, [accessToken]);


  
  if (!checked) {
    return (
      <PreHome tracks={tracks} artists={artists} setChecked={setChecked} hasData={hasData}/>
    );
  }
    
  return (
    <div>
      <TrackStats tracks={tracks} musicStarted={musicStarted}/>
      
      <Music accessToken={accessToken} tracks={tracks} setChecked={setChecked} musicStarted={musicStarted} setMusicStarted={setMusicStarted}/>
      
      
    </div>
  );

}

export default Home;




// set /#access_token="whatever" to just /#
// now, if the user refreshes the page, check if there is something after #
//    if there isn't, redirect user to "home page" where they'll click a button to actual home page
//    also, set show_dialog to false so user doesn't have to click accept again