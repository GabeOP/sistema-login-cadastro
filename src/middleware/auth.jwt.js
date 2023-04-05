const jwt = require("jsonwebtoken");

const auth = {
  jsonwebtoken: async (req, res, next) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.status(401).json({ msg: "Sem header de autorização" });
      }

      const parts = authorization.split(" ");
      const [schema, token] = parts;

      if (parts.length !== 2) {
        return res.status(401).json({ msg: "Acesso negado" });
      }

      if (schema !== "Bearer") {
        return res.status(401).json({ msg: "Acesso negado" });
      }

      jwt.verify(token, "123", async (error, decoded) => {
        console.log(decoded);
      });

      next();
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = auth;
