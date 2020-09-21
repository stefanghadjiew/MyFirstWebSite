const mongoose =require( "mongoose");

mongoose.connect("mongodb+srv://cheffo0o:123smokeweed123@cluster0.qus4z.mongodb.net/<dbname>?retryWrites=true&w=majority",{
        useNewUrlParser: true ,
        useUnifiedTopology: true , 
        useCreateIndex : true 
});

module.exports.User = require("./models/users");
module.exports.Bag = require("./models/products");