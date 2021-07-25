import { Image } from 'react-image-and-background-image-fade'
import styles from '../styles/ImageFadeIn.module.css'

const PreHomeImage = ( { src } ) => {
  return(
    <div className={styles.imgAlign}>
      <Image src={src} 
      transitionTime='1s'
      className={styles.imgRounded}/>
    </div>
    
  );
}

export default PreHomeImage;