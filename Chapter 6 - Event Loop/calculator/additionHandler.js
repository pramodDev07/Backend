const additionHandler = (req, res) => {
  console.log('1. starting')
  const body = []
  let sum;
  req.on('end', () => {
    console.log('3. end event ')
    const fullBody = Buffer.concat(body).toString();
    console.log(fullBody, 'fullBody')
    const params = new URLSearchParams(fullBody);
    console.log(params)
    const jsonObject = Object.fromEntries(params);
    console.log(jsonObject, 'obj')
    sum = Number(jsonObject.firstValue) + Number(jsonObject.secondValue);
    console.log(sum,'sum')
  });
  req.on('data', chunk => {
    console.log('2. chunkData')
    // console.log(chunk);
    body.push(chunk);
  });
  console.log('4. response ')
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

};

exports.additionHandler = additionHandler;