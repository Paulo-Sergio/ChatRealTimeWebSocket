module.exports = function (application) {
    application.get('/chat', function (req, res) {
        application.app.controllers.chat.iniciaChat(application, req, res);
    });

    application.get('/sair', function (req, res) {
        application.app.controllers.chat.sair(application, req, res);
    });
}