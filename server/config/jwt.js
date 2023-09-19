const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const autHeader = req.headers["authorization"];
  const token = autHeader && autHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(200);
    req.user = user;
    next();
  });
}
function generateAccessToken(email) {
  return jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}

module.exports = { authenticateToken, generateAccessToken };
