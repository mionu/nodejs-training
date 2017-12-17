require('babel-register');
const fs = require('fs');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/nodejs_training';
mongoose.connect(url);

const [modelName, filepath] = process.argv.slice(2);
const data = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf8' }));

const model = require(`../models/${modelName}`).default;

model.insertMany(data, (err, docs) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`inserted to ${modelName}`);
  }
});
