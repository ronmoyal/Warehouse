import express from 'express';
import roomController from '../controllers/roomController.js';
import verifyRoles from '../middleware/verifyRoles.js';
import ROLES_LIST from '../config/roles_list.js';

const router = express.Router();

router.post(
  '/',
  verifyRoles(ROLES_LIST.Student),
  roomController.addNewOrder
);
router.get('/', verifyRoles(ROLES_LIST.Student), roomController.getUserList);

export default router;
