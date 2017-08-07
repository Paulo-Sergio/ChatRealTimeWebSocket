module.exports.usuarios = function (application, req, res) {
    if (!req.session.autorizado) {
        res.redirect('/');
        return;
    }

    var connection = application.config.dbConnection();
    var usuarioDAO = new application.app.models.UsuarioDAO(connection);
    usuarioDAO.getUsuarios(function (err, result) {
        res.render('usuarios', { usuarios: result })
    })
}