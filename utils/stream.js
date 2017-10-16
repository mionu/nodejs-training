const parseArgs = require('minimist');
const fs = require('fs');
const through2 = require('through2');
const csv2 = require('csv2');

function printHelpMessage() {
  console.log('help message');
}

// Implement a function inside streams.js that will use fs.createReadStream() to pipe the given file to process.stdout
function inputOutput(file) {
  const readable = fs.createReadStream(file, { encoding: 'utf-8' });
  readable.pipe(process.stdout)
}

// Implement a function inside streams.js to convert data from process.stdin to upper-case data on process.stdout using the through2 module.
function transform() {
  process.stdin
  .pipe(through2({ objectMode: true }, function(chunk, enc, callback) {
    const upperCase = chunk.toString('utf8').toUpperCase();
    this.push(Buffer.from(upperCase, 'utf8'));
    callback();
  }))
  .pipe(process.stdout);
}

// Implement a function inside streams.js to convert file from csv to json and output data to process.stdout using the through2 module
// Implement a function inside streams.js to convert file from csv to json and output data
// to a result file with the same name but .json extension, using the through2 module and fs.createWriteStream
function transformFile(file, { saveToFile = false } = {}) {
  let output = saveToFile ? fs.createWriteStream(file.replace(/.csv$/, '.json')) : process.stdout;
  fs.createReadStream(file)
  .pipe(csv2())
  .pipe(through2({ objectMode: true }, function(chunk, enc, callback) {
    const processedChunk = chunk.toString();
    this.push(Buffer.from(processedChunk));
    callback();
  }))
  .pipe(output);
}

const args = parseArgs(process.argv.slice(2), {
  alias: { help: 'h', action: 'a', file: 'f' }
});

const { help, action, file } = args;

if (help) {
  printHelpMessage();
}

if (action) {
  switch(true) {
    case action === 'io' && !!file:
      inputOutput(file);
      break;
    case action === 'transform':
      transform();
      break;
    case action === 'transform-file' && !!file:
      transformFile(file);
      break;
    case action === 'transform-and-save' && !!file:
      transformFile(file, { saveToFile: true });
      break;
    default:
      console.log('wrong params');
      printHelpMessage();
  }
}
