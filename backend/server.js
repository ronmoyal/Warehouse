import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();
const port = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to DB');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
