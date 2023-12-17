const Brand =require( "../models/BrandModel");
const Category =require( "../models/CategoryModel");
const asyncHandler = require('express-async-handler');
const errorHandler = require('../middleware/errorMiddleware');
const { default: mongoose } = require("mongoose");
const slugify=require('slugify')

// get categories
const getBrand = asyncHandler(async(req, res, next) => {
    const brand = await Brand.find().sort("-createdAt");
    if (!brand) {
        return next(errorHandler(400,"no such brand found!"))
    }
   
    res.status(200).json(brand);
})
// get a category
const getABrand = asyncHandler(async(req, res, next) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
        return next(errorHandler(400,"no such brand found!"))
    }
   
    res.status(200).json(brand);
})
// delete a product
const deleteBrand = asyncHandler(async(req, res, next) => {
    const brand = await Brand.findOneAndDelete({slug:req.params.slug.toLocaleLowerCase()});
    if (!brand) {
        return next(errorHandler(400,"no such brand found!"))
    }
   
    res.status(200).json(`${brand.name} was successfully deleted`);
})

// update a category
const updateBrand = asyncHandler(async (req, res, next) => {
    
    const updatedBrand = await Brand.findOneAndUpdate({ slug: req.params.slug }, {
        $set: { name: req.body.name, category:req.body.category, slug: slugify(req.body.name) }
    }, { new: true });
    
    if (!updatedCategory) {
         return next(errorHandler(400,"failed to update brand data"))
    }

    res.status(200).json(updatedBrand);

})

// --------------------  create Brand  --------------------------------
const createBrand = asyncHandler(async (req, res, next) => {
    const { name, category } = req.body;
    //validate the request
    if (!name || !category) {
        
        return next(errorHandler('please, fill in all field!'));
    }

    const categoryExists = await Category.findOne({ name: category })
    if (!categoryExists) {
         return next(errorHandler('category not found!!!'));
    }

    const brand = await Brand.create({name, slug:slugify(name), category});

    res.status(201).json(brand);

})

module.exports = {
    createBrand,
    getBrand,
    updateBrand,
    getABrand,
    deleteBrand,
    
}