import express, { json } from 'express';
import bodyParser from 'body-parser';
import fetch, { Headers } from 'node-fetch';
import cors from 'cors';
const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send({
    data: 'get start Server',
  });
});
app.get('/callback', (req, res) => {
  const _code = req.query.code;
  if (_code) {
    fetchToken2(_code)
      .then(async (resp) => resp.json())
      .then((result) => {
        _chexkStatus(result['access_token'])
          .then(async (response) => response.text())
          .then(async (respon) => {
            console.log(JSON.stringify(respon));
            res.send({
              token: result['access_token'],
              value: JSON.parse(respon),
            });
          })
          .catch((error) => console.log('error _chexkStatus', error));
      })
      .catch((error) => console.log('error fetchToken2', error));
  } else {
    res.send({
      data: 'not have code',
    });
  }
});

function fetchToken2(code) {
  const formData = new URLSearchParams();
  formData.append('grant_type', 'authorization_code');
  formData.append('code', code);
  formData.append(
    'redirect_uri',
    'https://mybot-line-liff-2--4200.local.webcontainer.io/webhook'
  );
  formData.append('client_id', 'eHFCOdEgtDvG1TYuSpXWDU');
  formData.append(
    'client_secret',
    'jL2IkKIFLrGswOh7czXo8GVGFM7DoDu9b6TduvIT5T8'
  );
  return fetch('https://notify-bot.line.me/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });
}

function _chexkStatus(_token) {
  const meta = {
    'Content-Type': 'text/xml',
    Authorization: 'Bearer ' + _token,
  };
  const head = new Headers(meta);
  var requestOptions = {
    method: 'GET',
    headers: head,
    redirect: 'follow',
  };
  return fetch('https://notify-api.line.me/api/status', requestOptions);
}

app.listen(port, () => console.log(`Listening on port ${port}!`));
