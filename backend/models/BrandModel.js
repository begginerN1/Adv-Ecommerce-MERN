const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please, add a name"],
        trim: true,
        unique: true,
        minLength:[2,"too short"],
        maxLength:[32,"too long"],
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    category: {
        type: String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Brand', brandSchema);

