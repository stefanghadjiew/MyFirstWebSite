import  express  from  "express";
import  sessions from  'client-sessions';
import  router   from  './routes.js'
    

const app  = express();
const PORT =  3000;
        

app.use(express.static('e:/web-projects/'))
app.use(express.json());

app.use(sessions({
        cookieName : "Authenticated",
        secret : '1_2_3stefanGhadjiew1_2_3',
        duration : 1 * 60 * 1000,
        cookie : {
                path : '/users/login',
                httpOnly : true,
                ephemeral : true,
                secure: false,
                sameSite : true
        }
}));

app.use((req,res,next) => {
        if (req.Authenticated.seenyou) {
                res.setHeader('X-Seen-You', 'true')
        } else {
                req.Authenticated.seenyou = true;
                res.setHeader('X-Seen-You' , 'false')
        }
        next()
})  

app.use (router);



app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
}) 

