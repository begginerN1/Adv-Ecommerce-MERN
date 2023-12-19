const Product =require( "../models/productModel");
const Category =require( "../models/CategoryModel");
const asyncHandler = require('express-async-handler');
const errorHandler = require('../middleware/errorMiddleware');
const { default: mongoose } = require("mongoose");
const slugify=require('slugify')

// get categories
const getCategory = asyncHandler(async(req, res, next) => {
    const category = await Category.find().sort("-createdAt");
    if (!category) {
        return next(errorHandler(400,"no category found!"))
    }
   
    res.status(200).json(category);
})
// get a category
const getACategory = asyncHandler(async(req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(errorHandler(400,"no such category found!"))
    }
   
    res.status(200).json(category);
})
// delete a product
const deleteCategory = asyncHandler(async(req, res, next) => {
    const category = await Category.findOneAndDelete({slug:req.params.slug});
    if (!category) {
        return next(errorHandler(400,"unfortunately, no such category found!"))
    }
   
    res.status(200).json(`${category.name} was successfully deleted`);
})

// update a category
const updateCategory = asyncHandler(async (req, res, next) => {

    console.log(req.body.name);
    console.log(req.params.slug);
    
    const updatedCategory = await Category.findOneAndUpdate({ slug: req.params.slug }, {
        $set: { name: req.body.name, slug: slugify(req.body.name) }
    }, { new: true });
    
    if (!updatedCategory) {
         return next(errorHandler(400,"failed to update product data"))
    }
    console.log(req.body.name);

    res.status(200).json(updatedCategory);

})

// --------------------  create Category  --------------------------------
const createCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    //validate the request
    if (!name) {
        
        return next(errorHandler('please, fill in the category field!'));
    }

    const checkDuplicate = await Category.findOne({ name })
    if (checkDuplicate) {
         return next(errorHandler('category already exists!!!'));
    }

    const category = await Category.create({name, slug:slugify(name)});

    res.status(201).json(category);

})

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    getACategory,
    deleteCategory,
    
}