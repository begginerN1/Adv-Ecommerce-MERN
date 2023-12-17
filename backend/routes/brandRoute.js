const router = require('express').Router();
const { createBrand, getBrand,getABrand, deleteBrand,updateBrand} = require('../controllers/brandController');
const {verifyUser, adminOnly}=require('../middleware/authMiddleware')


router.post('/create', verifyUser, adminOnly, createBrand);
router.get('/get', getBrand);
router.get('/get/:id', getABrand);
router.delete('/delete/:slug', verifyUser, adminOnly,deleteBrand);
router.patch('/update/:slug', verifyUser, adminOnly,updateBrand);

module.exports = router;