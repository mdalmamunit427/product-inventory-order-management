import express from 'express';
import { ProductControllers } from './product.controller';
import { verifyToken } from '../../middleware/authMiddleware';
import { isAdmin } from '../../middleware/adminMiddleware';

const router = express.Router();

router.post('/', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProduct);
router.get('/:productId',verifyToken, ProductControllers.getSingleProduct);
router.put('/:productId',verifyToken, isAdmin, ProductControllers.updateAProduct)
router.delete('/:productId', ProductControllers.deleteProduct)


export const ProductRoutes = router;