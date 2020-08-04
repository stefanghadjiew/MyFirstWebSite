import  express         from  'express';
import  User            from  "./models/models.js"
import  Product         from  "./models/products.js" 
import  bcrypt          from  'bcryptjs';
import  dotenv          from  'dotenv';
import  { COOKIE_NAME } from  './configuration/authentication.js'
import  { STATIC_FILE,LOGIN_PATH,REGISTER_PATH,AUTHENTICATED_PATH,LOGOUT_PATH } from './configuration/routesConfig.js'; 


dotenv.config()
const router = express.Router()
const textParser = express.text() 



router.get('/' ,(req,res) =>{
    res.sendFile(STATIC_FILE)
}); 


router.get(AUTHENTICATED_PATH,async (req,res) => {
    try {
        const user = await User.findById(req.Authenticated.userId)
            if (!(user && req.Authenticated)) {
                res.status(401).send();
            } else {
                res.status(200).send();
            }
        } catch (err){
        console.log(err)
        }
})


router.post(LOGIN_PATH, async (req,res) => {
    try {
        const user = await User.findOne({email : req.body.email})
            if (!user || !bcrypt.compareSync(req.body.password,user.password)) {
                res.status(401).send()
            } else {
                req.Authenticated.userId = user._id
                res.status(201).send()
        }
    } catch (err) {
        console.log(err)
    }
})


router.post(REGISTER_PATH, async (req,res) => {
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
        req.Authenticated.destroy()  
        res.clearCookie(COOKIE_NAME)
        res.status(401).send() 
})



router.post("/products", textParser,async (req,res) => {
    let product = new Product({body : req.body})
    try {
        await product.save(() => {
                console.log("product saved!")
                res.json (product); 
    })
} catch (err){
    console.log(err)
}
}) 

export default router;