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

    socket.emit('rooms', io.sockets.adapter.rooms);

    // vou fazer a junção no canal
    socket.on('join', function (data) {
        console.log('joining room', data.room_name + ' apelido: ' + data.apelido);
        socket.join(data.room_name);

        socket.broadcast.to(data.room_name).emit('msgParaCliente', {
            apelido: data.apelido,
            mensagem: ' acabou de entrar no chat'
        });
        socket.broadcast.emit('new room', data.room_name);
    });

    // escutando a mensagem que veio lá do cliente
    socket.on('msgParaServidor', function (data) {
        console.log("conversa na sala: " + data.room_name);

        // emitir de volta para o cliente, passando apelido e mensagem
        // envia para todos da sala, incluindo o remetente tbm
        io.sockets.in(data.room_name).emit('msgParaCliente', {
            apelido: data.apelido,
            mensagem: data.mensagem
        });
        // enviar para todos da sala via broadcast, deixa de fora o remetente
        /*socket.broadcast.to(data.room).emit('msgParaCliente',
            { apelido: data.apelido, mensagem: data.mensagem }
        );*/
    });
});