import { Parallax, Background } from 'react-parallax';

const ParallaxEffect = (  { img, text } ) => {
  return(
    <Parallax bgImage={img} strength={-200}>
      <div style={{height: '100vh'}}>
        <div style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: '120px',
          color: '#f8f8ff',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)'}}
        >
          {text}
        </div>
      </div>
    </Parallax>
  );
}

export default ParallaxEffect;
