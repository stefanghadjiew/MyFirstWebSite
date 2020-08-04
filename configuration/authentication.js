import  dotenv   from  'dotenv';

dotenv.config()

export const COOKIE_NAME     = process.env.COOKIE_NAME
       const COOKIE_SECRET   = process.env.COOKIE_SECRET
export const COOKIE_PATH     = process.env.COOKIE_PATH

export const SESSION_OPTIONS = {
        cookieName : COOKIE_NAME ,
        secret     : COOKIE_SECRET,
        duration   : 1 * 60 * 1000,
        cookie     : {  
                        path      : COOKIE_PATH,
                        ephemeral : true,
                        httpOnly  : true, 
                        secure    : false,
                        sameSite  : true  
    }
}

export const authentication =  (req,res,next) => {
    
    if (req.Authenticated.seenyou) {
        res.setHeader('X-Seen-You', 'true')
    }  else {
        req.Authenticated.seenyou = true
        res.setHeader('X-Seen-You' , 'false')
    }
    next()
}
