import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const verifyJWT = (req, res, next) => {
  const token = req.cookies.auth;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.UserInfo.useremail;
    req.role = decoded.UserInfo.role;
    next();
  });
};
export default verifyJWT;
