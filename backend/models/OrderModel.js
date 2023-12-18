const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    orderDate: {
        type: String,
        required: [true, "please, add an order date"],
        trim: true,
    },
    orderTime: {
        type: String,
        required: [true, "please, add an order time"],
        trim: true
    },
    orderAmount: {
        type: Number,
        required: [true, "please, add an order amount"],
        trim: true
    },
    orderStatus: {
        type: String,
        required: [true, "please, add an order status"],
        trim: true
    },
    paymentMethod: {
        type: String,
        trim:true
    },
    cartItems: {
        type: [Object],
        required: true,
        default:[]
    },
    shippingAddress: {
        type: Object,
        required:true
    },
    coupon: {
        type: Object,
        required: true,
        default: {
            name:"nil"
        }
    },
},{timestamps:true});

module.exports = mongoose.model('Order', orderSchema);

