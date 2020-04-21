import React, { PureComponent } from 'react';
import styles from './Home.module.scss';
import Search from '../../components/Search/Search';
import DarkSky from '../../api/darksky';
import Toggle from '../../components/Toggle/Toggle';

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
    });

    const { latInput, longInput } = this.state;
    try {
      const payload = await DarkSky.getTomorrowsForecast(latInput, longInput);
      console.log(payload.data.hourly);

      const { summary, data } = payload.data.hourly;
      return this.setState({
        loading: false,
        forecastSummary: summary,
        hourlyForecast: data,
      });
    } catch (err) {
      // SET STATE WITH ERROR MESSAGE HERE
      return err;
    }
  };

  toggleActiveView = (event) => {
    event.preventDefault();
    const { hourlyForecast, activeView } = this.state;
    if (hourlyForecast.length === 0) {
      return;
    }

    return this.setState({
      activeView,
    });
  };

  renderForecast = async () => {};

  render() {
    const { loading, hourlyForecast, forecastSummary, activeView, error } = this.state;
    return (
      <div className={styles.container}>
        <Search handleOnChange={this.handleOnChange} handleOnSubmit={this.handleOnSubmit} />
        <div className={styles.forecastWrapper}>
          <Toggle
            activeView={activeView}
            toggleActiveView={this.toggleActiveView}
            noData={hourlyForecast.length === 0}
          />
          {!loading && hourlyForecast.length === 0 ? (
            <div className={styles.noData}>
              Please enter coordinates to the left to see the temperature.
            </div>
          ) : null}

          {hourlyForecast.length > 0 ? this.renderForecast() : null}

          {error !== '' ? <div className={styles.error}>{error}</div> : null}
        </div>
      </div>
    );
  }
}

export default Home;
