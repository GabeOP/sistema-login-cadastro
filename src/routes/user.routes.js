const express = require('express');
const router = express.Router();
const usuarioController = require("../controllers/Usuario.controller");

router.post("/cadastrar", usuarioController.cadastrar)
router.post("/entrar", usuarioController.entrar)

module.exports = router