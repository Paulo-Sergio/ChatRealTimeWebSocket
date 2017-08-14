module.exports = function (application) {
    
  application.get('/usuarios', function (req, res) {
    application.app.controllers.usuarios.usuarios(application, req, res);
  });

  application.post('/createRoom', function (req, res) {
    application.app.controllers.usuarios.createRoom(application, req, res);
  });
}