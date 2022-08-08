const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const { loginRequired } = require('./src/middlewares/middleware')

// Rotas da home
route.get('/', homeController.index);
route.get('/login/index', loginController.indexLogin);

route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);


// vou utilizar um middleware nesta pagina, onde somente quem logo consegue acessar
route.get('/contato/index', loginRequired ,contatoController.index)
route.post('/contato/register', loginRequired ,contatoController.register)
route.get('/contato/index/:id', loginRequired ,contatoController.edit)
route.post('/contato/edit/:id', loginRequired ,contatoController.editar)
route.get('/contato/delete/:id', loginRequired ,contatoController.delete)

module.exports = route;
