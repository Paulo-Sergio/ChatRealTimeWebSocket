var mongo = require('mongodb');

var connMongoDB = function () {
    // console.log("entrou na função de conexão");
    var db = new mongo.Db(
        'chatrealtime', // bando de dados
        new mongo.Server('localhost', 27017, {}), //obj de conexao com mongoDB
        {} // config. adicionais
    );

    return db;
}

module.exports = function () {
    return connMongoDB;
}