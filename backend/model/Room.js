import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  invitedUsers: [{
    type: String,
  }],
  roomDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },  
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
