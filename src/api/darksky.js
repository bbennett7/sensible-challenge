const axios = require('axios');

const getTomorrowsForecast = async (lat, long) => {
  try {
    return axios.get(`${process.env.REACT_APP_API_URL}/getTomorrowsForecast/${lat},${long}`);
  } catch (err) {
    return err;
  }
};

export default {
  getTomorrowsForecast,
};
