
// External Modules
const express = require('express');

const app = express();

app.get('/',(req, res, next) => {
  console.log("Came in first middleware", req.url, req.method);
  // res.send("Came in first middleware")
  next()
})

app.post('/submit-details',(req, res, next) => {
  console.log("Came in second middleware", req.url, req.method);
  res.send("WellCom to Our app")
})

app.use('/',(req, res, next) => {
  console.log("Came in another middleware", req.url, req.method);
  res.send("Came in another middleware")
  // next()
})


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})