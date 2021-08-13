import ParallaxEffect from '../components/ParallaxEffect.js';
import ManualLogin from '../components/ManualLogin.js';
import styles from '../styles/Index.module.css';

const Index = () => {
  return (
    <div className={styles.background}>
      <ParallaxEffect img={'/images/remember.png'} text={'Remember'}/>
      <div className={styles.inBetweenText}>
        Lorem Ipsum
      </div>
      <ParallaxEffect img={'/images/rediscover.png'} text={'Rediscover'}/>
      <div className={styles.inBetweenText}>
        Lorem Ipsum
      </div>
      <ParallaxEffect img={'/images/relive.png'} text={'Relive'}/>
    </div>
  )
}

export default Index;