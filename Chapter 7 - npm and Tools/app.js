const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req)
  console.log('he')
});


const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})