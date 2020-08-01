import  express      from  'express';
import  session      from  'express-session';
import  router       from  './routes.js';
import  dotenv       from  'dotenv';


import  { SESSION_OPTIONS , STATIC_ROUTE}  from  './config.js'

dotenv.config();
const PORT = process.env.PORT




const app  = express();
app.use(express.static(STATIC_ROUTE))
app.use(express.json());
app.use(session(SESSION_OPTIONS)); 
app.use (router);


app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
}) 

