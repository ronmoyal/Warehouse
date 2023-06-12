import Users from '../model/Users.js';
import bcrypt from 'bcryptjs';
const studentEmailRegex = /^[a-zA-Z0-9._%+-]+@ac\.sce\.ac\.il$/;
const teacherEmailRegex = /^[a-zA-Z0-9._%+-]+@sce\.ac\.il$/;
const idValid = /^[0-9]{9}$/;

const handleNewUser = async (req, res) => {
  const { email, id, pwd, code } = req.body;
  if (!id || !pwd || !email) {
    return res
      .status(400)
      .json({ message: 'Email ID and password are required.' });
  }

  if (code !== '' && code !== 'ILOVEYOU') {
    return res.status(409).json({ message: 'Incorrect Code.' });
  }

  // check if the entered code matches with the admin code
  const role =
    code === 'ILOVEYOU'
      ? 'Admin'
      : teacherEmailRegex.test(email)
      ? 'Teacher'
      : 'Student';

  // check for duplicate id in the db
  const duplicate = await Users.findOne({ userid: id }).exec();
  if (duplicate) {
    return res.status(409).json({ message: 'ID already exists.' });
  }

  // check for duplicate email in the db
  const dupEmail = await Users.findOne({ useremail: email }).exec();
  if (dupEmail) {
    return res.status(409).json({ message: 'Email already exists.' });
  }

  // check for sce email
  if (!studentEmailRegex.test(email) && !teacherEmailRegex.test(email)) {
    return res.status(400).json({
      message: 'Invalid email address. Please use an SCE email address.',
    });
  }

  if (!idValid.test(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await Users.create({
      userid: id,
      password: hashedPwd,
      useremail: email,
      role: role,
    });

    if (role === 'Teacher') {
      res.status(201).json({ message: 'New Teacher created!' });
    } else if (role === 'Student') {
      res.status(201).json({ message: 'New Student created!' });
    } else {
      res.status(201).json({ message: 'New Admin created!' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { handleNewUser };
