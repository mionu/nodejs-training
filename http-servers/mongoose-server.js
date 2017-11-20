const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const http = require('http');

const url = 'mongodb://localhost:27017/nodejs_training';

const City = mongoose.model('City', new Schema({
  name: String,
  country: String,
  capital: Boolean,
  location: {
    lat: Number,
    long: Number
  }
}));

mongoose.connect(url);

http.createServer()
.on('request', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/json' });
  City.aggregate([ { $sample: { size: 1 } } ], (err, city) => {
    res.end(JSON.stringify(city));
  });
})
.listen(3000);
