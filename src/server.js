const express = require("express");
const Controller = require("./controllers/Usuario.controller");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", Controller.buscar)
app.post("/cadastrar", Controller.cadastrar)
app.post("/entrar", Controller.entrar)
app.delete("/:id", Controller.excluir)

const PORT = 3000
app.listen(PORT, () => console.log("Rodando"))