const db = require("../db");

exports.addProduct = async (req, res,next) => {
    const userId = req.params.id
    const {
        quantity,
        src,
        price
    } = req.body
    try {
        const bag = await db.Bag.findOne({
            userId: userId
        })
        if (bag) {
            let itemIndex = bag.products.findIndex(p => p.src === src)
            if (itemIndex > -1) {
                let productItem = bag.products[itemIndex]
                productItem.quantity += quantity
            } else {
                bag.products.push({
                    quantity,
                    src,
                    price
                })
            }
            const bagUpd = await bag.save()
            res.status(201).send(bagUpd)
        } else {
            const newCart = await db.Bag.create({
                userId: userId,
                products: [{
                    quantity,
                    src,
                    price
                }]
            })
            res.send(newCart)
        }
    } catch (err) {
        return next(err)
    }
}

exports.getProducts = async (req, res,next) => {
    try {
        const userId = req.params.id
        if (userId) {
            const bagRegistered = await db.Bag.findOne({
                userId: userId
            })
            res.send(bagRegistered.products)
        } else {
            res.status(401).send("Please Log In!")
         
        }
    } catch (err) {
        return next(err)
    }

}


exports.deleteProducts = async (req, res,next) => {
    try {
        const userBag = await db.Bag.findOne({
            userId: req.params.id
        })
        userBag.products = [];
        await userBag.save()
        res.send(userBag)
    } catch (err) {
        return next(err)
    }
}