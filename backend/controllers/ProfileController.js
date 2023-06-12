import Order from '../model/Order.js';
import Product from '../model/Product.js';
import Room from '../model/Room.js';
const getUserOrders = async (req, res) => {
  const userid = req.user;

  try {
    const orders = await Order.find({
      $or: [{ userid: userid }, { invitedUsers: { $in: [userid] } }],
    }).exec();

    const rooms = await Room.find({
      $or: [{ userid: userid }, { invitedUsers: { $in: [userid] } }],
    }).exec();

    if (rooms.length === 0 && orders.length === 0) {
      return res.status(400).json({ message: 'No orders found for this user' });
    }

    res.status(200).json({ orders, rooms });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      isActive: true,
    }).exec();

    const rooms = await Room.find({
      roomNumber: '1',
      roomDate: { $gt: Date.now() },
    }).exec();

    if (orders.length === 0) {
      return res
        .status(400)
        .json({ message: 'There is no borrowed equipment' });
    }

    res.status(200).json({ orders, rooms });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default { getUserOrders, getOrders };
