const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please, add a coupon"],
        trim: true,
        unique: true,
        minLength:[6,"too short"],
        maxLength:[12,"too long"],
    },
    discount: {
        type: Number,
        required: true
    },
    expiresAt: {
        type: Date,
        default: () => Date.now() + 24 * 60 * 60 * 1000,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Coupon', couponSchema);

