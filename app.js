import  express                             from  'express';
import  mongoose                            from  'mongoose'; 
import  sessions                            from  'client-sessions';
import  router                              from  './routes.js';
import  dotenv                              from  'dotenv';
import  { SESSION_OPTIONS, authentication } from  './configuration/authentication.js'
import  { STATIC_ROUTE }                    from  './configuration/routesConfig.js'
import  { MONGO_URI,MONGO_OPTIONS }         from  './configuration/db.js'

try {
        mongoose.connect(MONGO_URI, MONGO_OPTIONS);
     
    } catch (err) {
        console.log(err)
    }

dotenv.config();

const PORT = process.env.PORT


const app  = express();
app.use(express.static(STATIC_ROUTE))
app.use(express.json());
app.use(sessions(SESSION_OPTIONS)); 
app.use(authentication); 
app.use (router);

app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
}) 

