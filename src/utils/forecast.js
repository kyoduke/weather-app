'use strict'
const request = require('request');

module.exports = function(lat, long, callback) {
  const url = `https://api.darksky.net/forecast/44e40cea1f4299be38538745905587e9/${lat},${long}?lang=pt&units=si&exclude=flags,alerts,daily,hourly,minutely`;
  request({url: url, json: true}, (err, res) => {
    if(err) {
      callback(`Error: Something went wrong`, undefined);
    } else if(res.body.error) {
      callback(res.body.error, undefined);
    } else {
      callback(undefined, `It is currently ${res.body.currently.temperature}°C out. There is a ${res.body.currently.precipProbability}% chance of rain.`);
    }
  });
}
