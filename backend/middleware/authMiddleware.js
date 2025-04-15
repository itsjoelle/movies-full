import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  const JWTTOKEN = process.env.JWT_TOKEN;

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = req.cookies.token;
  jwt.verify(token, JWTTOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.id;

    next();
  });
}

export default authMiddleware;
