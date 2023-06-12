import express from 'express';
const router = express.Router();
import logoutController from '../controllers/logoutController.js';

router.get('/', logoutController.logout);
export default router;