const express = require('express');
const path = require('path');
const messageRouter = require('./notify');
const fetch = require('node-fetch');
const body = require('body-parser');
// const bodyParser require('body-parser');
const app = express();
const cors = require('cors');

const port = 3000;

app.use(cors());
app.use(body.json());

app.get('/', (_, res) => {
  // res.sendFile(path.resolve((__dirname, "./src/index.html")));
  res.send({
    data: 'not have code',
  });
});
// app.get("/callback", (req, res) => {

//     var _code = req.query._code;
//     console.log(_code);

//     // res.sendFile(path.resolve((__dirname, "./src/callback.html")));
//     // res.json(_code);
// });

//GET /something?color1=red&color2=blue
app.get('/authen', (req, res) => {
  // req.query.color1 === 'red'  // true
  // req.query.color2 === 'blue' // true
  var _code = req.query._code;
  // if (_code) {
  //   // res.send({
  //   //   data: 'nojhfyjtryjhrytsjhrthe',
  //   // });
  //   // fetchToken(_code)
  //   //   .then((resp) => resp.json())
  //   //   .then((result) => {
  //   //     // res.json(result);
  //   //     // console.log(result);
  //   //     res.send('nojhfyjtryjhrytsjhrthe');
  //   //   });

  //   res.send({
  //     data: 'not have code',
  //   });
  // } else {
  //   res.send({
  //     data: 'not have code',
  //   });
  // }
});

async function fetchToken(code) {
  const formData = new URLSearchParams();
  formData.append('grant_type', 'authorization_code');
  formData.append('code', code);
  formData.append(
    'redirect_uri',
    'https://mybot-line-liff-2--4200.local.webcontainer.io/webhook'
  );
  formData.append('client_id', 'RrVsMV8tnyA2JVlaJPmKmM');
  formData.append(
    'client_secret',
    'qDxQdhauQQGr3isIElpMS9CUW0rDPxPAkHL5GuYTccW'
  );

  return await fetch('https://notify-bot.line.me/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
}
// app.use(messageRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));
