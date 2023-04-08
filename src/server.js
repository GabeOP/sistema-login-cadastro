const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


//=====Rotas=====//
const userRoutes = require("./routes/user.routes")
const postRoutes = require("./routes/post.routes")

app.use('/', userRoutes)
app.use('/', postRoutes)

const PORT = 3000
app.listen(PORT, () => console.log("Rodando"))