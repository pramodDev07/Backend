

const home = (req, res) => {
   res.write(`
<html>
<head>
  <title>Practice Set</title>
</head>
<body>
  <h1>WellCome Home</h1>
  <a href="/calculator">Go to Calculator page</a>
</body>
</html>
  `)
 return res.end()
}

exports.home = home