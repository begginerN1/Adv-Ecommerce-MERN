const router = require('express').Router();
const { createOrder, getOrder,getAOrder, deleteOrder,updateOrder} = require('../controllers/orderController');
const {verifyUser, adminOnly}=require('../middleware/authMiddleware')


router.post('/create', verifyUser, createOrder);
router.get('/get', verifyUser, getOrder);
router.get('/get/:id', verifyUser, getAOrder);
// router.delete('/delete/:id', verifyUser, adminOnly,deleteOrder);
router.patch('/update/:id', verifyUser, adminOnly,updateOrder);

module.exports = router;