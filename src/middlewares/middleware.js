const Contato = require('../models/contatoModel')

exports.middlewareGlobal = (req, res, next) => {
  res.locals.erros = req.flash('erros');
  res.locals.sucess = req.flash('sucess')
  res.locals.user = req.session.user;
  //res.locals.user = Contato()

  next();
};

exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    console.log(err)
    return res.render('404');
  }
  next()
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash('erros', 'Você precisa esta logado')
    req.session.save(() => res.redirect('/'))
    return;
  }
  next()
}
