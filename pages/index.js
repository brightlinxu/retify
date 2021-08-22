import ParallaxEffect from '../components/ParallaxEffect.js';
import ManualLogin from '../components/ManualLogin.js';
import styles from '../styles/Index.module.css';
import { getWindowSize } from '../utilities/getWindowSize.js'
import { Parallax } from 'react-scroll-parallax';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css';

const Index = () => {
  const windowSize = getWindowSize();
  const rememberStr = 'REMEMBER';
  const rediscoverStr = 'REDISCOVER';


  return (
    <div className={styles.background}>
      <div className={styles.section1}>
        <Parallax y={[0, 0]}>
          <img src='/images/rewind.png' className={styles.section1Img}/>
        </Parallax>
      </div>
      <div className={styles.section2} style={{height: `${windowSize.width > windowSize.height ? 100 : 50}vh`}}>
        <img src='images/scribble4.png' className={styles.section2Img} />
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
        <img src='images/scribble5.png' className={styles.section2Img} />
      </div>
      <div className={styles.section3} style={{height: `${windowSize.width > windowSize.height ? 130 : 65}vh`}}>
        <Parallax y={[`${windowSize.width > 600 ? -200 : -100}px`, '100px']} className={styles.section3BG}>
          <img src='/images/scribble8.png' style={{height: `${windowSize.width / 1.7}px`, width: '70vw'}}/>
        </Parallax>
        <div className={styles.section3Group1}>
          <Parallax y={[`${windowSize.width > 600 ? -80 : -60}px`, '60px']} className={styles.section3Img}>
            <img src='/images/remember.png' style={{width: '100%', height: '100%', borderRadius: '10px'}}/>
          </Parallax>
          <Parallax y={[0, 0]}>
            <div style={{fontSize: `${(windowSize.width / 90) + 8}px`}} className={styles.section3Box}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </div>
          </Parallax>
        </div>
      </div>
      <div className={styles.section4} style={{height: `${windowSize.width > windowSize.height ? 60 : 30}vh`}}>
        <ScrollAnimation animateIn='animate__fadeIn' animateOut='animate__fadeOut'>
          <div style={{fontSize: `${windowSize.width / 18}px`, letterSpacing: `${(windowSize.width / 60) + 5}px`,
                       fontFamily: 'Montserrat-SemiBold'}}>
            DISCOVER
          </div>
        </ScrollAnimation>
        <span>
          {/*rediscoverStr.split('').map((letter, id) => (
            <Parallax key={id} y={[`${((4.5 - id) ** 2) * -5}`, `${((4.5 - id) ** 2) * 5}`]}
            styleInner={{fontSize: `${windowSize.width / 18}px`, fontFamily: 'Montserrat-SemiBold', 
                         letterSpacing: `${(windowSize.width / 60) + 5}px`}}
            className={styles.section4Text}
            >
              {letter}
            </Parallax>
          ))*/}
        </span>
      </div>
      <div className={styles.section5}>
        filler
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