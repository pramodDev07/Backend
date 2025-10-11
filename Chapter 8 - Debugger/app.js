// Core Modules
const http = require('http');
// External Modules
const logical = require('./logical');
// Local Modules
const requestHandler = require('./user');
const debugPracticeSet = require('./debugPracticeSet');

// const server = http.createServer(requestHandler);

const server = http.createServer((req, res) => {
  // console.log(req)
  // console.log('he')
  // logical();
  debugPracticeSet()
});


const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})