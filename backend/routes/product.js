import express from 'express';
const router = express.Router();
import productController from '../controllers/productController.js';
import verifyRoles from '../middleware/verifyRoles.js';
import ROLES_LIST from '../config/roles_list.js';

router.post('/', verifyRoles(ROLES_LIST.Admin), productController.addNewProd);
router.get('/', productController.gatAllProd);
router.get(
  '/suspended',
  verifyRoles(ROLES_LIST.Admin),
  productController.getSuspendedProd
);
router.get(
  '/suspension-history',
  verifyRoles(ROLES_LIST.Admin),
  productController.ShowSuspendedHistory
);
router.put(
  '/borrow',
  verifyRoles(ROLES_LIST.Admin),
  productController.SetAsBorrowed
);
router.put(
  '/return',
  verifyRoles(ROLES_LIST.Admin),
  productController.SetAsReturn
);
router.put(
  '/rentTime',
  verifyRoles(ROLES_LIST.Admin),
  productController.setRentTime
);
router.put(
  '/suspend',
  verifyRoles(ROLES_LIST.Admin),
  productController.SuspendProduct
);
router.put(
  '/unsuspend',
  verifyRoles(ROLES_LIST.Admin),
  productController.UnSuspendProduct
);

export default router;
