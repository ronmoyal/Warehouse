import nodemailer from 'nodemailer';
import orders from './../model/Order.js';
import users from './../model/Users.js';

const sendMail = async (req, res) => {
  const trans = nodemailer.createTransport({
    service: 'hotmail',
    auth: { user: 'warehouseSCE@outlook.co.il', pass: 'team30SCE' },
  });
  const lateorders = await orders
    .find({
      isActive: true,
      endDate: { $lt: Date.now() },
    })
    .exec();
  const admins = await users.find({
    role: 'Admin',
  });

  for (const lateorder of lateorders) {
    const userEmail = lateorder.userid;
    const mailToUser = {
      from: 'warehouseSCE@outlook.co.il',
      to: userEmail,
      subject: 'Late Order Notification',
      text: `Your loan period of ${lateorder.serialNumber} has expired,. \n Please visit the late policy on the website and return the product as soon as possible. \n\n Regards,\n warehouse staff`,
    };

    trans.sendMail(mailToUser, function (err, info) {
      if (err) {
        return res.status(500);
      }
    });
    for (const admin of admins) {
      const adminEmail = admin.useremail;
      const mailToAdmin = {
        from: 'warehouseSCE@outlook.co.il',
        to: adminEmail,
        subject: 'Late Order Notification',
        text: `userEmail, \n Late in returning equipment: ${lateorder.serialNumber}`,
      };

      trans.sendMail(mailToAdmin, function (err, info) {
        if (err) {
          return res.status(500);
        }
      });
      return res
        .status(200)
        .json({ message: `Email sent to user:${userEmail} and admin` });
    }
  }
};
export default { sendMail };
