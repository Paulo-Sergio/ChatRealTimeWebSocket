/* importar modulo do express */
var express = require('express');
/* importar modulo do consign */
var consign = require('consign');
/* importar modulo do body-parser */
var bodyParser = require('body-parser');
/* importar modulo do express-validator */
var expressValidator = require('express-validator');

/* iniciar obj express */
var app = express();

/* setar as variaveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({ extended: true }));

/* configurar o middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, models e controllers para o obj app */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

/* exportar o obj app */
module.exports = app;