const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ApiFeatures = require("../utils/apifeatures")

//Create product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})
//Get all product

exports.getAllProducts = catchAsyncErrors(async(req, res)=>{
    const resPerPage = 5
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resPerPage)
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productsCount,
    })
})


//Get product details
exports.getProductDetails = catchAsyncErrors(async(req, res, next)=>{
    const product = await Product.findById(req.params.id); 
    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success:true,
        product
    })
})




//Update product --admin
exports.updateProduct = catchAsyncErrors(async(req, res, next)=>{
    let product = Product.findById(req.params.id)

    // if(!product){
    //     return res.status(500).json({
    //         success: false,
    //         message: "Product not found"
    //     })
    // }
    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        product
    })
})

//Delete product --admin
exports.deleteProduct = catchAsyncErrors(async(req, res, next)=>{
    let product = Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }
    
    await product.deleteOne()

    res.status(200).json({
        success:true,
        message: "Product deleted successfully"
    })
}) 

exports.createProductReview = catchAsyncErrors(async(req, res, next)=>{
    const {rating, comment, productId} = req.body

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if(isReviewed){
        product.reviews.forEach(review =>{
            if(review.user.toString() === req.user._id.toString()){
                review.comment = comment
                review.rating = rating
            }
        })
    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let avg = 0

    product.reviews.forEach(review =>{
        avg += Number(review.rating)
    })

    product.ratings = avg / product.reviews.length

    await product.save({validateBeforeSave: false})

    res.status(200).json({
        success: true
    })
})

//Get product reviews
exports.getProductReviews = catchAsyncErrors(async(req, res, next)=>{
    const product = await Product.findById(req.query.id)

    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})