import Order from '../model/Order.js';
import Problem from '../model/Problem.js';
import Products from '../model/Product.js';
import Request from '../model/Request.js';
import Room from '../model/Room.js';
import Users from '../model/Users.js';

const deleteDataAfterTest = async (req, res) => {
  await Products.findOneAndDelete({
    serialNumber: 'WJCA000075',
  });
  await Request.deleteMany({
    note: 'student@ac.sce.ac.il Want To Transfer An Item to: student@ac.sce.ac.il',
  });
  await Request.deleteMany({
    note: 'This is a test note',
  });
  await Room.findOneAndDelete({
    roomDate: new Date('2023-06-20'),
    roomNumber: '1',
    invitedUsers: [],
    startTime: '17:00',
    endTime: '18:00',
  });
  await Order.findOneAndDelete({
    startDate: new Date('2023-08-20'),
    endDate: new Date('2023-08-26'),
    serialNumber: process.env.SERIAL_NUMBER,
    invitedUsers: [],
  });
  await Users.findOneAndDelete({
    useremail: 'test1@ac.sce.ac.il',
  });
  await Users.findOneAndDelete({
    useremail: 'test@sce.ac.il',
  });
  await Users.findOneAndDelete({
    useremail: 'test@ac.sce.ac.il',
  });
  await Problem.deleteMany({ node: 'This is a test problem report' });
  await Problem.deleteMany({ node: 'This is a test problem report - teacher' });
  res.sendStatus(200);
};
export default { deleteDataAfterTest };
