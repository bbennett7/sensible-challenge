import React from 'react';
import Lottie from 'react-lottie';
import Animation from '../../assets/1173-sun-burst-weather-icon.json';

const LoadingSpinner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default LoadingSpinner;
