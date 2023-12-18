const Order =require( "../models/OrderModel");
const asyncHandler = require('express-async-handler');
const errorHandler = require('../middleware/errorMiddleware');
const { default: mongoose } = require("mongoose");
const slugify=require('slugify')

// get coupons
const getOrder = asyncHandler(async (req, res, next) => {
    
    let orders;

    if (req.user.role === 'admin') {
        orders = await Order.find().sort("-createdAt");
        return res.status(200).json(orders);
    }

    orders = await Order.find({ user: req.user._id }).sort("-createdAt");
    res.status(200).json(orders);
    
    if (!orders) {
        return next(errorHandler(400, "no orders found!"))
    }
});


// get a coupon
const getAOrder = asyncHandler(async(req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(errorHandler(400,"no such order found or has expired!"))
    }

    if (req.user.role === 'admin') {
        return res.status(200).json(order);
    }
    console.log(order.user, req.user._id);
    
    // match order with the user
    if (order.user.toString() !== req.user._id.toString()) {
        return next(errorHandler(401,"not authorized !"))
    } 
    
    res.status(200).json(order);
    
})


// delete an order
const deleteOrder = asyncHandler(async(req, res, next) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
        return next(errorHandler(400,"no such coupon found!"))
    }
   
    res.status(200).json(`${coupon.name} was successfully deleted`);
})

// update a orderStatus
const updateOrder = asyncHandler(async (req, res, next) => {
    
     const order = await Order.findByIdAndUpdate(
            req.params.id,
         { $set: { orderStatus: req.body.orderStatus } },
            { new: true, runValidators: true }
        );

        if (!order) {
            return next(errorHandler(400, "Failed to find the order!"));
        }

        res.status(200).json(order);

})

// --------------------  create coupon  --------------------------------
const createOrder = asyncHandler(async (req, res, next) => {
    const {
        orderDate,
        orderTime,
        orderAmount,
        orderStatus,
        cartItems,
        shippingAddress,
        paymentMethod,
        coupon,
    } = req.body;

    //validate the requCoupon   
    if (!cartItems || !orderStatus || !shippingAddress || !paymentMethod) {
        return next(errorHandler(400,'order data missing !'));
    }

    await Order.create({
        user: req.user._id,
        orderDate,
        orderTime,
        orderAmount,
        orderStatus,
        cartItems,
        shippingAddress,
        paymentMethod,
        coupon,
    });

    res.status(201).json({message:'Order Created'});

})

module.exports = {
    createOrder, getOrder,getAOrder, deleteOrder,updateOrder
}