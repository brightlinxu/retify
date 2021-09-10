import ScrollAnimation from 'react-animate-on-scroll';
import { Parallax, Background } from 'react-parallax';
import { Zoom } from 'react-awesome-reveal';
import { getWindowSize } from '../utilities/getWindowSize';

const ParallaxEffect = (  { img, text, translate } ) => {
  const windowSize = getWindowSize();

  return(
    <Parallax bgImage={img} strength={220}>
        <div style={{
          height: '110vh', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: `translate(0%, ${translate}%)`
        }}
        >
          <Zoom fraction={0.9} triggerOnce>
            <div style={{
              fontWeight: '600', fontSize: `${(windowSize.width / 12) + 10}px`, color: '#f8f8ff'
            }}
            >
              {text}
            </div>
          </Zoom>
        </div>
    </Parallax>
  );
}

export default ParallaxEffect;
