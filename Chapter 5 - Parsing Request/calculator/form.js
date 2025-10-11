
const form = (req, res) => {
  res.write(`
    <html>
<head>
  <title>Calculator</title>
</head>
<body>
  <form action="/submit-addition" method="POST">
    <h1>Here is the Calculator</h1>
    <input type="text" name="firstValue" placeholder="Enter your first value">
    <input type="text" name="secondValue" placeholder="Enter your Second value">
    <button type="submit">Sum</button>
  </form>
</body>
</html>
    `)
  return res.end()
}

exports.form = form