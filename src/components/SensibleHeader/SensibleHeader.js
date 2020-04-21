import React from 'react';
import styles from './SensibleHeader.module.scss';

const SensibleHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sensible}>Sensible</div>
      <div className={styles.forecasts}>Forecasts</div>
    </div>
  );
};

export default SensibleHeader;
