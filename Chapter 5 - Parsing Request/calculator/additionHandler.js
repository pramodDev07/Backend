const additionHandler = (req, res) => {
  const body = []
  req.on('data', chunk => {
    console.log(chunk);
    body.push(chunk);
  });
  req.on('end', () => {
    const fullBody = Buffer.concat(body).toString();
    console.log(fullBody, 'fullBody')
    const params = new URLSearchParams(fullBody);
    console.log(params)
    const jsonObject = Object.fromEntries(params);
    console.log(jsonObject, 'obj')
    const sum = Number(jsonObject.firstValue) + Number(jsonObject.secondValue);
    res.write(`
<html>
<head>
  <title>Calculator</title>
</head>
<body>
  <h1>Your sum is ${sum}</h1>
  <a href="/">Go to Home page</a><br><br>
  <a href="/calculator">Go to Calculator page</a>
</body>
</html>
  `)
    return res.end();
  });

};

exports.additionHandler = additionHandler;