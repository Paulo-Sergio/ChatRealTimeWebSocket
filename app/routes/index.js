/* app [application] é passada pelo autoload do consign */
module.exports = function (application) {
    application.get('/', function (req, res) {
        application.app.controllers.index.home(application, req, res);
    });
}