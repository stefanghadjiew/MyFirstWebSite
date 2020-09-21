const mongoose =require( "mongoose");

mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true ,
        useUnifiedTopology: true , 
        useCreateIndex : true 
});

module.exports.User = require("./models/users");
module.exports.Bag = require("./models/products");