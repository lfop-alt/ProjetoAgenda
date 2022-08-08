const Contato = require('../models/contatoModel')

exports.index = (req, res) => {
    res.render('contato', {contato: {}})
}

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body)
        await contato.register()

        if(contato.erros.length > 0){
            req.flash('erros', contato.erros)
            req.session.save(() => {
                res.redirect('/contato/index')
            })
            return;
        }

        req.flash('sucess', 'Contato cadastrado com sucesso')
        req.session.save(() => {
            console.log(contato.contato._id)
            res.redirect('/')
        })
        return;
    } catch(e) {
        console.log(e)
        return res.render('404')
    }
}

exports.edit = async (req, res) => {
    try {
        if(!req.params.id) return;
        const contato1 = new Contato(req.body)
        const contato = await contato1.buscarPorId(req.params.id)

        res.render('contato', { contato })
    }catch(e) {
        console.log(e);
        res.render('404')
    }
}

exports.editar = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404')
        const contato = new Contato(req.body)
        await contato.edit(req.params.id);

        if(contato.erros.length > 0){
            req.flash('erros', contato.erros)
            req.session.save(() => {
                res.redirect('/contato/index')
            })
            return;
        }

        req.flash('sucess', 'Contato editado com sucesso')
        req.session.save(() => {
            res.redirect('/')
        })
        return;
    } catch(e) {
        console.log(e)
        res.render('404')
    }
}

exports.delete = async (req, res) => {
    try {
        if(!req.params.id) return res.render('404')
        const contato = new Contato(req.body);
        const contatoEx = contato.searchForDelete(req.params.id)

        req.flash('sucess', 'Contato Excluido')
        req.session.save(() => {
            res.redirect('/')
        })

    } catch(e){
        console.log(e)
        res.render('404')
    }
}