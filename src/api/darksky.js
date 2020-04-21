const axios = require('axios');

const getTomorrowsForecast = async (lat, long, time) => {
  try {
    return axios.get(
      `${process.env.REACT_APP_API_URL}/getTomorrowsForecast/${lat},${long},${time}`
    );
  } catch (err) {
    return err;
  }
};

export default {
  getTomorrowsForecast,
};
