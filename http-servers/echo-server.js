require('http')
.createServer()
.on('request', (req, res) => {
  req.pipe(res);
})
.listen(3000);
