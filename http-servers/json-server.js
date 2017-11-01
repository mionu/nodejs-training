const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [
    { color: 'blue' },
    { size: 'XL' }
  ]
};

require('http')
.createServer()
.on('request', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/json' });
  res.end(Buffer.from(JSON.stringify(product)));
})
.listen(3000);
