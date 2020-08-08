import  express         from  'express';
import  User            from  "./models/models.js"
import  Bag             from  "./models/products.js" 
import  bcrypt          from  'bcryptjs';
import  dotenv          from  'dotenv';
import  mongoose                            from  'mongoose'; 
import  { MONGO_URI,MONGO_OPTIONS }         from  './configuration/db.js'
import  { COOKIE_NAME } from  './configuration/authentication.js'
import  { DELETE_CART,PRODUCT_PATH,STATIC_FILE,LOGIN_PATH,REGISTER_PATH,AUTHENTICATED_PATH,LOGOUT_PATH } from './configuration/routesConfig.js'; 

try {
    mongoose.connect(MONGO_URI, MONGO_OPTIONS);

} catch (err) {
     console.log(err)
}




dotenv.config()
const router = express.Router()

router.get('/' ,(req,res) =>{
    res.sendFile(STATIC_FILE)
}); 


router.get(AUTHENTICATED_PATH,async (req,res) => {
    try {
        const user = await User.findById(req.MyCookie.userId)
            if (!(user && req.MyCookie)) {
                res.status(401).send();
            } else {
                res.status(200).send();
            }
        } catch (err){
            console.log(err)
        }
})


router.post(LOGIN_PATH,async (req,res) => {
    try {
        const user = await User.findOne({email : req.body.email})
            if (!user || !bcrypt.compareSync(req.body.password,user.password)) {
                res.status(401).send()
            } else {
                req.MyCookie.userId = user._id
                res.status(201).send()
            }
    } catch (err) {
        console.log(err)
    }
})


router.post(REGISTER_PATH,async (req,res) => {
    let hashPass = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashPass;
    let user = new User(req.body)
    try {
        await  user.save((err) => {
        (err) ? res.status(500).send() : res.status(201).send();
    })
    } catch (err){
        console.log(err)
    }
})


router.post(LOGOUT_PATH, (req,res) => {
        req.MyCookie.destroy()  
        res.clearCookie(COOKIE_NAME)
        res.status(401).send() 
})



router.post(PRODUCT_PATH,async (req,res) => {
    const userId = req.MyCookie.userId
    const {quantity,src,price} = req.body 
    try {
        const bag = await Bag.findOne({userId: userId})
            if (bag) {
                let itemIndex = bag.products.findIndex(p => p.src =req.body.src)
                    if(itemIndex > -1) {
                        let productItem = bag.products[itemIndex]
                        productItem.quantity += req.body.quantity
                    } else {
                        bag.products.push(req.body) 
                    }
                    const bagUpd = await bag.save()
                    res.status(201).send(bagUpd)
            } else {
                    const newCart = await Bag.create({
                    userId : userId,
                    products: [{ quantity, src, price }]
                })
                res.send(newCart) 
            }
} catch(err) {console.log(err)}
})

router.get(PRODUCT_PATH,async (req,res) =>{
    try {
        const userId = req.MyCookie.userId
        if(userId) {
            const bagRegistered = await Bag.findOne({userId: userId})
            res.send(bagRegistered.products)
        } else {
            
            const userId = User._id
            const bagNotRegistered = await Bag.findOne(userId)
            res.json(bagNotRegistered.products)
        }
    } catch(err) {console.log(err)} 
       
})

router.delete(DELETE_CART,async (req,res) => {
    try {
        const userBag = await Bag.findOne({userId : req.MyCookie.userId})
        userBag.products = [];
        await userBag.save()
        res.send(userBag)
    } catch(err) { console.log(err) }
})

export default router;