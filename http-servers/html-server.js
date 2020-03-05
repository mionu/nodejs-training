const fs = require('fs');
const querystring = require('querystring');
const url = require('url');

require('http')
.createServer()
.on('request', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const html = fs.readFileSync('index.html', { encoding: 'utf8' });
  const { query } = url.parse(req.url);
  const params = querystring.parse(query);
  res.end(html.replace('{message}', params.message));
})
.listen(3000);
