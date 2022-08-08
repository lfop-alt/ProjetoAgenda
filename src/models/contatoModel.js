const mongoose = require('mongoose');
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, default: ''},
  email: { type: String, required: true },
  telefone: { type: String, default: ''},
  criadoem: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body){
        this.body = body;
        this.erros = [];
        this.contato = null
    }

    async buscarPorId(id){
      const user = await ContatoModel.findById(id);
      return user;
    }

    async register(){
        this.valida();
        if(this.erros.length > 0) return;
        this.contato = await ContatoModel.create(this.body)

    }

    valida(){
        this.clearUp()
    
        if(!validator.isEmail(this.body.email)) this.erros.push('Coloque o E-mail')
        if(!this.body.nome) this.erros.push('Necessario o Nome')
        if(!this.body.nome && !this.body.email) this.erros.push("Necessario acrescentar Nome e E-mail")
      }
    
      clearUp(){
        for (let key in this.body){
          if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
          }
        } 
    
        this.body = {
          nome: this.body.nome,
          sobrenome: this.body.sobrenome,
          email: this.body.email,
          telefone: this.body.telefone
        }
      }

      async edit(id) {
        if(typeof id !== 'string') return;
        this.valida()
        if(this.erros.length > 0) return

        //id = parametro
        // this.body = vai trazer o novo body do formulario ou seja da edição
        // {new: true} = estou garantindo que ele vai me trazert somente os novos dados
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})

      }

      async buscarTodos(){
        const contato = await ContatoModel.find().sort({criadoEm: -1});
        return contato;
      }

      async searchForDelete(id){
        if(typeof id !== 'string') return;
        const contato = await ContatoModel.findByIdAndDelete({_id: id});
        return contato;
      }
}

module.exports = Contato;