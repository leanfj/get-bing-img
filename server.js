const express = require('express');
const cors = require('cors');
const app = express();
const https = require('https');
var router = express.Router();

const rotaBing = (router.get = ('/',
(reqest, response) => {
  let resultado = '';

  let req = https.get(
    'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR',
    resp => {
      resp.on('data', data => {
        resultado += data;
      });
      resp.on('end', data => {
        response.json(JSON.parse(resultado));
      });
    }
  );

  req.on('error', data => {
    console.dir(data);
    response.json(resultado);
  });
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', rotaBing);

let PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log('App escutando porta 3000');
});
