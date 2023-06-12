import Users from '../model/Users.js';

import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401);
  const refreshToken = cookies.jwt;
  const user = await Users.findOne({ refreshToken: refreshToken }).exec();

  if (!user) return res.status(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.useremail !== decoded.useremail) {
      return res.sendStatus(403);
    }
    role = user.role;
    const accessToken = jwt.sign(
      {
        UserInfo: {
          useremail: decoded.useremail,
          role: role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ accessToken });
  });
};
export default { refresh };