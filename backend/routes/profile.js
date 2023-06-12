import express from 'express';
import profileController from '../controllers/ProfileController.js';
import verifyRoles from '../middleware/verifyRoles.js';
import ROLES_LIST from '../config/roles_list.js';

const router = express.Router();

router.get(
  '/Student',
  verifyRoles(ROLES_LIST.Student),
  profileController.getUserOrders
);
router.get(
  '/Teacher',
  verifyRoles(ROLES_LIST.Teacher),
  profileController.getUserOrders
);
router.get(
  '/Admin',
  verifyRoles(ROLES_LIST.Admin),
  profileController.getOrders
);

export default router;
