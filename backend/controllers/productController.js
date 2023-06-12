import Products from '../model/Product.js';
import orders from '../model/Order.js';
const addNewProd = async (req, res) => {
  const { s_n, type, model, amount, description, u_m, isborr } = req.body;
  if (!s_n || !type || !model || !amount)
    return res.status(400).json({ message: 'missing info' });

  try {
    const dup = await Products.findOne({ serialNumber: s_n }).exec();
    if (!dup) {
      const result = await Products.create({
        serialNumber: s_n,
        type: type,
        model: model,
        amount: amount,
        description: description,
        UserManual: u_m,
        isBorrowed: isborr,
      });
      res.status(201).json({ message: `New product was added!` });
    } else res.status(400).json({ message: `faild to add product` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const gatAllProd = async (req, res) => {
  const cookies = req.cookies;

    try {
      const result = await Products.find({ isSuspend: false }).exec();
      res.send(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

const getSuspendedProd = async (req, res) => {
  const cookies = req.cookies;
 
    try {
      const result = await Products.find({isSuspend: true}).exec();
      res.send(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

const SetAsReturn = async (req, res) => {
  try {
    const { serialNumber } = req.body;
    const result1 = await Products.findOneAndUpdate(
      { serialNumber: serialNumber },
      { isBorrowed: false },
      { new: true }
    ).exec();
    const result2 = await orders
      .findOneAndUpdate(
        { serialNumber: serialNumber },
        { isActive: 'old' },
        { new: true }
      )
      .exec();

    res.send({ message: `product ${result1.serialNumber} was update` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const SetAsBorrowed = async (req, res) => {
  try {
    const { serialNumber, borrowingUser } = req.body;
    const result = await orders
      .findOneAndUpdate(
        {
          serialNumber: serialNumber,
          userid: { $in: borrowingUser },
          endDate: { $gt: Date.now() },
          startDate: { $lt: Date.now() },
        },
        { isActive: 'true' },
        { new: true }
      )
      .exec();
    if (!result) {
      return res
        .status(400)
        .json({ message: `There is no booking for the details entered` });
    }
    const update = await Products.findOneAndUpdate(
      {
        serialNumber: serialNumber,
      },
      { isBorrowed: true },
      { new: true }
    ).exec();
    res.send({ message: `product ${result.serialNumber} was update` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const setRentTime = async (req, res) => {
  try {
    const { serialNumber, newDate } = req.body;
    const result = await Products.findOneAndUpdate(
      { serialNumber: serialNumber },
      { rentTime: parseInt(newDate) },
      { new: true }
    ).exec();

    res.send({ message: `product ${result.serialNumber} was update` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const SuspendProduct = async (req, res) => {
  try {
    const { serialNumber, suspensionReason } = req.body;
    const result = await Products.findOneAndUpdate(
      { serialNumber: serialNumber },
      {
        $push: { suspensionHistory: { reason: suspensionReason } },
        isSuspend: true,
      },
      { new: true }
    ).exec();

    res.send({ success: `product ${result.serialNumber} was update` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const UnSuspendProduct = async (req, res) => {
  try {
    const { serialNumber } = req.body;
    const result = await Products.findOneAndUpdate(
      { serialNumber: serialNumber },
      { isSuspend: false },
      { new: true }
    ).exec();

    res.send({ success: `product ${result.serialNumber} was update` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const ShowSuspendedHistory = async (req, res) => {
  const cookies = req.cookies;

  if (req.role === 'Admin') {
    try {
      const result = await Products.find({}).exec();
      res.send(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

export default {
  addNewProd,
  gatAllProd,
  SetAsReturn,
  SetAsBorrowed,
  SuspendProduct,
  setRentTime,
  getSuspendedProd,
  UnSuspendProduct,
  ShowSuspendedHistory,
};
