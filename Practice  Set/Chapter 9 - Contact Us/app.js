const express = require('express');

const app = express();

// app.use((req, res, next) =>{
//   console.log(req.path,'path');
//   next();
// });

// app.use((req, res, next) =>{
//   console.log(req.method,'method');
//   next();
// });

// app.use((req, res, next) =>{
//   console.log('Send Response');
//   res.send("<h1>WellCom to Home Page</h1>");
// });

app.get('/',(req, res, next) =>{
   console.log('Handling / for GET',req.url, req.method);
    res.send(`<h1>WellCome to Home Page</h1>`)
});

app.get('/contact-us',(req, res, next) =>{
  console.log('Handling /contact-us for GET',req.url, req.method);
  res.send(`<h1>Please give your details here to Home Page</h1>
      <form action="/contact-us" method="POST">
      <input type="text" name="name" placeholder="Enter Your Name" />
      <input type="email" name="email" placeholder="Enter Your E-mail" />
      <input type="submit" />
      </form>
    `);
});

app.post('/contact-us',(req, res, next) =>{
   console.log('Handling /contact-us for POST',req.url, req.method);
    res.send(`<h1>We will contact you shortly</h1>`)
});

const PORT = 3000;
app.listen(PORT, ()=>{
  console.log(`Server running at http://localhost:${PORT}`)
})