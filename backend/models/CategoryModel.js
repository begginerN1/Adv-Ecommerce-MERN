const mongoose = require('mongoose');

const categorytSchema = new mongoose.Schema({
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
    }
},{timestamps:true});

module.exports = mongoose.model('Category', categorytSchema);

