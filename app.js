import  express      from  'express';
import  sessions     from  'client-sessions';
import  router       from  './routes.js';
import  dotenv       from  'dotenv';
import  cookieParser from  'cookie-parser'

import  { SESSION_OPTIONS , STATIC_ROUTE, authentication }  from  './config.js'

dotenv.config();
const PORT = process.env.PORT




const app  = express();
app.use(cookieParser())
app.use(express.static(STATIC_ROUTE))
app.use(express.json());
app.use(sessions(SESSION_OPTIONS)); 
app.use(authentication); 
app.use (router);


app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
}) 

