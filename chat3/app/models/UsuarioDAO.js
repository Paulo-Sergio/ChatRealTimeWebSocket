function UsuarioDAO(connection) {
  this._connection = connection;
}

UsuarioDAO.prototype.inserirUsuario = function (usuario) {
  this._connection.open(function (err, mongoClient) {
    mongoClient.collection("usuarios", function (err, collection) {
      collection.insert(usuario);
      mongoClient.close();
    })
  })
}

UsuarioDAO.prototype.autenticar = function (usuario, callback) {
  this._connection.open(function (err, mongoClient) {
    mongoClient.collection("usuarios", function (err, collection) {
      // collection.find({ email: { $eq: usuario.email }, senha: { $eq: usuario.senha } })
      collection.find(usuario).toArray(function (err, result) {
        // passando o result para o meu callback, que sera tratado no controller
        callback(result);
      })
      mongoClient.close();
    })
  })
}

UsuarioDAO.prototype.getUsuarios = function (callback) {
  this._connection.open(function (err, mongoClient) {
    mongoClient.collection("usuarios", function (err, collection) {
      collection.find().toArray(function (err, result) {
        callback(err, result)
      })
      mongoClient.close()
    })
  })
}

module.exports = function () {
  return UsuarioDAO;
}