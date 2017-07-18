/* importar as configurações do servidor */
var app = require('./config/server');

/* importar modulo do Socket.IO */
var socketIO = require('socket.io');

/* parametrizar porta de escuta */
var server = app.listen(3000, function () {
    console.log('Servidor rodando porta 3000');
});

var io = socketIO.listen(server);

// deixando a variavel Global para ser acessado na controller -> chat
app.set('io', io);

/* criar a conexão por websocket */
// funcao ON vai estar escutando req lado do cliente e vice-versa
// estamos escutando eventos de connection, evento padrão do socket.io (propria conexao por parametro [socket])
io.on('connection', function (socket) {
    console.log('Usuario conectou');

    socket.on('disconnect', function () {
        console.log('Usuario desconectou');
    });
});