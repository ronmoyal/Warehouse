import express from 'express';
import requestController from '../controllers/requestController.js';
import verifyRoles from '../middleware/verifyRoles.js';
import ROLES_LIST from '../config/roles_list.js';

const router = express.Router();
router.get(
  '/',
  verifyRoles(ROLES_LIST.Admin),
  requestController.getAllRequests
);
router.put(
  '/extend',
  verifyRoles(ROLES_LIST.Student, ROLES_LIST.Teacher),
  requestController.extend
);

router.put(
  '/approved',
  verifyRoles(ROLES_LIST.Admin),
  requestController.approveRequest
);

router.post(
  '/transfer',
  verifyRoles(ROLES_LIST.Student, ROLES_LIST.Teacher),
  requestController.TranferToAnotherUser
);
export default router;
