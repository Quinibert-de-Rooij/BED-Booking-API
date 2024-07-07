import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

  if (!token) {
    return res.status(401).json({
      message:
        "Q says: 401 Unauthorized; No token was provided for this operation.",
    });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Q says: 403 Frobidden; Invalid token." });
    }

    req.user = decoded;
    next();
  });
};

export default authMiddleware;
