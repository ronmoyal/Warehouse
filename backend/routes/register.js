import express from 'express';
const router = express.Router();
import registerController from '../controllers/registerController.js';
import verifyRoles from '../middleware/verifyRoles.js';
import ROLES_LIST from '../config/roles_list.js';

router.post('/', registerController.handleNewUser);

export default router;
