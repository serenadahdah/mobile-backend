const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send({message: "Access Denied."})

    if (authHeader.startsWith("Bearer ")){
        token = authHeader.substring(7, authHeader.length);
        try{
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
            next();
        } catch(err) {
            return res.status(401).send({message: "Invalid Token."})
        }
   } else {
      return res.status(401).send({message: "Access Denied."})
   }

}