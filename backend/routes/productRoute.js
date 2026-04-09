const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails,createProductReview } = require("../controllers/productController");
const { isAuthenticatedUser, athorizeRoles } = require("../middleware/auth");

const router=express.Router();

router.route("/products").get(getAllProducts)
router.route("/admin/product/new").post(isAuthenticatedUser, athorizeRoles("admin"), createProduct)
router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser, athorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, athorizeRoles("admin"), deleteProduct)
router.route("/product/:id").get(getProductDetails)

router.route("/review").put(isAuthenticatedUser, createProductReview)



module.exports = router