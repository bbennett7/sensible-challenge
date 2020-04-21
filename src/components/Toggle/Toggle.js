import React from 'react';
import styles from './Toggle.module.scss';
import { ReactComponent as ColorThermometer } from '../../assets/temperature-color.svg';
import { ReactComponent as Thermometer } from '../../assets/thermometer.svg';
import { ReactComponent as ColorRainCloud } from '../../assets/rain-cloud-color.svg';
import { ReactComponent as RainCloud } from '../../assets/rain-cloud.svg';

const Toggle = ({ activeView, toggleActiveView, noData }) => {
  const renderActiveTemp = () => {
    return (
      <div className={styles.wrapper}>
        <ColorThermometer onClick={toggleActiveView} className={styles.click} />
        <RainCloud onClick={toggleActiveView} className={styles.click} />
      </div>
    );
  };

  const renderActiveRain = () => {
    return (
      <div className={styles.wrapper}>
        <Thermometer onClick={toggleActiveView} className={styles.click} />
        <ColorRainCloud onClick={toggleActiveView} className={styles.click} />
      </div>
    );
  };

  if (noData) {
    return (
      <div className={styles.wrapper}>
        <Thermometer />
        <RainCloud />
      </div>
    );
  }

  return (
    <div className={styles.container}>{activeView ? renderActiveTemp() : renderActiveRain()}</div>
  );
};

export default Toggle;
