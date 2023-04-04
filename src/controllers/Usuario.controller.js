const Usuario = require("../model/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Controller = {
  buscar: async (req, res) => {
    try {
      const resultado = await Usuario.findAll();
      res.status(200).json({ usuarios: resultado });
    } catch (error) {
      console.log(error);
    }
  },

  cadastrar: async (req, res) => {
    const { email, senha } = req.body;

    if(!email || !senha){
      return res.status(422).json({msg: "Preencha todos os campos."})
    }

    const verificaUsuario = await Usuario.findOne({ where: { email: email } });
    if (verificaUsuario) {
      return res.status(422).json({ msg: "E-mail já cadastrado" });
    }

    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(senha, salt);

      await Usuario.create({
        email,
        senha: hash,
      });
      return res.status(201).json({ msg: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },

  entrar: async(req, res) =>{
    const { email, senha } = req.body;

    //====Uso do JWT====//
    const generateToken = () => jwt.sign({email, senha}, "123", {expiresIn: 1800});
    const {authorization} = req.headers;
    const parts = authorization.split(" ");
    const [schema, tkn] = parts
    
    if(parts !== 2) {
      return res.send(401)
    }

    if(schema !== "Bearer") {
      return res.send(401)
    }

    if(!authorization){
      return res.status(401).json({msg:"er"})
    }
    //============//

    if(!email || !senha){
      return res.status(422).json({msg: "Preencha todos os campos."})
    }

    const verificaUsuario = await Usuario.findOne({ where: { email: email } });
    if (!verificaUsuario) {
      return res.status(404).json({ msg: "E-mail não cadastrado." });
    }
    
    const verificaSenha = bcrypt.compareSync(senha, verificaUsuario.senha)
    if(!verificaSenha){
      return res.status(422).json({msg: "Senha incorreta."})
    }

    const token = generateToken({email, senha})
    res.status(200).json({token})
  },

  excluir: async (req, res) => {
    const {id} = req.params;
    
    const verificaUsuario = await Usuario.findByPk(id);
    if(verificaUsuario === null){
      return res.status(404).json({msg: "Usuário não encontrado"})
    }else{
      await Usuario.destroy({
        where: {
          id: id
        },
      });
    }
    res.status(200).json({ msg: "Usuário deletado com sucesso!" });
  },
};

module.exports = Controller;
