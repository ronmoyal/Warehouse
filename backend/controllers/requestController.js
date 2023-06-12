import Request from '../model/Request.js';
import Order from '../model/Order.js';
import nodemailer from 'nodemailer';

const extend = async (req, res) => {
  const { serialNumber, date, note, orderId } = req.body;
  const userid = req.user;
  try {
    const result = await Request.create({
      serialNumber: serialNumber,
      extendedDate: date,
      note: note,
      userEmail: userid,
      orderId: orderId,
    });
    console.log(result);
    res
      .status(201)
      .json({ message: `New request was sent!`, requ: result._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const TranferToAnotherUser = async (req, res) => {
  const { serialNumber, date, transferUserId, orderID } = req.body;
  const userid = req.user;
  try {
    const result = await Request.create({
      serialNumber: serialNumber,
      extendedDate: date,
      note: userid + ' Want To Transfer An Item to: ' + transferUserId,
      userEmail: userid,
      userToTransferEmail: transferUserId,
      orderId: orderID,
    });
    res
      .status(201)
      .json({ message: `New request was sent!`, requ: result._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllRequests = async (req, res) => {
  const cookies = req.cookies;
  if (req.role === 'Admin') {
    try {
      const result = await Request.find({}).exec();
      res.send(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

const approveRequest = async (req, res) => {
  const { requestId } = req.body;

  const request = await Request.findById(requestId);
  if (request.extendedDate != null) {
    try {
      if (!request) {
        return res.status(400).json({ message: 'Request not found' });
      }
      const order = await Order.findOneAndUpdate(
        { _id: request.orderId },
        { endDate: request.extendedDate },
        { new: true }
      ).exec();
      await Request.findByIdAndRemove(requestId);
      if (!order) {
        return res.status(400).json({ message: 'Order not found' });
      }

      sendMailextend(order.userid, order.endDate);
      res.status(200).json({ message: 'Request approved successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    try {
      const request = await Request.findById(requestId);
      if (!request) {
        return res.status(400).json({ message: 'Request not found' });
      }
      const oldEmail = request.userEmail;
      const newEmail = request.userToTransferEmail;
      const order = await Order.findOneAndUpdate(
        { _id: request.orderId },
        { userid: request.userToTransferEmail, invitedUsers: [] },
        { new: true }
      ).exec();
      await Request.findByIdAndRemove(requestId);
      if (!order) {
        return res.status(400).json({ message: 'Order not found' });
      }
      sendMailtransfer(oldEmail, newEmail);
      res.status(200).json({ message: 'Request approved successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

const sendMailtransfer = async (oldUser, newUser) => {
  const trans = nodemailer.createTransport({
    service: 'hotmail',
    auth: { user: 'warehouseSCE@outlook.co.il', pass: 'team30SCE' },
  });

  const mailToOldUser = {
    from: 'warehouseSCE@outlook.co.il',
    to: oldUser,
    subject: 'Your request has been approved',
    text: `your request to transfer product to ${newUser} has been approved `,
  };
  const mailToNewUser = {
    from: 'warehouseSCE@outlook.co.il',
    to: newUser,
    subject: 'request has been approved',
    text: `request by ${oldUser} to transfer product to you has been approved and the order is now in your name `,
  };
  trans.sendMail(mailToOldUser, function (err, info) {
    if (err) {
      return console.log(err.message);
    }
  });
  trans.sendMail(mailToNewUser, function (err, info) {
    if (err) {
      return console.log(err.message);
    }
  });
  console.log(`Email sent to user:${oldUser} and ${newUser}`);
};

const sendMailextend = async (studentMail, date) => {
  const trans = nodemailer.createTransport({
    service: 'hotmail',
    auth: { user: 'warehouseSCE@outlook.co.il', pass: 'team30SCE' },
  });

  const mailToUser = {
    from: 'warehouseSCE@outlook.co.il',
    to: studentMail,
    subject: 'Your request has been approved',
    text: `your request to extend the loan has been approved and the expiration date has been extended to ${date}`,
  };

  trans.sendMail(mailToUser, function (err, info) {
    if (err) {
      return console.log(err.message);
    }
  });

  console.log(`Email sent to user:${studentMail}`);
};

export default {
  sendMailtransfer,
  sendMailextend,
  extend,
  getAllRequests,
  TranferToAnotherUser,
  approveRequest,
};
