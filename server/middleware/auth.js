const authHelpers = require("../utils/authHelpers");

const verifyAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "Unauthorized, no authorization header" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized, no token provided" });
  }
 try {
    const decodedClaims = authHelpers.decode(token);
    if (!decodedClaims || !decodedClaims.uid) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decodedClaims;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = verifyAuth;
