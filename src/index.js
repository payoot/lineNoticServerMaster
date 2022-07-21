const express = require("express");
const path = require("path");
const messageRouter = require("./notify")
const fetch = require("node-fetch");
const app = express();
const port = 3000;

// app.get("/", (_, res) => {
//     res.sendFile(path.resolve((__dirname, "./src/index.html")));
// });
// app.get("/callback", (req, res) => {

//     var _code = req.query._code;
//     console.log(_code);


//     // res.sendFile(path.resolve((__dirname, "./src/callback.html")));
//     // res.json(_code);
// });




//GET /something?color1=red&color2=blue
app.get("/authen", (req, res) => {
    // req.query.color1 === 'red'  // true
    // req.query.color2 === 'blue' // true
    var _code = req.query._code;
    if (_code) {
        fetchToken(_code).then((resp) => resp.json()).then((result) => {
            res.send({
                'data': result
            });
        });
    } else {
        res.send({
            'data': 'not have code'
        });
    }


});

function fetchToken(code) {
    const formData = new URLSearchParams();
    formData.append("grant_type", "authorization_code");
    formData.append("code", code);
    formData.append("redirect_uri", "https://mybot-line-liff-2--4200.local.webcontainer.io/webhook");
    formData.append("client_id", "jGoREF5Y5mgX9DSLnBEOAz");
    formData.append(
        "client_secret",
        "bNbO9SFsYbuSss3VT5AMdgFL9wKo4vEabH1AY92FlOi"
    );

    return fetch("https://notify-bot.line.me/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
    });
}
// app.use(messageRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));