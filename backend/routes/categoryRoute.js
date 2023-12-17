const router = require('express').Router();
const { createCategory, getCategory,getACategory, deleteCategory,updateCategory} = require('../controllers/categoryController');
const {verifyUser, adminOnly}=require('../middleware/authMiddleware')


router.post('/create', verifyUser, adminOnly, createCategory);
router.get('/get', getCategory);
router.get('/get/:id', getACategory);
router.delete('/delete/:slug', verifyUser, adminOnly,deleteCategory);
router.patch('/update/:slug', verifyUser, adminOnly,updateCategory);

module.exports = router;