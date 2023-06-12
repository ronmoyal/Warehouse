import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  UserManual: {
    type: String,
  },
  isSuspend: {
    type: Boolean,
    default: false,
  },
  isBorrowed: {
    type: Boolean,
    default: false,
  },
  rentTime: {
    type: Number,
    default: 7,
  },
  suspensionHistory: [{
    reason: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }],
});
const Products = mongoose.model('Products', productSchema);
export default Products;
