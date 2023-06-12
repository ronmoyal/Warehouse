import Users from '../model/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const findUser = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: 'Email and password are required.' });

  try {
    const user = await Users.findOne({ useremail: email }).exec();
    if (user) {
      if (bcrypt.compareSync(req.body.pwd, user.password)) {
        const accessToken = jwt.sign(
          {
            UserInfo: {
              useremail: user.useremail,
              role: user.role,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
          { useremail: user.useremail },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '7d' }
        );

        const updateRef = await Users.findOneAndUpdate(
          { useremail: email },
          { refreshToken: refreshToken },
          { new: true }
        ).exec();

        res.cookie('jwt', refreshToken, {
          httpOnly: true, //accessible only by web server
          secure: false, //https
          sameSite: 'None',
          maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry:
        });

        return res.status(201).json({
          accessToken: accessToken,
          role: user.role,
          message: `Log In successfully`,
        });
      } else return res.status(400).json({ message: `worng password` });
    } else res.status(400).json({ message: `User not found ${email}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { findUser };
