import Room from '../model/Room.js';
import Users from '../model/Users.js';

const addNewOrder = async (req, res) => {
  const { roomDate, roomNumber, invitedUsers, startTime, endTime } = req.body;
  const userid = req.user;

  if (!userid || !roomDate || !roomNumber || !startTime || !endTime) {
    return res.status(400).json({ message: 'Missing information' });
  }

  try {
    const orders = await Room.find({ roomNumber, roomDate, $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
      { startTime: { $gt: startTime }, endTime: { $lt: endTime } },
      { startTime: { $lt: startTime }, endTime: { $gt: endTime } },
    ], }).exec();

    if (orders.length > 0) {
      return res
        .status(400)
        .json({ message: 'Room already booked for selected dates and times' });
    }

    const result = await Room.create({
      userid: userid,
      roomDate: new Date(roomDate),
      roomNumber: roomNumber,
      invitedUsers: invitedUsers,
      startTime: startTime,
      endTime: endTime,
    });

    res.status(201).json({ message: 'New order was added!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserList = async (req, res) => {
  try {
    const users = await Users.find({ role: 'Student' }).exec();
    const userEmails = users.map((user) => ({ email: user.useremail }));
    res.status(200).json(userEmails);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

export default { addNewOrder, getUserList };
