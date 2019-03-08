'use strict'
const path    = require('path');
const express = require('express');
const hbs     = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();


// Define path for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

// =========  ROUTES  ==========
app.get('/', (req, res) => {
  res.render('index', {
    content: "Use this to get your weather!",
    name: "Caio Duque"
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    content: "This is the about page!",
    name: "Caio Duque"
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    content: 'This is the help page!',
    name: "Caio Duque",
    style: '/css/styles.css'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide a address'
    });
  }

  geocode(req.query.address, (err, {latitude, longitude, location}={}) => {
    if(err) {
      return res.send({err})
    } else {
      forecast(latitude, longitude, (err, forecastData) => {
          if(err) {
            return res.send({error: err})
          } else {
            res.send({
              forecast: forecastData,
              location: location,
              address: req.query.address
            });
          }
      });
    }
  });


});

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query.search)
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404_error', {
    error: 'Help Article not Found'
  })
});

app.get('*', (req, res) => {
  res.render('404_error', {
    error: '404 Not Found'
  });
})

app.listen(3000, () => console.log('Server up in port 3000'));


// .../help

// .../about
