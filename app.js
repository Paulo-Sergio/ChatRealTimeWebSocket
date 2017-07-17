/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar porta de escuta */
app.listen(3000, function () {
    console.log('Servidor rodando porta 3000');
})