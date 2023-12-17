const mongoose = require('mongoose');
const validator=require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please, add a name"],
    },
    email: {
        type: String,
        required: [true, "please add a email"],
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: [true, 'please add a password'],
        minLength: [6, "password must be up to 6 characters"],
    },
    role: {
        type: String,
        required: true,
        default: "customer",
        enum: ["customer", "admin"]
    },
    photo: {
        type: String,
        required: [true, "please, add a photo"],
        default: "https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
    },
    phone: {
        type: String,
        default: "+123"
    },
    address: {
        type: Object,
    }
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);

