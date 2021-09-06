import { useEffect } from "react";
import Lottie from "lottie-react";
import { getWindowSize } from "../utilities/getWindowSize";

const LoadingAnimation = ( { lottie, left, top, fadeIn } ) => {
  const windowSize = getWindowSize();
  const animationSize = (windowSize.width / 15) + 70;

  return (
    <div style={{position: 'fixed', left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%'}}>
      <div className={fadeIn ? 'animate__animated animate__fadeIn' : ''}>
        <Lottie animationData={lottie} style={{height: `${animationSize}px`, width: 'auto'}}/>
      </div>
    </div>
  );
}

export default LoadingAnimation;