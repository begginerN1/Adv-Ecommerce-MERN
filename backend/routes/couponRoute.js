const router = require('express').Router();
const { createCoupon, getCoupon,getACoupon, deleteCoupon,updateCoupon} = require('../controllers/couponController');
const {verifyUser, adminOnly}=require('../middleware/authMiddleware')


router.post('/create', verifyUser, adminOnly, createCoupon);
router.get('/get', verifyUser, getCoupon);
router.get('/get/:name', verifyUser, getACoupon);
router.delete('/delete/:id', verifyUser, adminOnly,deleteCoupon);
router.patch('/update/:name', verifyUser, adminOnly,updateCoupon);

module.exports = router;