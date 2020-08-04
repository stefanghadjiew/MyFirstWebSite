import   mongoose                   from 'mongoose'

const productSchema = new mongoose.Schema ({body : String})

const Product = mongoose.model("Product",productSchema)

export default Product;
