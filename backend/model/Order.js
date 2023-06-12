import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  userid: {
    type: String,
    required: true,
  },
  invitedUsers: [
    {
      type: String,
    },
  ],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: String,
    default: 'false',
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
