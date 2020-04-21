import React from 'react';
import styles from './Forecast.module.scss';

const moment = require('moment');

const Forecast = ({ hourlyForecast, activeView }) => {
  const renderForecast = () => {
    let counter = 0;
    return hourlyForecast.map((f) => {
      const { time, temperature, precipProbability, precipIntensity } = f;
      if (counter % 2 === 1) {
        counter += 1;
        return null;
      }

      counter += 1;
      return (
        <div className={styles.wrapper} key={f.time}>
          <div className={styles.time}>{counter - 1}:00</div>
          {activeView ? (
            <div className={styles.temp}>{temperature}°</div>
          ) : (
            <React.Fragment>
              <div className={styles.precipProbability}>{precipProbability}%</div>
              <div className={styles.precipIntensity}>{precipIntensity}"</div>
            </React.Fragment>
          )}
        </div>
      );
    });
  };

  // rain show probability and intensity
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.time}>Hour</div>
        {activeView ? (
          <div className={styles.temp}>Temperature</div>
        ) : (
          <React.Fragment>
            <div className={styles.precipProbability}>Probability</div>
            <div className={styles.precipIntensity}>Intensity</div>
          </React.Fragment>
        )}
      </div>
      {renderForecast()}
    </div>
  );
};

export default Forecast;
