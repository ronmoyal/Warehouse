import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  userid: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Student',
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});
const Users = mongoose.model('Users', usersSchema);
export default Users;