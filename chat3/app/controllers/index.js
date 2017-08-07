module.exports.home = function (application, req, res) {

    res.render('index', { validacao: {} });

}

module.exports.autenticar = function (application, req, res) {

    var dadosForm = req.body;

    req.assert('email', 'Campo e-mail não deve ser vazio').notEmpty();
    req.assert('senha', 'Campo senha não deve ser vazio').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.render('index', { validacao: erros });
        return;
    }

    var connection = new application.config.dbConnection();
    var usuarioDAO = new application.app.models.UsuarioDAO(connection);

    usuarioDAO.autenticar(dadosForm, function (result) {
        // console.log(result);
        if (result[0] != undefined) {
            // criando minha variavel de sessão, se encontrou o usuario e senha
            req.session.autorizado = true;
            req.session.usuario = result[0];
        }

        if (req.session.autorizado === true) {
            res.redirect('/usuarios');
        } else {
            /* simulando estrutura gerada pelo req.validationErrors(),
            ** para exibir mensagem de que e-mail não foi encontrado no banco de dados */
            erros = [{ msg: 'E-mail e/ou senha incorreto(s)' }];
            res.render('index', { validacao: erros });
        }
    });
}