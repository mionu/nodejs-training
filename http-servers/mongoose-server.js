const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const http = require('http');
const { databaseUrl } = require('../config');

const City = mongoose.model('City', new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  capital: Boolean,
  location: {
    lat: {
      type: Number,
      min: [-90, 'can\'t be less than -90'],
      max: [90, 'can\'t be more than 90']
    },
    long: {
      type: Number,
      min: [0, 'can\'t be less than 0'],
      max: [180, 'can\'t be more than 180']
    }
  }
}));

mongoose.connect(databaseUrl);

http.createServer()
.on('request', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/json' });
  City.aggregate([ { $sample: { size: 1 } } ], (err, city) => {
    res.end(JSON.stringify(city));
  });
})
.listen(3000);
