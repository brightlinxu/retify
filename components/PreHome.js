import { useState, useEffect } from 'react';
import PreHomeBG from '../components/PreHomeBG.js';
import PreHomeStats from '../components/PreHomeStats.js';
import styles from '../styles/PreHome.module.css';

const PreHome = ( { tracks, artists } ) => {


  return(
    <div>
      <PreHomeBG tracks={tracks} artists={artists} />
      <div className={styles.boxLayout}>
        <PreHomeStats />
        <PreHomeStats />
        <PreHomeStats />
      </div>
      <button onClick={() => {setChecked(true)}}>
        see my stats!
      </button>
    </div>
  );
}

export default PreHome;