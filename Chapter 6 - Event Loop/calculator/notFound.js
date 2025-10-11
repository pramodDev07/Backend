

const notFound = (req, res) => {
  res.write(`
 <html>
<head>
  <title>Not Fond</title>
</head>
<body>
  <h1>404 Page Does not Exist</h1>
  <a href="/">Go to Home</a><br><br>
   <a href="/calculator">Go to Calculator page</a>
</body>
</html>
`);
return res.end();
}

exports.notFound = notFound