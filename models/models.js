import   mongoose                   from 'mongoose'
import   {MONGO_URI,MONGO_OPTIONS}  from '../configuration/db.js'


try {
    mongoose.connect(MONGO_URI, MONGO_OPTIONS);
} catch (err) {
    console.log(err)
}



const userSchema = new mongoose.Schema({
        firstName : { type:String,lowercase: true },
        lastName : { type:String,lowercase: true },
        email : { type : String , unique : true , lowercase: true},
        password : String,
        created_date : {
            type : Date,
            default : Date.now()
    }
});

const User = mongoose.model("User",userSchema)


export  default User;


