import { Router } from "express";
import { addCustomer, getCustomers,
    getCustomerID, updateCustomer,
    deleteCustomer
 } from "../controllers/customers.controllers.js";
import auth from "../middlewares/auth.js"
const router = Router();

router.post('/', addCustomer);
router.get('/', getCustomers);
router.get('/:id', getCustomerID);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);
export default router;

