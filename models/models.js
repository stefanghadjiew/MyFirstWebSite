const   mongoose = require('mongoose')
        mongoose.connect("mongodb://localhost/MyFirstWebSiteDB" , { useNewUrlParser: true ,useUnifiedTopology: true , useCreateIndex : true })
        mongoose.Promise = Promise;


const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : { type:String , unique:true},
    password : String,
    created_date : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("User",userSchema)

