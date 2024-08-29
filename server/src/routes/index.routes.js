import { Router } from 'express';
const router = Router();


router.get('/',(req, res) => {
    res.send('Hi from Home 🙋🏻‍♂️');
})
router.get('/we', (req, res) => {
    res.send('Hi we')
})
export default router;