const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, athorizeRoles } = require("../middleware/auth");

const router=express.Router();

router.route("/products").get(getAllProducts)
router.route("/product/new").post(isAuthenticatedUser, athorizeRoles("admin"), createProduct)
router.route("/product/:id").put(isAuthenticatedUser, athorizeRoles("admin"), updateProduct).delete(isAuthenticatedUser, athorizeRoles("admin"), deleteProduct).get(getProductDetails)



module.exports = router