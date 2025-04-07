'use client';

import { useEffect, useState } from 'react';
import loadingAnimation from '../assets/loading-animation.json';

interface LoadingSpinnerProps {
  size?: number;
}

// Lottie 컴포넌트 타입 정의
type LottieComponentType = React.ComponentType<{
  animationData: unknown;
  style?: React.CSSProperties;
  loop?: boolean;
  autoplay?: boolean;
}>;

const LoadingSpinner = ({ size = 50 }: LoadingSpinnerProps) => {
  // 적절한 타입으로 상태 관리
  const [LottieComponent, setLottieComponent] = useState<LottieComponentType | null>(null);

  useEffect(() => {
    // 클라이언트 사이드에서만 Lottie 임포트
    import('lottie-react').then(module => {
      setLottieComponent(() => module.default);
    });
  }, []);

  if (!LottieComponent) {
    return <div style={{ width: size, height: size }} />;
  }

  return (
    <LottieComponent
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
