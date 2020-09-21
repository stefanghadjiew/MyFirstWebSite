const mongoose =require( "mongoose");

mongoose.connect("mongodb://localhost/MyFirstWebSiteDB",{
        useNewUrlParser: true ,
        useUnifiedTopology: true , 
        useCreateIndex : true 
});

module.exports.User = require("./models/users");
module.exports.Bag = require("./models/products");