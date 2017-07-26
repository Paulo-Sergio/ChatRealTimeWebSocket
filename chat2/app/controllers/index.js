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

    usuarioDAO.autenticar(dadosForm, function (data) {
        console.log(data);
    });

    res.send('tudo ok para criar a sessao');

}