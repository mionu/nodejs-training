const { MongoClient } = require('mongodb');
const http = require('http');
const { databaseUrl } = require('../config');

MongoClient.connect(databaseUrl, function(err, db) {
  const city = db.collection('cities');
  http.createServer()
  .on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/json' });
    city.aggregate([ { $sample: { size: 1 } } ], (err, city) => {
      res.end(JSON.stringify(city));
    });
  })
  .listen(3000);
});
