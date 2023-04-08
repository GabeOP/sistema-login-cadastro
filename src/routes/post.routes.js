const express = require('express');
const router = express.Router();
const PostsController = require("../controllers/Posts.controller")
const auth = require("../middleware/auth.jwt");

router.get("/noticia", PostsController.buscar)
router.post("/noticia", auth.jsonwebtoken, PostsController.criar)
router.delete("/noticia/:id", PostsController.deletar)

module.exports = router;