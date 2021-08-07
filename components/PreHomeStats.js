import styles from '../styles/PreHomeStats.module.css'

const PreHomeStats = ( { text } ) => {

  return(
    <div className={styles.background}>
      <div className={styles.text}>
        {text}
      </div>
    </div>
  );
}

export default PreHomeStats;