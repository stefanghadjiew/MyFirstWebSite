import  express         from  'express';
import  User            from  "./models/models.js"
import  bcrypt          from  'bcryptjs';
import  dotenv          from  'dotenv';
import  {HOST,COOKIE_PATH, STATIC_FILE,LOGIN_PATH,REGISTER_PATH,AUTHENTICATED_PATH,LOGOUT_PATH } from './config.js'; 



dotenv.config()
const router = express.Router()



router.get('/' ,(req,res) =>{
    res.sendFile(STATIC_FILE)
}); 



router.get(AUTHENTICATED_PATH,async (req,res) => {
    const user =await User.findById(req.Authenticated.userId)
    if (!(user && req.Authenticated)) {
        res.status(401).send();
    } else {
        res.status(200).send();
    }
})



router.post(LOGIN_PATH, async (req,res) => {
    try {
        const user = await User.findOne({email : req.body.email})
        if (!user || !bcrypt.compareSync(req.body.password,user.password)) {
            res.status(401).send()
        } else {
          req.Authenticated.userId = user._id
          res.status(201).json(user.firstName)
        }
    } catch (err) {
        console.log(err)
    }
})


router.post(REGISTER_PATH,(req,res) => {
    let hashPass = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashPass;
    let user = new User(req.body)
    user.save((err) => {
            (err) ? res.status(500).send() : res.status(201).send();
    })
})


router.post(LOGOUT_PATH,(req,res,next) => {
    req.Authenticated.destroy()  
    res.clearCookie('Authenticated')
    res.status(401).send()
})



export default router;