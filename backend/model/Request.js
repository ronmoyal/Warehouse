import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userToTransferEmail: {
    type: String,
    required: false,
  },
  note: {
    type: String,
    required: false,
  },
  extendedDate: {
    type: Date,
    required: false,
  },
  orderId: {
    type: String,
    required: false,
  },
});

const Request = mongoose.model('Request', requestSchema);

export default Request;
