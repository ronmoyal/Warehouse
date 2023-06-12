import express from 'express';
const router = express.Router();
import signinController from '../controllers/signinController.js';

router.post('/', signinController.findUser);
export default router;