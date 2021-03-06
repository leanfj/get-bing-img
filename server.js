const express = require('express');
const app = express();
const https = require('https');
const router = express.Router();
const cors = require('cors');

const rotaBing = (router.get = ('/bing',
(reqest, response) => {
  let resultado = '';

  let req = https.get(
    'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-BR',
    resp => {
      resp.on('data', data => {
        resultado += data;
      });
      resp.on('end', data => {
        let info = JSON.parse(resultado);
        let bingImage = 'https://www.bing.com' + info.images[0].url;
        response.json(bingImage);
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
