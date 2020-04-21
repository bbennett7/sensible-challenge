import React, { PureComponent } from 'react';
import styles from './Home.module.scss';
import Search from '../../components/Search/Search';
import DarkSky from '../../api/darksky';

class Home extends PureComponent {
  state = {
    latInput: '',
    longInput: '',
    hourlyForecast: [],
    forecastSummary: '',
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
    const { latInput, longInput } = this.state;
    try {
      const payload = await DarkSky.getTomorrowsForecast(latInput, longInput);
      console.log(payload.data.hourly);

      const { summary, data } = payload.data.hourly;
      return this.setState({
        forecastSummary: summary,
        hourlyForecast: data,
      });
    } catch (err) {
      return err;
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <Search handleOnChange={this.handleOnChange} handleOnSubmit={this.handleOnSubmit} />
      </div>
    );
  }
}

export default Home;
