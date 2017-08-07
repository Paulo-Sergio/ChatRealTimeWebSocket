module.exports.iniciaChat = function (application, req, res) {
    /* se usuario não estiver autenticado, redireciona... */
    if (!req.session.autorizado) {
        res.redirect('/');
        return;
    }

    /* emit msgParaCliente (websocket)
            utilizando obj do socket.io dentro do controller */
    application.get('io').emit(
        'msgParaCliente',
        { apelido: req.session.usuario.apelido, mensagem: ' acabou de entrar no chat' }
    );

    res.render('chat', { usuario: req.session.usuario });
    return;

}

module.exports.sair = function (application, req, res) {

    req.session.destroy(function (err) {
        res.redirect("/");
    });

}