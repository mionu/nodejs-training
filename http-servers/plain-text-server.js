require('http')
  .createServer()
  .on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('hello world');
  })
  .listen(3000);
