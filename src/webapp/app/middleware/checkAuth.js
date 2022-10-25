const jwt = require("jsonwebtoken");

module.exports = function(req, res, next){
  const token = req.cookies.secureCookie;
  if(!token) return res.status(403).json("Authentication required")

  const decode = jwt.verify(token, process.env.JSON_WEB_TOKEN_KEY);
  if(!decode) return res.status(401).send("Invalid Token");

  return next();
}
