import ParallaxEffect from '../components/ParallaxEffect.js';
import ManualLogin from '../components/ManualLogin.js';
import styles from '../styles/Index.module.css';
import { getWindowSize } from '../utilities/getWindowSize.js'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

const Index = () => {
  const windowSize = getWindowSize();
  const rememberStr = 'REMEMBER';


  return (
    <div className={styles.background}>
      <div className={styles.section1}>
        <Parallax y={[0, 0]}>
          <img src='/images/rewind.png' className={styles.section1Img}/>
        </Parallax>
      </div>
      <div className={styles.section2}>
        <span>
          {rememberStr.split('').map((letter, id) => (
            <Parallax key={id} x={[`0px`, `${windowSize.width ? windowSize.width * ((id / 25) - (3 / 23)) : 0}px`]}
            styleInner={{fontSize: `${windowSize.width / 18}px`, fontFamily: 'Montserrat-SemiBold'}}
            className={styles.section2Text}
            >
              {letter}
            </Parallax>
          ))}
        </span>
      </div>
      <div className={styles.section3}>
        <Parallax y={[80, -80]}>
          <div className={styles.section3Img}>
            <img src='/images/remember.png' style={{width: '100%', height: '100%', borderRadius: '10px'}}/>
          </div>
        </Parallax>
        <Parallax y={[-100, 100]}>
          <div style={{fontSize: `${(windowSize.width / 100) + 10}px`}} className={styles.section3Box}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          </div>
        </Parallax>
      </div>



      {/*
      <ParallaxEffect img={'/images/remember.png'} text={'Remember'}/>
      <div className={styles.inBetweenText}>
        Lorem Ipsum
      </div>
      <ParallaxEffect img={'/images/rediscover.png'} text={'Rediscover'}/>
      <div className={styles.inBetweenText}>
        Lorem Ipsum
      </div>
      <ParallaxEffect img={'/images/relive.png'} text={'Relive'}/>
      */}
    </div>
  )
}

export default Index;


// new idea:
// parallax page with a lot of different bubbles (with cool images inside) and 'remember' 'rediscover' 'relive'
// are spread out a little moreta

// when page is first loading, slowly fill in a replay button