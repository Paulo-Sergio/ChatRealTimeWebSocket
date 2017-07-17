module.exports.iniciaChat = function (application, req, res) {

    /* vai ter um json com os campos e valores enviados do formulario atraves do 'name' */
    var dadosForm = req.body;

    /* funcao assert vem do expressValidator (esta no app -> application) */
    req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve ter entre 3 até 15 caracteres').len(3, 5);

    var erros = req.validationErrors();
    if (erros) {
        res.render('index', { validacao: erros });
        return;
    }

    res.render('chat');

}