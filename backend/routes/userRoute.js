const router = require('express').Router();
const { registerUser, loginUser, logOutUser, getUser,getLoginStatus,updateUser,updatePhoto,saveCart, getCart } = require('../controllers/userController');
const {verifyUser}=require('../middleware/authMiddleware')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logOutUser);
router.get('/getuser', verifyUser, getUser);
router.get('/getloginstatus', getLoginStatus);
router.patch('/updateuser', verifyUser, updateUser);
router.patch('/updatephoto', verifyUser, updatePhoto);
router.patch('/savecart', verifyUser, saveCart);
router.get('/getcart', verifyUser, getCart);

module.exports = router;