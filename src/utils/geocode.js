'use strict'
const request = require('request');

module.exports = function geocode(address, cb) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2hhY2FpbyIsImEiOiJjanN1bjc5amsyZzhhNDVwOWk3ZGc0OW9wIn0.e0nMmkcaC6KnbAi_2Uwt8w&limit=1`;

  request({url: url, json: true}, (err, res) => {
    if(res.statusCode == 200) {
      if(err) {
        cb('Servidor indisponivel', undefined);
      } else if (res.body.features.length === 0) {
        cb('Unable to find location. Try another search', undefined)
      } else {
        cb(undefined, {
          latitude: res.body.features[0].center[0],
          longitude: res.body.features[0].center[1],
          location: res.body.features[0].place_name
        });
      }
    } else {
      cb('Type a valid Location', undefined)
    }

  });
}
