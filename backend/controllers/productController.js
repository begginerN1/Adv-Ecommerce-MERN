const Product =require( "../models/productModel");
const asyncHandler = require('express-async-handler');
const errorHandler = require('../middleware/errorMiddleware');
const { default: mongoose } = require("mongoose");

// get products
const getProduct = asyncHandler(async(req, res, next) => {
    const products = await Product.find().sort("-createdAt");
    if (!products) {
        return next(errorHandler(400,"no such product found!"))
    }
   
    res.status(200).json(products);
})
// get a product
const getAProduct = asyncHandler(async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(errorHandler(400,"no such product found!"))
    }
   
    res.status(200).json(product);
})
// delete a product
const deleteProduct = asyncHandler(async(req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return next(errorHandler(400,"no such product found!"))
    }
   
    res.status(200).json(`${product.name} was successfully deleted`);
})

// update user
const updateProduct = asyncHandler(async (req, res, next) => {

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set: {
            name : req.body.name,
            description : req.body.description,
            regularPrice : req.body.regularPrice,
            category : req.body.category,
            brand : req.body.brand,
            price : req.body.price,
            color : req.body.color,
            quantity: req.body.quantity,
            image: req.body.image
        }
    }, { new: true })
    
    if (!updatedProduct) {
         return next(errorHandler(400,"failed to update product data"))
    }

    res.status(200).json(updatedProduct);

})

// review the product
const reviewProduct = asyncHandler(async (req, res, next) => {

    const { star, review, reviewDate } = req.body;
    console.log(req.user);
    

    // validation
    if (star < 1 || !review) {
        next(errorHandler(400, "please, add a star and a review!"))
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
        next(errorHandler(400,"no such product found!"))
    }

    // update Rating
    product.rating.push({
        star,
        review,
        reviewDate,
        name: req.user.name,
        userID: req.user._id,
    })

    await product.save();
    // console.log(req.body);
    

    res.status(200).json({message: 'product review was updated'});

})


// delete review
const deleteReview = asyncHandler(async (req, res, next) => {

    const { userID } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
        next(errorHandler(400,"no such product found!"))
    }

    const newRating = product.rating.filter(item => item.userID.toString() !==userID.toString())

    product.rating = newRating;
    await product.save();
    res.status(200).json({message: 'product review was removed'});

})

//update Review
const updateReview = asyncHandler(async (req, res, next) => {

    const { star, review, reviewDate, userID } = req.body;
    

    // validation
    if (star < 1 || !review) {
        return next(errorHandler(400, "please, add a star and a review!"))
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(errorHandler(400,"no such product found!"))
    }

    if (req.user._id.toString() !== userID) {
         return next(errorHandler(401,"user is not authorized!!!"))
    }

    // update product review
    const updatedReview = await Product.findOneAndUpdate(
        {
            _id: product._id,
            "rating.userID":mongoose.Types.ObjectId(userID)
        },
        {
            $set:{
                "rating.$.star":star,
                "rating.$.review":review,
                "rating.$.reviewDate":reviewDate,
            }
        }
    )

    if (updatedReview) {
        res.status(200).json({message: 'product review was updated'});
    } else {
        return next(errorHandler(400,"product review was NOT updated!!!"))
    }
})


// update product photo
const updateProductImage = asyncHandler(async(req, res) => {

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
    const errorHandler =require('../middleware/errorMiddleware')

})

// --------------------  create Product  --------------------------------
const createProduct = asyncHandler(async (req, res, next) => {
    const { name, sku, category, brand, quantity,price,description,image,regularPrice,color } = req.body;

    //validate the request
    if (!name || !category  || !brand || !quantity || !price || !description) {
        
        return next(errorHandler('please, fill in all required fields!'));
    }

    const product = await Product.create({
        name, sku, category, brand, quantity, price, description, image, regularPrice, color
    });

    res.status(201).json(product);

})

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    updateProductImage,
    getAProduct,
    deleteProduct,
    reviewProduct,
    deleteReview,
    updateReview
}