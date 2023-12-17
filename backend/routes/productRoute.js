const router = require('express').Router();
const { createProduct, deleteReview,updateReview,
    getProduct, deleteProduct,
    updateProduct, reviewProduct,
    updateProductImage, getAProduct } = require('../controllers/productController');
const {verifyUser, adminOnly}=require('../middleware/authMiddleware')


router.post('/create', verifyUser, adminOnly, createProduct);
router.get('/get', getProduct);
router.get('/getproduct/:id', getAProduct);
router.delete('/delete/:id', verifyUser, adminOnly,deleteProduct);
router.patch('/update/:id', verifyUser, adminOnly,updateProduct);
router.patch('/review/:id', verifyUser, reviewProduct);
router.delete('/review/:id', verifyUser, deleteReview);
router.patch('/updatereview/:id', verifyUser, updateReview);


module.exports = router;