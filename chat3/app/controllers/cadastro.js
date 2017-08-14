module.exports.cadastro = function (application, req, res) {

  res.render('cadastro', { validacao: {}, dadosForm: {} });

}

module.exports.cadastrar = function (application, req, res) {

  var dadosForm = req.body;

  req.assert('apelido', 'Apelido não pode ser vazio').notEmpty();
  req.assert('email', 'Este e-mail não é válido').isEmail();
  req.assert('senha', 'A senha deve conter no minimo 6 caracteres').len(6, 100);

  var erros = req.validationErrors();

  if (erros) {
      res.render('cadastro', { validacao: erros, dadosForm: dadosForm });
      return;
  }

  var connection = application.config.dbConnection();
  var usuarioDAO = new application.app.models.UsuarioDAO(connection);
  usuarioDAO.inserirUsuario(dadosForm);

  res.redirect('/');

}