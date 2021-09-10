import ParallaxEffect from '../components/ParallaxEffect.js';
import ManualLogin from '../components/ManualLogin.js';
import styles from '../styles/Index.module.css';
import { Fade } from 'react-awesome-reveal';
import { Parallax, Background } from 'react-parallax';

const Index = () => {


  return (
    <div>
      <ParallaxEffect img={'/images/remember.png'} text={'Remember'} translate={-5}/>
      <Parallax renderLayer={percentage => (
        <Fade direction={'left'} triggerOnce>
          <div style={{
              /*height: `${((1 - percentage) * 20) + 25}vh`*/
              marginTop: `${((1 - percentage) * 10) + 10}vh`,
              marginBottom: `${((1 - percentage) * 10) + 10}vh`
            }} 
            className={styles.inBetweenText}
          >
            We don’t realize how fast our lives are going by until something makes us look back.
          </div>
        </Fade>
      )}/>
      <ParallaxEffect img={'/images/rediscover.png'} text={'Rediscover'} translate={0}/>
      <Parallax renderLayer={percentage => (
        <Fade direction={'right'} triggerOnce>
          <div style={{
              marginTop: `${((1 - percentage) * 8) + 10}vh`,
              marginBottom: `${((1 - percentage) * 8) + 10}vh`
            }} 
            className={styles.inBetweenText}
          >
            Take some time and truly reminisce on those unforgettable moments that these songs are about to bring you back to.
          </div>
        </Fade>
      )}/>
      <ParallaxEffect img={'/images/relive.png'} text={'Relive'} translate={0}/>
      <div className={styles.loginPos}>
        <Fade direction={'up'} delay={800} triggerOnce>
          <ManualLogin />
        </Fade>
      </div>
    </div>
  );
}

export default Index;


// new idea:
// parallax page with a lot of different bubbles (with cool images inside) and 'remember' 'rediscover' 'relive'
// are spread out a little moreta

// when page is first loading, slowly fill in a replay button