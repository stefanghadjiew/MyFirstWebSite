import  express from  'express';
import  User    from  "./models/models.js"
import  bcrypt  from  'bcryptjs';


const router = express.Router()



router.get('/' ,(req,res) =>{
    res.sendFile('e:/web-projects/MyFirstWebSite/index.html')
}); 



router.get('/users/authorized', (req,res) => {
    if (!(req.mySession && req.mySession.userId)) {
        res.status(401).send();
    } else {
        res.status(200).send();
    }
})



router.post('/users/login', (req,res) => {
    User.findOne({email : req.body.email}, (err,user) => {
            if (err) {
                    console.log(err)
            }
            if (!user || !bcrypt.compareSync(req.body.password,user.password)) {
                res.status(401).send()
            } else {
               req.mySession.userId = user._id
               res.status(201).json(user.firstName)
            }
    })
    
})


router.post('/users/register',(req,res) => {
    let hashPass = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashPass;
    let user = new User(req.body)
    user.save((err) => {
            (err) ? res.status(500).send() : res.status(201).send();
    })
})



export default router;