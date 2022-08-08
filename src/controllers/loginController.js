const Login = require('../models/loginModels')

exports.indexLogin = (req, res) => {
    if(req.session.user) return res.redirect('/')
    return res.render('login')
}

exports.register = async(req, res) => {
    try{
        const login = new Login(req.body)
        await login.register()

        if(login.erros.length > 0){
            req.flash('erros', login.erros);
            req.session.save(() => {
                return res.redirect('/login/index')
            })
            return;
        }
        req.flash('sucess', 'Seu usuario foi criado');
        req.session.save(() => {
            return res.redirect('/login/index')
        })
    }catch(e){
        console.log(e)
        return res.render('404')
    }
    
}

exports.login = async(req, res) => {
    try{
        const login = new Login(req.body)
        await login.login()

        if(login.erros.length > 0){
            req.flash('erros', login.erros);
            req.session.save(() => {
                return res.redirect('/login/index')
            })
            return;
        }
        req.flash('sucess', 'Login efetuado');
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect('/login/index')
        })
    }catch(e){
        console.log(e)
        return res.render('404')
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/')
}