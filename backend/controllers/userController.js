const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const errorHandler = require('../middleware/errorMiddleware');
const { json } = require('express');

const generateToken = (id, role) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
       expiresIn: '1d'
   });
}

// login user
const loginUser = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;

    // validate user
    if (!email || !password) {
        next(errorHandler(400, "please add email and password"));
    };

    // check if user exist
    const isUser = await User.findOne({ email });
    if (!isUser) {
        return next(errorHandler(400, "invalid credentials"));
    }
   
    const validPass = await bcrypt.compare(password, isUser.password);
    if (!validPass) {
        return next(errorHandler(400, "incorrect credentials, try again"));
    }
    const {password:pass, ...rest } = isUser._doc;
    const token = generateToken(isUser._id);
    const decodedToken = jwt.decode(token)
    console.log(decodedToken);
    
        res.cookie('access_token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            // secure: true,
            // sameSite: 'none'
        });

    res.status(200).json(rest);

})

// log out user
const logOutUser = asyncHandler(async(req, res, next) => {

    res.clearCookie('access_token');
    res.status(200).json('user has been logged out')
})

// get user
const getUser = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        return next(errorHandler(400,"no such user found!"))
    }
   
    res.status(200).json(user);
})

// get Login status
const getLoginStatus = asyncHandler(async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.json(false)
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified) {
        return res.json(false)
    }
    else {
        return res.json(true)
    }
});

// update user
const updateUser = asyncHandler(async (req, res, next) => {

    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
        $set: {
            name : req.body.name,
            phone : req.body.phone,
            address : req.body.address
        }
    }, { new: true })
    
    if (!updatedUser) {
         return next(errorHandler(400,"failed to update user data"))
    }

    const {password,...rest}=updatedUser._doc
    res.status(200).json(rest);

})

// update user photo
const updatePhoto = asyncHandler(async(req, res) => {

    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
        $set: {
            photo : req.body.photo
        }
    }, { new: true })
    
    if (!updatedUser) {
         return next(errorHandler(400,"failed to update user data"))
    }

    const {password,...rest}=updatedUser._doc
    res.status(200).json(rest);


})
// save cart
const saveCart = asyncHandler(async (req, res) => {
    const { cartItems } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, {
        $set: { cartItems }
    }, { new: true });
    
    if (!user) {
        return next(errorHandler(400, "failed to update user cart data"))
    }

    res.status(200).json("cart data saved to userDB");
});


// get user cart
const getCart = asyncHandler(async(req, res) => {
    
    const user = await User.findById(req.user.id)
    
    if (!user) {
         return next(errorHandler(400,"no such user found!"))
    }
    res.status(200).json(user.cartItems);
})

//register User
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //validate the request
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('please, fill in all required fields!');
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error('Password must be up to 6 character!');
    }
    // check duplicates
    const isUser = await User.findOne({ email });
    if (isUser) {
        res.status(400);
        throw new Error('choose a different email');
    }

    const hashedPass = await bcrypt.hash(password, 10);
    //create a new user
    const user = await User.create({
        name, email, password: hashedPass
    });

    // generate tokem
    if (user) {
        const {password:pass, ...rest } = user._doc;
        const token = generateToken(user._id, rest.role);
        res.cookie('access_token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            // secure: true,
            // sameSite: 'none'
        });

        res.status(200).json(rest)
    } else {
        res.status(400);
        throw new Error('invalid user data');
    }



    res.send('register user...');
})

module.exports = {
    registerUser,
    loginUser,
    logOutUser,
    getUser,
    getLoginStatus,
    updateUser,
    updatePhoto,
    saveCart,
    getCart
}

