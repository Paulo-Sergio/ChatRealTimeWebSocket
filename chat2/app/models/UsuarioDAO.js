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
                callback(result);
            })
            mongoClient.close();
        })
    })
}

module.exports = function () {
    return UsuarioDAO;
}