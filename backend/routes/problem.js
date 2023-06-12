import express from 'express';
import problemController from '../controllers/problemController.js';
import verifyRoles from '../middleware/verifyRoles.js';
import ROLES_LIST from '../config/roles_list.js';

const router = express.Router();

router.post(
  '/',
  verifyRoles(ROLES_LIST.Student, ROLES_LIST.Teacher),
  problemController.addProblem
);

export default router;