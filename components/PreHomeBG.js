import { useEffect, useState } from 'react';
import ImageFadeIn from './ImageFadeIn.js';

const PreHomeBG = ( { tracks, artists } ) => {
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);

  useEffect(() => {
    setTimeout(() => { setOne(true);
      setTimeout(() => { setTwo(true);
      }, 300);
    }, 300);
  });

  if (tracks.length !== 0) {
    return(
      <div>
        <div>
          <ImageFadeIn src={tracks[0].album.images[0].url} />
          {one && <ImageFadeIn src={tracks[1].album.images[0].url} />}
          {two && <ImageFadeIn src={tracks[2].album.images[0].url} />}
          {two && <ImageFadeIn src={tracks[3].album.images[0].url} />}
          {two && <ImageFadeIn src={tracks[4].album.images[0].url} />}
          {one && <ImageFadeIn src={tracks[5].album.images[0].url} />}
          {one && <ImageFadeIn src={tracks[6].album.images[0].url} />}
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