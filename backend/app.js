import express from 'express';
import cors from 'cors';
import registerRouter from './routes/register.js';
import signinRouter from './routes/signin.js';
import ProductRouter from './routes/product.js';
import refreshRouter from './routes/refresh.js';
import logoutRouter from './routes/logout.js';
import verifyJWT from './middleware/verifyJWT.js';
import cookieParser from 'cookie-parser';
import orderRouter from './routes/order.js';
import profileRouter from './routes/profile.js';
import requestRouter from './routes/request.js';
import roomRouter from './routes/room.js';
import problemRouter from './routes/problem.js';
import late from './controllers/late.js';
import cron from 'node-cron';
import Statistics from './routes/statistics.js';
import deletetestresult from './controllers/deletetestresult.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

cron.schedule('0 8 * * *', late.sendMail);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/signin', signinRouter);
app.use('/register', registerRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);
app.use('/delete', deletetestresult.deleteDataAfterTest);
app.use('/send', late.sendMail);
app.use(verifyJWT);
app.use('/newproduct', ProductRouter);
app.use('/products', ProductRouter);
app.use('/isborrow', ProductRouter);
app.use('/order', orderRouter);
app.use('/profile', profileRouter);
app.use('/request', requestRouter);
app.use('/room', roomRouter);
app.use('/problem', problemRouter);
app.use('/statistics', Statistics);
app.use('/suspension-history', ProductRouter);

export default app;
