const express=require('express');
const router=express.Router({mergeParams:true});
const { addProduct,getProducts,deleteProducts } = require("../middleware/products")

router.post("/",addProduct);
router.get("/",getProducts);
router.delete("/",deleteProducts);

module.exports = router;