import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const problemSchema = new Schema({
    serialNumber: {
        type: String,
        required: true,
      },
      userEmail: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: false,
      },
});

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;
