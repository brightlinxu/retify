import { useEffect } from "react";
import Lottie from "react-lottie";
import { getWindowSize } from "../utilities/getWindowSize";

const LoadingAnimation = ( { lotti, distFromTop } ) => {
  const windowSize = getWindowSize();
  const animationSize = (windowSize.width / 15) + 70;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lotti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', height: `${distFromTop * 2}vh`}}>
      <Lottie options={defaultOptions} height={animationSize} width={animationSize * 1.2} />
    </div>
  );
}

export default LoadingAnimation;