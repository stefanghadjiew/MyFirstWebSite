const mongoose =require('mongoose');

const bagSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        quantity: {
            type: Number,
            default: 0
        },
        src: String,
        price: Number,
    }],
    active: {
        type: Boolean,
        default: true
    },
    modified: {
        type: Date,
        default: Date.now
    }
})

const Bag = mongoose.model("Bag", bagSchema)

module.exports = Bag;