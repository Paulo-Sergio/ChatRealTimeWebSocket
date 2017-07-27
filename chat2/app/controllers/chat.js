module.exports.iniciaChat = function (application, req, res) {

    /* vai ter um json com os campos e valores enviados do formulario atraves do 'name' */
    var dadosForm = req.body;

    /* funcao assert vem do expressValidator (esta no app -> application) */
    /*req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve ter entre 3 até 15 caracteres').len(3, 15);
    
    var erros = req.validationErrors();
    if (erros) {
        res.render('index', { validacao: erros });
        return;
    }*/

    /* verifica se o usuario já esta autenticado */
    if (req.session.autorizado === true) {
        /* emit msgParaCliente (websocket)
               utilizando obj do socket.io dentro do controller */
        application.get('io').emit(
            'msgParaCliente',
            { apelido: req.session.usuario.apelido, mensagem: ' acabou de entrar no chat' }
        );

        res.render('chat', { usuario: req.session.usuario });
        return;
    }

    res.redirect('/');

}

module.exports.sair = function (application, req, res) {

    req.session.destroy(function (err) {
        res.redirect("/");
    });

}