const db = require("../db");
const jwt = require("jsonwebtoken");

exports.login = async (req,res,next) => {

}

exports.register = async (req,res,next) => {
    try {
        let user = await db.User.create(req.body);
        let { id,firstName,lastName,email } = user;
        let token = jwt.sign({
            id,
            firstName,
            lastName,
            email
        },"thisShouldBeProcessEnvSecretKeyButImLazy")
        return res.status(200).json({
            id,
            firstName,
            lastName,
            email,
            token
        })
    } catch(err) {
        if(err.code === 11000) {
            err.message = "Username/email already in use"
        }
        return next({
            status:400,
            message:err.message
        })
    }
     
}

exports.login = async (req,res,next) => {
    try {
        let user = await db.User.findOne({email:req.body.email})
        let { id,firstName,lastName,email } = user
        let isMatch = await user.comparePassword(req.body.password)
        if(isMatch) {
            let token = jwt.sign({
                id,
                firstName,
                lastName,
                email
            },"thisShouldBeProcessEnvSecretKeyButImLazy")
            return res.status(200).json({
                id,
                firstName,
                lastName,
                email,
                token
            })
        } else {
            return next({
                status:400,
                message: "Invalid username/password"
            })
        }
    } catch(err) {
        return next({
            status:400,
            messsage : "Invalid username/password"
        })
    }
}

exports.isUserAuthenticated = (req,res,next) => {
    const jwtPayload = req.headers.authorization.split(" ")[1]
    jwt.verify(jwtPayload,"thisShouldBeProcessEnvSecretKeyButImLazy",(err,decoded) => {
        if(decoded) {
            return next();
        }
        if (err) {
            return next({
                status : 401,
                message : "Please log in first!"
            })
        }
    })

} 

exports.isUserAuthorized = (req,res,next) => {
    const jwtPayload = req.headers.authorization.split(" ")[1]
    jwt.verify(jwtPayload,"thisShouldBeProcessEnvSecretKeyButImLazy",(err,decoded) => {
        if(decoded && decoded.id === req.params.id) {
            return next()
        }
        if(err) {
            return next({
                status : 401,
                message : "Unauthorized !!!"
            })
        }
    })
}