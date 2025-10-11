const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  if(req.url === '/home') {
  res.write('<h1>WellCom to Home Page</h1>')
    return res.end();
  }
  else if(req.url.toLowerCase() === '/men'){
     res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Men</title></head>');
    res.write('<body>');
    res.write('<h1>WellCom to Men Page</h1>')
     res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  else if(req.url.toLowerCase() === '/women'){
     res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Women</title></head>');
    res.write('<body>');
    res.write('<h1>WellCom to Women Page</h1>')
     res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  else if(req.url.toLowerCase() === '/kids'){
     res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Kids</title></head>');
    res.write('<body>');
    res.write('<h1>WellCom to Kids Page</h1>')
     res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  else if(req.url.toLowerCase() === '/cart'){
     res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Cart</title></head>');
    res.write('<body>');
    res.write('<h1>WellCom to Cart Page</h1>')
     res.write('</body>');
    res.write('</html>');
    return res.end();
  }

   res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Myntra</title></head>');
    res.write('<body>');
    res.write('<header>')
    res.write('<header>')
    res.write('<nav>')
    res.write('<ul>')
    res.write('<li><a href="/home">Home</a></li>')
    res.write('<li><a href="/men">Men</a></li>')
    res.write('<li><a href="/women">Women</a></li>')
    res.write('<li><a href="/kids">Kids</a></li>')
    res.write('<li><a href="/cart">Cart</a></li>')
    res.write('</ul>')
    res.write('</nav>')
    res.write('</header>')
    res.write('</body>');
    res.write('</html>');
    res.end();
  
});


const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})