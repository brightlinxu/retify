import { useState } from 'react';
import { useEffect } from 'react';
import Music from '../components/Music.js';
import { getUrl } from '../components/AuthUrl.js';
import router, { useRouter } from 'next/router';

const Home = () => {
  // api data hooks
  const [accessToken, setAccessToken] = useState('');
  const [trackNames, setTrackNames] = useState([]);
  const [trackUris, setTrackUris] = useState([]);
  const [trackAvgDur, setTrackAvgDur] = useState({ sec : 0, min : 0 });
  const [trackArtists, setTrackArtists] = useState([]);
  const [trackPics, setTrackPics] = useState([]);
  const [artistNames, setArtistNames] = useState([]);
  const [artistGenres, setArtistGenres] = useState([]);
  const [artistPics, setArtistPics] = useState([]);

  // keeps track if app already called api and got data
  const [hasData, setHasData] = useState(false); 

  // enables users to see data
  const [checked, setChecked] = useState(false);


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
  
  // finding average duration
  const getAvgDur = (durs) => {
    // adding together all durations in array
    let totalDur = durs.reduce((total, current) => {
        return total + current;
    });
    
    // getting average of total durations
    let avgDur = totalDur / durs.length;

    // separating average duration into minutes and seconds
    let min = Math.floor(avgDur / 60);
    let sec = Math.round(avgDur - (min * 60));

    return {min, sec};
  }

  const parseTracks = (data) => {
    // temporarily using arrays to push items into, then setting state
    let tempTrackNames = [];
    let tempTrackUris = [];
    let tempTrackDurs = [];
    let tempTrackArtists = [];
    let tempTrackPics = [];

    // loop through each artist
    data.forEach(elt => {
      tempTrackNames.push(elt.name);
      tempTrackUris.push(elt.uri);
      tempTrackDurs.push(elt.duration_ms / 1000);
      
      // there may be multiple artists for one song
      let multiArtists = [];
      elt.artists.forEach(artist => {
        multiArtists.push(artist.name);
      });
      tempTrackArtists.push(multiArtists);

      tempTrackPics.push(elt.album.images[1].url); // index 0 = biggest pic, 1 = medium, 2 = smallest
    });

    // setting each hook to updated array
    setTrackNames(tempTrackNames);
    setTrackUris(tempTrackUris);
    setTrackAvgDur(getAvgDur(tempTrackDurs));
    setTrackArtists(tempTrackArtists);
    setTrackPics(tempTrackPics);
  }


  // finding top genres
  const getTopGenres = (data, tempObject) => {
    // counting number of each genre and putting into object
    data.genres.forEach((genre) => {
      if (tempObject.hasOwnProperty(genre)) {
        ++tempObject[genre];
      } else {
          tempObject[genre] = 1;
      }
    });
  }

  const parseArtists = (data) => {
    let tempArtistNames = [];
    let tempArtistGenres = {};
    let tempArtistPics = [];

    // loop through each artist
    data.forEach(elt => {
      tempArtistNames.push(elt.name);
      getTopGenres(elt, tempArtistGenres);
      tempArtistPics.push(elt.images[2].url); // index 0 = biggest pic, 1 = medium, 2 = smallest
    });

    tempArtistGenres = Object.entries(tempArtistGenres)
                             .sort((a,b) => b[1] - a[1])
                             .slice(0, 5)
                             .map(genre => { return genre[0]; });

    setArtistNames(tempArtistNames);
    setArtistGenres(tempArtistGenres);
    setArtistPics(tempArtistPics);
  }
  
  const getTop = (type, timeRange) => {
    fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=50`, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + accessToken}
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(`${type} info:`, data.items);
        type === 'tracks' ? parseTracks(data.items) : parseArtists(data.items);
      })
  }

  const router = useRouter();

  // actually running the functions to pull/organize data
  useEffect(() => {
    if (!hasData) {
      setAccessToken(getAccessToken()); // get access token
      
      if (accessToken === undefined) { // access token doesn't exist
        router.push(getUrl('false')); // sign user in again
      }
      else if (accessToken !== '') { // access token exists
        setHasData(true); // makes sure these functions don't run again during re-renders
        // removes hash from url
        history.pushState('', document.title, window.location.pathname);
        console.log('access token:', accessToken);
        getTop('tracks', 'short_term');
        getTop('artists', 'short_term');
      }
    }
  }, [accessToken]);

  

  const renderChecked = () => {
    if (!checked) {
      return (
        <div>
          <button onClick={() => {setChecked(true)}}>
            see my stats!
          </button>
          <div>
            access token: {accessToken}
          </div>
          <br />
          <div>
            Top Track Pics: 
            {trackPics.map((pic, id) => (<ul key={id}>{pic}</ul>))}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
          Authenticated!
        </div>
        <div>
          access token: {accessToken}
        </div>
        <br />
        <Music accessToken={accessToken} trackUris={trackUris}/>
        <div>
          Top Track Names: 
          {trackNames.map((name, id) => (<ul key={id}>{name}</ul>))}
          Top Track Uris:
          {trackUris.map((uri, id) => (<ul key={id}>{uri}</ul>))}
          Average Track Duration: 
          <ul>{trackAvgDur.min} minutes and {trackAvgDur.sec} seconds</ul>
          Top Artist Names : 
          {artistNames.map((name, id) => (<ul key={id}>{name}</ul>))}
          Top Artist Genres : 
          {artistGenres.map((genre, id) => (<ul key={id}>{genre}</ul>))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {renderChecked()}
    </div>
  );

  
}

export default Home;




// set /#access_token="whatever" to just /#
// now, if the user refreshes the page, check if there is something after #
//    if there isn't, redirect user to "home page" where they'll click a button to actual home page
//    also, set show_dialog to false so user doesn't have to click accept again