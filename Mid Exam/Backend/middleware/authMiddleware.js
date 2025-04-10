const jwt = require("jsonwebtoken");

const generateToken = (Datapaylod) => {
  return jwt.sign({ Datapaylod }, process.env.JWT_SECRET);
};


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
  
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Invalid token format" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.error("Error verifying token: ", error);
      res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
    }
  };

module.exports = { generateToken, authMiddleware };
