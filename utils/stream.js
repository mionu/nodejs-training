const parseArgs = require('minimist');
const fs = require('fs');
const through2 = require('through2');
const csv2json = require('csv2json');
const { join } = require('path');
const https = require('https');

function printHelpMessage() {
  console.log(
    'CLI params:\n' +
    '--action, -a: action to perform\n' +
    '--file, -f (required for several actions): path to file\n' +
    '--path, -p (required for css-bundle): path to directory\n\n' +
    'list of actions:\n' +
    'io: pipes the given file to process.stdout\n' +
    'transform: converts data from process.stdin to upper-case data on process.stdout\n' +
    'transform-file: converts file from csv to json and output data to process.stdout\n' +
    'transform-and-save: convert file from csv to json and output data to a result file with the same name but .json extension\n' +
    'bundle-css: grabs all css files in given path, concats them into one, requests some extra css and saves it all in the same path as bundle.css'
  );
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
  .pipe(csv2json())
  .pipe(through2({ objectMode: true }, function(chunk, enc, callback) {
    const processedChunk = chunk.toString();
    this.push(Buffer.from(processedChunk));
    callback();
  }))
  .pipe(output);
}

// Implement cssBundler function and introduce an extra parameter --path.
function bundleCss(dir) {
  const bundleFile = join(dir, 'bundle.css');
  const url = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';
  const output = fs.createWriteStream(bundleFile);
  fs.readdir(dir, function(err, files) {
    if (err) {
      throw err;
    }
    files.map(file => join(dir, file))
    .filter(file => /.css$/.test(file))
    .forEach(file => {
      fs.createReadStream(file).pipe(output);
    });
    cssRequest = https.get(url, response => {
      response.pipe(fs.createWriteStream(bundleFile, { flags: 'a' }));
    });
  });
}

const args = parseArgs(process.argv.slice(2), {
  alias: { help: 'h', action: 'a', file: 'f', path: 'p' }
});

const { help, action, file, path } = args;

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
    case action === 'bundle-css' && !!path:
      bundleCss(path);
      break;
    default:
      console.log('wrong params');
      printHelpMessage();
  }
}

module.exports = { inputOutput, transform, transformFile, bundleCss };
