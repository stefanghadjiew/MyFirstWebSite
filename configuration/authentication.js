import  dotenv   from  'dotenv';
import { LOGIN_PATH } from './routesConfig.js';

dotenv.config()

export const COOKIE_NAME     = process.env.COOKIE_NAME
       const COOKIE_SECRET   = process.env.COOKIE_SECRET
export const COOKIE_PATH     = process.env.LOGIN_PATH

export const SESSION_OPTIONS = {
        cookieName : COOKIE_NAME ,
        secret     : COOKIE_SECRET,
        cookie     : {  
                        path      : LOGIN_PATH, 
                        ephemeral : true, 
                        httpOnly  : true, 
                        secure    : false, 
                        
    }
}

export const authentication =  (req,res,next) => {
    
    if (req.MyCookie.seenyou) {
        res.setHeader('X-Seen-You', 'true')
    }  else {
        req.MyCookie.seenyou = true
        res.setHeader('X-Seen-You' , 'false')
    }
    next()
}
