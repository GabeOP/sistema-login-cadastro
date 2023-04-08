const Posts = require("../model/Posts");

const ControllerPost = {
  buscar: async(req, res)=>{
    const resultado = await Posts.findAll();
    res.json({resultado})
  },
  criar: async(req, res)=>{
    const {titulo} = req.body
    await Posts.create({titulo});
    return res.status(201).json({msg: "Postagem criada com sucesso!"})
  },
  deletar: async(req, res)=>{
    const {id} = req.params;
    await Posts.destroy({where: {id: id}});
    return res.status(200).json({msg: "Postagem deletada com sucesso!"})
  }
}

module.exports = ControllerPost