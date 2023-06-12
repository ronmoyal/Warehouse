import Order from '../model/Order.js';
import Users from '../model/Users.js';
import Products from '../model/Product.js';

const addNewOrder = async (req, res) => {
  const { startDate, endDate, serialNumber, invitedUsers } = req.body;
  const userid = req.user;

  if (!userid || !startDate || !endDate || !serialNumber) {
    return res.status(400).json({ message: 'Missing information' });
  }

  try {
    const orders = await Order.find({
      serialNumber: serialNumber,
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
        { startDate: { $gte: startDate }, endDate: { $lte: endDate } },
        { startDate: { $lte: startDate }, endDate: { $gte: endDate } },
      ],
    }).exec();

    if (orders.length > 0) {
      return res
        .status(400)
        .json({ message: 'Order already exists for selected dates' });
    }

    const product = await Products.findOne({
      serialNumber: serialNumber,
    }).exec();

    const result = await Order.create({
      userid: userid,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      serialNumber: serialNumber,
      invitedUsers: invitedUsers,
      type: product.type,
    });

    res.status(201).json({ message: 'New order was added!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStudentList = async (req, res) => {
  try {
    const users = await Users.find({ role: 'Student' }).exec();
    const userEmails = users.map((user) => ({ email: user.useremail }));
    res.status(200).json(userEmails);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
const getUserList = async (req, res) => {
  try {
    const users = await Users.find({ role: { $ne: 'Admin' } }).exec();
    const userEmails = users.map((user) => ({ email: user.useremail }));
    res.status(200).json(userEmails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const retRentTime = async (req, res) => {
  const { serialNumber } = req.body;

  try {
    const prod = await Products.findOne({ serialNumber: serialNumber }).exec();
    const rentTime = prod.rentTime;

    res.status(200).json(rentTime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export default { addNewOrder, getUserList, getStudentList, retRentTime };
