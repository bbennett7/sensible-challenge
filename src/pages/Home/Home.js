import React, { PureComponent } from 'react';
import styles from './Home.module.scss';
import Search from '../../components/Search/Search';
import DarkSky from '../../api/darksky';
import Toggle from '../../components/Toggle/Toggle';
import Forecast from '../../components/Forecast/Forecast';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const moment = require('moment');

class Home extends PureComponent {
  state = {
    loading: false,
    latInput: '',
    longInput: '',
    hourlyForecast: [],
    forecastSummary: '',
    activeView: 1,
    error: '',
  };

  handleOnChange = (event) => {
    const stateObj = {};
    stateObj[event.currentTarget.id] = event.currentTarget.value;

    return this.setState({
      ...this.state,
      ...stateObj,
    });
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      loading: true,
      error: '',
      hourlyForecast: [],
    });

    const { latInput, longInput } = this.state;
    let tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
    tomorrow = `${tomorrow}T00:00:00`;

    try {
      const payload = await DarkSky.getTomorrowsForecast(latInput, longInput, tomorrow);

      const { summary, data } = payload.data.hourly;
      return this.setState({
        loading: false,
        forecastSummary: summary,
        hourlyForecast: [...data],
      });
    } catch (err) {
      return this.setState({
        error: err.message,
      });
    }
  };

  toggleActiveView = (event) => {
    event.preventDefault();
    const { hourlyForecast, activeView } = this.state;
    if (hourlyForecast.length === 0) {
      return;
    }

    return this.setState({
      activeView: !activeView,
    });
  };

  render() {
    const { loading, hourlyForecast, forecastSummary, activeView, error } = this.state;
    return (
      <div className={styles.container}>
        <Search handleOnChange={this.handleOnChange} handleOnSubmit={this.handleOnSubmit} />
        <div className={styles.forecastWrapper}>
          <Toggle
            activeView={activeView}
            toggleActiveView={this.toggleActiveView}
            noData={!!(hourlyForecast.length === 0)}
          />
          <div className={styles.summary}>{forecastSummary}</div>
          {loading ? <LoadingSpinner /> : null}
          {error === '' && hourlyForecast.length === 0 && !loading ? (
            <div className={styles.noData}>
              Please enter coordinates to the left to see tomorrow's forecast.
            </div>
          ) : null}

          {hourlyForecast.length > 0 ? (
            <Forecast hourlyForecast={hourlyForecast} activeView={activeView} />
          ) : null}

          {error !== '' ? <div className={styles.error}>{error}</div> : null}
        </div>
      </div>
    );
  }
}

export default Home;
