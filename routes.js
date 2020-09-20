import express from 'express';
import User from "./models/users.js"
import Bag from "./models/products.js"
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {
    MONGO_URI,
    MONGO_URI2,
    MONGO_OPTIONS
} from './configuration/db.js'
import {
    COOKIE_NAME
} from './configuration/authentication.js'
import {
    DELETE_CART,
    PRODUCT_PATH,
    STATIC_FILE,
    LOGIN_PATH,
    REGISTER_PATH,
    AUTHENTICATED_PATH,
    LOGOUT_PATH
} from './configuration/routesConfig.js';

try {
    mongoose.connect(MONGO_URI || MONGO_URI2, MONGO_OPTIONS);
} catch (err) {
    console.log(err)
}


dotenv.config()
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(STATIC_FILE)
});


router.get(AUTHENTICATED_PATH, async (req, res) => {
    try {
        const user = await User.findById(req.MyCookie.userId)
        if (!(user && req.MyCookie)) {
            res.sendStatus(401);
        } else {
            res.sendStatus(200);
        }
    } catch (err) {
        console.log(err)
    }
})


router.post(LOGIN_PATH, async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            res.sendStatus(401);
        } else {
            req.MyCookie.userId = user._id
            res.sendStatus(201);
        }
    } catch (err) {
        console.log(err)
    }
})


router.post(REGISTER_PATH, async (req, res) => {
    let hashPass = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashPass;
    let user = new User(req.body)
    try {
        await user.save((err) => {
            (err) ? res.sendStatus(500): res.sendStatus(201);
        })
    } catch (err) {
        console.log(err)
    }
})


router.post(LOGOUT_PATH, (req, res) => {
    req.MyCookie.destroy()
    res.clearCookie(COOKIE_NAME)
    res.sendStatus(401)
})


router.post(PRODUCT_PATH, async (req, res) => {
    const userId = req.MyCookie.userId
    const {
        quantity,
        src,
        price
    } = req.body
    try {
        const bag = await Bag.findOne({
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
            const newCart = await Bag.create({
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
        console.log(err)
    }
})


router.get(PRODUCT_PATH, async (req, res) => {
    try {
        const userId = req.MyCookie.userId
        if (userId) {
            const bagRegistered = await Bag.findOne({
                userId: userId
            })
            res.send(bagRegistered.products)
        } else {

            const userId = {
                _id: "5f2d567139549e0bcc8b328b"
            }
            const bagNotRegistered = await Bag.findOne(userId)
            res.json(bagNotRegistered.products)
        }
    } catch (err) {
        console.log(err)
    }

})


router.delete(DELETE_CART, async (req, res) => {
    try {
        const userBag = await Bag.findOne({
            userId: req.MyCookie.userId
        })
        userBag.products = [];
        await userBag.save()
        res.send(userBag)
    } catch (err) {
        console.log(err)
    }
})


export default router;