const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const loginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginModel = mongoose.model('login', loginSchema);

class login {
  constructor(body) {
    this.body = body;
    this.erros = [];
    this.user = null;
  }

  async login() {
    this.valida();
    if(this.erros.length > 0) return
    this.user = await LoginModel.findOne({ email: this.body.email })

    if(!this.user) {
      this.erros.push('Usuario não existe')
      return;
    }

    if(!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.erros.push('Senha invalida')
      this.user = null;
      return;
    }

  }

  async register(){
    this.valida();
    if(this.erros.length > 0) return

    await this.userExisted();
    if(this.erros.length > 0) return

    const salt = bcrypt.genSaltSync();
    this.body.password = bcrypt.hashSync(this.body.password, salt)

    this.user = await LoginModel.create(this.body);
  }
  
  valida(){
    this.clearUp()

    if(!validator.isEmail(this.body.email)) this.erros.push('Email- invalido')

    if(this.body.password.length < 3 || this.body.password.length > 50) {
      this.erros.push('A senha precisar ser de 3 a 50.')
    }
  }

  async userExisted() {
    const user = await LoginModel.findOne({ email: this.body.email })
    if(user) this.erros.push('usuario já existe')
  }

  clearUp(){
    for (let key in this.body){
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = login;
