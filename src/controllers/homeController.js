const Contato = require('../models/contatoModel')

exports.index = async (req, res) => {

  try {
    const contato = new Contato(req.body)
    const contatos = await contato.buscarTodos()
    res.render('index', {contatos});
    return;
  }catch(e) {
    console.log(e);
    return res.render('404');
  }
}