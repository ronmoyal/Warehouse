import express from 'express';
import orderController from '../controllers/OrderController.js';
import verifyRoles from '../middleware/verifyRoles.js';
import ROLES_LIST from '../config/roles_list.js';

const router = express.Router();

router.post(
  '/',
  verifyRoles(ROLES_LIST.Student, ROLES_LIST.Teacher),
  orderController.addNewOrder
);
router.get(
  '/student',
  verifyRoles(ROLES_LIST.Student),
  orderController.getStudentList
);
router.get(
  '/users',
  verifyRoles(ROLES_LIST.Admin),
  orderController.getUserList
);
router.post(
  '/rentTime',
  verifyRoles(ROLES_LIST.Student, ROLES_LIST.Teacher),
  orderController.retRentTime
);
export default router;
