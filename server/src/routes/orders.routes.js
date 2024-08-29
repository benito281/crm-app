import { Router } from "express";
import { newOrder, showOrders,
    showOrder, updateOrder, deleteOrder
 } from "../controllers/orders.controllers.js";
const router = Router();


router.post('/new/:idUser', newOrder);
router.get('/', showOrders);
router.get('/:idOrder', showOrder);
router.put('/:idOrder', updateOrder);
router.delete('/:idOrder', deleteOrder);




export default router;