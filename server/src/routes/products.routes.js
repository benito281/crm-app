import { Router } from "express";
import fileUpload from "express-fileupload";
import { addProduct, showProducts,
    showProduct, updateProduct,
    deleteProduct, searchProduct
 } from "../controllers/products.controllers.js";
const router = Router();


const configUpload = fileUpload({
    useTempFiles : true,
    tempFileDir : 'src/uploads', 

});

router.post('/', configUpload, addProduct);
router.get('/', showProducts);
router.get('/:id', showProduct);
router.put('/:id', configUpload, updateProduct);
router.delete('/:id', deleteProduct);
router.post('/search/:query', searchProduct);


export default router;