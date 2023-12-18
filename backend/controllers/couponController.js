const Coupon =require( "../models/CouponModel");
const asyncHandler = require('express-async-handler');
const errorHandler = require('../middleware/errorMiddleware');
const { default: mongoose } = require("mongoose");
const slugify=require('slugify')

// get coupons
const getCoupon = asyncHandler(async(req, res, next) => {
    const coupon = await Coupon.find().sort("-createdAt");
    if (!coupon) {
        return next(errorHandler(400,"no such coupon found!"))
    }
   
    res.status(200).json(coupon);
})
// get a coupon
const getACoupon = asyncHandler(async(req, res, next) => {
    const coupon = await Coupon.findOne({name:req.params.name, expiresAt:{$gt: Date.now()}});
    if (!coupon) {
        return next(errorHandler(400,"no such coupon found or has expired!"))
    }
   
    res.status(200).json(coupon);
})
// delete a coupon
const deleteCoupon = asyncHandler(async(req, res, next) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
        return next(errorHandler(400,"no such coupon found!"))
    }
   
    res.status(200).json(`${coupon.name} was successfully deleted`);
})

// update a coupon
const updateCoupon = asyncHandler(async (req, res, next) => {
    
    const updatedCoupon = await Coupon.findOneAndUpdate({ name:req.params.name }, {
        $set: { name: req.body.name, discount:req.body.discount, expiresAt: req.body.expiresAt }
    }, { new: true });
    
    if (!updatedCoupon) {
         return next(errorHandler(400,"failed to update couon data"))
    }

    res.status(200).json(updatedCoupon);

})

// --------------------  create coupon  --------------------------------
const createCoupon = asyncHandler(async (req, res, next) => {
    const { name, discount, expiresAt } = req.body;
    //validate the requCoupon   
    if (!name || !discount) {
        
        return next(errorHandler(400,'please, fill in all field!'));
    }

    const duplicateCheck = await Coupon.findOne({ name })
    if (duplicateCheck) {
         return next(errorHandler(400,'coupon already exists!!!'));
    }

    const coupon = await Coupon.create({name, discount, expiresAt});

    res.status(201).json(coupon);

})

module.exports = {
    createCoupon, getCoupon,getACoupon, deleteCoupon,updateCoupon
}