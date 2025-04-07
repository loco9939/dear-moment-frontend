'use client';

import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading-animation.json';

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner = ({ size = 50 }: LoadingSpinnerProps) => {
  return (
    <Lottie
      animationData={loadingAnimation}
      style={{
        width: size,
        height: size,
      }}
      loop={true}
      autoplay={true}
    />
  );
};

export default LoadingSpinner;
