import  dotenv   from  'dotenv';



dotenv.config()

const COOKIE_NAME     = process.env.COOKIE_NAME
const COOKIE_SECRET   = process.env.COOKIE_SECRET
const COOKIE_PATH     = process.env.COOKIE_PATH


const PORT            = process.env.MONGO_PORT
const HOST            = process.env.MONGO_HOST
const DB              = process.env.MONGO_DATABASE

export const MONGO_OPTIONS = {
    useNewUrlParser: true ,
    useUnifiedTopology: true , 
    useCreateIndex : true 
}

export const MONGO_URI    = `mongodb://${HOST}:${PORT}/${DB}`

export const STATIC_ROUTE = process.env.STATIC_ROUTE
export const STATIC_FILE  = process.env.STATIC_FILE



export const SESSION_OPTIONS = {
        cookieName : COOKIE_NAME ,
        secret     : COOKIE_SECRET,
        path       : COOKIE_PATH,
        cookie     : {  
                        httpOnly : true, 
                        maxAge : 60000,
                        secure: false,
                        sameSite : true  
    }
}

export const authentication =  (req,res,next) => {
    
    if (req.Authenticated.seenyou) {
        res.setHeader('X-Seen-You', 'true')
} else {
        req.Authenticated.seenyou = true
        res.setHeader('X-Seen-You' , 'false')
}
next()
}

export const LOGIN_PATH         = process.env.LOGIN_PATH
export const REGISTER_PATH      = process.env.REGISTER_PATH
export const AUTHENTICATED_PATH = process.env.AUTHENTICATED_PATH
export const LOGOUT_PATH        = process.env.LOGOUT_PATH