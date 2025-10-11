const http = require('http');
const { form } = require('./form');
const { additionHandler } = require('./additionHandler');
const { home } = require('./home');
const { notFound } = require('./notFound');

const server = http.createServer((req, res) => {
  const url = req.url.toLowerCase();
  
  if (req.url === '/') { home(req, res) }
  else if (url === '/calculator') { form(req, res) }
  else if (url === '/submit-addition' && req.method == "POST") { additionHandler(req, res) }
 else{notFound(req, res);}
});



const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})