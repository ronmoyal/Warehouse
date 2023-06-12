import express from 'express';
import statistics from '../controllers/statisticsController.js';
import verifyRoles from '../middleware/verifyRoles.js';
import ROLES_LIST from '../config/roles_list.js';

const router = express.Router();

router.get(
    '/',
    verifyRoles(ROLES_LIST.Admin),
    statistics.oldOrders
);

export default router;
